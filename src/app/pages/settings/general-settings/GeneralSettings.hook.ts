import {useEffect, useReducer, useState} from 'react'
import {IGeneralSettingsResponse} from '../../../../types/GeneralSettings.types'
import {CurrentGeneralSettings, GeneralSettingsForm} from '../../../../types/Forms.types'
import axios from '../../../config/http-common'
import {ReactQueryResponse} from '../../../../types/Generics'
import {useMutation, useQuery} from 'react-query'
import {enqueueSnackbar} from 'notistack'

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
  const [showModal, setShowModal] = useState(false)
  const [currentSettings, setCurrentSettings] = useState<CurrentGeneralSettings[]>()

  const {
    data: generalSettingsData,
    isFetching,
    refetch: getGeneralSettings,
  } = useQuery<ReactQueryResponse<IGeneralSettingsResponse>>('get-general-settings', async () => {
    return await axios.get(`/GeneralSettings/get-general-settings`)
  })

  const {mutate: updateGeneralSettings, isLoading: submitIsLoading} = useMutation({
    mutationFn: async (body: GeneralSettingsForm[]) => {
      return await axios.post('/GeneralSettings/update-general-settings', body)
    },
    onSuccess(data, variables, context) {
      handleSuccessResponse(data)
      setGeneralSettings({} as IGeneralSettingsResponse)
      getGeneralSettings()
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
      enqueueSnackbar(data.data.response, {
        variant: 'success',
        hideIconVariant: true,
      })
    }
    setShowModal(false)
  }

  const setGeneralSettings = (payload: IGeneralSettingsResponse) => {
    dispatchGeneralSettings({type: GeneralSettingsKind.SET_GENERAL_SETTINGS, payload})
  }

  const buildCurrentSettingsData = (data: Object): CurrentGeneralSettings[] => {
    return Object.entries(data).map(([key, value]) => ({
      generalSettingsName: key,
      generalSettingsLabel:
        generalSettingsState.generalSettings.generalSettings.find(
          (e) => e.generalSettingsName === key
        )?.generalSettingsLabel ?? '',
      generalSettingsValue: value,
      generalSettingsCurrentValue:
        generalSettingsState.generalSettings.generalSettings.find(
          (e) => e.generalSettingsName === key
        )?.generalSettingsValue ?? '',
    }))
  }

  const buildGeneralSettingsJson = (data: Object): GeneralSettingsForm[] => {
    return Object.entries(data).map(([key, value]) => ({
      generalSettingsName: key,
      generalSettingsValue: value.toString(),
    }))
  }

  const onConfirmSettingsUpdate = () => {
    if (generalSettingsState.generalSettingsForm.length > 0) {
      updateGeneralSettings(generalSettingsState.generalSettingsForm)
    }
  }

  const setGeneralSettingsForm = (data: any) => {
    const payload = buildGeneralSettingsJson(data)
    setCurrentSettings(buildCurrentSettingsData(data))
    if (payload.length > 0) {
      dispatchGeneralSettings({type: GeneralSettingsKind.SET_GENERAL_SETTINGS_FORM, payload})
      setShowModal(true)
    }
  }

  const setIsFormLoading = (payload: boolean) => {
    dispatchGeneralSettings({type: GeneralSettingsKind.SET_IS_FORM_LOADING, payload})
  }

  useEffect(() => {
    if (!isFetching && !generalSettingsData) {
      getGeneralSettings()
    }
  })

  useEffect(() => {
    if (!isFetching && generalSettingsData) {
      setGeneralSettings(generalSettingsData?.data.response)
    }
  }, [isFetching, generalSettingsData])

  return {
    generalSettingsState,
    setGeneralSettingsForm,
    isLoading: isFetching || generalSettingsState.isFormLoading,
    submitIsLoading,
    setShowModal,
    onConfirmSettingsUpdate,
    showModal,
    currentSettings,
  }
}
