import {useEffect, useReducer, useState} from 'react'
import {IpaginationResponse} from '../../../../types/Pagination.types'
import {IUsersResponse, UsersQueryParams} from '../../../../types/Users.types'
import axios from '../../../config/http-users-common'
import {ReactQueryResponse} from '../../../../types/Generics'
import {useQuery} from 'react-query'
import {buildUrl} from '../../../helpers/urlBuilder.helpers'

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
    params: {baseUrl: '/User/get-users', pageIndex: 0, pageSize: 5} as UsersQueryParams,
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

  useEffect(() => {
    if (!isFetching && usersState.email) {
      const currentUser = findUserByEmail(usersState.email)
      setCurrentUser(currentUser)
    }
  }, [usersState.email])

  const findUserByEmail = (emailToFind: string): IUsersResponse | null => {
    const user = usersState.usersPaginated.items.find((user) => user.email === emailToFind)
    console.log(user)
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
  }
}

export {}
