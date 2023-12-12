import {Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import ExchangeRateSettings from '../../pages/system-settings/exchange-rate-settings/ExchangeRateSettings'
import SalesSellerReport from '../../pages/reports/sales/SalesSellerReport/SalesSellerReport'

const salesSellerReportBreadCrumbs: Array<PageLink> = [
  {
    title: 'Reporte de ventas por vendedor',
    path: '/pages/sales-report/exchange-rate-settings',
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

function SalesSellerReportPage() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='sales-seller-report'
          element={
            <>
              <PageTitle breadcrumbs={salesSellerReportBreadCrumbs}>
                Reporte de ventas por vendedor
              </PageTitle>
              <SalesSellerReport />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default SalesSellerReportPage
