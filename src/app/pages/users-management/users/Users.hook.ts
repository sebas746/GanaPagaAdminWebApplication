import {useEffect, useReducer, useState} from 'react'
import {IpaginationResponse} from '../../../../types/Pagination.types'
import {IUsersForm, IUsersResponse, UsersQueryParams} from '../../../../types/Users.types'
import axios from '../../../config/http-users-common'
import {ReactQueryResponse} from '../../../../types/Generics'
import {useMutation, useQuery} from 'react-query'
import {buildUrl} from '../../../helpers/urlBuilder.helpers'
import {AxiosError} from 'axios'
import {enqueueSnackbar} from 'notistack'

enum UsersKind {
  SET_USERS = 'SET_USERS',
  SET_EMAIL = 'SET_EMAIL',
  SET_ACTION = 'SET_ACTION',
  SET_PARAMS = 'SET_PARAMS',
  SET_CURRENT_USER = 'SET_CURRENT_USER',
}

export type UsersActions = 'create' | 'update' | 'delete'

interface UsersStateAction {
  type: UsersKind
  payload:
    | IpaginationResponse<IUsersResponse>
    | string
    | UsersActions
    | UsersQueryParams
    | IUsersResponse
}

interface UsersState {
  usersPaginated: IpaginationResponse<IUsersResponse>
  email: string
  action: UsersActions
  params: UsersQueryParams
  currentUser: IUsersResponse
}

export const usersReducer = (state: UsersState, action: UsersStateAction) => {
  switch (action.type) {
    case UsersKind.SET_USERS:
      return {
        ...state,
        usersPaginated: action.payload as IpaginationResponse<IUsersResponse>,
      }
    case UsersKind.SET_EMAIL:
      return {
        ...state,
        email: action.payload as string,
      }
    case UsersKind.SET_ACTION:
      return {
        ...state,
        action: action.payload as UsersActions,
      }
    case UsersKind.SET_PARAMS:
      return {
        ...state,
        params: {
          ...state.params,
          ...(action.payload as UsersQueryParams),
        },
      }
    case UsersKind.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload as IUsersResponse,
      }
  }
}

export const useUsers = () => {
  const [usersState, dispatchUsers] = useReducer(usersReducer, {
    usersPaginated: {} as IpaginationResponse<IUsersResponse>,
    email: '',
    action: {} as UsersActions,
    params: {baseUrl: '/User/get-users', pageIndex: 0, pageSize: 10} as UsersQueryParams,
    currentUser: {} as IUsersResponse,
  })
  const [tempFilters, setTempFilters] = useState<UsersQueryParams>({
    baseUrl: usersState.params.baseUrl,
    pageIndex: 0,
    pageSize: 10,
    email: '',
    name: '',
    documentNumber: '',
    roleName: '',
  })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)

  const {
    data: usersPaginatedData,
    isFetching,
    refetch: getUsers,
  } = useQuery<ReactQueryResponse<IpaginationResponse<IUsersResponse>>>('get-users', async () => {
    const url = buildUrl(usersState.params.baseUrl, {
      pageIndex: usersState.params.pageIndex,
      pageSize: usersState.params.pageSize,
      email: usersState.params.email,
      name: usersState.params.name,
      documentNumber: usersState.params.documentNumber,
      roleName: usersState.params.roleName,
    })
    return await axios.get(url)
  })

  const setUsersPaginated = (payload: IpaginationResponse<IUsersResponse>) => {
    dispatchUsers({type: UsersKind.SET_USERS, payload})
  }

  const setEmail = (payload: string | undefined, action: UsersActions | undefined) => {
    if (payload !== undefined && payload !== '') {
      dispatchUsers({type: UsersKind.SET_EMAIL, payload})
    }
    if (action) {
      dispatchUsers({type: UsersKind.SET_ACTION, payload: action})
    }
  }

  const handleClickForm = (body: IUsersForm) => {
    if (usersState.action === 'create') {
      createUser(body)
    } else if (usersState.action === 'update') {
      updateUser(body)
    }
  }

  const {mutate: createUser, isLoading: isCreatingUser} = useMutation({
    mutationFn: async (body: IUsersForm) => {
      //body.email = undefined
      return await axios.post(`/User/add-user`, body)
    },
    onSuccess(data) {
      handleSuccessResponse(data)
    },
    onError(error: AxiosError<ReactQueryResponse<string>>) {
      handleErrorResponse(error.toString())
    },
  })

  const {mutate: updateUser, isLoading: isUpdatingUser} = useMutation({
    mutationFn: async (body: IUsersForm) => {
      body.email = usersState.email
      return await axios.put(`/User/update-user`, body)
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
      getUsers()
    }, 1)
  }

  useEffect(() => {
    if (!isFetching && usersState.action === 'create') {
      dispatchUsers({type: UsersKind.SET_CURRENT_USER, payload: {} as IUsersResponse})
      setTimeout(() => {
        setShowFormModal(true)
      }, 1)
    }
    if (!isFetching && usersState.email) {
      const currentUser = findUserByEmail(usersState.email)

      if (!currentUser) return
      setCurrentUser(currentUser)
      switch (usersState.action) {
        case 'delete':
          setShowDeleteModal(true)
          break
        case 'update':
          setTimeout(() => {
            setShowFormModal(true)
          }, 1)
          break
      }
    }
  }, [usersState.email, usersState.action])

  const findUserByEmail = (emailToFind: string): IUsersResponse | null => {
    const user = usersState.usersPaginated.items.find((user) => user.email === emailToFind)
    return user || null
  }

  const setCurrentUser = (payload: IUsersResponse | null) => {
    if (payload) {
      dispatchUsers({type: UsersKind.SET_CURRENT_USER, payload})
    }
  }

  const setUsersParams = () => {
    dispatchUsers({type: UsersKind.SET_PARAMS, payload: tempFilters})
  }

  const resetFilters = () => {
    const resetValues = {
      baseUrl: usersState.params.baseUrl,
      pageIndex: 0,
      pageSize: 10,
      email: '',
      name: '',
      documentNumber: '',
      roleName: '',
    }

    setTempFilters(resetValues)
    dispatchUsers({type: UsersKind.SET_PARAMS, payload: resetValues})
  }

  const handleFilterChange = (filterName: keyof UsersQueryParams, value: any) => {
    dispatchUsers({
      type: UsersKind.SET_PARAMS,
      payload: {[filterName]: value} as UsersQueryParams,
    })
  }

  useEffect(() => {
    if (!isFetching) {
      getUsers()
    }
  }, [usersState.params])

  useEffect(() => {
    if (!isFetching && usersPaginatedData) {
      setUsersPaginated(usersPaginatedData.data.response)
    }
  }, [usersPaginatedData])

  return {
    usersState,
    isLoading: isFetching,
    setEmail,
    handleFilterChange,
    setTempFilters,
    setUsersParams,
    tempFilters,
    resetFilters,
    showFormModal,
    setShowFormModal,
    isFormLoading: isCreatingUser || isUpdatingUser,
    handleClickForm,
    showDeleteModal,
    setShowDeleteModal,
  }
}

export {}
