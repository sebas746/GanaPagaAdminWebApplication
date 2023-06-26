import {useAuth} from 'oidc-react/build/src/useAuth'
import {useEffect, useState} from 'react'
import {setToken} from '../helpers/localstorage.helper'
import {disableSplashScreen, enableSplashScreen} from '../components/RenderLoader/RenderLoader'

export const useCheckSessionStatus = () => {
  const auth = useAuth()
  const intervalSeconds = 3000
  const expirationRenewSeconds = 600
  const [intervalRunning, setIntervalRunning] = useState<boolean>(false)
  // const [firstTimeRun, setFirstTimeRun] = useState(false)

  useEffect(() => {
    if (auth.isLoading || auth.userData === null) {
      setTimeout(() => {
        enableSplashScreen()
      })
    } else {
      disableSplashScreen()
    }
  }, [auth])

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
        enableSplashScreen()
        auth.userManager.signinSilent().then((renewedUser) => {
          if (renewedUser?.access_token !== undefined && !renewedUser.expired) {
            setToken(renewedUser?.access_token)
            setIntervalRunning(false)
            clearInterval(intervalId)
            disableSplashScreen()
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
