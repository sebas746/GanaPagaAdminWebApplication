import { useQuery } from "react-query"
import { IPromoter } from "../../types/Promoter.types"
import axios from '../config/http-common'
import {ReactQueryResponse} from '../../types/Generics'
import { useEffect, useReducer } from "react"

enum PromotersKind {
    SET_PROMOTERS = 'SET_PROMOTERS',
  }

interface PromoterStateAction {
    type: PromotersKind
    payload: IPromoter[]
}  

interface PromoterState {
    promoters: IPromoter[]
  }

export const promoterReducer = (
    state: PromoterState,
    action: PromoterStateAction
  ) => {
    switch (action.type) {
      case PromotersKind.SET_PROMOTERS:
        return {
          ...state,
          promoters: action.payload as IPromoter[],
        }      
    }
  }

export const usePromoterList = () => {
    const [promotersState, dispatchPromoters] = useReducer(promoterReducer, {
        promoters: [],
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

      return { promoters: promotersState.promoters, isLoading: isFetching }
}
