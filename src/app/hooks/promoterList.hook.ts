import {useQuery} from 'react-query'
import {IPromoter} from '../../types/Promoter.types'
import axios from '../config/http-common'
import {ReactQueryResponse} from '../../types/Generics'
import {useEffect, useReducer} from 'react'
import {
  getStoragePromoterId,
  getStoragePromoterName,
  setStoragePromoterId,
  setStoragePromoterName,
} from '../helpers/localstorage.helper'
import {disableSplashScreen, enableSplashScreen} from '../components/RenderLoader/RenderLoader'

enum PromotersKind {
  SET_PROMOTERS = 'SET_PROMOTERS',
  SET_PROMOTER_ID = 'SET_PROMOTER_ID',
  SET_PROMOTER_NAME = 'SET_PROMOTER_NAME',
}

interface PromoterStateAction {
  type: PromotersKind
  payload: IPromoter[] | string
}

interface PromoterState {
  promoters: IPromoter[]
  promoterId: string | null
  promoterName: string | null
}

export const promoterReducer = (state: PromoterState, action: PromoterStateAction) => {
  switch (action.type) {
    case PromotersKind.SET_PROMOTERS:
      return {
        ...state,
        promoters: action.payload as IPromoter[],
      }
    case PromotersKind.SET_PROMOTER_ID:
      return {
        ...state,
        promoterId: action.payload as string,
      }
    case PromotersKind.SET_PROMOTER_NAME:
      return {
        ...state,
        promoterName: action.payload as string,
      }
  }
}

export const usePromoterList = () => {
  const [promotersState, dispatchPromoters] = useReducer(promoterReducer, {
    promoters: [],
    promoterId: getStoragePromoterId(),
    promoterName: getStoragePromoterName(),
  })
  const {
    data: promotersData,
    isFetching,
    refetch: getPromoters,
  } = useQuery<ReactQueryResponse<IPromoter[]>>('get-promoters', async () => {
    return await axios.get(`/Promoter/get-promoters`)
  })

  useEffect(() => {
    if (!isFetching && !promotersData) {
      getPromoters()
    }
  }, [])

  useEffect(() => {
    if (!isFetching && promotersData) {
      setPromoters(promotersData?.data.response)
    }
  }, [isFetching, promotersData])

  const setPromoters = (payload: IPromoter[]) => {
    dispatchPromoters({type: PromotersKind.SET_PROMOTERS, payload})
  }

  const setPromoterId = (payload: string) => {
    setStoragePromoterId(payload)
    setPromoterName(payload)
    dispatchPromoters({type: PromotersKind.SET_PROMOTER_ID, payload})
    window.location.reload()
  }

  const setPromoterName = (promoterId: string) => {
    var promoterName = promotersState.promoters.find(
      (promoter) => promoter.promoterId.toString() === promoterId
    )?.promoterName
    if (promoterName !== undefined) {
      setStoragePromoterName(promoterName)
      dispatchPromoters({type: PromotersKind.SET_PROMOTER_NAME, payload: promoterName})
    }
  }

  const getPromoterId = () => {
    return getStoragePromoterId()
  }

  const getPromoterName = () => {
    return getStoragePromoterName()
  }

  useEffect(() => {
    if (promotersState.promoters) {
      const adminPromoter = promotersState.promoters.find((p) => p.promoterIsAdmin)
      if (promotersState.promoterId === null && adminPromoter) {
        setPromoterName(adminPromoter.promoterName)
        setPromoterId(adminPromoter.promoterId.toString())
      }
    }
  }, [promotersState.promoterId, promotersState.promoters])

  useEffect(() => {
    enableSplashScreen()
    setTimeout(() => {
      disableSplashScreen()
    }, 450)
  }, [promotersState.promoterId])

  return {
    promoters: promotersState.promoters,
    isLoading: isFetching,
    setPromoterId,
    promoterId: getPromoterId(),
    promoterName: getPromoterName(),
  }
}
