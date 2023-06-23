import {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios'
import {getToken, removeToken} from '../helpers/localstorage.helper'
import {useAuth} from 'oidc-react'
import {Toast} from 'bootstrap'

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = getToken()
  if (token) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`)
  return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  if (response && !response.data.success) {
    console.log(response.data.errors)
  }
  return response
}

const OnResponseError = (error: AxiosError): Promise<AxiosError> => {
  const auth = useAuth()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (error.response.status === 401) {
    auth.userManager.signinSilent().then((renewedUser) => {
      // setToken(re)
    })
    removeToken()
    auth.signOut()
    auth.signOutRedirect()
    // window.location.href = '/login';
    return Promise.reject(error)
  }
  console.error(`[response error] [${JSON.stringify(error)}]`)
  return Promise.reject(error)
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, OnResponseError)
  return axiosInstance
}
