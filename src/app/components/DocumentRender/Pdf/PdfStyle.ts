import {StyleSheet} from '@react-pdf/renderer'

export const ticketPdfStyle = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 5, // Adjust padding to fit smaller page
  },
  header: {
    fontSize: 6, // Smaller font size to fit smaller page
    marginBottom: 10, // Less vertical space to fit smaller page
    textAlign: 'right',
  },
  footer: {
    fontSize: 6, // Smaller font size to fit smaller page
    textAlign: 'center',
    position: 'absolute',
    bottom: 10, // Less space from bottom to fit smaller page
    left: 0,
    right: 0,
  },
  section: {
    marginBottom: 5, // Less vertical space to fit smaller page
  },
  title: {
    fontSize: 10, // Smaller font size to fit smaller page
    fontWeight: 'bold',
    marginBottom: 5, // Less vertical space to fit smaller page
  },
  subTitle: {
    fontSize: 8, // Smaller font size to fit smaller page
    fontWeight: 'bold',
    marginBottom: 5, // Less vertical space to fit smaller page
  },
  text: {
    fontSize: 7, // Smaller font size to fit smaller page
    marginBottom: 5, // Less vertical space to fit smaller page
  },
  bet: {
    fontSize: 7, // Smaller font size to fit smaller page
    marginBottom: 5, // Less vertical space to fit smaller page
  },
  total: {
    fontSize: 7, // Smaller font size to fit smaller page
    fontWeight: 'bold',
    marginBottom: 5, // Less vertical space to fit smaller page
  },
})
