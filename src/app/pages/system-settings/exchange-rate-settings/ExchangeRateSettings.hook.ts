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
      exchangeRateSettings: {} as IExchangeRateSettingsResponse,
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
      return await axios.get(`/CurrencyExchangeRate/get-currency-exchange-rate`)
    }
  )

  const setExchangeRateSettings = (payload: IExchangeRateSettingsResponse) => {
    dispatchExchangeRateSettings({type: ExchangeRateSettingsKind.SET_EXCHANGE_RATE, payload})
  }

  useEffect(() => {
    if (!isFetching && exchangeRateSettingsData) {
      console.log('111')
      setExchangeRateSettings(exchangeRateSettingsData.data.response)
    }
  }, [exchangeRateSettingsData])

  const {mutate: addExchangeRateSettings, isLoading: isSavingExchangeRateSettings} = useMutation({
    mutationFn: async (body: IExchangeRateSettingsResponse) => {
      return await axios.post(`/CurrencyExchangeRate/add-currency-exchange-rate`, body)
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

  return {
    isLoading: isFetching,
    exchangeRateSettingsState,
    addExchangeRateSettings,
    isLoadingForm: isSavingExchangeRateSettings,
  }
}

export {}
