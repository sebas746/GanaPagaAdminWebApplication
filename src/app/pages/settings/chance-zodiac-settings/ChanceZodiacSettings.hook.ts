import { useMutation, useQuery } from 'react-query'
import { ReactQueryResponse } from '../../../../types/Generics'
import axios from '../../../config/http-common'
import { useEffect, useState } from 'react'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import {
  IChanceZodiacUpdateSettings,
  ISettingsChanceZodiacResponse,
} from '../../../../types/ChanceZodiac.types'
import { getStoragePromoterId } from '../../../helpers/localstorage.helper'

export const useChanceZodiacSettings = () => {
  const [chanceZodiacSettings, setChanceZodiacSettings] = useState(
    [] as ISettingsChanceZodiacResponse[]
  )
  const [activeTab, setActiveTab] = useState(1)
  const onChangeTab = (tab: number) => {
    setActiveTab(tab)
  }
  const { isFetching, refetch: getChanceZodiacSettings } = useQuery<
    ReactQueryResponse<ISettingsChanceZodiacResponse[]>
  >(
    'get-chance-3-settings',
    async () => {
      return await axios.get(`/ChanceZodiacLotterySettings/get-chance-zodiac-lottery-settings/promoterId/${getStoragePromoterId()}`)
    },
    {
      onSuccess: (res) => {
        setChanceZodiacSettings(res.data.response)
      },
      onError: (err) => {
        console.log(err)
      },
    }
  )

  useEffect(() => {
    if (!chanceZodiacSettings.length && !isFetching) {
      getChanceZodiacSettings()
    }
  }, [])

  const handleSuccessResponse = () => {
    enqueueSnackbar('La configuración de chance zodiacal se ha actualizado correctamente', {
      variant: 'success',
      hideIconVariant: true,
    })
    getChanceZodiacSettings()
  }

  const handleErrorResponse = (errorMessage: string) => {
    enqueueSnackbar(errorMessage, {
      variant: 'error',
      hideIconVariant: true,
    })
  }

  const { mutate: updateLotterySettings, isLoading: isUpdatingSettings } = useMutation({
    mutationFn: async (body: IChanceZodiacUpdateSettings[]) => {
      return await axios.post(
        `/ChanceZodiacLotterySettings/update-chance-zodiac-lottery-settings/lotteryId/${activeTab}/promoterId/${getStoragePromoterId()}`,
        body
      )
    },
    onSuccess() {
      handleSuccessResponse()
    },
    onError(error: AxiosError<ReactQueryResponse<string>>) {
      handleErrorResponse(error.toString())
    },
  })

  return {
    chanceZodiacSettings,
    isFetching,
    updateLotterySettings,
    isUpdatingSettings,
    onChangeTab,
    activeTab,
  }
}
