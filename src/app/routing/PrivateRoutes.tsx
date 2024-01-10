import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import {useCheckSessionStatus} from '../hooks/session.hook'
import SettinsPage from '../modules/settings/SettingsPage'
import ProtectedRoute from '../components/RouteProtection/ProtectedRoute'
import ScrutinySettingsPage from '../modules/scrutiny-settings/ScrutinySettingsPage'
import SystemSettingsPage from '../modules/system-settings/SystemSettingsPage'
import ExchangeRateSettings from '../pages/system-settings/exchange-rate-settings/ExchangeRateSettings'
import UsersManagementPage from '../modules/users-management/UsersManagementPage'
import SalesSellerReportPage from '../modules/reports/SalesReportPage'

const PrivateRoutes = () => {
  useCheckSessionStatus()

  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const RaffleResultsPage = lazy(() => import('../modules/raffle-results/RaffleResultPage'))
  const ScrutinyPage = lazy(() => import('../modules/scrutiny/ScrutinyPage'))
  const PersonalizedQuota = lazy(() => import('../modules/personalized-quota/PersonalizedQuotaPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        <Route
          path='pages/raffle-results/*'
          element={
            <SuspensedView>
              <ProtectedRoute roles={['Admin', 'Scrutiny']}>
                <RaffleResultsPage />
              </ProtectedRoute>
            </SuspensedView>
          }
        />
        <Route
          path='pages/scrutiny/*'
          element={
            <SuspensedView>
              <ProtectedRoute roles={['Admin', 'Scrutiny']}>
                <ScrutinyPage />
              </ProtectedRoute>
            </SuspensedView>
          }
        />
        <Route
          path='pages/settings/*'
          element={
            <SuspensedView>
              <ProtectedRoute roles={['Admin']}>
                <SettinsPage />
              </ProtectedRoute>
            </SuspensedView>
          }
        />
        <Route
          path='pages/scrutiny-settings/*'
          element={
            <SuspensedView>
              <ProtectedRoute roles={['Admin']}>
                <ScrutinySettingsPage />
              </ProtectedRoute>
            </SuspensedView>
          }
        />
        <Route
          path='pages/system-settings/*'
          element={
            <SuspensedView>
              <ProtectedRoute roles={['Admin']}>
                <SystemSettingsPage />
              </ProtectedRoute>
            </SuspensedView>
          }
        />
        <Route
          path='pages/sales-reports/*'
          element={
            <SuspensedView>
              <ProtectedRoute roles={['Admin']}>
                <SalesSellerReportPage />
              </ProtectedRoute>
            </SuspensedView>
          }
        />
        <Route
          path='pages/users-management/*'
          element={
            <SuspensedView>
              <ProtectedRoute roles={['Admin']}>
                <UsersManagementPage />
              </ProtectedRoute>
            </SuspensedView>
          }
        />
        <Route
          path='pages/personalized-quota/*'
          element={
            <SuspensedView>
              <ProtectedRoute roles={['Admin']}>
                <PersonalizedQuota />
              </ProtectedRoute>
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
