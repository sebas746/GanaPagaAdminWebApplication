import {
  AddScrutinyChance3DigitsBody,
  IChance3DigitsLotteries,
  IRaffleResultChance3DigitsResponse,
  IRaffleScrutinyChance3DigitsResponse,
} from '../../../../types/Chance3Digits.types'
import {RaffleResultsForm} from '../../../../types/Forms.types'
import {useEffect, useReducer} from 'react'
import {DateTime} from 'luxon'
import {useMutation, useQuery} from 'react-query'
import {ReactQueryResponse} from '../../../../types/Generics'
import axios from '../../../config/http-common'

import {enqueueSnackbar} from 'notistack'
import {useChance3DigitsLotteries} from '../../../hooks/chance3DigitsLotteries.hook'
import {useNavigate} from 'react-router-dom'
import {gameType} from '../../../constants/game-type.constants'

enum ScrutinyChance3DigitsKind {
  SET_SCRUTINY_FORM = 'SET_SCRUTINY_FORM',
  SET_SCRUTINY_RESULTS = 'SET_SCRUTINY_RESULTS',
  SET_SCRUTINY_RESULTS_BY_LOTTERY = 'SET_SCRUTINY_RESULTS_BY_LOTTERY',
  SET_IS_LOADING_SCRUTINY_RESULTS = 'SET_IS_LOADING_SCRUTINY_RESULTS',
  SET_SELECTED_TAB = 'SET_SELECTED_TAB',
  SET_RAFFLE_ID_LOADING = 'SET_RAFFLE_ID_LOADING',
}

interface ScrutinyChance3DigitsAction {
  type: ScrutinyChance3DigitsKind
  payload:
    | IRaffleScrutinyChance3DigitsResponse[]
    | boolean
    | number
    | IChance3DigitsLotteries[]
    | RaffleResultsForm
}

interface ScrutinyChance3DigitsState {
  Chance3DigitsLotteries: IChance3DigitsLotteries[]
  isLoadingChance3DigitsLotteries: boolean
  selectedTab: number
  raffleResultForm: RaffleResultsForm
  raffleResultsByLottery: IRaffleScrutinyChance3DigitsResponse[]
  Chance3DigitsRaffleId: number
}

export const raffleResultReducer = (
  state: ScrutinyChance3DigitsState,
  action: ScrutinyChance3DigitsAction
) => {
  switch (action.type) {
    case ScrutinyChance3DigitsKind.SET_SCRUTINY_FORM:
      return {
        ...state,
        raffleResultForm: action.payload as RaffleResultsForm,
      }
    case ScrutinyChance3DigitsKind.SET_SCRUTINY_RESULTS:
      return {
        ...state,
        raffleResultsByLottery: action.payload as IRaffleScrutinyChance3DigitsResponse[],
      }
    case ScrutinyChance3DigitsKind.SET_SCRUTINY_RESULTS_BY_LOTTERY:
      return {
        ...state,
        raffleResultsByLottery: action.payload as IRaffleScrutinyChance3DigitsResponse[],
      }
    case ScrutinyChance3DigitsKind.SET_IS_LOADING_SCRUTINY_RESULTS:
      return {
        ...state,
        isLoadingChance3DigitsLotteries: action.payload as boolean,
      }
    case ScrutinyChance3DigitsKind.SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payload as number,
      }
    case ScrutinyChance3DigitsKind.SET_RAFFLE_ID_LOADING:
      return {
        ...state,
        Chance3DigitsRaffleId: action.payload as number,
      }
    default:
      return state
  }
}

export const useScrutinyChance3Digits = () => {
  const navigate = useNavigate()
  const [raffleScrutinyState, dispatchScrutinyChance3Digits] = useReducer(raffleResultReducer, {
    Chance3DigitsLotteries: [],
    isLoadingChance3DigitsLotteries: false,
    selectedTab: 1,
    raffleResultForm: {
      date: DateTime.now().toFormat('yyyy-MM-dd').toString(),
      raffleResultStateId: '',
    },
    raffleResultsByLottery: [],
    Chance3DigitsRaffleId: 0,
  })
  const {chance3DigitsLotteriesState} = useChance3DigitsLotteries()

  const {
    data: Chance3DigitsScrutinyData,
    isFetching,
    refetch: getChance3DigitsScrutiny,
  } = useQuery<ReactQueryResponse<IRaffleResultChance3DigitsResponse[]>>(
    'get-chance-three-scrutiny-results',
    async () => {
      return await axios.get(
        `/ChanceThreeScrutiny/get-chance-three-raffle-scrutiny/${
          raffleScrutinyState.raffleResultForm.date
        }${
          raffleScrutinyState.raffleResultForm.raffleResultStateId
            ? '/' + raffleScrutinyState.raffleResultForm.raffleResultStateId
            : ''
        }`
      )
    }
  )

  const {mutate: addRaffleScrutinyChance3DigitsMutation, isLoading: loadingAdd} = useMutation({
    mutationFn: async (body: AddScrutinyChance3DigitsBody) => {
      setRaffleIdLoading(body.raffleId)
      return await axios.post('/ChanceThreeScrutiny/add-chance-three-scrutiny', body)
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
    }
    getChance3DigitsScrutiny()
  }

  useEffect(() => {
    if (!isFetching && Chance3DigitsScrutinyData) {
      setScrutinyResults(Chance3DigitsScrutinyData?.data.response)
    }
  }, [isFetching, Chance3DigitsScrutinyData])

  useEffect(() => {
    if (raffleScrutinyState.raffleResultForm.date) {
      getChance3DigitsScrutiny()
    }
  }, [raffleScrutinyState.raffleResultForm])

  const setRaffleIdLoading = (payload: number) => {
    dispatchScrutinyChance3Digits({
      type: ScrutinyChance3DigitsKind.SET_RAFFLE_ID_LOADING,
      payload,
    })
  }

  const setScrutinyForm = (payload: RaffleResultsForm) => {
    dispatchScrutinyChance3Digits({
      type: ScrutinyChance3DigitsKind.SET_SCRUTINY_FORM,
      payload,
    })
  }

  const setScrutinyResults = (payload: IRaffleScrutinyChance3DigitsResponse[]) => {
    dispatchScrutinyChance3Digits({
      type: ScrutinyChance3DigitsKind.SET_SCRUTINY_RESULTS,
      payload,
    })
  }

  const setScrutinyResultsByLottery = (payload: IRaffleScrutinyChance3DigitsResponse[]) => {
    dispatchScrutinyChance3Digits({
      type: ScrutinyChance3DigitsKind.SET_SCRUTINY_RESULTS_BY_LOTTERY,
      payload,
    })
  }

  const setIsLoadingScrutinyResults = (payload: boolean) => {
    dispatchScrutinyChance3Digits({
      type: ScrutinyChance3DigitsKind.SET_IS_LOADING_SCRUTINY_RESULTS,
      payload,
    })
  }

  const setSelectedTab = (payload: number) => {
    dispatchScrutinyChance3Digits({
      type: ScrutinyChance3DigitsKind.SET_SELECTED_TAB,
      payload,
    })
  }

  const addRaffleScrutinyChance3Digits = (raffleId: number) => {
    addRaffleScrutinyChance3DigitsMutation({raffleId})
  }

  const onClickScrutinyChance3DigitsDetail = (raffleId: number) => {
    navigate('../scrutiny-detail', {
      replace: true,
      state: {raffleId: raffleId, gameType: gameType.chance3Digits},
    })
  }

  return {
    isLoading: chance3DigitsLotteriesState.isLoadingChance3DigitsLotteries || isFetching,
    chance3DigitsLotteries: chance3DigitsLotteriesState.chance3DigitsLotteries,
    hasError: chance3DigitsLotteriesState.hasErrorChance3Digits,
    raffleScrutinyState,
    setScrutinyForm,
    setScrutinyResults,
    setScrutinyResultsByLottery,
    setIsLoadingScrutinyResults,
    setSelectedTab,
    addRaffleScrutinyChance3Digits,
    loadingAdd,
    onClickScrutinyChance3DigitsDetail,
  }
}
