import {useEffect, useReducer} from 'react'
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
}

export type UsersActions = 'create' | 'update' | 'delete'

interface UsersStateAction {
  type: UsersKind
  payload: IpaginationResponse<IUsersResponse> | string | UsersActions | UsersQueryParams
}

interface UsersState {
  usersPaginated: IpaginationResponse<IUsersResponse>
  email: string
  action: UsersActions
  params: UsersQueryParams
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
  }
}

export const useUsers = () => {
  const [usersState, dispatchUsers] = useReducer(usersReducer, {
    usersPaginated: {} as IpaginationResponse<IUsersResponse>,
    email: '',
    action: {} as UsersActions,
    params: {baseUrl: '/User/get-users', pageIndex: 0, pageSize: 5} as UsersQueryParams,
  })

  const url = buildUrl(usersState.params.baseUrl, {
    pageIndex: usersState.params.pageIndex,
    pageSize: usersState.params.pageSize,
    email: usersState.params.email,
    name: usersState.params.name,
    documentNumber: usersState.params.documentNumber,
    roleName: usersState.params.roleName,
  })

  const {
    data: usersPaginatedData,
    isFetching,
    refetch: getUsers,
  } = useQuery<ReactQueryResponse<IpaginationResponse<IUsersResponse>>>('get-users', async () => {
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

  const setUsersParams = (payload: UsersQueryParams) => {
    dispatchUsers({type: UsersKind.SET_PARAMS, payload})
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
  }
}

export {}
