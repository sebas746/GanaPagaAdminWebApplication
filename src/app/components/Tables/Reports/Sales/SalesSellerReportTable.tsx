import {Form, Pagination} from 'react-bootstrap'
import {IpaginationSalesReportResponse} from '../../../../../types/Pagination.types'
import {
  ISalesSellerReportQueryParams,
  ISalesSellerResponse,
  ISellerResponse,
} from '../../../../../types/SalesSellerReport.types'
import RenderLoader from '../../../RenderLoader/RenderLoader'
import {formatCurrency} from '../../../../helpers/currency.helpers'
import {DateTime} from 'luxon'

interface SalesSellerReportTableProps {
  salesSellerReportPaginated: IpaginationSalesReportResponse<ISalesSellerResponse>
  params: ISalesSellerReportQueryParams
  handleFilterChange: (filterName: keyof ISalesSellerReportQueryParams, value: any) => void
  isLoading: boolean
  setTempFilters: React.Dispatch<React.SetStateAction<ISalesSellerReportQueryParams>>
  setSalesSellerReportParams: () => void
  tempFilters: ISalesSellerReportQueryParams
  resetFilters: () => void
  sellers: ISellerResponse[]
}

const SalesSellerReportTable = ({
  salesSellerReportPaginated,
  params,
  handleFilterChange,
  isLoading,
  setTempFilters,
  setSalesSellerReportParams,
  tempFilters,
  resetFilters,
  sellers,
}: SalesSellerReportTableProps) => {
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
                Vendedor
              </label>
              <Form.Select
                id='sellerId'
                className='form-control'
                onChange={(e) => setTempFilters((prev) => ({...prev, sellerId: e.target.value}))}
                value={tempFilters.sellerId}
              >
                <option value=''>Todos</option>
                {sellers.map((seller) => (
                  <option key={seller.sellerId} value={seller.sellerId}>
                    {`${seller.sellerEmail.toLocaleLowerCase()}`}
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
                  onClick={() => setSalesSellerReportParams()}
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
        {!isLoading && salesSellerReportPaginated && salesSellerReportPaginated.totalCount > 0 && (
          <>
            <div className='table-title text-center'>
              <h2>Reporte por vendedores</h2>
            </div>
            <div className='table-responsive'>
              <table className='table table-row-bordered table-row-gray-300 gy-6'>
                <thead>
                  <tr className='fw-bold text-light bg-success'>
                    <th className='text-center'>Fecha</th>
                    <th className='text-center'>Moneda</th>
                    <th className='text-center'>Vendedor</th>
                    <th className='text-center'>Usuario</th>
                    <th className='text-center'>Total Ventas</th>
                    <th className='text-center'>Total Pagos</th>
                  </tr>
                </thead>
                <tbody>
                  {salesSellerReportPaginated.totalCount > 0 &&
                    salesSellerReportPaginated.items.map((sale, index) => (
                      <tr
                        className='fw-bold fs-6 text-gray-800'
                        key={`${sale.currentDate}-${index}`}
                      >
                        <td className='text-center'>
                          {DateTime.fromISO(sale.currentDate).toFormat('yyyy-MM-dd')}
                        </td>
                        <td className='text-center'>{sale.currencyCode}</td>
                        <td className='text-center'>{sale.sellerName}</td>
                        <td className='text-center'>{sale.sellerEmail.toLocaleLowerCase()}</td>
                        <td className='text-center'>
                          {formatCurrency(sale.totalSales, sale.currencyCode)}
                        </td>
                        <td className='text-center'>
                          {formatCurrency(sale.totalPaid, sale.currencyCode)}
                        </td>
                      </tr>
                    ))}
                  {salesSellerReportPaginated.items.length === 0 && (
                    <tr>
                      <td colSpan={7} className='text-center'>
                        No results...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className='table-title text-center'>
              <h2>Reporte general</h2>
            </div>
            <div className='table-responsive'>
              <table className='table table-row-bordered table-row-gray-300 gy-6'>
                <thead>
                  <tr className='fw-bold text-light bg-primary'>
                    <th className='text-center'>Moneda</th>
                    <th className='text-center'>Total Ventas</th>
                    <th className='text-center'>Total Pagos</th>
                    <th className='text-center'>Total Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {salesSellerReportPaginated.totalCount > 0 &&
                    salesSellerReportPaginated.salesTotals.map((sale, index) => (
                      <tr
                        className='fw-bold fs-6 text-gray-800'
                        key={`${sale.currencyCode}-${index}`}
                      >
                        <td className='text-center'>{sale.currencyCode}</td>
                        <td className='text-center'>
                          {formatCurrency(sale.totalSales, sale.currencyCode)}
                        </td>
                        <td className='text-center'>
                          {formatCurrency(sale.totalPaid, sale.currencyCode)}
                        </td>
                        <td className='text-center'>
                          {formatCurrency(sale.totalProfit, sale.currencyCode)}
                        </td>
                      </tr>
                    ))}
                  {salesSellerReportPaginated.items.length === 0 && (
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
        {!isLoading && salesSellerReportPaginated && salesSellerReportPaginated.totalCount > 0 && (
          <Pagination>
            {Array.from({
              length: Math.ceil(salesSellerReportPaginated.totalCount / params.pageSize),
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
