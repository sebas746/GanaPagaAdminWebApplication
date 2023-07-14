import {
  AddScrutinyChanceZodiacBody,
  IChanceZodiacLotteries,
  IRaffleResultChanceZodiacResponse,
  IRaffleScrutinyChanceZodiacResponse,
} from '../../../../types/ChanceZodiac.types'
import {RaffleResultsForm} from '../../../../types/Forms.types'
import {useEffect, useReducer} from 'react'
import {DateTime} from 'luxon'
import {useMutation, useQuery} from 'react-query'
import {ReactQueryResponse} from '../../../../types/Generics'
import axios from '../../../config/http-common'

import {enqueueSnackbar} from 'notistack'
import {useChanceZodiacLotteries} from '../../../hooks/chanceZodiacLotteries.hook'
import {useNavigate} from 'react-router-dom'
import {gameType} from '../../../constants/game-type.constants'

enum ScrutinyChanceZodiacAction {
  SET_SCRUTINY_FORM = 'SET_SCRUTINY_FORM',
  SET_SCRUTINY_RESULTS = 'SET_SCRUTINY_RESULTS',
  SET_SCRUTINY_RESULTS_BY_LOTTERY = 'SET_SCRUTINY_RESULTS_BY_LOTTERY',
  SET_IS_LOADING_SCRUTINY_RESULTS = 'SET_IS_LOADING_SCRUTINY_RESULTS',
  SET_SELECTED_TAB = 'SET_SELECTED_TAB',
  SET_RAFFLE_ID_LOADING = 'SET_RAFFLE_ID_LOADING',
}

interface ScrutinyChanceZodiacState {
  type: ScrutinyChanceZodiacAction
  payload:
    | IRaffleScrutinyChanceZodiacResponse[]
    | boolean
    | number
    | IChanceZodiacLotteries[]
    | RaffleResultsForm
}

interface RaffleScrutinyChanceZodiacState {
  chanceZodiacLotteries: IChanceZodiacLotteries[]
  isLoadingChanceZodiacLotteries: boolean
  selectedTab: number
  raffleResultForm: RaffleResultsForm
  raffleResultsByLottery: IRaffleScrutinyChanceZodiacResponse[]
  chanceZodiacRaffleId: number
}

export const raffleResultReducer = (
  state: RaffleScrutinyChanceZodiacState,
  action: ScrutinyChanceZodiacState
) => {
  switch (action.type) {
    case ScrutinyChanceZodiacAction.SET_SCRUTINY_FORM:
      return {
        ...state,
        raffleResultForm: action.payload as RaffleResultsForm,
      }
    case ScrutinyChanceZodiacAction.SET_SCRUTINY_RESULTS:
      return {
        ...state,
        raffleResultsByLottery: action.payload as IRaffleScrutinyChanceZodiacResponse[],
      }
    case ScrutinyChanceZodiacAction.SET_SCRUTINY_RESULTS_BY_LOTTERY:
      return {
        ...state,
        raffleResultsByLottery: action.payload as IRaffleScrutinyChanceZodiacResponse[],
      }
    case ScrutinyChanceZodiacAction.SET_IS_LOADING_SCRUTINY_RESULTS:
      return {
        ...state,
        isLoadingChanceZodiacLotteries: action.payload as boolean,
      }
    case ScrutinyChanceZodiacAction.SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payload as number,
      }
    case ScrutinyChanceZodiacAction.SET_RAFFLE_ID_LOADING:
      return {
        ...state,
        chanceZodiacRaffleId: action.payload as number,
      }
    default:
      return state
  }
}

export const useScrutinyChanceZodiac = () => {
  const navigate = useNavigate()
  const [raffleScrutinyState, dispatchScrutinyChanceZodiac] = useReducer(raffleResultReducer, {
    chanceZodiacLotteries: [],
    isLoadingChanceZodiacLotteries: false,
    selectedTab: 1,
    raffleResultForm: {
      date: DateTime.now().toFormat('yyyy-MM-dd').toString(),
      raffleResultStateId: '',
    },
    raffleResultsByLottery: [],
    chanceZodiacRaffleId: 0,
  })
  const {chanceZodiacLotteriesState} = useChanceZodiacLotteries()

  const {
    data: ChanceZodiacScrutinyData,
    isFetching,
    refetch: getChanceZodiacScrutiny,
  } = useQuery<ReactQueryResponse<IRaffleResultChanceZodiacResponse[]>>(
    'get-chance-zodiac-scrutiny-results',
    async () => {
      return await axios.get(
        `/ChanceZodiacScrutiny/get-chance-zodiac-raffle-scrutiny/${
          raffleScrutinyState.raffleResultForm.date
        }${
          raffleScrutinyState.raffleResultForm.raffleResultStateId
            ? '/' + raffleScrutinyState.raffleResultForm.raffleResultStateId
            : ''
        }`
      )
    }
  )

  const {mutate: addRaffleScrutinyChanceZodiacMutation, isLoading: loadingAdd} = useMutation({
    mutationFn: async (body: AddScrutinyChanceZodiacBody) => {
      setRaffleIdLoading(body.raffleId)
      return await axios.post('/ChanceZodiacScrutiny/add-chance-zodiac-scrutiny', body)
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
    getChanceZodiacScrutiny()
  }

  useEffect(() => {
    if (!isFetching && ChanceZodiacScrutinyData) {
      setScrutinyResults(ChanceZodiacScrutinyData?.data.response)
    }
  }, [isFetching, ChanceZodiacScrutinyData])

  useEffect(() => {
    if (raffleScrutinyState.raffleResultForm.date) {
      getChanceZodiacScrutiny()
    }
  }, [raffleScrutinyState.raffleResultForm])

  const setRaffleIdLoading = (payload: number) => {
    dispatchScrutinyChanceZodiac({
      type: ScrutinyChanceZodiacAction.SET_RAFFLE_ID_LOADING,
      payload,
    })
  }

  const setScrutinyForm = (payload: RaffleResultsForm) => {
    dispatchScrutinyChanceZodiac({
      type: ScrutinyChanceZodiacAction.SET_SCRUTINY_FORM,
      payload,
    })
  }

  const setScrutinyResults = (payload: IRaffleScrutinyChanceZodiacResponse[]) => {
    dispatchScrutinyChanceZodiac({
      type: ScrutinyChanceZodiacAction.SET_SCRUTINY_RESULTS,
      payload,
    })
  }

  const setScrutinyResultsByLottery = (payload: IRaffleScrutinyChanceZodiacResponse[]) => {
    dispatchScrutinyChanceZodiac({
      type: ScrutinyChanceZodiacAction.SET_SCRUTINY_RESULTS_BY_LOTTERY,
      payload,
    })
  }

  const setIsLoadingScrutinyResults = (payload: boolean) => {
    dispatchScrutinyChanceZodiac({
      type: ScrutinyChanceZodiacAction.SET_IS_LOADING_SCRUTINY_RESULTS,
      payload,
    })
  }

  const setSelectedTab = (payload: number) => {
    dispatchScrutinyChanceZodiac({
      type: ScrutinyChanceZodiacAction.SET_SELECTED_TAB,
      payload,
    })
  }

  const addRaffleScrutinyChanceZodiac = (raffleId: number) => {
    addRaffleScrutinyChanceZodiacMutation({raffleId})
  }

  const onClickScrutinyChanceZodiacDetail = (raffleId: number) => {
    navigate('../scrutiny-detail', {
      replace: true,
      state: {raffleId: raffleId, gameType: gameType.chanceZodiacal},
    })
  }

  return {
    isLoading: chanceZodiacLotteriesState.isLoadingChanceZodiacLotteries || isFetching,
    chanceZodiacLotteries: chanceZodiacLotteriesState.chanceZodiacLotteries,
    hasError: chanceZodiacLotteriesState.hasErrorChanceZodiac,
    raffleScrutinyState,
    setScrutinyForm,
    setScrutinyResults,
    setScrutinyResultsByLottery,
    setIsLoadingScrutinyResults,
    setSelectedTab,
    addRaffleScrutinyChanceZodiac,
    loadingAdd,
    onClickScrutinyChanceZodiacDetail,
  }
}
