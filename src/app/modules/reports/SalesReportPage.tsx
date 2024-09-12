import {Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import ExchangeRateSettings from '../../pages/system-settings/exchange-rate-settings/ExchangeRateSettings'
import SalesSellerReport from '../../pages/reports/sales/SalesSellerReport/SalesSellerReport'
import SalesSalePointReport from '../../pages/reports/sales/SalesSalePointReport/SalesSalePointReport'
import TicketReport from '../../pages/reports/sales/TicketReport/TicketReport'
import SalesGameTypeReportWrapper from '../../pages/reports/sales/SalesGameTypeReport/SalesGameTypeReportWrapper'

const salesSellerReportBreadCrumbs: Array<PageLink> = [
  {
    title: 'Reporte de ventas por vendedor',
    path: '/pages/sales-report/sales-seller-report',
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
        <Route
          path='sales-salepoint-report'
          element={
            <>
              <PageTitle breadcrumbs={salesSellerReportBreadCrumbs}>
                Reporte de ventas por punto de venta
              </PageTitle>
              <SalesSalePointReport />
            </>
          }
        />
        <Route
          path='sales-game-type-report'
          element={
            <>
              <PageTitle breadcrumbs={salesSellerReportBreadCrumbs}>
                Reporte de ventas por tipo de juego
              </PageTitle>
              <SalesGameTypeReportWrapper />
            </>
          }
        />
        <Route
          path='ticket-report'
          element={
            <>
              <PageTitle breadcrumbs={salesSellerReportBreadCrumbs}>
                Reporte de ventas por tiquete
              </PageTitle>
              <TicketReport />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default SalesSellerReportPage
