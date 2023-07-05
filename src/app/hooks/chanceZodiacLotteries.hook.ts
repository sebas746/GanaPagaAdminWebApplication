import {useQuery} from 'react-query'
import {ReactQueryResponse} from '../../types/Generics'
import axios from '../config/http-common'
import {useReducer} from 'react'
import {IChanceZodiacLotteries} from '../../types/ChanceZodiac.types'

enum ChanceZodiacLotteriesKind {
  SET_ChanceZodiac_LOTTERIES = 'SET_ChanceZodiac_LOTTERIES',
  SET_IS_LOADING_ChanceZodiac_LOTTERIES = 'SET_IS_LOADING_ChanceZodiac_LOTTERIES',
  SET_ERROR_ChanceZodiac_LOTTERIES = 'SET_ERROR_ChanceZodiac_LOTTERIES',
  SET_ERROR_MESSAGE_ChanceZodiac_LOTTERIES = 'SET_ERROR_MESSAGE_ChanceZodiac_LOTTERIES',
}

interface ChanceZodiacLotteriesAction {
  type: ChanceZodiacLotteriesKind
  payload: IChanceZodiacLotteries[] | boolean | string
}

interface ChanceZodiacLotteriesState {
  chanceZodiacLotteries: IChanceZodiacLotteries[]
  isLoadingChanceZodiacLotteries: boolean
  hasErrorChanceZodiac: boolean
  errorMessageChanceZodiacLotteries: string
}

export const chanceZodiacLotteriesReducer = (
  state: ChanceZodiacLotteriesState,
  action: ChanceZodiacLotteriesAction
) => {
  switch (action.type) {
    case ChanceZodiacLotteriesKind.SET_ChanceZodiac_LOTTERIES:
      return {
        ...state,
        ChanceZodiacLotteries: action.payload as IChanceZodiacLotteries[],
      }
    case ChanceZodiacLotteriesKind.SET_IS_LOADING_ChanceZodiac_LOTTERIES:
      return {
        ...state,
        isLoadingChanceZodiacLotteries: action.payload as boolean,
      }
    case ChanceZodiacLotteriesKind.SET_ERROR_ChanceZodiac_LOTTERIES:
      return {
        ...state,
        hasErrorChanceZodiac: action.payload as boolean,
      }
    case ChanceZodiacLotteriesKind.SET_ERROR_MESSAGE_ChanceZodiac_LOTTERIES:
      return {
        ...state,
        errorMessageChanceZodiacLotteries: action.payload as string,
      }
    default:
      return state
  }
}

export const useChanceZodiacLotteries = () => {
  const [chanceZodiacLotteriesState, dispatchChanceZodiacLotteries] = useReducer(
    chanceZodiacLotteriesReducer,
    {
      chanceZodiacLotteries: [],
      isLoadingChanceZodiacLotteries: false,
      hasErrorChanceZodiac: false,
      errorMessageChanceZodiacLotteries: '',
    }
  )

  const {
    isLoading: isLoadingChanceZodiacLotteries,
    data: chanceZodiacLotteriesData,
    refetch: getChanceZodiacLotteries,
  } = useQuery<ReactQueryResponse<IChanceZodiacLotteries[]>>(
    'get-ChanceZodiac-lotteries',
    async () => {
      dispatchChanceZodiacLotteries({
        type: ChanceZodiacLotteriesKind.SET_IS_LOADING_ChanceZodiac_LOTTERIES,
        payload: true,
      })
      return await axios.get('/Lottery/get-lottery-by-game-type/gameType/ChanceZodiacal')
    },
    {
      onSuccess: (res) => {
        dispatchChanceZodiacLotteries({
          type: ChanceZodiacLotteriesKind.SET_IS_LOADING_ChanceZodiac_LOTTERIES,
          payload: false,
        })
        dispatchChanceZodiacLotteries({
          type: ChanceZodiacLotteriesKind.SET_ChanceZodiac_LOTTERIES,
          payload: res.data.response,
        })
      },
      onError: (err) => {
        dispatchChanceZodiacLotteries({
          type: ChanceZodiacLotteriesKind.SET_ERROR_ChanceZodiac_LOTTERIES,
          payload: true,
        })

        dispatchChanceZodiacLotteries({
          type: ChanceZodiacLotteriesKind.SET_ERROR_MESSAGE_ChanceZodiac_LOTTERIES,
          payload: String(err),
        })
      },
    }
  )

  const getChanceZodiacLotteriesData = (): IChanceZodiacLotteries[] => {
    if (chanceZodiacLotteriesState.chanceZodiacLotteries.length > 0) {
      return chanceZodiacLotteriesState.chanceZodiacLotteries
    } else {
      return chanceZodiacLotteriesData?.data.response || []
    }
  }

  return {
    chanceZodiacLotteriesState: {
      ...chanceZodiacLotteriesState,
      chanceZodiacLotteries: getChanceZodiacLotteriesData(),
    },
  }
}
