import React from 'react'
import {useAnimalitosSettingsForm} from './AnimalitosSettingsForm.hook'
import {
  IAnimalitosLotterySetting,
  IAnimalitoUpdateSettings,
} from '../../../../types/Animalitos.types'
import {Card, Col, Form, Row, Stack} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import ConfirmAnimalitosSettings from '../../Modals/ConfirmAnimalitosSettings/ConfirmAnimalitosSettings'
import {useConfirmAnimalitosSettings} from '../../Modals/ConfirmAnimalitosSettings/ConfirmAnimalitosSettings.hook'
import {useNavigate} from 'react-router-dom'

interface IAnimalitosSettingsFormProps {
  initialValues: IAnimalitosLotterySetting[]
  submitForm: (animalitosSettings: IAnimalitoUpdateSettings[]) => void
  isLoading: boolean
}

function AnimalitosSettingsForm({
  initialValues,
  submitForm,
  isLoading,
}: IAnimalitosSettingsFormProps) {
  const {
    formikVes,
    formikUsd,
    onSubmit,
    showModalConfirmation,
    isShowingModalConfirmation,
    hideModalConfirmation,
    initialValuesVes,
    initialValuesUsd,
  } = useAnimalitosSettingsForm(initialValues, submitForm)
  const {getAnimalitosSettingsLabel} = useConfirmAnimalitosSettings()
  const navigate = useNavigate()
  return (
    <>
      <Stack className='w-100' gap={4} direction='horizontal'>
        <Card className='w-100'>
          <Card.Header className={'p-2 rounded-2 bg-success'}>
            <Card.Title className={'w-100 text-white'}>
              Configuración General de Apuestas Animalitos Bolívares
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getAnimalitosSettingsLabel('betReturnedRate')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='betReturnedRate'
                    placeholder={getAnimalitosSettingsLabel('betReturnedRate')}
                    value={formikVes.values.betReturnedRate}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.betReturnedRate}
                    type='number'
                    autoComplete='off'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.betReturnedRate}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getAnimalitosSettingsLabel('maxOverallAnimalitoBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxOverallAnimalitoBet'
                    placeholder={getAnimalitosSettingsLabel('maxOverallAnimalitoBet')}
                    value={formikVes.values.maxOverallAnimalitoBet}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.maxOverallAnimalitoBet}
                    type='number'
                    autoComplete='off'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.maxOverallAnimalitoBet}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        <Card className='w-100'>
          <Card.Header className={'p-2 rounded-2 bg-primary'}>
            <Card.Title className={'w-100 text-white'}>
              Configuración General de Apuestas Animalitos Dólares
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getAnimalitosSettingsLabel('betReturnedRate')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='betReturnedRate'
                    placeholder={getAnimalitosSettingsLabel('betReturnedRate')}
                    value={formikUsd.values.betReturnedRate}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.betReturnedRate}
                    type='number'
                    autoComplete='off'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.betReturnedRate}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getAnimalitosSettingsLabel('maxOverallAnimalitoBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxOverallAnimalitoBet'
                    placeholder={getAnimalitosSettingsLabel('maxOverallAnimalitoBet')}
                    value={formikUsd.values.maxOverallAnimalitoBet}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.maxOverallAnimalitoBet}
                    type='number'
                    autoComplete='off'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.maxOverallAnimalitoBet}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Stack>
      <Stack className='mt-4 justify-content-end' direction='horizontal' gap={4}>
        <Button variant='secondary' className='me-2' onClick={() => navigate('/dashboard')}>
          Cancelar
        </Button>
        <Button
          variant='primary'
          disabled={
            (!formikUsd.dirty && !formikVes.dirty) || !formikUsd.isValid || !formikVes.isValid
          }
          onClick={showModalConfirmation}
        >
          Actualizar
        </Button>
      </Stack>
      <ConfirmAnimalitosSettings
        isShowingModalConfirmation={isShowingModalConfirmation}
        hideModalConfirmation={hideModalConfirmation}
        formikVes={formikVes}
        formikUsd={formikUsd}
        initialValuesVes={initialValuesVes}
        initialValuesUsd={initialValuesUsd}
        submitForm={onSubmit}
        isLoading={isLoading}
      />
    </>
  )
}

export default AnimalitosSettingsForm
