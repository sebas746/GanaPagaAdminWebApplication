/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {useThemeMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import {getCSSVariableValue} from '../../../../../_metronic/assets/ts/_utils'
import {IDonutSalesPaymentReport} from '../../../../../types/DonutSalesPaymentReport.types'
import {formatCurrency} from '../../../../helpers/currency.helpers'

type Props = {
  className: string
  chartColor: string
  chartHeight: string
  title: string
  currencyCode: string
  reportData: IDonutSalesPaymentReport
}

const DonutSalesPaymentReport: React.FC<Props> = ({
  className,
  chartColor,
  chartHeight,
  title,
  currencyCode,
  reportData,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()
  const refreshChart = () => {
    if (!chartRef.current || Object.keys(reportData).length === 0) {
      return
    }

    const chart = new ApexCharts(
      chartRef.current,
      chartOptions(chartColor, chartHeight, currencyCode, reportData)
    )
    if (chart) {
      chart.render()
    }

    return chart
  }

  useEffect(() => {
    const chart = refreshChart()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef, mode])

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body p-0 d-flex justify-content-between flex-column overflow-hidden'>
        {/* begin::Hidden */}
        <div className='d-flex flex-stack flex-wrap flex-grow-1 px-9 pt-9 pb-3'>
          <div className='me-2'>
            <span className='fw-bold text-gray-800 d-block fs-3'>Ganancias</span>

            <span className='text-gray-400 fw-semibold'>{title}</span>
          </div>

          <div className={`fw-bold fs-3 text-${chartColor}`}>
            {formatCurrency(reportData.totalProfit, currencyCode)}
          </div>
        </div>
        {/* end::Hidden */}

        {/* begin::Chart */}
        <div ref={chartRef} className='mixed-widget-10-chart'></div>
        {/* end::Chart */}
      </div>
    </div>
  )
}

const chartOptions = (
  chartColor: string,
  chartHeight: string,
  currencyCode: string,
  reportData: IDonutSalesPaymentReport
): ApexOptions => {
  const labelColor = getCSSVariableValue('--bs-gray-500')
  const borderColor = getCSSVariableValue('--bs-gray-200')
  const baseColor = getCSSVariableValue('--bs-' + chartColor)
  return {
    series: [reportData.totalSales, reportData.totalPaid],
    chart: {
      fontFamily: 'inherit',
      type: 'donut',
      height: chartHeight,
    },
    labels: ['Ventas', 'Premiación'], // Customize these labels as needed
    legend: {
      position: 'bottom',
    },
    dataLabels: {
      enabled: true,
    },
    colors: [baseColor, labelColor], // Adjust colors
    fill: {
      type: 'donut',
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return formatCurrency(val, currencyCode)
        },
      },
    },
    grid: {
      padding: {
        top: 10,
      },
      borderColor: borderColor,
    },
  }
}

export {DonutSalesPaymentReport}
