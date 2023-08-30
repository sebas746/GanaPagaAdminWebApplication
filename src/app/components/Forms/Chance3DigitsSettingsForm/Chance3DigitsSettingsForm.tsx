import React from 'react'
import {Card, Col, Form, Row, Stack} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import ConfirmChance3DigitsSettings from '../../Modals/ConfirmChance3DigitsSettings/ConfirmChance3DigitsSettings'
import {useConfirmChance3DigitsSettings} from '../../Modals/ConfirmChance3DigitsSettings/ConfirmChance3DigitsSettings.hook'
import {useChance3DigitsSettingsForm} from './Chance3DigitsSettingsForm.hook'
import {
  IChance3DigitsLotterySetting,
  IChance3DigitsUpdateSettings,
} from '../../../../types/Chance3Digits.types'
import {chance3DigitsSettingsLimits} from '../../../constants/settings.constants'

interface IChance3DigitsSettingsFormProps {
  initialValues: IChance3DigitsLotterySetting[]
  submitForm: (chance3DigitsSettings: IChance3DigitsUpdateSettings[]) => void
  isLoading: boolean
}

function Chance3DigitsSettingsForm({
  initialValues,
  submitForm,
  isLoading,
}: IChance3DigitsSettingsFormProps) {
  const {
    formikVes,
    formikUsd,
    onSubmit,
    showModalConfirmation,
    isShowingModalConfirmation,
    hideModalConfirmation,
    initialValuesVes,
    initialValuesUsd,
  } = useChance3DigitsSettingsForm(initialValues, submitForm)
  const {getChance3DigitsSettingsLabel} = useConfirmChance3DigitsSettings()
  return (
    <>
      <Stack className='w-100' gap={4} direction='horizontal'>
        <Card className='w-100'>
          <Card.Header className={'p-2 rounded-2 bg-success'}>
            <Card.Title className={'w-100 text-white'}>
              Configuración de Apuestas Chance 3 Cifras Bolívares
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance3DigitsSettingsLabel('minDigitsByBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='minDigitsByBet'
                    placeholder={getChance3DigitsSettingsLabel('minDigitsByBet')}
                    value={formikVes.values.minDigitsByBet}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.minDigitsByBet}
                    type='number'
                    min={chance3DigitsSettingsLimits.minDigitsByBet}
                    max={chance3DigitsSettingsLimits.maxDigitsByBet}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.minDigitsByBet}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance3DigitsSettingsLabel('maxDigitsByBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxDigitsByBet'
                    placeholder={getChance3DigitsSettingsLabel('maxDigitsByBet')}
                    value={formikVes.values.maxDigitsByBet}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.maxDigitsByBet}
                    type='number'
                    min={chance3DigitsSettingsLimits.minDigitsByBet}
                    max={chance3DigitsSettingsLimits.maxDigitsByBet}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.maxDigitsByBet}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance3DigitsSettingsLabel('betReturnedRate2Digits')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='betReturnedRate2Digits'
                    placeholder={getChance3DigitsSettingsLabel('betReturnedRate2Digits')}
                    value={formikVes.values.betReturnedRate2Digits}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.betReturnedRate2Digits}
                    type='number'
                    min={chance3DigitsSettingsLimits.minBetReturnedRate2Digits}
                    max={chance3DigitsSettingsLimits.maxBetReturnedRate2Digits}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.betReturnedRate2Digits}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance3DigitsSettingsLabel('betReturnedRate3Digits')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='betReturnedRate3Digits'
                    placeholder={getChance3DigitsSettingsLabel('betReturnedRate3Digits')}
                    value={formikVes.values.betReturnedRate3Digits}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.betReturnedRate3Digits}
                    type='number'
                    min={chance3DigitsSettingsLimits.minBetReturnedRate3Digits}
                    max={chance3DigitsSettingsLimits.maxBetReturnedRate3Digits}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.betReturnedRate3Digits}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance3DigitsSettingsLabel('maxBetByChance')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxBetByChance'
                    placeholder={getChance3DigitsSettingsLabel('maxBetByChance')}
                    value={formikVes.values.maxBetByChance}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.maxBetByChance}
                    type='number'
                    min={chance3DigitsSettingsLimits.minBetByChance}
                    max={chance3DigitsSettingsLimits.maxBetByChance}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.maxBetByChance}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance3DigitsSettingsLabel('maxOverallChanceBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxOverallChanceBet'
                    placeholder={getChance3DigitsSettingsLabel('maxOverallChanceBet')}
                    value={formikVes.values.maxOverallChanceBet}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.maxOverallChanceBet}
                    type='number'
                    min={chance3DigitsSettingsLimits.minOverallChanceBet}
                    max={chance3DigitsSettingsLimits.maxOverallChanceBet}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.maxOverallChanceBet}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        <Card className='w-100'>
          <Card.Header className={'p-2 rounded-2 bg-primary'}>
            <Card.Title className={'w-100 text-white'}>
              Configuración de Apuestas Chance 3 Dígitos Dólares
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance3DigitsSettingsLabel('minDigitsByBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='minDigitsByBet'
                    placeholder={getChance3DigitsSettingsLabel('minDigitsByBet')}
                    value={formikUsd.values.minDigitsByBet}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.minDigitsByBet}
                    type='number'
                    min={chance3DigitsSettingsLimits.minDigitsByBet}
                    max={chance3DigitsSettingsLimits.maxDigitsByBet}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.minDigitsByBet}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance3DigitsSettingsLabel('maxDigitsByBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxDigitsByBet'
                    placeholder={getChance3DigitsSettingsLabel('maxDigitsByBet')}
                    value={formikUsd.values.maxDigitsByBet}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.maxDigitsByBet}
                    type='number'
                    min={chance3DigitsSettingsLimits.minDigitsByBet}
                    max={chance3DigitsSettingsLimits.maxDigitsByBet}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.maxDigitsByBet}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance3DigitsSettingsLabel('betReturnedRate2Digits')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='betReturnedRate2Digits'
                    placeholder={getChance3DigitsSettingsLabel('betReturnedRate2Digits')}
                    value={formikUsd.values.betReturnedRate2Digits}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.betReturnedRate2Digits}
                    type='number'
                    min={chance3DigitsSettingsLimits.minBetReturnedRate2Digits}
                    max={chance3DigitsSettingsLimits.maxBetReturnedRate2Digits}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.betReturnedRate2Digits}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance3DigitsSettingsLabel('betReturnedRate3Digits')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='betReturnedRate3Digits'
                    placeholder={getChance3DigitsSettingsLabel('betReturnedRate3Digits')}
                    value={formikUsd.values.betReturnedRate3Digits}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.betReturnedRate3Digits}
                    type='number'
                    min={chance3DigitsSettingsLimits.minBetReturnedRate3Digits}
                    max={chance3DigitsSettingsLimits.maxBetReturnedRate3Digits}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.betReturnedRate3Digits}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance3DigitsSettingsLabel('maxBetByChance')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxBetByChance'
                    placeholder={getChance3DigitsSettingsLabel('maxBetByChance')}
                    value={formikUsd.values.maxBetByChance}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.maxBetByChance}
                    type='number'
                    min={chance3DigitsSettingsLimits.minBetByChance}
                    max={chance3DigitsSettingsLimits.maxBetByChance}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.maxBetByChance}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance3DigitsSettingsLabel('maxOverallChanceBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxOverallChanceBet'
                    placeholder={getChance3DigitsSettingsLabel('maxOverallChanceBet')}
                    value={formikUsd.values.maxOverallChanceBet}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.maxOverallChanceBet}
                    type='number'
                    min={chance3DigitsSettingsLimits.minOverallChanceBet}
                    max={chance3DigitsSettingsLimits.maxOverallChanceBet}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.maxOverallChanceBet}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Stack>
      <Stack className='mt-4 justify-content-end' direction='horizontal' gap={4}>
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
      <ConfirmChance3DigitsSettings
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

export default Chance3DigitsSettingsForm
