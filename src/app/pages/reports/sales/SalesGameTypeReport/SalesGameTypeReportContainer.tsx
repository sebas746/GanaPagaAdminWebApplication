import HasPermission from '../../../../components/HasPermissions/HasPermissions'
import RenderLoader from '../../../../components/RenderLoader/RenderLoader'
import {useSalesGameTypeReport} from './SalesGameTypeReport.hook'
import SalesGameTypeReportWrapper from './SalesGameTypeReportWrapper'

const SalesGameTypeReportContainer = () => {
  const {
    isLoadingSalesGameTypeReport,
    saleGameTypeTempFilters,
    salesGameTypeData,
    setSalesGameTypeTempFilters,
    salesLotteryGameTypeData,
  } = useSalesGameTypeReport()

  const usdGameTypeData =
    salesGameTypeData.find((data) => data.currencyCode === 'USD')?.salesGameTypeList || []

  const vesGameTypeData =
    salesGameTypeData.find((data) => data.currencyCode === 'VES')?.salesGameTypeList || []

  const usdLotteryGameTypeData =
    salesLotteryGameTypeData.find((data) => data.currencyCode === 'USD')
      ?.salesLotteryGameTypeList || []

  const vesLotteryGameTypeData =
    salesLotteryGameTypeData.find((data) => data.currencyCode === 'VES')
      ?.salesLotteryGameTypeList || []

  const canLoadReport = !isLoadingSalesGameTypeReport && salesGameTypeData

  const isSalesGameReport =
    saleGameTypeTempFilters.gameType === undefined || saleGameTypeTempFilters.gameType === ''

  const canLoadLotteryReport = !isLoadingSalesGameTypeReport && salesLotteryGameTypeData

  const isLotterySalesGameReport =
    saleGameTypeTempFilters.gameType && saleGameTypeTempFilters.gameType !== ''

  return (
    <>
      <HasPermission resource='reports' actions={['game-type-report']}>
        <RenderLoader show={isLoadingSalesGameTypeReport} huge={true} />
        {canLoadReport && isSalesGameReport && (
          <div className='row'>
            <div className='col-xl-12'>
              <SalesGameTypeReportWrapper
                className='card-xl-stretch mb-5 mb-xl-8'
                setTempFilters={setSalesGameTypeTempFilters}
                tempFilters={saleGameTypeTempFilters}
                salesGameTypeData={[
                  {currencyCode: 'USD', data: usdGameTypeData},
                  {currencyCode: 'VES', data: vesGameTypeData},
                ]}
                title={'Ventas por tipo de Juego'}
              />
            </div>
          </div>
        )}
        {canLoadLotteryReport && isLotterySalesGameReport && (
          <div className='row'>
            <div className='col-xl-12'>
              <SalesGameTypeReportWrapper
                className='card-xl-stretch mb-5 mb-xl-8'
                setTempFilters={setSalesGameTypeTempFilters}
                tempFilters={saleGameTypeTempFilters}
                salesLotteryGameTypeData={[
                  {currencyCode: 'USD', data: usdLotteryGameTypeData},
                  {currencyCode: 'VES', data: vesLotteryGameTypeData},
                ]}
                title={'Ventas por lotería'}
              />
            </div>
          </div>
        )}
      </HasPermission>
    </>
  )
}

export default SalesGameTypeReportContainer
