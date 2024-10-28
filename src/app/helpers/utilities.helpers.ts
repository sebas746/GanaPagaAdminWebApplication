enum ReportTypes {
  Daily = 'DAILY',
  Weekly = 'WEEKLY',
  Monthly = 'MONTHLY',
}

export const getReportDateRange = (reportType: string): {initialDate: Date; endDate: Date} => {
  console.log(reportType)
  const currentDate = new Date()
  const maxEndDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  )
  let initialDate: Date
  let endDate: Date

  switch (reportType) {
    case 'Daily':
      initialDate = new Date(currentDate)
      endDate = new Date(currentDate)
      break
    case 'Weekly':
      const dayOfWeek = currentDate.getDay()
      const diff = (dayOfWeek + 6) % 7
      initialDate = new Date(currentDate)
      initialDate.setDate(currentDate.getDate() - diff)
      endDate = new Date(initialDate)
      endDate.setDate(initialDate.getDate() + 6)
      if (endDate > maxEndDate) endDate = maxEndDate
      break
    case 'Monthly':
      initialDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
      endDate = new Date(initialDate.getFullYear(), initialDate.getMonth() + 1, 0)
      if (endDate > maxEndDate) endDate = maxEndDate
      break
    default:
      throw new Error('Unsupported report type')
  }
  return {initialDate, endDate}
}

export const getCurrentMonthInSpanish = (): string => {
  const date = new Date()
  const monthInSpanish = new Intl.DateTimeFormat('es-ES', {month: 'long'}).format(date)
  return monthInSpanish.charAt(0).toUpperCase() + monthInSpanish.slice(1)
}
