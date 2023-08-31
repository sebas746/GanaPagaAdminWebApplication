import {useEffect, useReducer, useState} from 'react'
import {IEmailScrutinySettingsResponse} from '../../../../types/ScrutinySettings.types'
import {ReactQueryResponse} from '../../../../types/Generics'
import axios from '../../../config/http-common'
import {useMutation, useQuery} from 'react-query'
import {enqueueSnackbar} from 'notistack'
import {AxiosError} from 'axios'

enum EmailScrutinySettingsKind {
  SET_EMAILS_SETTINGS = 'SET_EMAILS_SETTINGS',
  SET_EMAIL_ID = 'SET_EMAIL_ID',
  SET_EMAIL = 'SET_EMAIL',
  SET_EMAIL_SETTINGS = 'SET_EMAIL_SETTINGS',
  SET_ACTION = 'SET_ACTION',
}

export type EmailScrutinyActions = 'create' | 'update' | 'delete'

interface EmailScrutinySettingsStateAction {
  type: EmailScrutinySettingsKind
  payload:
    | IEmailScrutinySettingsResponse[]
    | number
    | string
    | IEmailScrutinySettingsResponse
    | EmailScrutinyActions
}

interface EmailScrutinySettingsState {
  scrutinyEmailSettings: IEmailScrutinySettingsResponse[]
  emailId: number
  email: string
  scrutinyEmailSetting: IEmailScrutinySettingsResponse
  action: EmailScrutinyActions
}

export const emailScrutinySettingsReducer = (
  state: EmailScrutinySettingsState,
  action: EmailScrutinySettingsStateAction
) => {
  switch (action.type) {
    case EmailScrutinySettingsKind.SET_EMAILS_SETTINGS:
      return {
        ...state,
        scrutinyEmailSettings: action.payload as IEmailScrutinySettingsResponse[],
      }
    case EmailScrutinySettingsKind.SET_EMAIL_ID:
      return {
        ...state,
        emailId: action.payload as number,
      }
    case EmailScrutinySettingsKind.SET_EMAIL:
      return {
        ...state,
        email: action.payload as string,
      }
    case EmailScrutinySettingsKind.SET_EMAIL_SETTINGS:
      return {
        ...state,
        scrutinyEmailSetting: action.payload as IEmailScrutinySettingsResponse,
      }
    case EmailScrutinySettingsKind.SET_ACTION:
      return {
        ...state,
        action: action.payload as EmailScrutinyActions,
      }
  }
}

export const useEmailScrutinySettings = () => {
  const [emailScrutinySettingsState, dispatchEmailScrutinySettings] = useReducer(
    emailScrutinySettingsReducer,
    {
      scrutinyEmailSettings: [] as IEmailScrutinySettingsResponse[],
      emailId: 0,
      email: '',
      scrutinyEmailSetting: {} as IEmailScrutinySettingsResponse,
      action: {} as EmailScrutinyActions,
    }
  )
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)

  const {
    data: emailScrutinySettingsData,
    isFetching,
    refetch: getEmailScrutinySettings,
  } = useQuery<ReactQueryResponse<IEmailScrutinySettingsResponse[]>>(
    'get-email-scrutiny-settings',
    async () => {
      return await axios.get(`/ScrutinySettings/get-admin-emails`)
    }
  )

  const {mutate: deleteEmailScrutinySettings, isLoading: isDeleting} = useMutation({
    mutationFn: async () => {
      return await axios.delete(
        `/ScrutinySettings/delete-admin-email/emailId/${emailScrutinySettingsState.emailId}`
      )
    },
    onSuccess(data) {
      handleSuccessResponse(data)
      setShowDeleteModal(false)
    },
    onError(error: AxiosError<ReactQueryResponse<string>>) {
      handleErrorResponse(error.toString())
    },
  })

  const {mutate: createEmailScrutinySettings, isLoading: isCreatingSettings} = useMutation({
    mutationFn: async (body: IEmailScrutinySettingsResponse) => {
      body.adminEmailId = undefined
      return await axios.post(`/ScrutinySettings/add-admin-email`, body)
    },
    onSuccess(data) {
      handleSuccessResponse(data)
    },
    onError(error: AxiosError<ReactQueryResponse<string>>) {
      handleErrorResponse(error.toString())
    },
  })

  const {mutate: updateEmailScrutinySettings, isLoading: isUpdatingSettings} = useMutation({
    mutationFn: async (body: IEmailScrutinySettingsResponse) => {
      body.adminEmailId = emailScrutinySettingsState.emailId
      return await axios.put(`/ScrutinySettings/update-admin-email`, body)
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
      enqueueSnackbar(data.data.response, {
        variant: 'success',
        hideIconVariant: true,
      })
    }
    setShowFormModal(false)
    setTimeout(() => {
      getEmailScrutinySettings()
    }, 1)
  }

  useEffect(() => {
    if (!showFormModal) {
      setEmailId(0, {} as EmailScrutinyActions)
      setEmailScrutinySetting({} as IEmailScrutinySettingsResponse)
    }
  }, [showFormModal])

  const setEmailScrutinySetting = (payload: IEmailScrutinySettingsResponse) => {
    dispatchEmailScrutinySettings({type: EmailScrutinySettingsKind.SET_EMAIL_SETTINGS, payload})
  }

  const setEmailScrutinySettings = (payload: IEmailScrutinySettingsResponse[]) => {
    dispatchEmailScrutinySettings({type: EmailScrutinySettingsKind.SET_EMAILS_SETTINGS, payload})
  }

  const setEmailId = (payload: number | undefined, action: EmailScrutinyActions | undefined) => {
    if (payload || payload === 0) {
      dispatchEmailScrutinySettings({type: EmailScrutinySettingsKind.SET_EMAIL_ID, payload})
    }
    if (action) {
      dispatchEmailScrutinySettings({type: EmailScrutinySettingsKind.SET_ACTION, payload: action})
    }
  }

  const setEmail = (payload: string) => {
    dispatchEmailScrutinySettings({type: EmailScrutinySettingsKind.SET_EMAIL, payload})
  }

  const handleDeleteConfirmation = () => {
    if (emailScrutinySettingsState.action === 'delete') {
      deleteEmailScrutinySettings()
    }
  }

  const handleClickForm = (body: IEmailScrutinySettingsResponse) => {
    if (emailScrutinySettingsState.action === 'create') {
      createEmailScrutinySettings(body)
    } else if (emailScrutinySettingsState.action === 'update') {
      updateEmailScrutinySettings(body)
    }
  }

  useEffect(() => {
    const {emailId, scrutinyEmailSettings, action} = emailScrutinySettingsState

    if (emailId < 0) return // Use a guard clause to exit early

    const emailObj = scrutinyEmailSettings.find((e) => e.adminEmailId === emailId)
    const email = emailObj?.adminEmailEmail

    if (emailScrutinySettingsState.action === 'create') {
      dispatchEmailScrutinySettings({type: EmailScrutinySettingsKind.SET_EMAIL_ID, payload: 0})
      setTimeout(() => {
        setShowFormModal(true)
      }, 1)
    }

    if (!email || !emailObj) return
    switch (action) {
      case 'delete':
        setEmail(email)
        setShowDeleteModal(true)
        break
      case 'update':
        setEmailScrutinySetting(emailObj)
        setTimeout(() => {
          setShowFormModal(true)
        }, 1)
        break
    }
  }, [emailScrutinySettingsState.emailId, emailScrutinySettingsState.action])

  useEffect(() => {
    if (!isFetching && emailScrutinySettingsData) {
      setEmailScrutinySettings(emailScrutinySettingsData?.data.response)
    }
  }, [isFetching, emailScrutinySettingsData])

  return {
    isLoading: isFetching,
    emailScrutinySettingsState,
    isDeleting: isDeleting,
    setEmailId,
    showDeleteModal,
    setShowDeleteModal,
    handleDeleteConfirmation,
    handleClickForm: handleClickForm,
    isSaving: isUpdatingSettings || isCreatingSettings,
    showFormModal,
    setShowFormModal,
  }
}
