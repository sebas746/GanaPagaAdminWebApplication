import ReactPDF, {usePDF} from '@react-pdf/renderer'
import {useEffect, useState} from 'react'
import PdfCreator, {TicketPdfCreator} from './PdfCreator'
import {ITicketResponse} from '../../../../types/Ticket.types'

export const usePdfCreator = () => {
  const [ticketContent, setTicketContent] = useState<ITicketResponse>({} as ITicketResponse)
  const [instance, updateInstance] = usePDF({document: TicketPdfCreator(ticketContent)})

  const exportTicketPDF = (ticketResponse: ITicketResponse) => {
    if (ticketResponse) {
      setTicketContent(ticketResponse)
      updateInstance(TicketPdfCreator(ticketResponse))
    }
  }

  useEffect(() => {
    if (ticketContent.ticketId && instance.url !== null) {
      const url = instance.url
      const link = document.createElement('a')
      link.href = url
      link.download = 'ticket_' + ticketContent.ticketId + '.pdf'
      link.click()
      setTimeout(() => {
        setTicketContent({} as ITicketResponse)
      }, 1000)
    }
  }, [instance])

  return {exportTicketPDF}
}
