import {Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import ExchangeRateSettings from '../../pages/system-settings/exchange-rate-settings/ExchangeRateSettings'

const systemSettingsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Configuración Sistema',
    path: '/pages/system-settings/exchange-rate-settings',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

function SystemSettingsPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='exchange-rate-settings'
          element={
            <>
              <PageTitle breadcrumbs={systemSettingsBreadCrumbs}>
                Configuración Tasa de Cambio
              </PageTitle>
              <ExchangeRateSettings />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default SystemSettingsPage
