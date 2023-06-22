import {useMutation, useQuery, useQueryClient} from 'react-query'
import axios from '../../../config/http-common'
import {useEffect, useReducer, useState} from 'react'
import {
  AddRaffleAnimalitosResultBody,
  IAnimalitosLotteries,
  IRaffleResultAnimalitosDetail,
  IRaffleResultAnimalitosResponse,
} from '../../../../types/Animalitos.types'
import {QueryResponse, ReactQueryResponse} from '../../../../types/Generics'
import {RaffleResultsForm} from '../../../../types/Forms.types'
import {DateTime} from 'luxon'
import raffleResultForm from '../../../components/Forms/RaffleResultForm/RaffleResultForm'
import {batch} from '@preact/signals-react'

enum RaffleResultsAnimalitosKind {
  SET_ANIMALITOS_LOTTERIES = 'SET_ANIMALITOS_LOTTERIES',
  SET_IS_LOADING_ANIMALITOS_LOTTERIES = 'SET_IS_LOADING_ANIMALITOS_LOTTERIES',
  SET_RAFFLE_FORM = 'SET_RAFFLE_FORM',
  SET_SELECTED_TAB = 'SET_SELECTED_TAB',
  SET_RAFFLE_RESULTS_BY_LOTTERY = 'SET_RAFFLE_RESULTS_BY_LOTTERY',
}

interface RaffleResultsAnimalitosAction {
  type: RaffleResultsAnimalitosKind
  payload:
    | IAnimalitosLotteries[]
    | boolean
    | RaffleResultsForm
    | number
    | IRaffleResultAnimalitosResponse[]
}

interface RaffleResultsAnimalitosState {
  animalitosLotteries: IAnimalitosLotteries[]
  isLoadingAnimalitosLotteries: boolean
  selectedTab: number
  raffleResultForm: RaffleResultsForm
  raffleResultsByLottery: IRaffleResultAnimalitosResponse[]
}

export const raffleResultReducer = (
  state: RaffleResultsAnimalitosState,
  action: RaffleResultsAnimalitosAction
) => {
  switch (action.type) {
    case RaffleResultsAnimalitosKind.SET_ANIMALITOS_LOTTERIES:
      return {
        ...state,
        animalitosLotteries: action.payload as IAnimalitosLotteries[],
      }
    case RaffleResultsAnimalitosKind.SET_IS_LOADING_ANIMALITOS_LOTTERIES:
      return {
        ...state,
        isLoadingAnimalitosLotteries: action.payload as boolean,
      }
    case RaffleResultsAnimalitosKind.SET_RAFFLE_FORM:
      return {
        ...state,
        raffleResultForm: action.payload as RaffleResultsForm,
      }
    case RaffleResultsAnimalitosKind.SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payload as number,
      }
    case RaffleResultsAnimalitosKind.SET_RAFFLE_RESULTS_BY_LOTTERY:
      return {
        ...state,
        raffleResultsByLottery: action.payload as IRaffleResultAnimalitosResponse[],
      }

    default:
      return state
  }
}

export const useRaffleResultsAnimalitos = () => {
  const [raffleResultState, dispatchRaffleResult] = useReducer(raffleResultReducer, {
    animalitosLotteries: [],
    isLoadingAnimalitosLotteries: false,
    selectedTab: 1,
    raffleResultForm: {
      date: DateTime.now().toFormat('yyyy-MM-dd').toString(),
      raffleResultStateId: '1',
    },
    raffleResultsByLottery: [],
  })

  const {isLoading: isLoadingAnimalitosLotteries, refetch: getAnimalitosLotteries} = useQuery<
    ReactQueryResponse<IAnimalitosLotteries[]>
  >(
    'get-animalitos-lotteries',
    async () => {
      dispatchRaffleResult({
        type: RaffleResultsAnimalitosKind.SET_IS_LOADING_ANIMALITOS_LOTTERIES,
        payload: true,
      })
      return await axios.get('/Lottery/get-lottery-by-game-type/gameType/Animalitos')
    },
    {
      onSuccess: (res) => {
        dispatchRaffleResult({
          type: RaffleResultsAnimalitosKind.SET_IS_LOADING_ANIMALITOS_LOTTERIES,
          payload: false,
        })
        dispatchRaffleResult({
          type: RaffleResultsAnimalitosKind.SET_ANIMALITOS_LOTTERIES,
          payload: res.data.response,
        })
      },
      onError: (err) => {},
    }
  )

  const {isFetching, refetch: getRaffleResultsByDateLottery} = useQuery<
    ReactQueryResponse<IRaffleResultAnimalitosResponse[]>
  >(
    'get-raffle-results-by-lottery',
    async () => {
      dispatchRaffleResult({
        type: RaffleResultsAnimalitosKind.SET_IS_LOADING_ANIMALITOS_LOTTERIES,
        payload: true,
      })
      return await axios.get(
        `/AnimalitosRaffleResult/get-animalitos-raffle-result/${raffleResultState.raffleResultForm.date}`
      )
    },
    {
      onSuccess: (res) => {
        dispatchRaffleResult({
          type: RaffleResultsAnimalitosKind.SET_IS_LOADING_ANIMALITOS_LOTTERIES,
          payload: false,
        })
        dispatchRaffleResult({
          type: RaffleResultsAnimalitosKind.SET_RAFFLE_RESULTS_BY_LOTTERY,
          payload: res.data.response,
        })
      },
      onError: (err) => {},
    }
  )

  const {mutate: addRaffleAnimalitosResultMutation} = useMutation({
    mutationFn: async (body: AddRaffleAnimalitosResultBody) => {
      return await axios.post('/AnimalitosRaffleResult/add-animalitos-raffle-result', body)
    },
  })

  const setSelectedTab = (tab: number) => {
    dispatchRaffleResult({
      type: RaffleResultsAnimalitosKind.SET_SELECTED_TAB,
      payload: tab,
    })
  }

  const setRaffleResultForm = async (form: RaffleResultsForm) => {
    dispatchRaffleResult({
      type: RaffleResultsAnimalitosKind.SET_RAFFLE_FORM,
      payload: form,
    })
  }

  useEffect(() => {
    if (!raffleResultState.isLoadingAnimalitosLotteries) {
      getRaffleResultsByDateLottery()
    }
  }, [raffleResultState.raffleResultForm])

  const changeRaffleAnimalitoResult = async (
    raffleDetail: IRaffleResultAnimalitosDetail,
    animalitoSelected: string
  ) => {
    try {
      const algo = await addRaffleAnimalitosResultMutation({
        raffleId: Number(raffleDetail.animalitosRaffleId),
        raffleResultCreatedBy: 'rarango',
        raffleResultValue: animalitoSelected,
      })
      debugger

      const raffleResultLottery = raffleResultState.raffleResultsByLottery.map((raffle) => {
        debugger
        const raffleResult = raffle.raffleResultDetailResponse.map((raffleDetailResponse) => {
          if (raffleDetailResponse.animalitosRaffleId === raffleDetail.animalitosRaffleId) {
            return {
              ...raffleDetailResponse,
              animalitosRaffleResultValue: animalitoSelected,
            }
            return raffleDetail
          }
        })
        return raffleResult
      })
      const newRaffleResultLottery = {
        ...raffleResultState.raffleResultsByLottery,
        animalitosRaffleStatus: 'PendingApprove',
        raffleResultDetailResponse: raffleResultLottery,
      }
      dispatchRaffleResult({
        type: RaffleResultsAnimalitosKind.SET_RAFFLE_RESULTS_BY_LOTTERY,
        payload: newRaffleResultLottery,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return {
    isLoading: isFetching || isLoadingAnimalitosLotteries,
    raffleResultState,
    setSelectedTab,
    setRaffleResultForm,
    changeRaffleAnimalitoResult,
  }
}
