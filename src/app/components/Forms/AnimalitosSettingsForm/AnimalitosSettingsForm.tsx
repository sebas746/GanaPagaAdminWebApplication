import React from 'react'
import {useAnimalitosSettingsForm} from './useAnimalitosASettingsForm'
import {
  IAnimalitosLotterySetting,
  IAnimalitoUpdateSettings,
} from '../../../../types/Animalitos.types'
import {Card, Col, Form, Row, Stack} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import ConfirmAnimalitosSettings from '../../Modals/ConfirmAnimalitosSettings/ConfirmAnimalitosSettings'

interface IAnimalitosSettingsFormProps {
  initialValues: IAnimalitosLotterySetting[]
  submitForm: (animalitosSettings: IAnimalitoUpdateSettings[]) => void
}

function AnimalitosSettingsForm({initialValues, submitForm}: IAnimalitosSettingsFormProps) {
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
  return (
    <>
      <Stack className='w-100' gap={4} direction='horizontal'>
        <Card className='w-100'>
          <Card.Header className={'p-2 rounded-2 bg-success'}>
            <Card.Title className={'w-100 text-white'}>
              Configuración de Apuestas Animalitos Bolivares
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>Cupo de apuestas </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxBetByAnimal'
                    placeholder='Máximo Apuesta por Animal'
                    value={formikVes.values.maxBetByAnimal}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.maxBetByAnimal}
                  />
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>Tasa de retorno de la apuesta</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='betReturnedRate'
                    placeholder='Tasa de retorno de la apuesta'
                    value={formikVes.values.betReturnedRate}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.betReturnedRate}
                  />
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    Número máximo de animales por ticket
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxAnimalsByTicket'
                    placeholder='Número máximo de animales por ticket'
                    value={formikVes.values.maxAnimalsByTicket}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.maxAnimalsByTicket}
                  />
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>Apuesta total máxima por ticket</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxOverallAnimalitoBet'
                    placeholder='Apuesta total máxima por ticket'
                    value={formikVes.values.maxOverallAnimalitoBet}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.maxOverallAnimalitoBet}
                  />
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        <Card className='w-100'>
          <Card.Header className={'p-2 rounded-2 bg-primary'}>
            <Card.Title className={'w-100 text-white'}>
              Configuración de Apuestas Animalitos Dolares
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>Cupo de apuestas </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxBetByAnimal'
                    placeholder='Máximo Apuesta por Animal'
                    value={formikUsd.values.maxBetByAnimal}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.maxBetByAnimal}
                  />
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>Tasa de retorno de la apuesta</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='betReturnedRate'
                    placeholder='Tasa de retorno de la apuesta'
                    value={formikUsd.values.betReturnedRate}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.betReturnedRate}
                  />
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    Número máximo de animales por ticket
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxAnimalsByTicket'
                    placeholder='Número máximo de animales por ticket'
                    value={formikUsd.values.maxAnimalsByTicket}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.maxAnimalsByTicket}
                  />
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>Apuesta total máxima por ticket</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxOverallAnimalitoBet'
                    placeholder='Apuesta total máxima por ticket'
                    value={formikUsd.values.maxOverallAnimalitoBet}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.maxOverallAnimalitoBet}
                  />
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Stack>
      <Stack className='mt-4 justify-content-end' direction='horizontal' gap={4}>
        <Button
          variant='primary'
          disabled={(!formikUsd.dirty && !formikVes.dirty) || !formikUsd.isValid || !formikVes.isValid}
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
      />
    </>
  )
}

export default AnimalitosSettingsForm
