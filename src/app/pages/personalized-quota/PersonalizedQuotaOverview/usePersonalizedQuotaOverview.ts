import {useMutation, useQuery} from 'react-query'
import {useCreatePersonalizedQuota} from '../CreatePersonalizedQuota/useCreatePersonalizedQuota'
import axios from '../../../config/http-common'
import {useEffect, useState} from 'react'
import {
  IAllAnimalitosQuotaResponse,
  IAnimalitosLotteries,
  IDeleteAnimalitosQuota,
} from '../../../../types/Animalitos.types'
import {QueryResponse, ReactQueryResponse} from '../../../../types/Generics'
import {enqueueSnackbar} from 'notistack'
import {AxiosResponse} from 'axios'

export const usePersonalizedQuotaOverview = () => {
  const {
    lotteryData,
    selectedLottery,
    onChangeLottery,
    isFetching: isFetchingLotteries,
  } = useCreatePersonalizedQuota()
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)

  const [deleteAnimalitosQuota, setDeleteAnimalitosQuota] = useState<IDeleteAnimalitosQuota>(
    {} as IDeleteAnimalitosQuota
  )

  const [personalizedQuotaAnimalName, setPersonalizedQuotaAnimalName] = useState<string>('')
  const [personalizedQuotaLotteryName, setPersonalizedQuotaLotteryName] = useState<string>('')

  const [showModal, setShowModal] = useState<boolean>(false)

  const pageSizeArray = [10, 25, 50, 100]

  const onChangePageSizes = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value))
    setPageIndex(0)
  }

  const onChangePageIndex = (event: React.ChangeEvent<HTMLSelectElement>, page: number) => {
    setPageIndex(page)
  }

  const onShowModal = () => {
    setShowModal(true)
  }

  const onHandleCloseModal = () => {
    setShowModal(false)
  }

  const onChangeDeleteAnimalitosQuota = (lotteryId: number, animalitoId: number, lotteryName: string, animalName: string) => {
    setDeleteAnimalitosQuota({
      lotteryId,
      animalitoId,
    })
    setPersonalizedQuotaAnimalName(animalName)
    setPersonalizedQuotaLotteryName(lotteryName)

    onShowModal()
  }

  const handleDeleteAnimalitosQuota = () => {
    deletePersonalizedQuota(deleteAnimalitosQuota)
  }

  const {
    data: listPersonalizedAnimalitosQuota,
    isLoading: isLoadingCreatedPersonalizedAnimalitosQuota,
    isRefetching: isRefetchingCreatedPersonalizedAnimalitosQuota,
    refetch: getAllAnimalitosPersonalizedQuota,
  } = useQuery<ReactQueryResponse<IAllAnimalitosQuotaResponse>>({
    queryKey: ['createdPersonalizedAnimalitosQuota', selectedLottery],
    queryFn: async () => {
      let url = `/AnimalitosMaxOverallBet/get-animalitos-max-overall-paginated?pageIndex=${pageIndex}&pageSize=${pageSize}`
      if (selectedLottery !== 0) {
        url = `/AnimalitosMaxOverallBet/get-animalitos-max-overall-paginated?pageIndex=${pageIndex}&pageSize=${pageSize}&lotteryId=${selectedLottery}`
      }
      return await axios.get(url)
    },
    refetchOnWindowFocus: false,
  })

  const {mutate: deletePersonalizedQuota, isLoading} = useMutation<
    AxiosResponse<QueryResponse<string>>,
    QueryResponse<string>,
    IDeleteAnimalitosQuota
  >({
    mutationFn: async (body) => {
      return await axios.delete(
        `/AnimalitosMaxOverallBet/delete-animalitos-max-overall/lotteryId/${body.lotteryId}/animalitoId/${body.animalitoId}`
      )
    },
    onSuccess: (response) => {
      onHandleCloseModal()
      if (pageIndex === 0) {
        getAllAnimalitosPersonalizedQuota()
      } else {
        setPageIndex(0)
      }

      enqueueSnackbar(response.data.message, {
        variant: 'success',
        hideIconVariant: true,
      })
    },
    onError: () => {
        enqueueSnackbar('Ha ocurrido un error al eliminar el cupo.', {
        variant: 'error',
        hideIconVariant: true,
      })
    },
  })

  useEffect(() => {
    getAllAnimalitosPersonalizedQuota()
  }, [pageSize, pageIndex])

  return {
    isFetching:
      isFetchingLotteries ||
      isLoadingCreatedPersonalizedAnimalitosQuota ||
      isRefetchingCreatedPersonalizedAnimalitosQuota,
    lotteries: lotteryData as IAnimalitosLotteries[],
    listPersonalizedAnimalitosQuota: listPersonalizedAnimalitosQuota?.data?.response ?? {
      items: [],
      totalCount: 0,
    },
    deletePersonalizedQuota,
    handleDeleteAnimalitosQuota,
    isDeletingQuota: isLoading,
    onChangeDeleteAnimalitosQuota,
    onChangeLottery,
    onChangePageIndex,
    onChangePageSizes,
    onHandleCloseModal,
    onShowModal,
    pageIndex,
    pageSize,
    pageSizeArray,
    selectedLottery,
    setPageIndex,
    setPageSize,
    showModal,
    personalizedQuotaAnimalName,
    personalizedQuotaLotteryName,
  }
}
