import {Stack, Card, Row, Col, Button, Form} from 'react-bootstrap'

import {IExchangeRateSettingsResponse} from '../../../../types/ExchangeRateSettings.types'
import {useExchangeRateSettingsForm} from './ExchangeRateSettingsForm.hook'
import DatePicker from 'react-datepicker'
import {DateTime} from 'luxon'
import './ExchangeRateSettingsForm.scss'

interface ExchangeRateSettingsFormProps {
  isLoading: boolean
  initialValues: IExchangeRateSettingsResponse
  submitForm: (exchangeRateSettings: IExchangeRateSettingsResponse) => void
}

const ExchangeRateSettingsForm = ({
  isLoading,
  initialValues,
  submitForm,
}: ExchangeRateSettingsFormProps) => {
  const {formik, onSubmit} = useExchangeRateSettingsForm(initialValues, submitForm)
  return (
    <>
      <Stack className='w-50' gap={4} direction='horizontal'>
        <Card className='w-100'>
          <Card.Header className={'p-2 rounded-2 bg-primary'}>
            <Card.Title className={'w-100 text-white'}>
              Configuración Tasa de Cambio de Dólares a Bolívares
            </Card.Title>
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
                      formik.values.currencyExchangeRateDate
                        ? DateTime.fromISO(formik.values.currencyExchangeRateDate).toFormat(
                            'yyyy-MM-dd'
                          )
                        : DateTime.now().toFormat('yyyy-MM-dd')
                    }
                    onChange={formik.handleChange}
                    autoComplete='off'
                    readOnly={true}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.currencyExchangeRateDate}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    Valor tasa de cambio de Dólar a Bolívar
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='exchangeRateValue'
                    placeholder={'Valor de tasa de cambio'}
                    value={formik.values.currencyExchangeRateValue.toString()}
                    type='text'
                    onChange={(e) => {
                      const value = e.target.value
                      if (/^\d*\.?\d*$/.test(value)) {
                        formik.setFieldValue('currencyExchangeRateValue', value)
                      }
                    }}
                    isInvalid={!!formik.errors.currencyExchangeRateValue}
                    autoComplete='off'
                  />
                  <Form.Text className='text-muted'>
                    Tasa de cambio actual: 1 USD = {formik.values.currencyExchangeRateValue} VES
                  </Form.Text>
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.currencyExchangeRateValue}
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
