/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../../../_metronic/assets/ts/_utils'
import {CURRENCY_USD} from '../../../../constants/reports.constants'
import {ISalesGameTypeDetailReport} from '../../../../../types/SalesGameTypeReport.types'
import {formatCurrency} from '../../../../helpers/currency.helpers'

type Props = {
  className: string
  currencyCode: string
  mode: string
  data: ISalesGameTypeDetailReport[]
}

const SalesGameTypeReport: React.FC<Props> = ({className, currencyCode, mode, data}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const chart = refreshChart()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef, mode, data])

  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const height = parseInt(getCSS(chartRef.current, 'height'))

    const chart = new ApexCharts(chartRef.current, getChartOptions(height, currencyCode, data))
    if (chart) {
      chart.render()
    }

    return chart
  }

  return (
    <div className={className}>
      <div ref={chartRef} id='kt_charts_widget_1_chart' style={{height: '350px'}} />
    </div>
  )
}

export {SalesGameTypeReport}

function getChartOptions(
  height: number,
  currencyCode: string,
  data: ISalesGameTypeDetailReport[]
): ApexOptions {
  const labelColor = getCSSVariableValue('--bs-gray-500')
  const borderColor = getCSSVariableValue('--bs-gray-200')
  const baseColor =
    currencyCode === CURRENCY_USD
      ? getCSSVariableValue('--bs-primary')
      : getCSSVariableValue('--bs-danger')
  const secondaryColor = getCSSVariableValue('--bs-danger')

  const gameTypes = data.map((item) => item.gameTypeName)
  const totalSales = data.map((item) => item.totalSales)

  return {
    series: [
      {
        name: currencyCode,
        data: totalSales,
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: height,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: gameTypes,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
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
    colors: [baseColor, secondaryColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  }
}
