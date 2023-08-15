import {
  AddScrutinyAnimalitosBody,
  IAnimalitosLotteries,
  IRaffleResultAnimalitosResponse,
  IRaffleScrutinyAnimalitosResponse,
} from '../../../../types/Animalitos.types'
import {RaffleResultsForm} from '../../../../types/Forms.types'
import {useEffect, useReducer} from 'react'
import {DateTime} from 'luxon'
import {useMutation, useQuery} from 'react-query'
import {ReactQueryResponse} from '../../../../types/Generics'
import axios from '../../../config/http-common'
import {useAnimalitosLotteries} from '../../../hooks/animalitosLotteries.hook'
import {enqueueSnackbar} from 'notistack'
import {useLocation, useNavigate} from 'react-router-dom'
import {gameType} from '../../../constants/game-type.constants'

enum ScrutinyAnimalitosKind {
  SET_SCRUTINY_FORM = 'SET_SCRUTINY_FORM',
  SET_SCRUTINY_RESULTS = 'SET_SCRUTINY_RESULTS',
  SET_SCRUTINY_RESULTS_BY_LOTTERY = 'SET_SCRUTINY_RESULTS_BY_LOTTERY',
  SET_IS_LOADING_SCRUTINY_RESULTS = 'SET_IS_LOADING_SCRUTINY_RESULTS',
  SET_SELECTED_TAB = 'SET_SELECTED_TAB',
  SET_RAFFLE_ID_LOADING = 'SET_RAFFLE_ID_LOADING',
}

interface ScrutinyAnimalitosAction {
  type: ScrutinyAnimalitosKind
  payload:
    | IRaffleScrutinyAnimalitosResponse[]
    | boolean
    | number
    | IAnimalitosLotteries[]
    | RaffleResultsForm
}

interface ScrutinyAnimalitosState {
  animalitosLotteries: IAnimalitosLotteries[]
  isLoadingAnimalitosLotteries: boolean
  selectedTab: number
  raffleResultForm: RaffleResultsForm
  raffleResultsByLottery: IRaffleScrutinyAnimalitosResponse[]
  animalitosRaffleId: number
}

export const raffleResultReducer = (
  state: ScrutinyAnimalitosState,
  action: ScrutinyAnimalitosAction
) => {
  switch (action.type) {
    case ScrutinyAnimalitosKind.SET_SCRUTINY_FORM:
      return {
        ...state,
        raffleResultForm: action.payload as RaffleResultsForm,
      }
    case ScrutinyAnimalitosKind.SET_SCRUTINY_RESULTS:
      return {
        ...state,
        raffleResultsByLottery: action.payload as IRaffleScrutinyAnimalitosResponse[],
      }
    case ScrutinyAnimalitosKind.SET_SCRUTINY_RESULTS_BY_LOTTERY:
      return {
        ...state,
        raffleResultsByLottery: action.payload as IRaffleScrutinyAnimalitosResponse[],
      }
    case ScrutinyAnimalitosKind.SET_IS_LOADING_SCRUTINY_RESULTS:
      return {
        ...state,
        isLoadingAnimalitosLotteries: action.payload as boolean,
      }
    case ScrutinyAnimalitosKind.SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payload as number,
      }
    case ScrutinyAnimalitosKind.SET_RAFFLE_ID_LOADING:
      return {
        ...state,
        animalitosRaffleId: action.payload as number,
      }
    default:
      return state
  }
}

export const useScrutinyAnimalitos = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [raffleScrutinyState, dispatchScrutinyAnimalitos] = useReducer(raffleResultReducer, {
    animalitosLotteries: [],
    isLoadingAnimalitosLotteries: false,
    selectedTab: 1,
    raffleResultForm: {
      date: DateTime.now().toFormat('yyyy-MM-dd').toString(),
      raffleResultStateId: '',
    },
    raffleResultsByLottery: [],
    animalitosRaffleId: 0,
  })
  const {animalitosLotteriesState} = useAnimalitosLotteries()

  const {
    data: animalitosScrutinyData,
    isFetching,
    refetch: getAnimalitosScrutiny,
  } = useQuery<ReactQueryResponse<IRaffleResultAnimalitosResponse[]>>(
    'get-scrutiny-results',
    async () => {
      return await axios.get(
        `/AnimalitosScrutiny/get-animalitos-raffle-scrutiny/${
          raffleScrutinyState.raffleResultForm.date
        }${
          raffleScrutinyState.raffleResultForm.raffleResultStateId
            ? '/' + raffleScrutinyState.raffleResultForm.raffleResultStateId
            : ''
        }`
      )
    }
  )

  const {mutate: addRaffleScrutinyAnimalitosMutation, isLoading: loadingAdd} = useMutation({
    mutationFn: async (body: AddScrutinyAnimalitosBody) => {
      setRaffleIdLoading(body.raffleId)
      return await axios.post('/AnimalitosScrutiny/add-animalitos-scrutiny', body)
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
    getAnimalitosScrutiny()
  }

  useEffect(() => {
    if (!isFetching && animalitosScrutinyData) {
      setScrutinyResults(animalitosScrutinyData?.data.response)
    }
  }, [isFetching, animalitosScrutinyData])

  useEffect(() => {
    if (raffleScrutinyState.raffleResultForm.date) {
      getAnimalitosScrutiny()
    }
  }, [raffleScrutinyState.raffleResultForm])

  const setRaffleIdLoading = (payload: number) => {
    dispatchScrutinyAnimalitos({
      type: ScrutinyAnimalitosKind.SET_RAFFLE_ID_LOADING,
      payload,
    })
  }

  const setScrutinyForm = (payload: RaffleResultsForm) => {
    dispatchScrutinyAnimalitos({
      type: ScrutinyAnimalitosKind.SET_SCRUTINY_FORM,
      payload,
    })
  }

  const setScrutinyResults = (payload: IRaffleScrutinyAnimalitosResponse[]) => {
    dispatchScrutinyAnimalitos({
      type: ScrutinyAnimalitosKind.SET_SCRUTINY_RESULTS,
      payload,
    })
  }

  const setScrutinyResultsByLottery = (payload: IRaffleScrutinyAnimalitosResponse[]) => {
    dispatchScrutinyAnimalitos({
      type: ScrutinyAnimalitosKind.SET_SCRUTINY_RESULTS_BY_LOTTERY,
      payload,
    })
  }

  const setIsLoadingScrutinyResults = (payload: boolean) => {
    dispatchScrutinyAnimalitos({
      type: ScrutinyAnimalitosKind.SET_IS_LOADING_SCRUTINY_RESULTS,
      payload,
    })
  }

  const setSelectedTab = (payload: number) => {
    dispatchScrutinyAnimalitos({
      type: ScrutinyAnimalitosKind.SET_SELECTED_TAB,
      payload,
    })
  }

  const addRaffleScrutinyAnimalitos = (raffleId: number) => {
    addRaffleScrutinyAnimalitosMutation({raffleId})
  }

  const onClickScrutinyAnimalitosDetail = (raffleId: number) => {
    navigate('../scrutiny-detail', {
      replace: true,
      state: {raffleId: raffleId, gameType: gameType.animalitos},
    })
  }

  return {
    isLoading: animalitosLotteriesState.isLoadingAnimalitosLotteries || isFetching,
    animalitosLotteries: animalitosLotteriesState.animalitosLotteries,
    hasError: animalitosLotteriesState.hasErrorAnimalitos,
    raffleScrutinyState,
    setScrutinyForm,
    setScrutinyResults,
    setScrutinyResultsByLottery,
    setIsLoadingScrutinyResults,
    setSelectedTab,
    addRaffleScrutinyAnimalitos,
    loadingAdd,
    onClickScrutinyAnimalitosDetail,
  }
}
