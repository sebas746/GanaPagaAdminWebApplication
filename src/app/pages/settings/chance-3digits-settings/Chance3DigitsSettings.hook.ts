import {useMutation, useQuery} from 'react-query'
import {ReactQueryResponse} from '../../../../types/Generics'
import axios from '../../../config/http-common'
import {useEffect, useState} from 'react'
import {enqueueSnackbar} from 'notistack'
import {AxiosError} from 'axios'
import {
  ISettingsChance3DigitsResponse,
  IChance3DigitsUpdateSettings,
} from '../../../../types/Chance3Digits.types'

export const useChance3DigitsSettings = () => {
  const [chance3DigitsSettings, setChance3DigitsSettings] = useState(
    [] as ISettingsChance3DigitsResponse[]
  )
  const [activeTab, setActiveTab] = useState(1)
  const onChangeTab = (tab: number) => {
    setActiveTab(tab)
  }
  const {isFetching, refetch: getChance3DigitsSettings} = useQuery<
    ReactQueryResponse<ISettingsChance3DigitsResponse[]>
  >(
    'get-chance-3digits-settings',
    async () => {
      return await axios.get(`/ChanceThreeLotterySettings/get-chance-three-lottery-settings`)
    },
    {
      onSuccess: (res) => {
        setChance3DigitsSettings(res.data.response)
      },
      onError: (err) => {
        console.log(err)
      },
    }
  )

  useEffect(() => {
    if (!chance3DigitsSettings.length && !isFetching) {
      getChance3DigitsSettings()
    }
  }, [])

  const handleSuccessResponse = () => {
    enqueueSnackbar('La configuración de chance de 3 cifras se ha actualizado correctamente', {
      variant: 'success',
      hideIconVariant: true,
    })
    getChance3DigitsSettings()
  }

  const handleErrorResponse = (errorMessage: string) => {
    enqueueSnackbar(errorMessage, {
      variant: 'error',
      hideIconVariant: true,
    })
  }

  const {mutate: updateLotterySettings, isLoading: isUpdatingSettings} = useMutation({
    mutationFn: async (body: IChance3DigitsUpdateSettings[]) => {
      return await axios.post(
        `/ChanceThreeLotterySettings/update-chance-three-lottery-settings/lotteryId/${activeTab}`,
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
    chance3DigitsSettings,
    isFetching,
    updateLotterySettings,
    isUpdatingSettings,
    onChangeTab,
    activeTab,
  }
}
