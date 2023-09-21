import {Stack, Card, Row, Col, Button, Form} from 'react-bootstrap'

import {IExchangeRateSettingsResponse} from '../../../../types/ExchangeRateSettings.types'
import {useExchangeRateSettingsForm} from './ExchangeRateSettingsForm.hook'
import DatePicker from 'react-datepicker'
import {DateTime} from 'luxon'

interface ExchangeRateSettingsFormProps {
  isLoading: boolean
  initialValues: IExchangeRateSettingsResponse
  submitForm: (exchangeRateSettings: IExchangeRateSettingsResponse) => void
  setExchangeRateDate: (date: string) => void
}

const ExchangeRateSettingsForm = ({
  isLoading,
  initialValues,
  submitForm,
  setExchangeRateDate,
}: ExchangeRateSettingsFormProps) => {
  const {formik, onSubmit, handleDateChange} = useExchangeRateSettingsForm(
    initialValues,
    submitForm,
    setExchangeRateDate
  )
  return (
    <>
      <Stack className='w-50' gap={4} direction='horizontal'>
        <Card className='w-100'>
          <Card.Header className={'p-2 rounded-2 bg-success'}>
            <Card.Title className={'w-100 text-white'}>Configuración Tasa de Cambio</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>Fecha tasa de cambio</Form.Label>
                </Col>
                <Col>
                  <DatePicker
                    className='form-control'
                    id='exchangeRateDate'
                    value={
                      formik.values.exchangeRateDate
                        ? DateTime.fromISO(formik.values.exchangeRateDate).toFormat('yyyy-MM-dd')
                        : DateTime.now().toFormat('yyyy-MM-dd')
                    }
                    onChange={handleDateChange}
                    autoComplete='off'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.exchangeRateDate}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>Valor tasa de cambio</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='exchangeRateValue'
                    placeholder={'Fecha'}
                    value={formik.values.exchangeRateValue}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.exchangeRateValue}
                    type='number'
                    autoComplete='off'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.exchangeRateValue}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Stack>
      <Stack className='w-50 mt-2 justify-content-end' direction='horizontal'>
        <Button variant='primary' disabled={!formik.dirty || !formik.isValid} onClick={onSubmit}>
          Actualizar
        </Button>
      </Stack>
    </>
  )
}

export default ExchangeRateSettingsForm
