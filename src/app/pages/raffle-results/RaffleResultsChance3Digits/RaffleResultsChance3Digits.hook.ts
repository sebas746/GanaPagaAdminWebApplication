import {useMutation, useQuery, useQueryClient} from 'react-query'
import axios from '../../../config/http-common'
import {useEffect, useReducer, useState} from 'react'
import {
  AddRaffleChance3DigitsResultBody,
  IChance3DigitsLotteries,
  IRaffleResultChance3DigitsDetail,
  IRaffleResultChance3DigitsResponse,
} from '../../../../types/Chance3Digits.types'
import {QueryResponse, ReactQueryResponse} from '../../../../types/Generics'
import {RaffleResultsForm} from '../../../../types/Forms.types'
import {DateTime} from 'luxon'
import raffleResultForm from '../../../components/Forms/RaffleResultForm/RaffleResultForm'
import {batch} from '@preact/signals-react'
import {enqueueSnackbar} from 'notistack'
import {useAuth} from 'oidc-react'

enum RaffleResultsChance3DigitsKind {
  SET_CHANCE3DIGITS_LOTTERIES = 'SET_CHANCE3DIGITS_LOTTERIES',
  SET_IS_LOADING_CHANCE3DIGITS_LOTTERIES = 'SET_IS_LOADING_CHANCE3DIGITS_LOTTERIES',
  SET_RAFFLE_FORM = 'SET_RAFFLE_FORM',
  SET_SELECTED_TAB = 'SET_SELECTED_TAB',
  SET_RAFFLE_RESULTS_BY_LOTTERY = 'SET_RAFFLE_RESULTS_BY_LOTTERY',
}

interface RaffleResultsChance3DigitsAction {
  type: RaffleResultsChance3DigitsKind
  payload:
    | IChance3DigitsLotteries[]
    | boolean
    | RaffleResultsForm
    | number
    | IRaffleResultChance3DigitsResponse[]
}

interface RaffleResultsChance3DigitsState {
  Chance3DigitsLotteries: IChance3DigitsLotteries[]
  isLoadingChance3DigitsLotteries: boolean
  selectedTab: number
  raffleResultForm: RaffleResultsForm
  raffleResultsByLottery: IRaffleResultChance3DigitsResponse[]
}

export const raffleResultReducer = (
  state: RaffleResultsChance3DigitsState,
  action: RaffleResultsChance3DigitsAction
) => {
  switch (action.type) {
    case RaffleResultsChance3DigitsKind.SET_CHANCE3DIGITS_LOTTERIES:
      return {
        ...state,
        Chance3DigitsLotteries: action.payload as IChance3DigitsLotteries[],
      }
    case RaffleResultsChance3DigitsKind.SET_IS_LOADING_CHANCE3DIGITS_LOTTERIES:
      return {
        ...state,
        isLoadingChance3DigitsLotteries: action.payload as boolean,
      }
    case RaffleResultsChance3DigitsKind.SET_RAFFLE_FORM:
      return {
        ...state,
        raffleResultForm: action.payload as RaffleResultsForm,
      }
    case RaffleResultsChance3DigitsKind.SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payload as number,
      }
    case RaffleResultsChance3DigitsKind.SET_RAFFLE_RESULTS_BY_LOTTERY:
      return {
        ...state,
        raffleResultsByLottery: action.payload as IRaffleResultChance3DigitsResponse[],
      }

    default:
      return state
  }
}

export const useRaffleResultsChance3Digits = () => {
  const auth = useAuth()
  const [raffleResultState, dispatchRaffleResult] = useReducer(raffleResultReducer, {
    Chance3DigitsLotteries: [],
    isLoadingChance3DigitsLotteries: false,
    selectedTab: 1,
    raffleResultForm: {
      date: DateTime.now().toFormat('yyyy-MM-dd').toString(),
      raffleResultStateId: '',
    },
    raffleResultsByLottery: [],
  })

  const [createdBy, setCreatedBy] = useState(auth.userData?.profile.preferred_username)

  const {isFetching, refetch: getRaffleResultsByDateLottery} = useQuery<
    ReactQueryResponse<IRaffleResultChance3DigitsResponse[]>
  >(
    'get-raffle-results-by-lottery',
    async () => {
      dispatchRaffleResult({
        type: RaffleResultsChance3DigitsKind.SET_IS_LOADING_CHANCE3DIGITS_LOTTERIES,
        payload: true,
      })
      return await axios.get(
        `/Chance3DigitsRaffleResult/get-Chance3Digits-raffle-result/${
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
          type: RaffleResultsChance3DigitsKind.SET_IS_LOADING_CHANCE3DIGITS_LOTTERIES,
          payload: false,
        })
        dispatchRaffleResult({
          type: RaffleResultsChance3DigitsKind.SET_RAFFLE_RESULTS_BY_LOTTERY,
          payload: res.data.response,
        })
      },
      onError: (err) => {},
    }
  )

  const {mutate: addRaffleChance3DigitsResultMutation, isLoading: loadingAdd} = useMutation({
    mutationFn: async (body: AddRaffleChance3DigitsResultBody) => {
      return await axios.post('/Chance3DigitsRaffleResult/add-Chance3Digits-raffle-result', body)
    },
    onSuccess(data, variables, context) {
      handleSuccessResponse(data)
    },
    onError(error, variables, context) {
      handleErrorResponse()
    },
  })

  const {mutate: updateRaffleChance3DigitsResultMutation, isLoading: loadingUpdate} = useMutation({
    mutationFn: async (body: AddRaffleChance3DigitsResultBody) => {
      return await axios.put('/Chance3DigitsRaffleResult/update-Chance3Digits-raffle-result', body)
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

  const {mutate: approveRaffleChance3DigitsResultMutation, isLoading: loadingApprove} = useMutation(
    {
      mutationFn: async (body: AddRaffleChance3DigitsResultBody) => {
        return await axios.post(
          '/Chance3DigitsRaffleResult/approve-Chance3Digits-raffle-result',
          body
        )
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
      getRaffleResultsByDateLottery()
    }
  }

  const setSelectedTab = (tab: number) => {
    dispatchRaffleResult({
      type: RaffleResultsChance3DigitsKind.SET_SELECTED_TAB,
      payload: tab,
    })
  }

  const setRaffleResultForm = async (form: RaffleResultsForm) => {
    dispatchRaffleResult({
      type: RaffleResultsChance3DigitsKind.SET_RAFFLE_FORM,
      payload: form,
    })
  }

  useEffect(() => {
    if (!raffleResultState.isLoadingChance3DigitsLotteries) {
      getRaffleResultsByDateLottery()
    }
  }, [raffleResultState.raffleResultForm])

  const changeRaffleAnimalitoResult = async (
    raffleDetail: IRaffleResultChance3DigitsDetail,
    Chance3Digitselected: string
  ) => {
    try {
      switch (raffleDetail.Chance3DigitsRaffleStatus) {
        case 'PendingResult':
          await addRaffleChance3DigitsResultMutation({
            raffleId: Number(raffleDetail.Chance3DigitsRaffleId),
            raffleResultValue: Chance3Digitselected,
          })
          break
        case 'PendingApprove':
          if (Chance3Digitselected === raffleDetail.Chance3DigitsRaffleResultValue) {
            await approveRaffleChance3DigitsResultMutation({
              raffleId: Number(raffleDetail.Chance3DigitsRaffleId),
              raffleResultValue: Chance3Digitselected,
            })
          } else {
            await updateRaffleChance3DigitsResultMutation({
              raffleId: Number(raffleDetail.Chance3DigitsRaffleId),
              raffleResultValue: Chance3Digitselected,
            })
          }

          break
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    isLoading: isFetching,
    raffleResultState,
    setSelectedTab,
    setRaffleResultForm,
    changeRaffleAnimalitoResult,
    isLoadingState: loadingAdd || loadingApprove || loadingUpdate,
    createdBy,
  }
}
