import {useMutation, useQuery} from 'react-query'
import {ReactQueryResponse} from '../../../../types/Generics'
import axios from '../../../config/http-common'
import {useEffect, useState} from 'react'
import {enqueueSnackbar} from 'notistack'
import {AxiosError} from 'axios'
import {
  ISettingsChance4DigitsResponse,
  IChance4DigitsUpdateSettings,
} from '../../../../types/Chance4Digits.types'

export const useChance4DigitsSettings = () => {
  const [chance4DigitsSettings, setChance4DigitsSettings] = useState(
    [] as ISettingsChance4DigitsResponse[]
  )
  const [activeTab, setActiveTab] = useState(1)
  const onChangeTab = (tab: number) => {
    setActiveTab(tab)
  }
  const {isFetching, refetch: getChance4DigitsSettings} = useQuery<
    ReactQueryResponse<ISettingsChance4DigitsResponse[]>
  >(
    'get-chance-3digits-settings',
    async () => {
      return await axios.get(`/ChanceFourLotterySettings/get-chance-four-lottery-settings`)
    },
    {
      onSuccess: (res) => {
        setChance4DigitsSettings(res.data.response)
      },
      onError: (err) => {
        console.log(err)
      },
    }
  )

  useEffect(() => {
    if (!chance4DigitsSettings.length && !isFetching) {
      getChance4DigitsSettings()
    }
  }, [])

  const handleSuccessResponse = () => {
    enqueueSnackbar('La configuración de chance de 4 dígitos se ha actualizado correctamente', {
      variant: 'success',
      hideIconVariant: true,
    })
    getChance4DigitsSettings()
  }

  const handleErrorResponse = (errorMessage: string) => {
    enqueueSnackbar(errorMessage, {
      variant: 'error',
      hideIconVariant: true,
    })
  }

  const {mutate: updateLotterySettings, isLoading: isUpdatingSettings} = useMutation({
    mutationFn: async (body: IChance4DigitsUpdateSettings[]) => {
      return await axios.post(
        `/ChanceFourLotterySettings/update-chance-four-lottery-settings/lotteryId/${activeTab}`,
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
    chance4DigitsSettings,
    isFetching,
    updateLotterySettings,
    isUpdatingSettings,
    onChangeTab,
    activeTab,
  }
}
