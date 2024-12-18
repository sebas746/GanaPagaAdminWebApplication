import {Form, Pagination, Button} from 'react-bootstrap'
import RenderLoader from '../../../RenderLoader/RenderLoader'
import {formatCurrency} from '../../../../helpers/currency.helpers'
import {DateTime} from 'luxon'
import {
  ISalePointResponse,
  ISalesSalePointReport,
  ISalesSalePointReportQueryParams,
} from '../../../../../types/SalesSalePointReport.types'
import {IpaginationSalesReportResponse} from '../../../../../types/Pagination.types'
import SalesSalePointReportChart from '../../../../pages/reports/sales/SalesSalePointReport/SalesSalePointReportChart'
import {ISalesSalePointDetailBarReport} from '../../../../../types/BarReport.types'
import {useState} from 'react'

type CurrencyData = {
  currencyCode: string
  data: ISalesSalePointDetailBarReport[]
}

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
  currenciesData: CurrencyData[]
  promoterName: string | null
}

const SalesSalePointReportTable = ({
  salesSalePointReportPaginated,
  params,
  handleFilterChange,
  isLoading,
  setTempFilters,
  setSalesSalePointReportParams,
  tempFilters,
  resetFilters,
  salePoints,
  currenciesData,
  promoterName,
}: SalesSalePointReportTableProps) => {
  const dataIsReady = !isLoading && salesSalePointReportPaginated?.totalCount > 0
  const dataIsEmpty = !isLoading && salesSalePointReportPaginated?.totalCount === 0
  const totalPages = Math.ceil(salesSalePointReportPaginated.totalCount / params.pageSize)
  const [showChart, setShowChart] = useState(false)

  return (
    <>
      <div className='card-body py-3'>
        {/* Filter Section */}
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
                value={tempFilters.initialDate}
                onChange={(e) => setTempFilters((prev) => ({...prev, initialDate: e.target.value}))}
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
                value={tempFilters.endDate}
                onChange={(e) => setTempFilters((prev) => ({...prev, endDate: e.target.value}))}
              />
            </div>

            {/* Sale Point Selector */}
            <div className='col-md-3'>
              <label htmlFor='salePointId' className='form-label'>
                Punto de Venta
              </label>
              <Form.Select
                id='salePointId'
                className='form-control'
                value={tempFilters.salePointId}
                onChange={(e) => setTempFilters((prev) => ({...prev, salePointId: e.target.value}))}
              >
                <option value=''>Todos</option>
                {salePoints.map((salePoint) => (
                  <option key={salePoint.salePointId} value={salePoint.salePointId}>
                    {salePoint.salePointName}
                  </option>
                ))}
              </Form.Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='row mb-3'>
            <div className='col-md-12'>
              <div className='btn-group'>
                <button
                  className='btn btn-primary'
                  disabled={isLoading}
                  onClick={setSalesSalePointReportParams}
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

        {/* Loader */}
        {isLoading && <RenderLoader show={isLoading} huge={true} />}
        {/* Toggle Chart Button */}
        <div className='d-flex justify-content-end mt-3'>
          <Form.Check
            type='switch'
            id='custom-switch'
            label={showChart ? 'Ver Reporte' : 'Ver Gráfico'}
            checked={showChart}
            onChange={() => setShowChart((prev) => !prev)}
          />
        </div>
        {/* Table Section */}
        {dataIsReady && !showChart && (
          <>
            {/* Detailed Report Table */}
            <div className='table-title text-left'>
              <h2>Reporte por puntos de venta</h2>
            </div>
            <div className='table-responsive'>
              <table className='table table-row-bordered table-row-gray-300 gy-6'>
                <thead>
                  <tr className='fw-bold text-light bg-success'>
                    <th className='text-center fs-4 text-white'>Fecha</th>
                    <th className='text-center fs-4 text-white'>Moneda</th>
                    <th className='text-center fs-4 text-white'>Punto de venta</th>
                    <th className='text-center fs-4 text-white'>Dirección</th>
                    <th className='text-center fs-4 text-white'>Total Ventas</th>
                  </tr>
                </thead>
                <tbody>
                  {salesSalePointReportPaginated.items.map((sale, index) => (
                    <tr key={`${sale.currentDate}-${index}`} className='fw-bold fs-6 text-gray-800'>
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
                </tbody>
              </table>
            </div>

            {/* Summary Report Table */}
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
                  {salesSalePointReportPaginated.salesTotals.map((sale, index) => (
                    <tr
                      key={`${sale.currencyCode}-${index}`}
                      className='fw-bold fs-6 text-gray-800'
                    >
                      <td className='text-center'>{sale.currencyCode}</td>
                      <td className='text-center'>
                        {formatCurrency(sale.totalSales, sale.currencyCode)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <Pagination>
              {Array.from({length: totalPages}).map((_, index) => (
                <Pagination.Item
                  key={index}
                  active={index === params.pageIndex}
                  onClick={() => handleFilterChange('pageIndex', index)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </>
        )}
      </div>

      {/* Chart Section */}
      {showChart && (
        <SalesSalePointReportChart currenciesData={currenciesData} promoterName={promoterName} />
      )}
    </>
  )
}

export default SalesSalePointReportTable
