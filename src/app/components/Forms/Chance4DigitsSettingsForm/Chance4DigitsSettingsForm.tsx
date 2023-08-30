import React from 'react'
import {Card, Col, Form, Row, Stack} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import ConfirmChance4DigitsSettings from '../../Modals/ConfirmChance4DigitsSettings/ConfirmChance4DigitsSettings'
import {useConfirmChance4DigitsSettings} from '../../Modals/ConfirmChance4DigitsSettings/ConfirmChance4DigitsSettings.hook'
import {useChance4DigitsSettingsForm} from './Chance4DigitsSettingsForm.hook'
import {
  IChance4DigitsLotterySetting,
  IChance4DigitsUpdateSettings,
} from '../../../../types/Chance4Digits.types'
import {chance4DigitsSettingsLimits} from '../../../constants/settings.constants'

interface IChance4DigitsSettingsFormProps {
  initialValues: IChance4DigitsLotterySetting[]
  submitForm: (animalitosSettings: IChance4DigitsUpdateSettings[]) => void
  isLoading: boolean
}

function Chance4DigitsSettingsForm({
  initialValues,
  submitForm,
  isLoading,
}: IChance4DigitsSettingsFormProps) {
  const {
    formikVes,
    formikUsd,
    onSubmit,
    showModalConfirmation,
    isShowingModalConfirmation,
    hideModalConfirmation,
    initialValuesVes,
    initialValuesUsd,
  } = useChance4DigitsSettingsForm(initialValues, submitForm)
  const {getChance4DigitsSettingsLabel} = useConfirmChance4DigitsSettings()
  return (
    <>
      <Stack className='w-100' gap={4} direction='horizontal'>
        <Card className='w-100'>
          <Card.Header className={'p-2 rounded-2 bg-success'}>
            <Card.Title className={'w-100 text-white'}>
              Configuración de Apuestas Chance 4 Cifras Bolívares
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance4DigitsSettingsLabel('minDigitsByBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='minDigitsByBet'
                    placeholder={getChance4DigitsSettingsLabel('minDigitsByBet')}
                    value={formikVes.values.minDigitsByBet}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.minDigitsByBet}
                    type='number'
                    min={chance4DigitsSettingsLimits.minDigitsByBet}
                    max={chance4DigitsSettingsLimits.maxDigitsByBet}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.minDigitsByBet}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance4DigitsSettingsLabel('maxDigitsByBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxDigitsByBet'
                    placeholder={getChance4DigitsSettingsLabel('maxDigitsByBet')}
                    value={formikVes.values.maxDigitsByBet}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.maxDigitsByBet}
                    type='number'
                    min={chance4DigitsSettingsLimits.minDigitsByBet}
                    max={chance4DigitsSettingsLimits.maxDigitsByBet}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.maxDigitsByBet}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance4DigitsSettingsLabel('betReturnedRate2Digits')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='betReturnedRate2Digits'
                    placeholder={getChance4DigitsSettingsLabel('betReturnedRate2Digits')}
                    value={formikVes.values.betReturnedRate2Digits}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.betReturnedRate2Digits}
                    type='number'
                    min={chance4DigitsSettingsLimits.minBetReturnedRate2Digits}
                    max={chance4DigitsSettingsLimits.maxBetReturnedRate2Digits}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.betReturnedRate2Digits}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance4DigitsSettingsLabel('betReturnedRate3Digits')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='betReturnedRate3Digits'
                    placeholder={getChance4DigitsSettingsLabel('betReturnedRate3Digits')}
                    value={formikVes.values.betReturnedRate3Digits}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.betReturnedRate3Digits}
                    type='number'
                    min={chance4DigitsSettingsLimits.minBetReturnedRate3Digits}
                    max={chance4DigitsSettingsLimits.maxBetReturnedRate3Digits}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.betReturnedRate3Digits}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance4DigitsSettingsLabel('betReturnedRate4Digits')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='betReturnedRate4Digits'
                    placeholder={getChance4DigitsSettingsLabel('betReturnedRate4Digits')}
                    value={formikVes.values.betReturnedRate4Digits}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.betReturnedRate4Digits}
                    type='number'
                    min={chance4DigitsSettingsLimits.minBetReturnedRate4Digits}
                    max={chance4DigitsSettingsLimits.maxBetReturnedRate4Digits}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.betReturnedRate4Digits}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance4DigitsSettingsLabel('maxBetByChance')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxBetByChance'
                    placeholder={getChance4DigitsSettingsLabel('maxBetByChance')}
                    value={formikVes.values.maxBetByChance}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.maxBetByChance}
                    type='number'
                    min={chance4DigitsSettingsLimits.minBetByChance}
                    max={chance4DigitsSettingsLimits.maxBetByChance}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.maxBetByChance}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance4DigitsSettingsLabel('maxOverallChanceBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxOverallChanceBet'
                    placeholder={getChance4DigitsSettingsLabel('maxOverallChanceBet')}
                    value={formikVes.values.maxOverallChanceBet}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.maxOverallChanceBet}
                    type='number'
                    min={chance4DigitsSettingsLimits.minOverallChanceBet}
                    max={chance4DigitsSettingsLimits.maxOverallChanceBet}
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
              Configuración de Apuestas Chance 4 Cifras Dólares
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance4DigitsSettingsLabel('minDigitsByBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='minDigitsByBet'
                    placeholder={getChance4DigitsSettingsLabel('minDigitsByBet')}
                    value={formikUsd.values.minDigitsByBet}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.minDigitsByBet}
                    type='number'
                    min={chance4DigitsSettingsLimits.minDigitsByBet}
                    max={chance4DigitsSettingsLimits.maxDigitsByBet}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.minDigitsByBet}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance4DigitsSettingsLabel('maxDigitsByBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxDigitsByBet'
                    placeholder={getChance4DigitsSettingsLabel('maxDigitsByBet')}
                    value={formikUsd.values.maxDigitsByBet}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.maxDigitsByBet}
                    type='number'
                    min={chance4DigitsSettingsLimits.minDigitsByBet}
                    max={chance4DigitsSettingsLimits.maxDigitsByBet}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.maxDigitsByBet}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance4DigitsSettingsLabel('betReturnedRate2Digits')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='betReturnedRate2Digits'
                    placeholder={getChance4DigitsSettingsLabel('betReturnedRate2Digits')}
                    value={formikUsd.values.betReturnedRate2Digits}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.betReturnedRate2Digits}
                    type='number'
                    min={chance4DigitsSettingsLimits.minBetReturnedRate2Digits}
                    max={chance4DigitsSettingsLimits.maxBetReturnedRate2Digits}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.betReturnedRate2Digits}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance4DigitsSettingsLabel('betReturnedRate3Digits')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='betReturnedRate3Digits'
                    placeholder={getChance4DigitsSettingsLabel('betReturnedRate3Digits')}
                    value={formikUsd.values.betReturnedRate3Digits}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.betReturnedRate3Digits}
                    type='number'
                    min={chance4DigitsSettingsLimits.minBetReturnedRate3Digits}
                    max={chance4DigitsSettingsLimits.maxBetReturnedRate3Digits}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.betReturnedRate3Digits}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance4DigitsSettingsLabel('betReturnedRate4Digits')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='betReturnedRate4Digits'
                    placeholder={getChance4DigitsSettingsLabel('betReturnedRate4Digits')}
                    value={formikUsd.values.betReturnedRate4Digits}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.betReturnedRate4Digits}
                    type='number'
                    min={chance4DigitsSettingsLimits.minBetReturnedRate4Digits}
                    max={chance4DigitsSettingsLimits.maxBetReturnedRate4Digits}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.betReturnedRate4Digits}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance4DigitsSettingsLabel('maxBetByChance')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxBetByChance'
                    placeholder={getChance4DigitsSettingsLabel('maxBetByChance')}
                    value={formikUsd.values.maxBetByChance}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.maxBetByChance}
                    type='number'
                    min={chance4DigitsSettingsLimits.minBetByChance}
                    max={chance4DigitsSettingsLimits.maxBetByChance}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.maxBetByChance}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChance4DigitsSettingsLabel('maxOverallChanceBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxOverallChanceBet'
                    placeholder={getChance4DigitsSettingsLabel('maxOverallChanceBet')}
                    value={formikUsd.values.maxOverallChanceBet}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.maxOverallChanceBet}
                    type='number'
                    min={chance4DigitsSettingsLimits.minOverallChanceBet}
                    max={chance4DigitsSettingsLimits.maxOverallChanceBet}
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
      <ConfirmChance4DigitsSettings
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

export default Chance4DigitsSettingsForm
