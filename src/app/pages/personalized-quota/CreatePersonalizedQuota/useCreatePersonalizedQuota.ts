import { ChangeEvent, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

import { QueryResponse, ReactQueryResponse } from '../../../../types/Generics'

import {
  IAnimalitosByLottery,
  IAnimalitosLotteries,
  ISetAnimalQuota,
} from '../../../../types/Animalitos.types'

import axios from '../../../config/http-common'
import { enqueueSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import { getStoragePromoterId } from '../../../helpers/localstorage.helper'

const isNumber = (value: string) => {
  // create regex to check if string is a number
  const regex = /^[0-9]+$/
  // test the value passed in against the regex
  return regex.test(value)
}
export const useCreatePersonalizedQuota = () => {
  const { lotteryId = 0, animalId = 0 } = useParams()

  const [selectedLottery, setSelectedLottery] = useState<number>(Number(lotteryId))
  const [currentSelectedLottery, setCurrentSelectedLottery] = useState<number>(0)
  const [selectedAnimal, setSelectedAnimal] = useState<number>(Number(animalId))

  const [quotaUsd, setQuotaUsd] = useState<string>('')
  const [quotaVes, setQuotaVes] = useState<string>('')

  const resetState = () => {
    setSelectedLottery(0)
    setSelectedAnimal(0)
    setCurrentSelectedLottery(0)
    setQuotaUsd('')
    setQuotaVes('')
    removeAnimalitos()
  }
  const onChangeLottery = (value: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLottery(Number(value.target.value))
  }

  const onChangeAnimal = (value: ChangeEvent<HTMLSelectElement>) => {
    setSelectedAnimal(Number(value.target.value))
  }

  const onChangeQuotaUsd = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value === '') {
      setQuotaUsd('')
    }
    if (isNumber(value)) {
      setQuotaUsd(value)
    }
  }

  const onChangeQuotaVes = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value === '') {
      setQuotaVes('')
    }

    if (isNumber(value)) {
      setQuotaVes(value)
    }
  }

  const saveAnimalQuota = () => {
    const body: ISetAnimalQuota = {
      animalitosAnimalId: overallAnimalQuota.animalId,
      animalitosLotteryId: selectedLottery,
      animalitosOverallBetUsdValue: Number(quotaUsd),
      animalitosOverallBetVesValue: Number(quotaVes),
    }

    setAnimalQuota(body)
  }

  const { isFetching, data: lotteries } = useQuery<ReactQueryResponse<IAnimalitosLotteries[]>>(
    'get-all-lotteries',
    async () => {
      return await axios.get(`/Lottery/get-lottery-by-game-type/gameType/Animalitos`)
    },
  )

  const {
    isFetching: isFetchingAnimalitos,
    data: animalitos,
    refetch: getAnimalitosByLottery,
    remove: removeAnimalitos,
  } = useQuery<ReactQueryResponse<IAnimalitosByLottery[]>>(
    'get-animalitos-by-lottery',
    async () => {
      return await axios.get(
        `/AnimalitosMaxOverallBet/get-animalitos-lottery-animals/lotteryId/${selectedLottery}/promoterId/${getStoragePromoterId()}`,
      )
    },

    {
      refetchOnWindowFocus: false,
      enabled: false,
    },
  )

  const {
    mutate: setAnimalQuota,
    isLoading: isInsertingQuota,
  } = useMutation<AxiosResponse<QueryResponse<string>>, AxiosResponse<QueryResponse<string>>, ISetAnimalQuota>({
    mutationFn: async (body) => {
      return await axios.post(`/AnimalitosMaxOverallBet/insert-animalitos-max-overall/promoterId/${getStoragePromoterId()}`, body)
    },
    onSuccess(response) {
      enqueueSnackbar(response.data.message, {
        variant: 'success',
        hideIconVariant: true,
      })
      resetState()
    },
    onError() {
      enqueueSnackbar(
        'Se ha presentado un error, por favor recargue la página o consulte con el administrador.',
        {
          variant: 'error',
          hideIconVariant: true,
        },
      )
    },
  })

  const mappedAnimalitosByLottery =
    animalitos?.data?.response[0]?.animalDetails.map((animalDetail) => ({
      animalId: animalDetail.animalId,
      animalName: animalDetail.animalName,
      overallQuotaUsd: animalDetail.animalitosOverallBetUsdValue,
      overallQuotaVes: animalDetail.animalitosOverallBetVesValue,
    })) ?? []

  const overallAnimalQuota = mappedAnimalitosByLottery.find(
    (animal) => animal.animalId === selectedAnimal,
  ) ?? {
    animalId: 0,
    animalName: '',
    overallQuotaUsd: null,
    overallQuotaVes: null,
  }

  useEffect(() => {
    if (selectedLottery > 0 && selectedLottery !== currentSelectedLottery) {
      getAnimalitosByLottery()
      setCurrentSelectedLottery(selectedLottery)
      if (animalId && currentSelectedLottery === 0) {
        setSelectedAnimal(Number(animalId))
      } else {
        setSelectedAnimal(0)
      }
    }
  }, [selectedLottery])

  useEffect(() => {
    if (selectedAnimal > 0 && overallAnimalQuota.animalId > 0) {
      setQuotaUsd(String(overallAnimalQuota.overallQuotaUsd ?? 0))
      setQuotaVes(String(overallAnimalQuota.overallQuotaVes ?? 0))
    }
  }, [selectedAnimal, animalitos])

  useEffect(() => {
    return () => {
      resetState()
    }
  }, [])

  return {
    lotteryData: lotteries ? lotteries?.data?.response : [],
    isFetching: isFetching || isFetchingAnimalitos,
    animalitosData: animalitos ? animalitos?.data?.response : [],
    selectedLottery,
    selectedAnimal,
    onChangeLottery,
    mappedAnimalitosByLottery,
    overallAnimalQuota,
    onChangeAnimal,
    onChangeQuotaUsd,
    onChangeQuotaVes,
    quotaUsd,
    quotaVes,
    saveAnimalQuota,
    isInsertingQuota,
  }
}
