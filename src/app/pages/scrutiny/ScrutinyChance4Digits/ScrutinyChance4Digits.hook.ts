import {
  AddScrutinyChance4DigitsBody,
  IChance4DigitsLotteries,
  IRaffleResultChance4DigitsResponse,
  IRaffleScrutinyChance4DigitsResponse,
} from '../../../../types/Chance4Digits.types'
import {RaffleResultsForm} from '../../../../types/Forms.types'
import {useEffect, useReducer} from 'react'
import {DateTime} from 'luxon'
import {useMutation, useQuery} from 'react-query'
import {ReactQueryResponse} from '../../../../types/Generics'
import axios from '../../../config/http-common'

import {enqueueSnackbar} from 'notistack'
import {useChance4DigitsLotteries} from '../../../hooks/chance4DigitsLotteries.hook'
import {useNavigate} from 'react-router-dom'
import {gameType} from '../../../constants/game-type.constants'

enum ScrutinyChance4DigitsKind {
  SET_SCRUTINY_FORM = 'SET_SCRUTINY_FORM',
  SET_SCRUTINY_RESULTS = 'SET_SCRUTINY_RESULTS',
  SET_SCRUTINY_RESULTS_BY_LOTTERY = 'SET_SCRUTINY_RESULTS_BY_LOTTERY',
  SET_IS_LOADING_SCRUTINY_RESULTS = 'SET_IS_LOADING_SCRUTINY_RESULTS',
  SET_SELECTED_TAB = 'SET_SELECTED_TAB',
  SET_RAFFLE_ID_LOADING = 'SET_RAFFLE_ID_LOADING',
}

interface ScrutinyChance4DigitsAction {
  type: ScrutinyChance4DigitsKind
  payload:
    | IRaffleScrutinyChance4DigitsResponse[]
    | boolean
    | number
    | IChance4DigitsLotteries[]
    | RaffleResultsForm
}

interface ScrutinyChance4DigitsState {
  Chance4DigitsLotteries: IChance4DigitsLotteries[]
  isLoadingChance4DigitsLotteries: boolean
  selectedTab: number
  raffleResultForm: RaffleResultsForm
  raffleResultsByLottery: IRaffleScrutinyChance4DigitsResponse[]
  Chance4DigitsRaffleId: number
}

export const raffleResultReducer = (
  state: ScrutinyChance4DigitsState,
  action: ScrutinyChance4DigitsAction
) => {
  switch (action.type) {
    case ScrutinyChance4DigitsKind.SET_SCRUTINY_FORM:
      return {
        ...state,
        raffleResultForm: action.payload as RaffleResultsForm,
      }
    case ScrutinyChance4DigitsKind.SET_SCRUTINY_RESULTS:
      return {
        ...state,
        raffleResultsByLottery: action.payload as IRaffleScrutinyChance4DigitsResponse[],
      }
    case ScrutinyChance4DigitsKind.SET_SCRUTINY_RESULTS_BY_LOTTERY:
      return {
        ...state,
        raffleResultsByLottery: action.payload as IRaffleScrutinyChance4DigitsResponse[],
      }
    case ScrutinyChance4DigitsKind.SET_IS_LOADING_SCRUTINY_RESULTS:
      return {
        ...state,
        isLoadingChance4DigitsLotteries: action.payload as boolean,
      }
    case ScrutinyChance4DigitsKind.SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payload as number,
      }
    case ScrutinyChance4DigitsKind.SET_RAFFLE_ID_LOADING:
      return {
        ...state,
        Chance4DigitsRaffleId: action.payload as number,
      }
    default:
      return state
  }
}

export const useScrutinyChance4Digits = () => {
  const navigate = useNavigate()
  const [raffleScrutinyState, dispatchScrutinyChance4Digits] = useReducer(raffleResultReducer, {
    Chance4DigitsLotteries: [],
    isLoadingChance4DigitsLotteries: false,
    selectedTab: 1,
    raffleResultForm: {
      date: DateTime.now().toFormat('yyyy-MM-dd').toString(),
      raffleResultStateId: '',
    },
    raffleResultsByLottery: [],
    Chance4DigitsRaffleId: 0,
  })
  const {chance4DigitsLotteriesState} = useChance4DigitsLotteries()

  const {
    data: Chance4DigitsScrutinyData,
    isFetching,
    refetch: getChance4DigitsScrutiny,
  } = useQuery<ReactQueryResponse<IRaffleResultChance4DigitsResponse[]>>(
    'get-chance-four-scrutiny-results',
    async () => {
      return await axios.get(
        `/ChanceFourScrutiny/get-chance-four-raffle-scrutiny/${
          raffleScrutinyState.raffleResultForm.date
        }${
          raffleScrutinyState.raffleResultForm.raffleResultStateId
            ? '/' + raffleScrutinyState.raffleResultForm.raffleResultStateId
            : ''
        }`
      )
    }
  )

  const {mutate: addRaffleScrutinyChance4DigitsMutation, isLoading: loadingAdd} = useMutation({
    mutationFn: async (body: AddScrutinyChance4DigitsBody) => {
      setRaffleIdLoading(body.raffleId)
      return await axios.post('/chanceFourScrutiny/add-chance-four-scrutiny', body)
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
    getChance4DigitsScrutiny()
  }

  useEffect(() => {
    if (!isFetching && Chance4DigitsScrutinyData) {
      setScrutinyResults(Chance4DigitsScrutinyData?.data.response)
    }
  }, [isFetching, Chance4DigitsScrutinyData])

  useEffect(() => {
    if (raffleScrutinyState.raffleResultForm.date) {
      getChance4DigitsScrutiny()
    }
  }, [raffleScrutinyState.raffleResultForm])

  const setRaffleIdLoading = (payload: number) => {
    dispatchScrutinyChance4Digits({
      type: ScrutinyChance4DigitsKind.SET_RAFFLE_ID_LOADING,
      payload,
    })
  }

  const setScrutinyForm = (payload: RaffleResultsForm) => {
    dispatchScrutinyChance4Digits({
      type: ScrutinyChance4DigitsKind.SET_SCRUTINY_FORM,
      payload,
    })
  }

  const setScrutinyResults = (payload: IRaffleScrutinyChance4DigitsResponse[]) => {
    dispatchScrutinyChance4Digits({
      type: ScrutinyChance4DigitsKind.SET_SCRUTINY_RESULTS,
      payload,
    })
  }

  const setScrutinyResultsByLottery = (payload: IRaffleScrutinyChance4DigitsResponse[]) => {
    dispatchScrutinyChance4Digits({
      type: ScrutinyChance4DigitsKind.SET_SCRUTINY_RESULTS_BY_LOTTERY,
      payload,
    })
  }

  const setIsLoadingScrutinyResults = (payload: boolean) => {
    dispatchScrutinyChance4Digits({
      type: ScrutinyChance4DigitsKind.SET_IS_LOADING_SCRUTINY_RESULTS,
      payload,
    })
  }

  const setSelectedTab = (payload: number) => {
    dispatchScrutinyChance4Digits({
      type: ScrutinyChance4DigitsKind.SET_SELECTED_TAB,
      payload,
    })
  }

  const addRaffleScrutinyChance4Digits = (raffleId: number) => {
    addRaffleScrutinyChance4DigitsMutation({raffleId})
  }

  const onClickScrutinyChance4DigitsDetail = (raffleId: number) => {
    navigate('../scrutiny-detail', {
      replace: true,
      state: {raffleId: raffleId, gameType: gameType.chance4Digits},
    })
  }

  return {
    isLoading: chance4DigitsLotteriesState.isLoadingChance4DigitsLotteries || isFetching,
    Chance4DigitsLotteries: chance4DigitsLotteriesState.chance4DigitsLotteries,
    hasError: chance4DigitsLotteriesState.hasErrorChance4Digits,
    raffleScrutinyState,
    setScrutinyForm,
    setScrutinyResults,
    setScrutinyResultsByLottery,
    setIsLoadingScrutinyResults,
    setSelectedTab,
    addRaffleScrutinyChance4Digits,
    loadingAdd,
    onClickScrutinyChance4DigitsDetail,
  }
}
