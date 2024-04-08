import {useAuth} from 'oidc-react/build/src/useAuth'
import {useEffect, useState} from 'react'
import {removeStoragePromoterId, removeToken, setToken} from '../helpers/localstorage.helper'
import {disableSplashScreen, enableSplashScreen} from '../components/RenderLoader/RenderLoader'
import {IDENTITY_CONFIG} from '../constants/oidc-identity-server.constants'

export const useCheckSessionStatus = () => {
  const auth = useAuth()
  const intervalSeconds = 3000
  const expirationRenewSeconds = 600
  const [intervalRunning, setIntervalRunning] = useState<boolean>(false)
  
  // const [firstTimeRun, setFirstTimeRun] = useState(false)

  useEffect(() => {
    if (auth.userData?.expires_in !== undefined && !intervalRunning) {
      checkTokenExpiration(auth.userData?.expires_in)
    }
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

  const renewUserToken = (intervalId: NodeJS.Timeout) => {
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
}

export const useRemoveSession = () => {
  const auth = useAuth()

  const deleteTokenAndSignOut = () => {
    enableSplashScreen()
    removeToken()
    auth.userManager.revokeTokens().then(() => {
      removeStoragePromoterId()
      auth.signOut()

      auth.signOutRedirect({
        post_logout_redirect_uri: IDENTITY_CONFIG.logout,
        id_token_hint: auth.userData?.id_token,
      })
    })
  }
  return {
    deleteTokenAndSignOut,
  }
}
