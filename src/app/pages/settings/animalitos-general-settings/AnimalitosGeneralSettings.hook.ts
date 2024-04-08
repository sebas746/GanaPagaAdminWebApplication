import { useMutation, useQuery } from 'react-query'
import { ReactQueryResponse } from '../../../../types/Generics'
import axios from '../../../config/http-common'
import {
  IAnimalitoUpdateGeneralSettings,
  IAnimalitoUpdateSettings,
  IGeneralSettingsAnimalitosResponse,
  ISettingsAnimalitosResponse,
} from '../../../../types/Animalitos.types'
import { useEffect, useState } from 'react'
import { enqueueSnackbar } from 'notistack'
import { AxiosError } from 'axios'
import { getStoragePromoterId } from '../../../helpers/localstorage.helper'

export const useAnimalitosGeneralSettings = () => {
  const [animalitosGeneralSettings, setAnimalitosGeneralSettings] = useState(
    [] as IGeneralSettingsAnimalitosResponse[]
  )
  const [activeTab, setActiveTab] = useState(1)
  const onChangeTab = (tab: number) => {
    setActiveTab(tab)
  }
  const { isFetching, refetch: getAnimalitosSettings } = useQuery<
    ReactQueryResponse<IGeneralSettingsAnimalitosResponse[]>
  >(
    'get-animalitos-settings',
    async () => {
      return await axios.get(`/AnimalitosLotterySettings/get-animalitos-lottery-settings/promoterId/${getStoragePromoterId()}`)
    },
    {
      onSuccess: (res) => {
        setAnimalitosGeneralSettings(res.data.response)
      },
      onError: (err) => {
        console.log(err)
      },
    }
  )

  useEffect(() => {
    if (!animalitosGeneralSettings.length && !isFetching) {
      getAnimalitosSettings()
    }
  }, [])

  const handleSuccessResponse = () => {
    enqueueSnackbar('La configuración general de animalitos se ha actualizado correctamente', {
      variant: 'success',
      hideIconVariant: true,
    })
    getAnimalitosSettings()
  }

  const handleErrorResponse = (errorMessage: string) => {
    enqueueSnackbar(errorMessage, {
      variant: 'error',
      hideIconVariant: true,
    })
  }

  const { mutate: updateGeneralLotterySettings, isLoading: isUpdatingSettings } = useMutation({
    mutationFn: async (body: IAnimalitoUpdateGeneralSettings[]) => {
      return await axios.post(
        `/AnimalitosLotterySettings/update-animalitos-lottery-general-settings/promoterId/${getStoragePromoterId()}`,
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
    animalitosGeneralSettings,
    isFetching,
    updateGeneralLotterySettings,
    isUpdatingSettings,
    onChangeTab,
    activeTab,
  }
}
