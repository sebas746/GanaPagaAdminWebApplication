import {Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import EmailScrutinySettings from '../../pages/scrutiny-settings/email-scrutiny-settings/EmailScrutinySettings'

const scrutinySettingsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Configuración escrutinios',
    path: '/pages/scrutiny-settings/email-scrutiny-settings',
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

const ScrutinySettings = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='email-scrutiny-settings'
          element={
            <>
              <PageTitle breadcrumbs={scrutinySettingsBreadCrumbs}>
                Configuración Correos Escrutinios
              </PageTitle>
              <EmailScrutinySettings />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default ScrutinySettings
