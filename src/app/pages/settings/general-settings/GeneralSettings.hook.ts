import {useEffect, useReducer} from 'react'
import {IGeneralSettingsResponse} from '../../../../types/GeneralSettings.types'
import {GeneralSettingsForm} from '../../../../types/Forms.types'
import axios from '../../../config/http-common'
import {ReactQueryResponse} from '../../../../types/Generics'
import {useQuery} from 'react-query'

enum GeneralSettingsKind {
  SET_GENERAL_SETTINGS = 'SET_GENERAL_SETTINGS',
  SET_GENERAL_SETTINGS_FORM = 'SET_GENERAL_SETTINGS_FORM',
  SET_IS_FORM_LOADING = 'SET_IS_FORM_LOADING',
}

interface GeneralSettingsStateAction {
  type: GeneralSettingsKind
  payload: IGeneralSettingsResponse | GeneralSettingsForm[] | boolean
}

interface GeneralSettingsState {
  generalSettings: IGeneralSettingsResponse
  generalSettingsForm: GeneralSettingsForm[]
  isFormLoading: boolean
}

export const generalSettingsReducer = (
  state: GeneralSettingsState,
  action: GeneralSettingsStateAction
) => {
  switch (action.type) {
    case GeneralSettingsKind.SET_GENERAL_SETTINGS:
      return {
        ...state,
        generalSettings: action.payload as IGeneralSettingsResponse,
      }
    case GeneralSettingsKind.SET_GENERAL_SETTINGS_FORM:
      return {
        ...state,
        generalSettingsForm: action.payload as GeneralSettingsForm[],
      }
    case GeneralSettingsKind.SET_IS_FORM_LOADING:
      return {
        ...state,
        isFormLoading: action.payload as boolean,
      }
  }
}

export const useGeneralSettings = () => {
  const [generalSettingsState, dispatchGeneralSettings] = useReducer(generalSettingsReducer, {
    generalSettings: {} as IGeneralSettingsResponse,
    generalSettingsForm: [] as GeneralSettingsForm[],
    isFormLoading: false,
  })

  const {
    data: generalSettingsData,
    isFetching,
    refetch: getGeneralSettings,
  } = useQuery<ReactQueryResponse<IGeneralSettingsResponse>>('get-scrutiny-results', async () => {
    return await axios.get(`/GeneralSettings/get-general-settings/`)
  })

  const setGeneralSettings = (payload: IGeneralSettingsResponse) => {
    dispatchGeneralSettings({type: GeneralSettingsKind.SET_GENERAL_SETTINGS, payload})
  }

  const setGeneralSettingsForm = (payload: GeneralSettingsForm[]) => {
    dispatchGeneralSettings({type: GeneralSettingsKind.SET_GENERAL_SETTINGS_FORM, payload})
  }

  const setIsFormLoading = (payload: boolean) => {
    dispatchGeneralSettings({type: GeneralSettingsKind.SET_IS_FORM_LOADING, payload})
  }

  useEffect(() => {
    if (!isFetching && generalSettingsData) {
      setGeneralSettings(generalSettingsData?.data.response)
    }
  }, [isFetching, generalSettingsData])

  return {
    generalSettingsState,
    setGeneralSettingsForm,
    isLoading: isFetching || generalSettingsState.isFormLoading,
  }
}
