import {Mixed} from '../../../../modules/widgets/components/Mixed'
import {SalesGameTypeReport} from './SalesGameTypeReport'


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

const SalesGameTypeReportWrapper: React.FC<Props> = ({
  className,
  setTempFilters,
  tempFilters,
  currenciesData,
}) => {
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Ventas</span>
          <span className='text-muted fw-semibold fs-7'>Puntos de venta</span>
        </h3>
        <div className='mb-10 pt-5'>
          <div>
            <select
              className='form-select form-select-solid'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              defaultValue={''}
            >
              <option>Todos</option>
              <option value='1'>Animalitos</option>
              <option value='2'>Tripleta</option>
              <option value='3'>Chance 3 Cifras</option>
              <option value='4'>Chance Zodiacal</option>
              <option value='5'>Chance 4 Cifras</option>
            </select>
          </div>
        </div>
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
              <SalesGameTypeReport className='mb-4' currencyCode='USD' />
            </div>
          ))}
        </div>
      </div>
      {/* end::Body */}
    </div>
  )
}

export default SalesGameTypeReportWrapper
