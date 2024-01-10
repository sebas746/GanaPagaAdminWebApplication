import {Form, Pagination} from 'react-bootstrap'
import RenderLoader from '../../../RenderLoader/RenderLoader'
import {formatCurrency} from '../../../../helpers/currency.helpers'
import {DateTime} from 'luxon'
import {
  ISalePointResponse,
  ISalesSalePointReport,
  ISalesSalePointReportQueryParams,
} from '../../../../../types/SalesSalePointReport.types'
import {IpaginationSalesReportResponse} from '../../../../../types/Pagination.types'

interface SalesSalePointReportTableProps {
  salesSalePointReportPaginated: IpaginationSalesReportResponse<ISalesSalePointReport>
  params: ISalesSalePointReportQueryParams
  handleFilterChange: (filterName: keyof ISalesSalePointReportQueryParams, value: any) => void
  isLoading: boolean
  setTempFilters: React.Dispatch<React.SetStateAction<ISalesSalePointReportQueryParams>>
  setSalesSalePointReportParams: () => void
  tempFilters: ISalesSalePointReportQueryParams
  resetFilters: () => void
  salePoints: ISalePointResponse[]
}

const SalesSellerReportTable = ({
  salesSalePointReportPaginated,
  params,
  handleFilterChange,
  isLoading,
  setTempFilters,
  setSalesSalePointReportParams,
  tempFilters,
  resetFilters,
  salePoints,
}: SalesSalePointReportTableProps) => {
  return (
    <>
      <div className='card-body py-3'>
        <div className='mb-4'>
          <div className='row mb-2'>
            {/* Initial Date Input */}
            <div className='col-md-3'>
              <label htmlFor='initialDate' className='form-label'>
                Fecha Inicial
              </label>
              <input
                id='initialDate'
                type='date'
                className='form-control'
                placeholder='Fecha inicial'
                onChange={(e) => setTempFilters((prev) => ({...prev, initialDate: e.target.value}))}
                value={tempFilters.initialDate}
              />
            </div>

            {/* End Date Input */}
            <div className='col-md-3'>
              <label htmlFor='endDate' className='form-label'>
                Fecha Final
              </label>
              <input
                id='endDate'
                type='date'
                className='form-control'
                placeholder='Fecha final'
                onChange={(e) => setTempFilters((prev) => ({...prev, endDate: e.target.value}))}
                value={tempFilters.endDate}
              />
            </div>

            {/* Role Selector */}
            <div className='col-md-3'>
              <label htmlFor='roleSelector' className='form-label'>
                Punto de Venta
              </label>
              <Form.Select
                id='sellerId'
                className='form-control'
                onChange={(e) => setTempFilters((prev) => ({...prev, salePointId: e.target.value}))}
                value={tempFilters.salePointId}
              >
                <option value=''>Todos</option>
                {salePoints.map((salePoint) => (
                  <option key={salePoint.salePointId} value={salePoint.salePointId}>
                    {`${salePoint.salePointName}`}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>

          <div className='row mb-3'>
            <div className='col-md-12'>
              <div className='btn-group'>
                <button
                  className='btn btn-primary'
                  disabled={isLoading}
                  onClick={() => setSalesSalePointReportParams()}
                >
                  Buscar
                </button>
                <button className='btn btn-secondary' onClick={resetFilters}>
                  Limpiar
                </button>
              </div>
            </div>
          </div>
        </div>
        {isLoading && <RenderLoader show={isLoading} huge={true} />}
        {!isLoading &&
          salesSalePointReportPaginated &&
          salesSalePointReportPaginated.totalCount > 0 && (
            <>
              <div className='table-title text-left'>
                <h2>Reporte por puntos de venta</h2>
              </div>
              <div className='table-responsive'>
                <table className='table table-row-bordered table-row-gray-300 gy-6'>
                  <thead>
                    <tr className='fw-bold text-light bg-success'>
<<<<<<< HEAD
                      <th className='text-center fs-4'>Fecha</th>
                      <th className='text-center fs-4'>Moneda</th>
                      <th className='text-center fs-4'>Punto de venta</th>
                      <th className='text-center fs-4'>Dirección</th>
                      <th className='text-center fs-4'>Total Ventas</th>
=======
                      <th className='text-center fs-4 text-white'>Fecha</th>
                      <th className='text-center fs-4 text-white'>Moneda</th>
                      <th className='text-center fs-4 text-white'>Punto de venta</th>
                      <th className='text-center fs-4 text-white'>Dirección</th>
                      <th className='text-center fs-4 text-white'>Total Ventas</th>
>>>>>>> 958feca1ca6c63dfd62d932ab3b9452c8c9aea34
                    </tr>
                  </thead>
                  <tbody>
                    {salesSalePointReportPaginated.totalCount > 0 &&
                      salesSalePointReportPaginated.items.map((sale, index) => (
                        <tr
                          className='fw-bold fs-6 text-gray-800'
                          key={`${sale.currentDate}-${index}`}
                        >
                          <td className='text-center'>
                            {DateTime.fromISO(sale.currentDate).toFormat('yyyy-MM-dd')}
                          </td>
                          <td className='text-center'>{sale.currencyCode}</td>
                          <td className='text-center'>{sale.salePointName}</td>
                          <td className='text-center'>{sale.salePointAddress}</td>
                          <td className='text-center'>
                            {formatCurrency(sale.totalSales, sale.currencyCode)}
                          </td>
                        </tr>
                      ))}
                    {salesSalePointReportPaginated.items.length === 0 && (
                      <tr>
                        <td colSpan={7} className='text-center'>
                          No results...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className='table-title text-left'>
                <h2>Reporte general</h2>
              </div>
              <div className='table-responsive'>
                <table className='table table-row-bordered table-row-gray-300 gy-6'>
                  <thead>
                    <tr className='fw-bold text-light bg-primary'>
                      <th className='text-center fs-4 text-white'>Moneda</th>
                      <th className='text-center fs-4 text-white'>Total Ventas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesSalePointReportPaginated.totalCount > 0 &&
                      salesSalePointReportPaginated.salesTotals.map((sale, index) => (
                        <tr
                          className='fw-bold fs-6 text-gray-800'
                          key={`${sale.currencyCode}-${index}`}
                        >
                          <td className='text-center'>{sale.currencyCode}</td>
                          <td className='text-center'>
                            {formatCurrency(sale.totalSales, sale.currencyCode)}
                          </td>
                        </tr>
                      ))}
                    {salesSalePointReportPaginated.items.length === 0 && (
                      <tr>
                        <td colSpan={7} className='text-center'>
                          No results...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        {!isLoading &&
          salesSalePointReportPaginated &&
          salesSalePointReportPaginated.totalCount > 0 && (
            <Pagination>
              {Array.from({
                length: Math.ceil(salesSalePointReportPaginated.totalCount / params.pageSize),
              }).map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index === params.pageIndex}
                  onClick={() => handleFilterChange('pageIndex', index)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
      </div>
    </>
  )
}

export default SalesSellerReportTable
