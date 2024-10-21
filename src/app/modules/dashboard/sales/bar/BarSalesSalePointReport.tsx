/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import {getCSS, getCSSVariableValue} from '../../../../../_metronic/assets/ts/_utils'
import {ISalesSalePointDetailBarReport} from '../../../../../types/BarReport.types'
import {CURRENCY_USD} from '../../../../constants/reports.constants'
import {formatCurrency} from '../../../../helpers/currency.helpers'

type Props = {
  currencyCode: string
  data: ISalesSalePointDetailBarReport[]
  mode: string
}

const BarSalesSalePointReport: React.FC<Props> = ({currencyCode, data, mode}) => {
  const chartRef = useRef<HTMLDivElement | null>(null)

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

  useEffect(() => {
    const chart = refreshChart()
    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef, mode, data])

  return <div ref={chartRef} id={`chart-${currencyCode}`} style={{height: '400px'}}></div>
}

export {BarSalesSalePointReport}

function getChartOptions(
  height: number,
  currencyCode: string,
  data: ISalesSalePointDetailBarReport[]
): ApexOptions {
  const labelColor = getCSSVariableValue('--bs-gray-500')
  const borderColor = getCSSVariableValue('--bs-gray-200')
  const baseColor =
    currencyCode === CURRENCY_USD
      ? getCSSVariableValue('--bs-primary')
      : getCSSVariableValue('--bs-danger')
  const secondaryColor = getCSSVariableValue('--bs-danger')

  const salePoints = data.map((item) => item.salePoint)
  const totalSales = data.map((item) => item.totalSales)
  return {
    series: [
      {
        name: 'Total Ventas',
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
        columnWidth: '25%',
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
      categories: salePoints,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '11px',
        },
        rotate: -45,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '11px',
        },
      },
      title: {
        text: `${currencyCode}`,
        style: {
          color: labelColor,
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
