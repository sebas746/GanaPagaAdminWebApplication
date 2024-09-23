import React from 'react'

import {
  IAnimalitosLotteryGeneralSetting,
  IAnimalitoUpdateGeneralSettings,
} from '../../../../types/Animalitos.types'
import {Card, Col, Form, Row, Stack} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {useNavigate} from 'react-router-dom'
import {useAnimalitosGeneralSettingsForm} from './AnimalitosGeneralSettingsForm.hook'
import {useConfirmAnimalitosGeneralSettings} from '../../Modals/ConfirmAnimalitosGeneralSettings/ConfirmAnimalitosGeneralSettings.hook'
import ConfirmAnimalitosGeneralSettings from '../../Modals/ConfirmAnimalitosGeneralSettings/ConfirmAnimalitosGeneralSettings'

interface IAnimalitosSettingsFormProps {
  initialValues: IAnimalitosLotteryGeneralSetting[]
  submitForm: (animalitosSettings: IAnimalitoUpdateGeneralSettings[]) => void
  isLoading: boolean
}

function AnimalitosGeneralSettingsForm({
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
  } = useAnimalitosGeneralSettingsForm(initialValues, submitForm)
  const {getAnimalitosGeneralSettingsLabel} = useConfirmAnimalitosGeneralSettings()
  const navigate = useNavigate()
  return (
    <>
      <Stack className='w-100' gap={4} direction='horizontal'>
        <Card className='w-100'>
          <Card.Header className={'p-2 rounded-2 bg-success'}>
            <Card.Title className={'w-100 text-white'}>
              Configuración de Apuestas Animalitos Bolívares
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getAnimalitosGeneralSettingsLabel('maxBetByAnimal')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxBetByAnimal'
                    placeholder={getAnimalitosGeneralSettingsLabel('maxBetByAnimal')}
                    value={formikVes.values.maxBetByAnimal}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.maxBetByAnimal}
                    type='number'
                    autoComplete='off'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.maxBetByAnimal}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getAnimalitosGeneralSettingsLabel('maxAnimalsByTicket')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxAnimalsByTicket'
                    placeholder={getAnimalitosGeneralSettingsLabel('maxAnimalsByTicket')}
                    value={formikVes.values.maxAnimalsByTicket}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.maxAnimalsByTicket}
                    type='number'
                    autoComplete='off'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.maxAnimalsByTicket}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getAnimalitosGeneralSettingsLabel('maxOverallTripletaBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxOverallTripletaBet'
                    placeholder={getAnimalitosGeneralSettingsLabel('maxOverallTripletaBet')}
                    value={formikVes.values.maxOverallTripletaBet}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.maxOverallTripletaBet}
                    type='number'
                    autoComplete='off'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.maxOverallTripletaBet}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        <Card className='w-100'>
          <Card.Header className={'p-2 rounded-2 bg-primary'}>
            <Card.Title className={'w-100 text-white'}>
              Configuración de Apuestas Animalitos Dólares
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getAnimalitosGeneralSettingsLabel('maxBetByAnimal')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxBetByAnimal'
                    placeholder={getAnimalitosGeneralSettingsLabel('maxBetByAnimal')}
                    value={formikUsd.values.maxBetByAnimal}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.maxBetByAnimal}
                    type='number'
                    autoComplete='off'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.maxBetByAnimal}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getAnimalitosGeneralSettingsLabel('maxAnimalsByTicket')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxAnimalsByTicket'
                    placeholder={getAnimalitosGeneralSettingsLabel('maxAnimalsByTicket')}
                    value={formikUsd.values.maxAnimalsByTicket}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.maxAnimalsByTicket}
                    type='number'
                    autoComplete='off'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.maxAnimalsByTicket}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getAnimalitosGeneralSettingsLabel('maxOverallTripletaBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxOverallTripletaBet'
                    placeholder={getAnimalitosGeneralSettingsLabel('maxOverallTripletaBet')}
                    value={formikUsd.values.maxOverallTripletaBet}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.maxOverallTripletaBet}
                    type='number'
                    autoComplete='off'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.maxOverallTripletaBet}
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
      <ConfirmAnimalitosGeneralSettings
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

export default AnimalitosGeneralSettingsForm
