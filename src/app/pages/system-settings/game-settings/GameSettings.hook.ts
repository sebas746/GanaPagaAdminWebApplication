import {useEffect, useReducer} from 'react'
import {ReactQueryResponse} from '../../../../types/Generics'
import axios from '../../../config/http-common'
import {useMutation, useQuery} from 'react-query'
import {enqueueSnackbar} from 'notistack'
import {AxiosError} from 'axios'
import {IGameSettingsResponse} from '../../../../types/GameSettings.types'

enum GameSettingsKind {
  SET_GAME_SETTINGS = 'SET_GAME_SETTINGS',
  SET_IS_LOADING = 'SET_IS_LOADING',
}

interface GameSettingsStateAction {
  type: GameSettingsKind
  payload: IGameSettingsResponse[] | boolean
}

interface GameSettingsState {
  GameSettings: IGameSettingsResponse[]
  isLoadingGame: boolean
}

export const gameSettingsReducer = (state: GameSettingsState, action: GameSettingsStateAction) => {
  switch (action.type) {
    case GameSettingsKind.SET_GAME_SETTINGS:
      return {
        ...state,
        GameSettings: action.payload as IGameSettingsResponse[],
      }
    case GameSettingsKind.SET_IS_LOADING:
      return {
        ...state,
        isLoadingGame: action.payload as boolean,
      }
  }
}

export const useGameSettings = () => {
  const [gameSettingsState, dispatchGameSettings] = useReducer(gameSettingsReducer, {
    GameSettings: [] as IGameSettingsResponse[],
    isLoadingGame: false,
  })

  const {
    data: gameSettingsData,
    isFetching,
    refetch: getGameSettings,
  } = useQuery<ReactQueryResponse<IGameSettingsResponse[]>>(
    'get-game-settings',
    async () => await axios.get(`/GameSettings/get-game-settings`)
  )

  const setGameSettings = (payload: IGameSettingsResponse[]) => {
    dispatchGameSettings({type: GameSettingsKind.SET_GAME_SETTINGS, payload})
  }

  useEffect(() => {
    if (!isFetching && gameSettingsData) {
      setGameSettings(gameSettingsData.data.response)
    }
  }, [gameSettingsData])

  const {mutate: addGameSettings, isLoading: isSavingGameSettings} = useMutation({
    mutationFn: async (body: IGameSettingsResponse[]) => {
      return await axios.post(`/GameSettings/update-game-settings`, body)
    },
    onSuccess(data) {
      handleSuccessResponse(data)
    },
    onError(error: AxiosError<ReactQueryResponse<string>>) {
      handleErrorResponse(error.toString())
    },
  })

  const handleErrorResponse = (errorMessage: string) => {
    enqueueSnackbar(errorMessage, {
      variant: 'error',
      hideIconVariant: true,
    })
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
    setTimeout(() => {
      getGameSettings()
    }, 1)
  }

  return {
    isLoading: isFetching,
    gameSettingsState,
    addGameSettings,
    isLoadingForm: isSavingGameSettings,
  }
}
