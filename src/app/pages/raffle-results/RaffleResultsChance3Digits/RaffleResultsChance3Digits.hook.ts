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
import {enqueueSnackbar} from 'notistack'
import {useAuth} from 'oidc-react'
import {useChance3DigitsLotteries} from '../../../hooks/chance3DigitsLotteries.hook'

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
  chance3DigitsLotteries: IChance3DigitsLotteries[]
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
        chance3DigitsLotteries: action.payload as IChance3DigitsLotteries[],
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
  const {chance3DigitsLotteriesState} = useChance3DigitsLotteries()
  const [raffleResultState, dispatchRaffleResult] = useReducer(raffleResultReducer, {
    chance3DigitsLotteries: [],
    isLoadingChance3DigitsLotteries: false,
    selectedTab: 1,
    raffleResultForm: {
      date: DateTime.now().toFormat('yyyy-MM-dd').toString(),
      raffleResultStateId: '',
    },
    raffleResultsByLottery: [],
  })

  const [createdBy, setCreatedBy] = useState(auth.userData?.profile.preferred_username)

  const {isFetching, refetch: getChance3DigitsRaffleResultsByDateLottery} = useQuery<
    ReactQueryResponse<IRaffleResultChance3DigitsResponse[]>
  >(
    'get-chance-three-raffle-results-by-lottery',
    async () => {
      dispatchRaffleResult({
        type: RaffleResultsChance3DigitsKind.SET_IS_LOADING_CHANCE3DIGITS_LOTTERIES,
        payload: true,
      })
      return await axios.get(
        `/ChanceThreeRaffleResult/get-chance-three-raffle-result/${
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
      return await axios.post('/ChanceThreeRaffleResult/add-chance-three-raffle-result', body)
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
      return await axios.put('/ChanceThreeRaffleResult/update-chance-three-raffle-result', body)
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
        return await axios.post('/ChanceThreeRaffleResult/approve-chance-three-raffle-result', body)
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
      getChance3DigitsRaffleResultsByDateLottery()
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
      getChance3DigitsRaffleResultsByDateLottery()
    }
  }, [raffleResultState.raffleResultForm])

  const changeRaffleChance3DigitsResult = async (
    raffleDetail: IRaffleResultChance3DigitsDetail,
    chance3DigitsValue: string
  ) => {
    try {
      console.log(raffleDetail)
      console.log(chance3DigitsValue)
      switch (raffleDetail.chanceThreeRaffleStatus) {
        case 'PendingResult':
          await addRaffleChance3DigitsResultMutation({
            raffleId: Number(raffleDetail.chanceThreeRaffleId),
            raffleResultValue: chance3DigitsValue,
          })
          break
        case 'PendingApprove':
          if (chance3DigitsValue === raffleDetail.chanceThreeRaffleResultValue) {
            await approveRaffleChance3DigitsResultMutation({
              raffleId: Number(raffleDetail.chanceThreeRaffleId),
              raffleResultValue: chance3DigitsValue,
            })
          } else {
            await updateRaffleChance3DigitsResultMutation({
              raffleId: Number(raffleDetail.chanceThreeRaffleId),
              raffleResultValue: chance3DigitsValue,
            })
          }

          break
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    isLoadingChance3: isFetching || chance3DigitsLotteriesState.isLoadingChance3DigitsLotteries,
    chance3DigitsLotteriesState,
    raffleResultState,
    setSelectedTab,
    setRaffleResultForm,
    changeRaffleChance3DigitsResult,
    isLoadingStateChance3: loadingAdd || loadingApprove || loadingUpdate,
    createdBy,
  }
}
