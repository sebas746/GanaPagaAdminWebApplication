import {useThemeMode} from '../../../../../_metronic/partials'
import {ISalesPaymentReportQueryParams} from '../../../../../types/SalesSalePointReport.types'
import {ReportTypes} from '../../../../../types/DonutSalesPaymentReport.types'
import {ISalesSalePointDetailBarReport} from '../../../../../types/BarReport.types'
import {BarSalesSalePointReport} from './BarSalesSalePointReport'

type CurrencyData = {
  currencyCode: string
  data: ISalesSalePointDetailBarReport[]
}

type Props = {
  className: string
  setTempFilters: React.Dispatch<React.SetStateAction<ISalesPaymentReportQueryParams>>
  tempFilters: ISalesPaymentReportQueryParams
  currenciesData: CurrencyData[]
}

const BarSalesSalePointReportWrapper: React.FC<Props> = ({
  className,
  setTempFilters,
  tempFilters,
  currenciesData,
}) => {
  const {mode} = useThemeMode()
  const isActive = (reportType: ReportTypes) => tempFilters.reportType === reportType

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Ventas</span>
          <span className='text-muted fw-semibold fs-7'>Puntos de venta</span>
        </h3>

        {/* begin::Toolbar */}
        <div className='card-toolbar' data-kt-buttons='true'>
          <div
            className={`btn btn-sm btn-color-muted ${
              isActive(ReportTypes.Monthly) ? 'btn-active btn-active-primary active' : ''
            } px-4 me-1`}
            onClick={() => setTempFilters((prev) => ({...prev, reportType: ReportTypes.Monthly}))}
          >
            Mensual
          </div>
          <div
            className={`btn btn-sm btn-color-muted ${
              isActive(ReportTypes.Weekly) ? 'btn-active btn-active-primary active' : ''
            } px-4 me-1`}
            onClick={() => setTempFilters((prev) => ({...prev, reportType: ReportTypes.Weekly}))}
          >
            Semanal
          </div>
          <div
            className={`btn btn-sm btn-color-muted ${
              isActive(ReportTypes.Daily) ? 'btn-active btn-active-primary active' : ''
            } px-4`}
            onClick={() => setTempFilters((prev) => ({...prev, reportType: ReportTypes.Daily}))}
          >
            Diario
          </div>
        </div>
        {/* end::Toolbar */}
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body'>
        <div className='row'>
          {currenciesData.map((currencyData, index) => (
            <div className='col-md-6' key={index}>
              <BarSalesSalePointReport
                currencyCode={currencyData.currencyCode}
                data={currencyData.data}
                mode={mode}
              />
            </div>
          ))}
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}

export {BarSalesSalePointReportWrapper}
