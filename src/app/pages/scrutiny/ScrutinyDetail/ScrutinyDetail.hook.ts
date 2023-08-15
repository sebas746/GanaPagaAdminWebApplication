import {useEffect, useReducer} from 'react'
import {IScrutinyDetailResponse} from '../../../../types/ScrutinyDetail.types'
import {useQuery} from 'react-query'
import {ReactQueryResponse} from '../../../../types/Generics'
import axios from '../../../config/http-common'
import {gameType} from '../../../constants/game-type.constants'
import {useLocation} from 'react-router-dom'

enum ScrutinyActionUrl {
  ANIMALITOS = '/AnimalitosScrutiny/get-animalitos-scrutiny-by-raffle-and-currency/',
  CHANCE3DIGITS = '/ChanceThreeScrutiny/get-chance-three-scrutiny-by-raffle-and-currency/',
  CHANCE4DIGITS = '/ChanceFourScrutiny/get-chance-four-scrutiny-by-raffle-and-currency/',
  CHANCEZODIAC = '/ChanceZodiacScrutiny/get-chance-zodiac-scrutiny-by-raffle-and-currency/',
}

enum ScrutinyDetailKind {
  SET_SCRUTINY_ID = 'SET_SCRUTINY_ID',
  SET_GAME_TYPE = 'SET_GAME_TYPE',
  SET_URL = 'SET_URL',
  SET_SCRUTINY_DETAIL = 'SET_SCRUTINY_DETAIL',
  SET_EMAIL_LIST = 'SET_EMAIL_LIST',
}

interface ScrutinyDetailAction {
  type: ScrutinyDetailKind
  payload: number | string | string | IScrutinyDetailResponse | string[]
}

interface ScrutinyDetailState {
  raffleId: number
  gameType: string
  url: string
  scrutinyDetail: IScrutinyDetailResponse
  emailList: string[]
}

export const scrutinyDetailReducer = (state: ScrutinyDetailState, action: ScrutinyDetailAction) => {
  switch (action.type) {
    case ScrutinyDetailKind.SET_SCRUTINY_ID:
      return {
        ...state,
        raffleId: action.payload as number,
      }
    case ScrutinyDetailKind.SET_GAME_TYPE:
      return {
        ...state,
        gameType: action.payload as string,
      }
    case ScrutinyDetailKind.SET_URL:
      return {
        ...state,
        url: action.payload as string,
      }
    case ScrutinyDetailKind.SET_SCRUTINY_DETAIL:
      return {
        ...state,
        scrutinyDetail: action.payload as IScrutinyDetailResponse,
      }
    case ScrutinyDetailKind.SET_EMAIL_LIST:
      return {
        ...state,
        emailList: action.payload as string[],
      }
    default:
      return state
  }
}

export const useScrutinyDetail = () => {
  const location = useLocation()

  const setEndpointUrl = (gametype: string) => {
    let url: string = ''
    switch (gametype) {
      case gameType.animalitos:
        url = ScrutinyActionUrl.ANIMALITOS
        break
      case gameType.chance3Digits:
        url = ScrutinyActionUrl.CHANCE3DIGITS
        break
      case gameType.chanceZodiacal:
        url = ScrutinyActionUrl.CHANCEZODIAC
        break
      case gameType.chance4Digits:
        url = ScrutinyActionUrl.CHANCE4DIGITS
        break
    }
    return url
  }

  const [scrutinyDetailState, dispatchScrutinyDetail] = useReducer(scrutinyDetailReducer, {
    raffleId: location.state.raffleId,
    gameType: location.state.gameType,
    url: setEndpointUrl(location.state.gameType),
    scrutinyDetail: {} as IScrutinyDetailResponse,
    emailList: [],
  })

  const setScrutinyDetail = (payload: IScrutinyDetailResponse) => {
    dispatchScrutinyDetail({
      type: ScrutinyDetailKind.SET_SCRUTINY_DETAIL,
      payload,
    })
  }

  const {
    data: animalitosScrutinyDetailData,
    isFetching,
    refetch: getAnimalitosScrutinyDetail,
  } = useQuery<ReactQueryResponse<IScrutinyDetailResponse>>(
    'get-scrutiny-detail-by-raffle-and-currency',
    async () => {
      return await axios.get(`${scrutinyDetailState.url}${scrutinyDetailState.raffleId}`)
    }
  )

  useEffect(() => {
    if (!isFetching) {
      getAnimalitosScrutinyDetail()
    }
  }, [scrutinyDetailState.url])

  useEffect(() => {
    if (scrutinyDetailState.url && !isFetching && animalitosScrutinyDetailData) {
      setScrutinyDetail(animalitosScrutinyDetailData?.data.response)
    }
  }, [isFetching, animalitosScrutinyDetailData])

  return {scrutinyDetailState, isLoading: isFetching}
}
