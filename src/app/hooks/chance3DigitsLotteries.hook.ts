import {useQuery} from 'react-query'
import {ReactQueryResponse} from '../../types/Generics'
import {IChance3DigitsLotteries} from '../../types/Chance3Digits.types'
import axios from '../config/http-common'
import {useReducer} from 'react'

enum Chance3DigitsLotteriesKind {
  SET_CHANCE3DIGITS_LOTTERIES = 'SET_CHANCE3DIGITS_LOTTERIES',
  SET_IS_LOADING_CHANCE3DIGITS_LOTTERIES = 'SET_IS_LOADING_CHANCE3DIGITS_LOTTERIES',
  SET_ERROR_CHANCE3DIGITS_LOTTERIES = 'SET_ERROR_CHANCE3DIGITS_LOTTERIES',
  SET_ERROR_MESSAGE_CHANCE3DIGITS_LOTTERIES = 'SET_ERROR_MESSAGE_CHANCE3DIGITS_LOTTERIES',
}

interface Chance3DigitsLotteriesAction {
  type: Chance3DigitsLotteriesKind
  payload: IChance3DigitsLotteries[] | boolean | string
}

interface Chance3DigitsLotteriesState {
  chance3DigitsLotteries: IChance3DigitsLotteries[]
  isLoadingChance3DigitsLotteries: boolean
  hasErrorChance3Digits: boolean
  errorMessageChance3DigitsLotteries: string
}

export const chance3DigitsLotteriesReducer = (
  state: Chance3DigitsLotteriesState,
  action: Chance3DigitsLotteriesAction
) => {
  switch (action.type) {
    case Chance3DigitsLotteriesKind.SET_CHANCE3DIGITS_LOTTERIES:
      return {
        ...state,
        chance3DigitsLotteries: action.payload as IChance3DigitsLotteries[],
      }
    case Chance3DigitsLotteriesKind.SET_IS_LOADING_CHANCE3DIGITS_LOTTERIES:
      return {
        ...state,
        isLoadingChance3DigitsLotteries: action.payload as boolean,
      }
    case Chance3DigitsLotteriesKind.SET_ERROR_CHANCE3DIGITS_LOTTERIES:
      return {
        ...state,
        hasErrorChance3Digits: action.payload as boolean,
      }
    case Chance3DigitsLotteriesKind.SET_ERROR_MESSAGE_CHANCE3DIGITS_LOTTERIES:
      return {
        ...state,
        errorMessageChance3DigitsLotteries: action.payload as string,
      }
    default:
      return state
  }
}

export const useChance3DigitsLotteries = () => {
  const [chance3DigitsLotteriesState, dispatchChance3DigitsLotteries] = useReducer(
    chance3DigitsLotteriesReducer,
    {
      chance3DigitsLotteries: [],
      isLoadingChance3DigitsLotteries: false,
      hasErrorChance3Digits: false,
      errorMessageChance3DigitsLotteries: '',
    }
  )

  const {
    isLoading: isLoadingChance3DigitsLotteries,
    data: chance3DigitsLotteriesData,
    refetch: getChance3DigitsLotteries,
  } = useQuery<ReactQueryResponse<IChance3DigitsLotteries[]>>(
    'get-Chance3Digits-lotteries',
    async () => {
      dispatchChance3DigitsLotteries({
        type: Chance3DigitsLotteriesKind.SET_IS_LOADING_CHANCE3DIGITS_LOTTERIES,
        payload: true,
      })
      return await axios.get('/Lottery/get-lottery-by-game-type/gameType/Chance')
    },
    {
      onSuccess: (res) => {
        dispatchChance3DigitsLotteries({
          type: Chance3DigitsLotteriesKind.SET_IS_LOADING_CHANCE3DIGITS_LOTTERIES,
          payload: false,
        })
        dispatchChance3DigitsLotteries({
          type: Chance3DigitsLotteriesKind.SET_CHANCE3DIGITS_LOTTERIES,
          payload: res.data.response,
        })
      },
      onError: (err) => {
        dispatchChance3DigitsLotteries({
          type: Chance3DigitsLotteriesKind.SET_ERROR_CHANCE3DIGITS_LOTTERIES,
          payload: true,
        })

        dispatchChance3DigitsLotteries({
          type: Chance3DigitsLotteriesKind.SET_ERROR_MESSAGE_CHANCE3DIGITS_LOTTERIES,
          payload: String(err),
        })
      },
    }
  )

  const getChance3DigitsLotteriesData = (): IChance3DigitsLotteries[] => {
    if (chance3DigitsLotteriesState.chance3DigitsLotteries.length > 0) {
      return chance3DigitsLotteriesState.chance3DigitsLotteries
    } else {
      return chance3DigitsLotteriesData?.data.response || []
    }
  }

  return {
    chance3DigitsLotteriesState: {
      ...chance3DigitsLotteriesState,
      chance3DigitsLotteries: getChance3DigitsLotteriesData(),
    },
  }
}
