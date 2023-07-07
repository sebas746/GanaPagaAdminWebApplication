import {useMutation, useQuery, useQueryClient} from 'react-query'
import axios from '../../../config/http-common'
import {useEffect, useReducer, useState} from 'react'
import {
  AddRaffleChance4DigitsResultBody,
  IChance4DigitsLotteries,
  IRaffleResultChance4DigitsDetail,
  IRaffleResultChance4DigitsResponse,
} from '../../../../types/Chance4Digits.types'
import {QueryResponse, ReactQueryResponse} from '../../../../types/Generics'
import {RaffleResultsForm} from '../../../../types/Forms.types'
import {DateTime} from 'luxon'
import {batch} from '@preact/signals-react'
import {enqueueSnackbar} from 'notistack'
import {useAuth} from 'oidc-react'
import {useChance4DigitsLotteries} from '../../../hooks/chance4DigitsLotteries.hook'

enum RaffleResultsChance4DigitsKind {
  SET_CHANCE4DIGITS_LOTTERIES = 'SET_CHANCE4DIGITS_LOTTERIES',
  SET_IS_LOADING_Chance4Digits_LOTTERIES = 'SET_IS_LOADING_Chance4Digits_LOTTERIES',
  SET_RAFFLE_FORM = 'SET_RAFFLE_FORM',
  SET_SELECTED_TAB = 'SET_SELECTED_TAB',
  SET_RAFFLE_RESULTS_BY_LOTTERY = 'SET_RAFFLE_RESULTS_BY_LOTTERY',
}

interface RaffleResultsChance4DigitsAction {
  type: RaffleResultsChance4DigitsKind
  payload:
    | IChance4DigitsLotteries[]
    | boolean
    | RaffleResultsForm
    | number
    | IRaffleResultChance4DigitsResponse[]
}

interface RaffleResultsChance4DigitsState {
  chance4DigitsLotteries: IChance4DigitsLotteries[]
  isLoadingChance4DigitsLotteries: boolean
  selectedTab: number
  raffleResultForm: RaffleResultsForm
  raffleResultsByLottery: IRaffleResultChance4DigitsResponse[]
}

export const raffleResultReducer = (
  state: RaffleResultsChance4DigitsState,
  action: RaffleResultsChance4DigitsAction
) => {
  switch (action.type) {
    case RaffleResultsChance4DigitsKind.SET_CHANCE4DIGITS_LOTTERIES:
      return {
        ...state,
        chance4DigitsLotteries: action.payload as IChance4DigitsLotteries[],
      }
    case RaffleResultsChance4DigitsKind.SET_IS_LOADING_Chance4Digits_LOTTERIES:
      return {
        ...state,
        isLoadingChance4DigitsLotteries: action.payload as boolean,
      }
    case RaffleResultsChance4DigitsKind.SET_RAFFLE_FORM:
      return {
        ...state,
        raffleResultForm: action.payload as RaffleResultsForm,
      }
    case RaffleResultsChance4DigitsKind.SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payload as number,
      }
    case RaffleResultsChance4DigitsKind.SET_RAFFLE_RESULTS_BY_LOTTERY:
      return {
        ...state,
        raffleResultsByLottery: action.payload as IRaffleResultChance4DigitsResponse[],
      }

    default:
      return state
  }
}

export const useRaffleResultsChance4Digits = () => {
  const auth = useAuth()
  const {chance4DigitsLotteriesState} = useChance4DigitsLotteries()
  const [raffleResultState, dispatchRaffleResult] = useReducer(raffleResultReducer, {
    chance4DigitsLotteries: [],
    isLoadingChance4DigitsLotteries: false,
    selectedTab: 1,
    raffleResultForm: {
      date: DateTime.now().toFormat('yyyy-MM-dd').toString(),
      raffleResultStateId: '',
    },
    raffleResultsByLottery: [],
  })

  const [createdBy, setCreatedBy] = useState(auth.userData?.profile.preferred_username)

  const {isFetching, refetch: getChance4DigitsRaffleResultsByDateLottery} = useQuery<
    ReactQueryResponse<IRaffleResultChance4DigitsResponse[]>
  >(
    'get-chance-four-raffle-results-by-lottery',
    async () => {
      dispatchRaffleResult({
        type: RaffleResultsChance4DigitsKind.SET_IS_LOADING_Chance4Digits_LOTTERIES,
        payload: true,
      })
      return await axios.get(
        `/chanceFourRaffleResult/get-chance-four-raffle-result/${
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
          type: RaffleResultsChance4DigitsKind.SET_IS_LOADING_Chance4Digits_LOTTERIES,
          payload: false,
        })
        dispatchRaffleResult({
          type: RaffleResultsChance4DigitsKind.SET_RAFFLE_RESULTS_BY_LOTTERY,
          payload: res.data.response,
        })
      },
      onError: (err) => {},
    }
  )

  const {mutate: addRaffleChance4DigitsResultMutation, isLoading: loadingAdd} = useMutation({
    mutationFn: async (body: AddRaffleChance4DigitsResultBody) => {
      return await axios.post('/chanceFourRaffleResult/add-chance-four-raffle-result', body)
    },
    onSuccess(data, variables, context) {
      handleSuccessResponse(data)
    },
    onError(error, variables, context) {
      handleErrorResponse()
    },
  })

  const {mutate: updateRaffleChance4DigitsResultMutation, isLoading: loadingUpdate} = useMutation({
    mutationFn: async (body: AddRaffleChance4DigitsResultBody) => {
      return await axios.put('/chanceFourRaffleResult/update-chance-four-raffle-result', body)
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

  const {mutate: approveRaffleChance4DigitsResultMutation, isLoading: loadingApprove} = useMutation(
    {
      mutationFn: async (body: AddRaffleChance4DigitsResultBody) => {
        return await axios.post('/chanceFourRaffleResult/approve-chance-four-raffle-result', body)
      },
      onSuccess(data, variables, context) {
        handleSuccessResponse(data)
      },
      onError(error, variables, context) {
        handleErrorResponse()
      },
    }
  )

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
      getChance4DigitsRaffleResultsByDateLottery()
    }
  }

  const setSelectedTab = (tab: number) => {
    dispatchRaffleResult({
      type: RaffleResultsChance4DigitsKind.SET_SELECTED_TAB,
      payload: tab,
    })
  }

  const setRaffleResultForm = async (form: RaffleResultsForm) => {
    dispatchRaffleResult({
      type: RaffleResultsChance4DigitsKind.SET_RAFFLE_FORM,
      payload: form,
    })
  }

  useEffect(() => {
    if (!raffleResultState.isLoadingChance4DigitsLotteries) {
      getChance4DigitsRaffleResultsByDateLottery()
    }
  }, [raffleResultState.raffleResultForm])

  const changeRaffleChance4DigitsResult = async (
    raffleDetail: IRaffleResultChance4DigitsDetail,
    Chance4DigitsValue: string
  ) => {
    try {
      switch (raffleDetail.chanceFourRaffleStatus) {
        case 'PendingResult':
          await addRaffleChance4DigitsResultMutation({
            raffleId: Number(raffleDetail.chanceFourRaffleId),
            raffleResultValue: Chance4DigitsValue,
          })
          break
        case 'PendingApprove':
          if (Chance4DigitsValue === raffleDetail.chanceFourRaffleResultValue) {
            await approveRaffleChance4DigitsResultMutation({
              raffleId: Number(raffleDetail.chanceFourRaffleId),
              raffleResultValue: Chance4DigitsValue,
            })
          } else {
            await updateRaffleChance4DigitsResultMutation({
              raffleId: Number(raffleDetail.chanceFourRaffleId),
              raffleResultValue: Chance4DigitsValue,
            })
          }

          break
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    isLoadingChance4: isFetching || chance4DigitsLotteriesState.isLoadingchance4DigitsLotteries,
    chance4DigitsLotteriesState,
    raffleResultState,
    setSelectedTab,
    setRaffleResultForm,
    changeRaffleChance4DigitsResult,
    isLoadingStateChance4: loadingAdd || loadingApprove || loadingUpdate,
    createdBy,
  }
}
