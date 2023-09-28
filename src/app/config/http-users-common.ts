import axios from 'axios'
import {setupInterceptorsTo} from './interceptors'

const axiosUsersInstance = axios.create({
  baseURL: process.env.REACT_APP_USERS_ENDPOINT_BASE_URL,
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
})

export default setupInterceptorsTo(axiosUsersInstance)
