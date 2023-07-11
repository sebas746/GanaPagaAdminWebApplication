import {useEffect, useReducer} from 'react'
import {IScrutinyDetailResponse} from '../../../../../../types/ScrutinyDetail.types'
import {useQuery} from 'react-query'
import {ReactQueryResponse} from '../../../../../../types/Generics'
import axios from 'axios'

enum ScrutinyDetailAction {
  SET_SCRUTINY_ID = 'SET_SCRUTINY_ID',
  SET_SCRUTINY_DETAIL = 'SET_SCRUTINY_DETAIL',
  SET_EMAIL_LIST = 'SET_EMAIL_LIST',
}

interface ScrutinyDetailState {
  type: ScrutinyDetailAction
  payload: number | IScrutinyDetailResponse | string[]
}

interface RaffleScrutinyDetailState {
  scrutinyId: number
  scrutinyDetail: IScrutinyDetailResponse
  emailList: string[]
}

export const scrutinyDetailReducer = (
  state: RaffleScrutinyDetailState,
  action: ScrutinyDetailState
) => {
  switch (action.type) {
    case ScrutinyDetailAction.SET_SCRUTINY_ID:
      return {
        ...state,
        scrutinyId: action.payload as number,
      }
    case ScrutinyDetailAction.SET_SCRUTINY_DETAIL:
      return {
        ...state,
        scrutinyDetail: action.payload as IScrutinyDetailResponse,
      }
    case ScrutinyDetailAction.SET_EMAIL_LIST:
      return {
        ...state,
        emailList: action.payload as string[],
      }
    default:
      return state
  }
}

export const useScrutinyDetail = () => {
  const [scrutinyDetailState, dispatchScrutinyDetail] = useReducer(scrutinyDetailReducer, {
    scrutinyId: 0,
    scrutinyDetail: {} as IScrutinyDetailResponse,
    emailList: [],
  })

  const {
    data: animalitosScrutinyDetailData,
    isFetching,
    refetch: getAnimalitosScrutinyDetail,
  } = useQuery<ReactQueryResponse<IScrutinyDetailResponse>>(
    'get-animalitos-scrutiny-by-raffle-and-currency',
    async () => {
      return await axios.get(
        `/AnimalitosScrutiny/get-animalitos-scrutiny-by-raffle-and-currency/${scrutinyDetailState.scrutinyId}`
      )
    }
  )

  useEffect(() => {
    if (!isFetching && animalitosScrutinyDetailData) {
      setScrutinyDetail(animalitosScrutinyDetailData?.data.response)
    }
  }, [isFetching, animalitosScrutinyDetailData])

  const setScrutinyDetail = (payload: IScrutinyDetailResponse) => {
    dispatchScrutinyDetail({
      type: ScrutinyDetailAction.SET_SCRUTINY_DETAIL,
      payload,
    })
  }
}

export {}
