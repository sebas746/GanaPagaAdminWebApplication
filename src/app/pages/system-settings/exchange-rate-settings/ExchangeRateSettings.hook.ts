import {useEffect, useReducer} from 'react'
import {IExchangeRateSettingsResponse} from '../../../../types/ExchangeRateSettings.types'
import {ReactQueryResponse} from '../../../../types/Generics'
import axios from '../../../config/http-common'
import {useMutation, useQuery} from 'react-query'
import {enqueueSnackbar} from 'notistack'
import {AxiosError} from 'axios'
import {DateTime} from 'luxon'

enum ExchangeRateSettingsKind {
  SET_EXCHANGE_RATE = 'SET_EXCHANGE_RATE',
  SET_IS_LOADING = 'SET_IS_LOADING',
}

interface ExchangeRateSettingsStateAction {
  type: ExchangeRateSettingsKind
  payload: IExchangeRateSettingsResponse | boolean
}

interface ExchangeRateSettingsState {
  exchangeRateSettings: IExchangeRateSettingsResponse
  isLoadingExchangeRate: boolean
}

export const exchangeRateSettingsReducer = (
  state: ExchangeRateSettingsState,
  action: ExchangeRateSettingsStateAction
) => {
  switch (action.type) {
    case ExchangeRateSettingsKind.SET_EXCHANGE_RATE:
      return {
        ...state,
        exchangeRateSettings: action.payload as IExchangeRateSettingsResponse,
      }
    case ExchangeRateSettingsKind.SET_IS_LOADING:
      return {
        ...state,
        isLoadingExchangeRate: action.payload as boolean,
      }
  }
}

export const useExchangeRateSettings = () => {
  const [exchangeRateSettingsState, dispatchExchangeRateSettings] = useReducer(
    exchangeRateSettingsReducer,
    {
      exchangeRateSettings: {
        exchangeRateDate: DateTime.now().toFormat('yyyy-MM-dd').toString(),
      } as IExchangeRateSettingsResponse,
      isLoadingExchangeRate: false,
    }
  )

  const {
    data: exchangeRateSettingsData,
    isFetching,
    refetch: getExchangeRateSettings,
  } = useQuery<ReactQueryResponse<IExchangeRateSettingsResponse>>(
    'get-email-scrutiny-settings',
    async () => {
      const now = new Date()
      const formattedDate = now.toISOString().slice(0, 10)
      return await axios.get(
        `/ExchangeRate/get-exchange-rate/date/${
          DateTime.fromISO(
            exchangeRateSettingsState.exchangeRateSettings.exchangeRateDate
          ).toFormat('yyyy-MM-dd') ?? formattedDate
        }`
      )
    }
  )

  const setExchangeRateSettings = (payload: IExchangeRateSettingsResponse) => {
    dispatchExchangeRateSettings({type: ExchangeRateSettingsKind.SET_EXCHANGE_RATE, payload})
  }

  const setExchangeRateDate = (date: string) => {
    dispatchExchangeRateSettings({
      type: ExchangeRateSettingsKind.SET_EXCHANGE_RATE,
      payload: {exchangeRateDate: date, exchangeRateValue: 0},
    })
  }

  useEffect(() => {
    if (!isFetching && exchangeRateSettingsData) {
      setExchangeRateSettings(exchangeRateSettingsData.data.response)
    }
  }, [exchangeRateSettingsData])

  const {mutate: addExchangeRateSettings, isLoading: isSavingExchangeRateSettings} = useMutation({
    mutationFn: async (body: IExchangeRateSettingsResponse) => {
      return await axios.post(`/ExchangeRate/add-exchange-rate`, body)
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
      getExchangeRateSettings()
    }, 1)
  }

  useEffect(() => {
    if (!isFetching) {
      getExchangeRateSettings()
    }
  }, [exchangeRateSettingsState.exchangeRateSettings.exchangeRateDate])

  return {
    isLoading: isFetching,
    exchangeRateSettingsState,
    addExchangeRateSettings,
    isLoadingForm: isSavingExchangeRateSettings,
    setExchangeRateDate,
  }
}

export {}
