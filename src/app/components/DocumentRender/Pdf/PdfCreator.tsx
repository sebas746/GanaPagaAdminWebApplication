import ReactPDF, {Page, Text, View, Document} from '@react-pdf/renderer'
import {ITicketResponse} from '../../../../types/Ticket.types'
import {formatCurrency} from '../../../helpers/currency.helpers'
import {ticketPdfStyle} from './PdfStyle'

// Create styles

export const TicketPdfCreator = (ticket: ITicketResponse) => {
  const dueDate = ticket.ticketDueDate
    ? new Date(ticket.ticketDueDate).toISOString().split('T')[0]
    : ''
  const printDate = new Date().toISOString().slice(0, 19).replace('T', ' ')
  if (ticket.ticketNumber) {
    return (
      <Document>
        <Page size={[165, 792]} style={ticketPdfStyle.page} wrap>
          <Text style={ticketPdfStyle.header}>Hora impresión: {printDate}</Text>
          <Text style={ticketPdfStyle.text}>
            (Esta impresión es una copia y no correponse al tiquete original)
          </Text>
          <View style={ticketPdfStyle.section}>
            <Text style={ticketPdfStyle.title}>Detalle del tiquete # {ticket.ticketId}</Text>
            <Text style={ticketPdfStyle.subTitle}>{ticket.ticketCompanyName}</Text>
            <Text style={ticketPdfStyle.text}>
              Fecha: {new Date(ticket.ticketCreatedAt).toLocaleString()}
            </Text>
            <Text style={ticketPdfStyle.text}>Código: {ticket.ticketNumber}</Text>
            <Text style={ticketPdfStyle.text}>Valido hasta: {dueDate}</Text>
            <Text style={ticketPdfStyle.text}>Moneda: {ticket.currencyCode}</Text>
            <Text style={ticketPdfStyle.text}>
              Total: {formatCurrency(ticket.ticketTotal, ticket.currencyCode)}
            </Text>
          </View>
          <View style={ticketPdfStyle.section}>
            <Text style={ticketPdfStyle.subTitle}>Resumen Apuestas</Text>
            {ticket.bets.map((bet, index) => (
              <View key={index}>
                <Text style={ticketPdfStyle.text}>
                  {bet.lotteryName} - {bet.raffleName}
                </Text>
                {bet.betDetail.map((detail, index) => (
                  <Text key={index} style={ticketPdfStyle.bet}>
                    {detail.betValue}, {formatCurrency(detail.betTotal, ticket.currencyCode)}
                  </Text>
                ))}
              </View>
            ))}
          </View>
          <Text
            style={ticketPdfStyle.footer}
            render={({pageNumber, totalPages}) => `${pageNumber} / ${totalPages}`}
            fixed
          />
        </Page>
      </Document>
    )
  }
  return <></>
}

export default {}
