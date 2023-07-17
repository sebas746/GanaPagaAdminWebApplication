import {useQuery} from 'react-query'
import {ReactQueryResponse} from '../../types/Generics'
import axios from '../config/http-common'
import {useReducer} from 'react'
import {IChance4DigitsLotteries} from '../../types/Chance4Digits.types'

enum Chance4DigitsLotteriesKind {
  SET_CHANCE4DIGITS_LOTTERIES = 'SET_CHANCE4DIGITS_LOTTERIES',
  SET_IS_LOADING_CHANCE4DIGITS_LOTTERIES = 'SET_IS_LOADING_CHANCE4DIGITS_LOTTERIES',
  SET_ERROR_CHANCE4DIGITS_LOTTERIES = 'SET_ERROR_CHANCE4DIGITS_LOTTERIES',
  SET_ERROR_MESSAGE_CHANCE4DIGITS_LOTTERIES = 'SET_ERROR_MESSAGE_CHANCE4DIGITS_LOTTERIES',
}

interface Chance4DigitsLotteriesAction {
  type: Chance4DigitsLotteriesKind
  payload: IChance4DigitsLotteries[] | boolean | string
}

interface Chance4DigitsLotteriesState {
  chance4DigitsLotteries: IChance4DigitsLotteries[]
  isLoadingChance4DigitsLotteries: boolean
  hasErrorChance4Digits: boolean
  errorMessageChance4DigitsLotteries: string
}

export const Chance4DigitsLotteriesReducer = (
  state: Chance4DigitsLotteriesState,
  action: Chance4DigitsLotteriesAction
) => {
  switch (action.type) {
    case Chance4DigitsLotteriesKind.SET_CHANCE4DIGITS_LOTTERIES:
      return {
        ...state,
        chance4DigitsLotteries: action.payload as IChance4DigitsLotteries[],
      }
    case Chance4DigitsLotteriesKind.SET_IS_LOADING_CHANCE4DIGITS_LOTTERIES:
      return {
        ...state,
        isLoadingchance4DigitsLotteries: action.payload as boolean,
      }
    case Chance4DigitsLotteriesKind.SET_ERROR_CHANCE4DIGITS_LOTTERIES:
      return {
        ...state,
        hasErrorchance4Digits: action.payload as boolean,
      }
    case Chance4DigitsLotteriesKind.SET_ERROR_MESSAGE_CHANCE4DIGITS_LOTTERIES:
      return {
        ...state,
        errorMessagechance4DigitsLotteries: action.payload as string,
      }
    default:
      return state
  }
}

export const useChance4DigitsLotteries = () => {
  const [chance4DigitsLotteriesState, dispatchChance4DigitsLotteries] = useReducer(
    Chance4DigitsLotteriesReducer,
    {
      chance4DigitsLotteries: [],
      isLoadingChance4DigitsLotteries: false,
      hasErrorChance4Digits: false,
      errorMessageChance4DigitsLotteries: '',
    }
  )

  const {
    isLoading: isLoadingchance4DigitsLotteries,
    data: chance4DigitsLotteriesData,
    refetch: getchance4DigitsLotteries,
  } = useQuery<ReactQueryResponse<IChance4DigitsLotteries[]>>(
    'get-chance4Digits-lotteries',
    async () => {
      dispatchChance4DigitsLotteries({
        type: Chance4DigitsLotteriesKind.SET_IS_LOADING_CHANCE4DIGITS_LOTTERIES,
        payload: true,
      })
      return await axios.get('/Lottery/get-lottery-by-game-type/gameType/Chance4Cifras')
    },
    {
      onSuccess: (res) => {
        dispatchChance4DigitsLotteries({
          type: Chance4DigitsLotteriesKind.SET_IS_LOADING_CHANCE4DIGITS_LOTTERIES,
          payload: false,
        })
        dispatchChance4DigitsLotteries({
          type: Chance4DigitsLotteriesKind.SET_CHANCE4DIGITS_LOTTERIES,
          payload: res.data.response,
        })
      },
      onError: (err) => {
        dispatchChance4DigitsLotteries({
          type: Chance4DigitsLotteriesKind.SET_ERROR_CHANCE4DIGITS_LOTTERIES,
          payload: true,
        })

        dispatchChance4DigitsLotteries({
          type: Chance4DigitsLotteriesKind.SET_ERROR_MESSAGE_CHANCE4DIGITS_LOTTERIES,
          payload: String(err),
        })
      },
    }
  )

  const getChance4DigitsLotteriesData = (): IChance4DigitsLotteries[] => {
    if (chance4DigitsLotteriesState.chance4DigitsLotteries.length > 0) {
      return chance4DigitsLotteriesState.chance4DigitsLotteries
    } else {
      return chance4DigitsLotteriesData?.data.response || []
    }
  }

  return {
    chance4DigitsLotteriesState: {
      ...chance4DigitsLotteriesState,
      chance4DigitsLotteries: getChance4DigitsLotteriesData(),
    },
  }
}
