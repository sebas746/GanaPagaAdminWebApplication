import React from 'react'
import {Card, Col, Form, Row, Stack} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import ConfirmChanceZodiacSettings from '../../Modals/ConfirmChanceZodiacSettings/ConfirmChanceZodiacSettings'
import {useConfirmChanceZodiacSettings} from '../../Modals/ConfirmChanceZodiacSettings/ConfirmChanceZodiacSettings.hook'
import {useChanceZodiacSettingsForm} from './ChanceZodiacSettingsForm.hook'
import {
  IChanceZodiacLotterySetting,
  IChanceZodiacUpdateSettings,
} from '../../../../types/ChanceZodiac.types'
import {chanceZodiacSettingsLimits} from '../../../constants/settings.constants'

interface IChanceZodiacSettingsFormProps {
  initialValues: IChanceZodiacLotterySetting[]
  submitForm: (chanceZodiacSettings: IChanceZodiacUpdateSettings[]) => void
  isLoading: boolean
}

function ChanceZodiacSettingsForm({
  initialValues,
  submitForm,
  isLoading,
}: IChanceZodiacSettingsFormProps) {
  const {
    formikVes,
    formikUsd,
    onSubmit,
    showModalConfirmation,
    isShowingModalConfirmation,
    hideModalConfirmation,
    initialValuesVes,
    initialValuesUsd,
  } = useChanceZodiacSettingsForm(initialValues, submitForm)
  const {getChanceZodiacSettingsLabel} = useConfirmChanceZodiacSettings()
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
                    {getChanceZodiacSettingsLabel('minDigitsByBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='minDigitsByBet'
                    placeholder={getChanceZodiacSettingsLabel('minDigitsByBet')}
                    value={formikVes.values.minDigitsByBet}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.minDigitsByBet}
                    type='number'
                    min={chanceZodiacSettingsLimits.minDigitsByBet}
                    max={chanceZodiacSettingsLimits.maxDigitsByBet}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.minDigitsByBet}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChanceZodiacSettingsLabel('maxDigitsByBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxDigitsByBet'
                    placeholder={getChanceZodiacSettingsLabel('maxDigitsByBet')}
                    value={formikVes.values.maxDigitsByBet}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.maxDigitsByBet}
                    type='number'
                    min={chanceZodiacSettingsLimits.minDigitsByBet}
                    max={chanceZodiacSettingsLimits.maxDigitsByBet}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.maxDigitsByBet}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChanceZodiacSettingsLabel('betReturnedRate2Digits')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='betReturnedRate2Digits'
                    placeholder={getChanceZodiacSettingsLabel('betReturnedRate2Digits')}
                    value={formikVes.values.betReturnedRate2Digits}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.betReturnedRate2Digits}
                    type='number'
                    min={chanceZodiacSettingsLimits.minBetReturnedRate2Digits}
                    max={chanceZodiacSettingsLimits.maxBetReturnedRate2Digits}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.betReturnedRate2Digits}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChanceZodiacSettingsLabel('betReturnedRate3Digits')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='betReturnedRate3Digits'
                    placeholder={getChanceZodiacSettingsLabel('betReturnedRate3Digits')}
                    value={formikVes.values.betReturnedRate3Digits}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.betReturnedRate3Digits}
                    type='number'
                    min={chanceZodiacSettingsLimits.minBetReturnedRate3Digits}
                    max={chanceZodiacSettingsLimits.maxBetReturnedRate3Digits}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.betReturnedRate3Digits}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChanceZodiacSettingsLabel('maxBetByChance')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxBetByChance'
                    placeholder={getChanceZodiacSettingsLabel('maxBetByChance')}
                    value={formikVes.values.maxBetByChance}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.maxBetByChance}
                    type='number'
                    min={chanceZodiacSettingsLimits.minBetByChance}
                    max={chanceZodiacSettingsLimits.maxBetByChance}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikVes.errors.maxBetByChance}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChanceZodiacSettingsLabel('maxOverallChanceBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxOverallChanceBet'
                    placeholder={getChanceZodiacSettingsLabel('maxOverallChanceBet')}
                    value={formikVes.values.maxOverallChanceBet}
                    onChange={formikVes.handleChange}
                    isInvalid={!!formikVes.errors.maxOverallChanceBet}
                    type='number'
                    min={chanceZodiacSettingsLimits.minOverallChanceBet}
                    max={chanceZodiacSettingsLimits.maxOverallChanceBet}
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
                    {getChanceZodiacSettingsLabel('minDigitsByBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='minDigitsByBet'
                    placeholder={getChanceZodiacSettingsLabel('minDigitsByBet')}
                    value={formikUsd.values.minDigitsByBet}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.minDigitsByBet}
                    type='number'
                    min={chanceZodiacSettingsLimits.minDigitsByBet}
                    max={chanceZodiacSettingsLimits.maxDigitsByBet}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.minDigitsByBet}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChanceZodiacSettingsLabel('maxDigitsByBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxDigitsByBet'
                    placeholder={getChanceZodiacSettingsLabel('maxDigitsByBet')}
                    value={formikUsd.values.maxDigitsByBet}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.maxDigitsByBet}
                    type='number'
                    min={chanceZodiacSettingsLimits.minDigitsByBet}
                    max={chanceZodiacSettingsLimits.maxDigitsByBet}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.maxDigitsByBet}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChanceZodiacSettingsLabel('betReturnedRate2Digits')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='betReturnedRate2Digits'
                    placeholder={getChanceZodiacSettingsLabel('betReturnedRate2Digits')}
                    value={formikUsd.values.betReturnedRate2Digits}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.betReturnedRate2Digits}
                    type='number'
                    min={chanceZodiacSettingsLimits.minBetReturnedRate2Digits}
                    max={chanceZodiacSettingsLimits.maxBetReturnedRate2Digits}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.betReturnedRate2Digits}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChanceZodiacSettingsLabel('betReturnedRate3Digits')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='betReturnedRate3Digits'
                    placeholder={getChanceZodiacSettingsLabel('betReturnedRate3Digits')}
                    value={formikUsd.values.betReturnedRate3Digits}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.betReturnedRate3Digits}
                    type='number'
                    min={chanceZodiacSettingsLimits.minBetReturnedRate3Digits}
                    max={chanceZodiacSettingsLimits.maxBetReturnedRate3Digits}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.betReturnedRate3Digits}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChanceZodiacSettingsLabel('maxBetByChance')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxBetByChance'
                    placeholder={getChanceZodiacSettingsLabel('maxBetByChance')}
                    value={formikUsd.values.maxBetByChance}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.maxBetByChance}
                    type='number'
                    min={chanceZodiacSettingsLimits.minBetByChance}
                    max={chanceZodiacSettingsLimits.maxBetByChance}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formikUsd.errors.maxBetByChance}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>
                    {getChanceZodiacSettingsLabel('maxOverallChanceBet')}
                  </Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='maxOverallChanceBet'
                    placeholder={getChanceZodiacSettingsLabel('maxOverallChanceBet')}
                    value={formikUsd.values.maxOverallChanceBet}
                    onChange={formikUsd.handleChange}
                    isInvalid={!!formikUsd.errors.maxOverallChanceBet}
                    type='number'
                    min={chanceZodiacSettingsLimits.minOverallChanceBet}
                    max={chanceZodiacSettingsLimits.maxOverallChanceBet}
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
      <ConfirmChanceZodiacSettings
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

export default ChanceZodiacSettingsForm
