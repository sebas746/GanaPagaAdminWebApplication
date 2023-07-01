import {useQuery} from 'react-query'
import {ReactQueryResponse} from '../../types/Generics'
import {IAnimalitosLotteries} from '../../types/Animalitos.types'
import axios from '../config/http-common'
import {useReducer} from 'react'

enum AnimalitosLotteriesKind {
  SET_ANIMALITOS_LOTTERIES = 'SET_ANIMALITOS_LOTTERIES',
  SET_IS_LOADING_ANIMALITOS_LOTTERIES = 'SET_IS_LOADING_ANIMALITOS_LOTTERIES',
  SET_ERROR_ANIMALITOS_LOTTERIES = 'SET_ERROR_ANIMALITOS_LOTTERIES',
  SET_ERROR_MESSAGE_ANIMALITOS_LOTTERIES = 'SET_ERROR_MESSAGE_ANIMALITOS_LOTTERIES',
}

interface AnimalitosLotteriesAction {
  type: AnimalitosLotteriesKind
  payload: IAnimalitosLotteries[] | boolean | string
}

interface AnimalitosLotteriesState {
  animalitosLotteries: IAnimalitosLotteries[]
  isLoadingAnimalitosLotteries: boolean
  hasErrorAnimalitos: boolean
  errorMessageAnimalitosLotteries: string
}

export const animalitosLotteriesReducer = (
  state: AnimalitosLotteriesState,
  action: AnimalitosLotteriesAction
) => {
  switch (action.type) {
    case AnimalitosLotteriesKind.SET_ANIMALITOS_LOTTERIES:
      return {
        ...state,
        animalitosLotteries: action.payload as IAnimalitosLotteries[],
      }
    case AnimalitosLotteriesKind.SET_IS_LOADING_ANIMALITOS_LOTTERIES:
      return {
        ...state,
        isLoadingAnimalitosLotteries: action.payload as boolean,
      }
    case AnimalitosLotteriesKind.SET_ERROR_ANIMALITOS_LOTTERIES:
      return {
        ...state,
        hasErrorAnimalitos: action.payload as boolean,
      }
    case AnimalitosLotteriesKind.SET_ERROR_MESSAGE_ANIMALITOS_LOTTERIES:
      return {
        ...state,
        errorMessageAnimalitosLotteries: action.payload as string,
      }
    default:
      return state
  }
}

export const useAnimalitosLotteries = () => {
  const [animalitosLotteriesState, dispatchAnimalitosLotteries] = useReducer(
    animalitosLotteriesReducer,
    {
      animalitosLotteries: [],
      isLoadingAnimalitosLotteries: false,
      hasErrorAnimalitos: false,
      errorMessageAnimalitosLotteries: '',
    }
  )

  const {isLoading: isLoadingAnimalitosLotteries, data: animalitosLotteriesData, refetch: getAnimalitosLotteries} = useQuery<
    ReactQueryResponse<IAnimalitosLotteries[]>
  >(
    'get-animalitos-lotteries',
    async () => {
      dispatchAnimalitosLotteries({
        type: AnimalitosLotteriesKind.SET_IS_LOADING_ANIMALITOS_LOTTERIES,
        payload: true,
      })
      return await axios.get('/Lottery/get-lottery-by-game-type/gameType/Animalitos')
    },
    {
      onSuccess: (res) => {
        dispatchAnimalitosLotteries({
          type: AnimalitosLotteriesKind.SET_IS_LOADING_ANIMALITOS_LOTTERIES,
          payload: false,
        })
        dispatchAnimalitosLotteries({
          type: AnimalitosLotteriesKind.SET_ANIMALITOS_LOTTERIES,
          payload: res.data.response,
        })
      },
      onError: (err) => {
        dispatchAnimalitosLotteries({
          type: AnimalitosLotteriesKind.SET_ERROR_ANIMALITOS_LOTTERIES,
          payload: true,
        })

        dispatchAnimalitosLotteries({
          type: AnimalitosLotteriesKind.SET_ERROR_MESSAGE_ANIMALITOS_LOTTERIES,
          payload: String(err),
        })
      },
    }
  )

  const getAnimalitosLotteriesData = () : IAnimalitosLotteries[] => {
    if (animalitosLotteriesState.animalitosLotteries.length > 0) {
      return animalitosLotteriesState.animalitosLotteries
    } else {
      return animalitosLotteriesData?.data.response || []
    }
  }

  return {
    animalitosLotteriesState: {
      ...animalitosLotteriesState,
      animalitosLotteries: getAnimalitosLotteriesData(),
    },
  }
}
