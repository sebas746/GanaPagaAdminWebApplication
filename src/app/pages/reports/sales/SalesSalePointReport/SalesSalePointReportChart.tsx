import {useThemeMode} from '../../../../../_metronic/partials'
import {ISalesSalePointDetailBarReport} from '../../../../../types/BarReport.types'
import {BarSalesSalePointReport} from '../../../../modules/dashboard/sales/bar/BarSalesSalePointReport'

type CurrencyData = {
  currencyCode: string
  data: ISalesSalePointDetailBarReport[]
}

type Props = {
  currenciesData: CurrencyData[]
  promoterName: string | null
}

const SalesSalePointReportChart: React.FC<Props> = ({currenciesData, promoterName}) => {
  const {mode} = useThemeMode()
  return (
    <>
      {/* begin::Body */}
      <div className='card-body'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Ventas - Promotor: {promoterName} </span>
        </h3>
        <div className='row'>
          {currenciesData.map((currencyData, index) => (
            <div className='col-md-6' key={index}>
              {currencyData && currencyData.data.length > 0 ? (
                <BarSalesSalePointReport
                  currencyCode={currencyData.currencyCode}
                  data={currencyData.data}
                  mode={mode}
                  height={400}
                />
              ) : (
                <div
                  className='d-flex align-items-center justify-content-center'
                  style={{height: '200px'}}
                >
                  <span className='text-center text-gray-500'>
                    No hay información disponible ({currencyData.currencyCode}).
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* end::Body */}
    </>
  )
}

export default SalesSalePointReportChart
