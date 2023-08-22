import {useMutation, useQuery} from 'react-query'
import {ReactQueryResponse} from '../../../../types/Generics'
import axios from '../../../config/http-common'
import {
  IAnimalitoUpdateSettings,
  ISettingsAnimalitosResponse,
} from '../../../../types/Animalitos.types'
import {useEffect, useState} from 'react'
import {enqueueSnackbar} from 'notistack'
import {AxiosError} from 'axios'

export const useAnimalitosSettings = () => {
  const [animalitosSettings, setAnimalitosSettings] = useState([] as ISettingsAnimalitosResponse[])
  const [activeTab, setActiveTab] = useState(1)
  const onChangeTab = (tab: number) => {
    setActiveTab(tab)
  }
  const {isFetching, refetch: getAnimalitosSettings} = useQuery<
    ReactQueryResponse<ISettingsAnimalitosResponse[]>
  >(
    'get-animalitos-settings',
    async () => {
      return await axios.get(`/AnimalitosLotterySettings/get-animalitos-lottery-settings/`)
    },
    {
      onSuccess: (res) => {
        setAnimalitosSettings(res.data.response)
      },
      onError: (err) => {
        console.log(err)
      }
    }
  )

  useEffect(() => {
    if(!animalitosSettings.length&& !isFetching) {
      getAnimalitosSettings()
    }
  }, [])

  const handleSuccessResponse = () => {
    enqueueSnackbar(
      'Se ha actualizado correctamente',
      {
        variant: 'success',
        hideIconVariant: true,
      }
    )
    getAnimalitosSettings()
  }

  const handleErrorResponse = (errorMessage: string) => {
    enqueueSnackbar(
      errorMessage,
      {
        variant: 'error',
        hideIconVariant: true,
      }
    )
  }

  const {mutate: updateLotterySettings, isLoading: isUpdatingSettings} = useMutation({
    mutationFn: async (body: IAnimalitoUpdateSettings[]) => {
      return await axios.post(
        `/AnimalitosLotterySettings/update-animalitos-lottery-settings/lotteryId/${activeTab}`,
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
    animalitosSettings,
    isFetching,
    updateLotterySettings,
    isUpdatingSettings,
    onChangeTab,
    activeTab
  }
}
