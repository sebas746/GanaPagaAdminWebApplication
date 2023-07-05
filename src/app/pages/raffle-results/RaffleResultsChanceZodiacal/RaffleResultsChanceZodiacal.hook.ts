import {useMutation, useQuery, useQueryClient} from 'react-query'
import axios from '../../../config/http-common'
import {useEffect, useReducer, useState} from 'react'
import {
  AddRaffleChanceZodiacResultBody,
  IChanceZodiacLotteries,
  IRaffleResultChanceZodiacDetail,
  IRaffleResultChanceZodiacResponse,
} from '../../../../types/ChanceZodiac.types'
import {QueryResponse, ReactQueryResponse} from '../../../../types/Generics'
import {RaffleResultsForm} from '../../../../types/Forms.types'
import {DateTime} from 'luxon'
import {batch} from '@preact/signals-react'
import {enqueueSnackbar} from 'notistack'
import {useAuth} from 'oidc-react'
import {useChanceZodiacLotteries} from '../../../hooks/chanceZodiacLotteries.hook'

enum RaffleResultsChanceZodiacKind {
  SET_ChanceZodiac_LOTTERIES = 'SET_ChanceZodiac_LOTTERIES',
  SET_IS_LOADING_ChanceZodiac_LOTTERIES = 'SET_IS_LOADING_ChanceZodiac_LOTTERIES',
  SET_RAFFLE_FORM = 'SET_RAFFLE_FORM',
  SET_SELECTED_TAB = 'SET_SELECTED_TAB',
  SET_RAFFLE_RESULTS_BY_LOTTERY = 'SET_RAFFLE_RESULTS_BY_LOTTERY',
}

interface RaffleResultsChanceZodiacAction {
  type: RaffleResultsChanceZodiacKind
  payload:
    | IChanceZodiacLotteries[]
    | boolean
    | RaffleResultsForm
    | number
    | IRaffleResultChanceZodiacResponse[]
}

interface RaffleResultsChanceZodiacState {
  chanceZodiacLotteries: IChanceZodiacLotteries[]
  isLoadingChanceZodiacLotteries: boolean
  selectedTab: number
  raffleResultForm: RaffleResultsForm
  raffleResultsByLottery: IRaffleResultChanceZodiacResponse[]
}

export const raffleResultReducer = (
  state: RaffleResultsChanceZodiacState,
  action: RaffleResultsChanceZodiacAction
) => {
  switch (action.type) {
    case RaffleResultsChanceZodiacKind.SET_ChanceZodiac_LOTTERIES:
      return {
        ...state,
        chanceZodiacLotteries: action.payload as IChanceZodiacLotteries[],
      }
    case RaffleResultsChanceZodiacKind.SET_IS_LOADING_ChanceZodiac_LOTTERIES:
      return {
        ...state,
        isLoadingChanceZodiacLotteries: action.payload as boolean,
      }
    case RaffleResultsChanceZodiacKind.SET_RAFFLE_FORM:
      return {
        ...state,
        raffleResultForm: action.payload as RaffleResultsForm,
      }
    case RaffleResultsChanceZodiacKind.SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payload as number,
      }
    case RaffleResultsChanceZodiacKind.SET_RAFFLE_RESULTS_BY_LOTTERY:
      return {
        ...state,
        raffleResultsByLottery: action.payload as IRaffleResultChanceZodiacResponse[],
      }

    default:
      return state
  }
}

export const useRaffleResultsChanceZodiac = () => {
  const auth = useAuth()
  const {chanceZodiacLotteriesState} = useChanceZodiacLotteries()
  const [raffleResultState, dispatchRaffleResult] = useReducer(raffleResultReducer, {
    chanceZodiacLotteries: [],
    isLoadingChanceZodiacLotteries: false,
    selectedTab: 1,
    raffleResultForm: {
      date: DateTime.now().toFormat('yyyy-MM-dd').toString(),
      raffleResultStateId: '',
    },
    raffleResultsByLottery: [],
  })

  const [createdBy, setCreatedBy] = useState(auth.userData?.profile.preferred_username)

  const {isFetching, refetch: getChanceZodiacRaffleResultsByDateLottery} = useQuery<
    ReactQueryResponse<IRaffleResultChanceZodiacResponse[]>
  >(
    'get-chance-Zodiac-raffle-results-by-lottery',
    async () => {
      dispatchRaffleResult({
        type: RaffleResultsChanceZodiacKind.SET_IS_LOADING_ChanceZodiac_LOTTERIES,
        payload: true,
      })
      return await axios.get(
        `/ChanceZodiacRaffleResult/get-chance-zodiac-raffle-result/${
          raffleResultState.raffleResultForm.date
        }${
          raffleResultState.raffleResultForm.raffleResultStateId
            ? '/' + raffleResultState.raffleResultForm.raffleResultStateId
            : ''
        }`
      )
    },
    {
      onSuccess: (res) => {
        dispatchRaffleResult({
          type: RaffleResultsChanceZodiacKind.SET_IS_LOADING_ChanceZodiac_LOTTERIES,
          payload: false,
        })
        dispatchRaffleResult({
          type: RaffleResultsChanceZodiacKind.SET_RAFFLE_RESULTS_BY_LOTTERY,
          payload: res.data.response,
        })
      },
      onError: (err) => {},
    }
  )

  const {mutate: addRaffleChanceZodiacResultMutation, isLoading: loadingAdd} = useMutation({
    mutationFn: async (body: AddRaffleChanceZodiacResultBody) => {
      return await axios.post('/chanceZodiacRaffleResult/add-chance-Zodiac-raffle-result', body)
    },
    onSuccess(data, variables, context) {
      handleSuccessResponse(data)
    },
    onError(error, variables, context) {
      handleErrorResponse()
    },
  })

  const {mutate: updateRaffleChanceZodiacResultMutation, isLoading: loadingUpdate} = useMutation({
    mutationFn: async (body: AddRaffleChanceZodiacResultBody) => {
      return await axios.put('/chanceZodiacRaffleResult/update-chance-Zodiac-raffle-result', body)
    },
    onSuccess(data, variables, context) {
      handleSuccessResponse(data)
    },
    onError(error, variables, context) {
      handleErrorResponse()
    },
  })

  const handleErrorResponse = () => {
    enqueueSnackbar(
      'Se ha presentado un error, por favor recargue la página o consulte con el administrador.',
      {
        variant: 'error',
        hideIconVariant: true,
      }
    )
  }

  const {mutate: approveRaffleChanceZodiacResultMutation, isLoading: loadingApprove} = useMutation({
    mutationFn: async (body: AddRaffleChanceZodiacResultBody) => {
      return await axios.post('/chanceZodiacRaffleResult/approve-chance-Zodiac-raffle-result', body)
    },
    onSuccess(data, variables, context) {
      handleSuccessResponse(data)
    },
    onError(error, variables, context) {
      handleErrorResponse()
    },
  })

  const handleSuccessResponse = (data: any) => {
    if (!data.data.success && data.data.errors[0]) {
      data.data.errors[0].errorList.forEach((errorDetail: any) => {
        enqueueSnackbar(errorDetail.description, {
          variant: 'error',
          hideIconVariant: true,
        })
      })
    } else {
      enqueueSnackbar(data.data.message, {
        variant: 'success',
        hideIconVariant: true,
      })
      getChanceZodiacRaffleResultsByDateLottery()
    }
  }

  const setSelectedTab = (tab: number) => {
    dispatchRaffleResult({
      type: RaffleResultsChanceZodiacKind.SET_SELECTED_TAB,
      payload: tab,
    })
  }

  const setRaffleResultForm = async (form: RaffleResultsForm) => {
    dispatchRaffleResult({
      type: RaffleResultsChanceZodiacKind.SET_RAFFLE_FORM,
      payload: form,
    })
  }

  useEffect(() => {
    if (!raffleResultState.isLoadingChanceZodiacLotteries) {
      getChanceZodiacRaffleResultsByDateLottery()
    }
  }, [raffleResultState.raffleResultForm])

  const changeRaffleChanceZodiacResult = async (
    raffleDetail: IRaffleResultChanceZodiacDetail,
    ChanceZodiacValue: string
  ) => {
    try {
      switch (raffleDetail.chanceZodiacRaffleStatus) {
        case 'PendingResult':
          await addRaffleChanceZodiacResultMutation({
            raffleId: Number(raffleDetail.chanceZodiacRaffleId),
            raffleResultValue: ChanceZodiacValue,
          })
          break
        case 'PendingApprove':
          if (ChanceZodiacValue === raffleDetail.chanceZodiacRaffleResultValue) {
            await approveRaffleChanceZodiacResultMutation({
              raffleId: Number(raffleDetail.chanceZodiacRaffleId),
              raffleResultValue: ChanceZodiacValue,
            })
          } else {
            await updateRaffleChanceZodiacResultMutation({
              raffleId: Number(raffleDetail.chanceZodiacRaffleId),
              raffleResultValue: ChanceZodiacValue,
            })
          }

          break
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    isLoadingChanceZodiac: isFetching || chanceZodiacLotteriesState.isLoadingChanceZodiacLotteries,
    chanceZodiacLotteriesState,
    raffleResultState,
    setSelectedTab,
    setRaffleResultForm,
    changeRaffleChanceZodiacResult,
    isLoadingStateChanceZodiac: loadingAdd || loadingApprove || loadingUpdate,
    createdBy,
  }
}
