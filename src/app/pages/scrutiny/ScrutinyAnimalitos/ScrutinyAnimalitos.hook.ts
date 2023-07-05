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

enum ScrutinyAnimalitosAction {
  SET_SCRUTINY_FORM = 'SET_SCRUTINY_FORM',
  SET_SCRUTINY_RESULTS = 'SET_SCRUTINY_RESULTS',
  SET_SCRUTINY_RESULTS_BY_LOTTERY = 'SET_SCRUTINY_RESULTS_BY_LOTTERY',
  SET_IS_LOADING_SCRUTINY_RESULTS = 'SET_IS_LOADING_SCRUTINY_RESULTS',
  SET_SELECTED_TAB = 'SET_SELECTED_TAB',
}

interface ScrutinyAnimalitosState {
  type: ScrutinyAnimalitosAction
  payload:
    | IRaffleScrutinyAnimalitosResponse[]
    | boolean
    | number
    | IAnimalitosLotteries[]
    | RaffleResultsForm
}

interface RaffleScrutinyAnimalitosState {
  animalitosLotteries: IAnimalitosLotteries[]
  isLoadingAnimalitosLotteries: boolean
  selectedTab: number
  raffleResultForm: RaffleResultsForm
  raffleResultsByLottery: IRaffleScrutinyAnimalitosResponse[]
}

export const raffleResultReducer = (
  state: RaffleScrutinyAnimalitosState,
  action: ScrutinyAnimalitosState
) => {
  switch (action.type) {
    case ScrutinyAnimalitosAction.SET_SCRUTINY_FORM:
      return {
        ...state,
        raffleResultForm: action.payload as RaffleResultsForm,
      }
    case ScrutinyAnimalitosAction.SET_SCRUTINY_RESULTS:
      return {
        ...state,
        raffleResultsByLottery: action.payload as IRaffleScrutinyAnimalitosResponse[],
      }
    case ScrutinyAnimalitosAction.SET_SCRUTINY_RESULTS_BY_LOTTERY:
      return {
        ...state,
        raffleResultsByLottery: action.payload as IRaffleScrutinyAnimalitosResponse[],
      }
    case ScrutinyAnimalitosAction.SET_IS_LOADING_SCRUTINY_RESULTS:
      return {
        ...state,
        isLoadingAnimalitosLotteries: action.payload as boolean,
      }
    case ScrutinyAnimalitosAction.SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payload as number,
      }
    default:
      return state
  }
}

export const useScrutinyAnimalitos = () => {
  const [raffleScrutinyState, dispatchScrutinyAnimalitos] = useReducer(raffleResultReducer, {
    animalitosLotteries: [],
    isLoadingAnimalitosLotteries: false,
    selectedTab: 1,
    raffleResultForm: {
      date: DateTime.now().toFormat('yyyy-MM-dd').toString(),
      raffleResultStateId: '',
    },
    raffleResultsByLottery: [],
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
        `/AnimalitosRaffleResult/get-animalitos-raffle-result/${
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
      return await axios.post('/AnimalitosScrutiny/add-animalitos-scrutiny', body)
    },
    onSuccess(data, variables, context) {
      getAnimalitosScrutiny()
      // handleSuccessResponse(data)
    },
    onError(error, variables, context) {
      // handleErrorResponse()
    },
  })

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

  const setScrutinyForm = (payload: RaffleResultsForm) => {
    dispatchScrutinyAnimalitos({
      type: ScrutinyAnimalitosAction.SET_SCRUTINY_FORM,
      payload,
    })
  }

  const setScrutinyResults = (payload: IRaffleScrutinyAnimalitosResponse[]) => {
    dispatchScrutinyAnimalitos({
      type: ScrutinyAnimalitosAction.SET_SCRUTINY_RESULTS,
      payload,
    })
  }

  const setScrutinyResultsByLottery = (payload: IRaffleScrutinyAnimalitosResponse[]) => {
    dispatchScrutinyAnimalitos({
      type: ScrutinyAnimalitosAction.SET_SCRUTINY_RESULTS_BY_LOTTERY,
      payload,
    })
  }

  const setIsLoadingScrutinyResults = (payload: boolean) => {
    dispatchScrutinyAnimalitos({
      type: ScrutinyAnimalitosAction.SET_IS_LOADING_SCRUTINY_RESULTS,
      payload,
    })
  }

  const setSelectedTab = (payload: number) => {
    dispatchScrutinyAnimalitos({
      type: ScrutinyAnimalitosAction.SET_SELECTED_TAB,
      payload,
    })
  }

  const addRaffleScrutinyAnimalitos = (raffleId: number) => {
    addRaffleScrutinyAnimalitosMutation({raffleId, createdBy: 'rarangor'})
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
  }
}
