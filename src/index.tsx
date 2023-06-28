import {createRoot} from 'react-dom/client'
// Axios
import axios from 'axios'
import {Chart, registerables} from 'chart.js'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'

import 'react-datepicker/dist/react-datepicker.css'

// Apps
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import './_metronic/assets/sass/style.scss'
import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'
import {AppRoutes} from './app/routing/AppRoutes'
import {setupAxios} from './app/modules/auth'
import {oidcConfig} from './app/config/oidc-identity-server'
import {AuthProvider} from 'oidc-react'
import {SnackbarProvider} from 'notistack'
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios)
Chart.register(...registerables)

const twentyFourHoursInMs = 1000 * 60 * 60 * 24

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
    },
  },
})
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <AuthProvider {...oidcConfig}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          maxSnack={10}
          autoHideDuration={10000}
        >
          <MetronicI18nProvider>
            <AppRoutes />
          </MetronicI18nProvider>
        </SnackbarProvider>
        {/*<ReactQueryDevtools initialIsOpen={false} />*/}
      </QueryClientProvider>
    </AuthProvider>
  )
}
