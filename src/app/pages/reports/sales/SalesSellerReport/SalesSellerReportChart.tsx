import {useThemeMode} from '../../../../../_metronic/partials'
import {ISalesSellersDetailBarReport} from '../../../../../types/BarReport.types'
import {BarSalesSellersReport} from '../../../../modules/dashboard/sales/bar/BarSalesSellersReport'

type CurrencyData = {
  currencyCode: string
  data: ISalesSellersDetailBarReport[]
}

type Props = {
  currenciesData: CurrencyData[]
  promoterName: string | null
}

const SalesSellerReportChart: React.FC<Props> = ({currenciesData, promoterName}) => {
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
                <BarSalesSellersReport
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

export default SalesSellerReportChart
