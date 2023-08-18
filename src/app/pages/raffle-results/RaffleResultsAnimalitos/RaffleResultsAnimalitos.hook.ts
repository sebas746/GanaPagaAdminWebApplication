import {useMutation, useQuery, useQueryClient} from 'react-query'
import axios from '../../../config/http-common'
import {useEffect, useReducer, useState} from 'react'
import {
  AddRaffleAnimalitosResultBody,
  IAnimalitosLotteries,
  IRaffleResultAnimalitosDetail,
  IRaffleResultAnimalitosResponse,
} from '../../../../types/Animalitos.types'
import {QueryResponse, ReactQueryResponse} from '../../../../types/Generics'
import {RaffleResultsForm} from '../../../../types/Forms.types'
import {DateTime} from 'luxon'
import raffleResultForm from '../../../components/Forms/RaffleResultForm/RaffleResultForm'
import {batch} from '@preact/signals-react'
import {enqueueSnackbar} from 'notistack'
import {useAuth} from 'oidc-react'
import {useAnimalitosLotteries} from '../../../hooks/animalitosLotteries.hook'

enum RaffleResultsAnimalitosKind {
  SET_IS_LOADING_ANIMALITOS_LOTTERIES = 'SET_IS_LOADING_ANIMALITOS_LOTTERIES',
  SET_RAFFLE_FORM = 'SET_RAFFLE_FORM',
  SET_SELECTED_TAB = 'SET_SELECTED_TAB',
  SET_RAFFLE_RESULTS_BY_LOTTERY = 'SET_RAFFLE_RESULTS_BY_LOTTERY',
}

interface RaffleResultsAnimalitosAction {
  type: RaffleResultsAnimalitosKind
  payload: boolean | RaffleResultsForm | number | IRaffleResultAnimalitosResponse[]
}

interface RaffleResultsAnimalitosState {
  isLoadingAnimalitosLotteries: boolean
  selectedTab: number
  raffleResultForm: RaffleResultsForm
  raffleResultsByLottery: IRaffleResultAnimalitosResponse[]
}

export const raffleResultReducer = (
  state: RaffleResultsAnimalitosState,
  action: RaffleResultsAnimalitosAction
) => {
  switch (action.type) {
    case RaffleResultsAnimalitosKind.SET_IS_LOADING_ANIMALITOS_LOTTERIES:
      return {
        ...state,
        isLoadingAnimalitosLotteries: action.payload as boolean,
      }
    case RaffleResultsAnimalitosKind.SET_RAFFLE_FORM:
      return {
        ...state,
        raffleResultForm: action.payload as RaffleResultsForm,
      }
    case RaffleResultsAnimalitosKind.SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payload as number,
      }
    case RaffleResultsAnimalitosKind.SET_RAFFLE_RESULTS_BY_LOTTERY:
      return {
        ...state,
        raffleResultsByLottery: action.payload as IRaffleResultAnimalitosResponse[],
      }

    default:
      return state
  }
}

export const useRaffleResultsAnimalitos = () => {
  const auth = useAuth()
  const {animalitosLotteriesState} = useAnimalitosLotteries()
  const [raffleResultState, dispatchRaffleResult] = useReducer(raffleResultReducer, {
    isLoadingAnimalitosLotteries: false,
    selectedTab: 1,
    raffleResultForm: {
      date: DateTime.now().toFormat('yyyy-MM-dd').toString(),
      raffleResultStateId: '',
    },
    raffleResultsByLottery: [],
  })

  const [createdBy, setCreatedBy] = useState(auth.userData?.profile.preferred_username)

  const {isFetching, refetch: getRaffleResultsByDateLottery} = useQuery<
    ReactQueryResponse<IRaffleResultAnimalitosResponse[]>
  >(
    'get-raffle-result-results-by-lottery',
    async () => {
      dispatchRaffleResult({
        type: RaffleResultsAnimalitosKind.SET_IS_LOADING_ANIMALITOS_LOTTERIES,
        payload: true,
      })
      return await axios.get(
        `/AnimalitosRaffleResult/get-animalitos-raffle-result/${
          raffleResultState.raffleResultForm.date
        }${
          raffleResultState.raffleResultForm.raffleResultStateId
            ? '/' + raffleResultState.raffleResultForm.raffleResultStateId
            : ''
        }`
      )
    },
    {
      onSuccess: (res) => {
        dispatchRaffleResult({
          type: RaffleResultsAnimalitosKind.SET_IS_LOADING_ANIMALITOS_LOTTERIES,
          payload: false,
        })
        dispatchRaffleResult({
          type: RaffleResultsAnimalitosKind.SET_RAFFLE_RESULTS_BY_LOTTERY,
          payload: res.data.response,
        })
      },
      onError: (err) => {},
    }
  )

  const {mutate: addRaffleAnimalitosResultMutation, isLoading: loadingAdd} = useMutation({
    mutationFn: async (body: AddRaffleAnimalitosResultBody) => {
      return await axios.post('/AnimalitosRaffleResult/add-animalitos-raffle-result', body)
    },
    onSuccess(data, variables, context) {
      handleSuccessResponse(data)
    },
    onError(error, variables, context) {
      handleErrorResponse()
    },
  })

  const {mutate: updateRaffleAnimalitosResultMutation, isLoading: loadingUpdate} = useMutation({
    mutationFn: async (body: AddRaffleAnimalitosResultBody) => {
      return await axios.put('/AnimalitosRaffleResult/update-animalitos-raffle-result', body)
    },
    onSuccess(data, variables, context) {
      handleSuccessResponse(data)
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

  const {mutate: approveRaffleAnimalitosResultMutation, isLoading: loadingApprove} = useMutation({
    mutationFn: async (body: AddRaffleAnimalitosResultBody) => {
      return await axios.post('/AnimalitosRaffleResult/approve-animalitos-raffle-result', body)
    },
    onSuccess(data, variables, context) {
      handleSuccessResponse(data)
    },
    onError(error, variables, context) {
      handleErrorResponse()
    },
  })

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
      getRaffleResultsByDateLottery()
    }
  }

  const setSelectedTab = (tab: number) => {
    dispatchRaffleResult({
      type: RaffleResultsAnimalitosKind.SET_SELECTED_TAB,
      payload: tab,
    })
  }

  const setRaffleResultForm = async (form: RaffleResultsForm) => {
    dispatchRaffleResult({
      type: RaffleResultsAnimalitosKind.SET_RAFFLE_FORM,
      payload: form,
    })
  }

  useEffect(() => {
    if (!raffleResultState.isLoadingAnimalitosLotteries) {
      getRaffleResultsByDateLottery()
    }
  }, [raffleResultState.raffleResultForm])

  const changeRaffleAnimalitoResult = async (
    raffleDetail: IRaffleResultAnimalitosDetail,
    animalitoSelected: string
  ) => {
    try {
      switch (raffleDetail.animalitosRaffleStatus) {
        case 'PendingResult':
          await addRaffleAnimalitosResultMutation({
            raffleId: Number(raffleDetail.animalitosRaffleId),
            raffleResultValue: animalitoSelected,
          })
          break
        case 'PendingApprove':
          if (animalitoSelected === raffleDetail.animalitosRaffleResultValue) {
            await approveRaffleAnimalitosResultMutation({
              raffleId: Number(raffleDetail.animalitosRaffleId),
              raffleResultValue: animalitoSelected,
            })
          } else {
            await updateRaffleAnimalitosResultMutation({
              raffleId: Number(raffleDetail.animalitosRaffleId),
              raffleResultValue: animalitoSelected,
            })
          }

          break
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    isLoading: isFetching || animalitosLotteriesState.isLoadingAnimalitosLotteries,
    animalitosLotteriesState,
    raffleResultState,
    setSelectedTab,
    setRaffleResultForm,
    changeRaffleAnimalitoResult,
    isLoadingState: loadingAdd || loadingApprove || loadingUpdate,
    createdBy,
  }
}
