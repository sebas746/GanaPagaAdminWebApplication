import {useAuth} from 'oidc-react/build/src/useAuth'
import {useEffect, useState} from 'react'
import {setToken} from '../helpers/localstorage.helper'

export const useCheckSessionStatus = () => {
  const auth = useAuth()
  const intervalSeconds = 3000
  const expirationRenewSeconds = 600
  const [intervalRunning, setIntervalRunning] = useState<boolean>(false)

  const checkTokenExpiration = (expiresIn: number) => {
    if (expiresIn !== undefined) {
      const intervalId = setInterval(() => {
        renewUserToken(intervalId)
      }, intervalSeconds)
      setIntervalRunning(true)
    } else {
      setIntervalRunning(false)
    }
  }

  const renewUserToken = (intervalId: NodeJS.Timer) => {
    const expiresIn = auth.userData?.expires_in
    if (Number(expiresIn) < expirationRenewSeconds) {
      try {
        auth.userManager.signinSilent().then((renewedUser) => {
          if (renewedUser?.access_token !== undefined && !renewedUser.expired) {
            setToken(renewedUser?.access_token)
            setIntervalRunning(false)
            clearInterval(intervalId)
          }
        })
      } catch (e: any) {
        console.log(e)
      }
    }
  }

  useEffect(() => {
    if (auth.userData?.expires_in !== undefined && !intervalRunning) {
      checkTokenExpiration(auth.userData?.expires_in)
    }
  }, [auth])
}
