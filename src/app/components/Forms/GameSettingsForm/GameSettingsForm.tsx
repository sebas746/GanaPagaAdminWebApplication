import {Stack, Card, Row, Col, Button, Form} from 'react-bootstrap'
import {IGameSettingsResponse} from '../../../../types/GameSettings.types'
import {useGameSettingsForm} from './GameSettingsForm.hook'
import RenderLoader from '../../RenderLoader/RenderLoader'

interface GameSettingsFormProps {
  isLoading: boolean
  initialValues: IGameSettingsResponse[]
  submitForm: (gameSettings: IGameSettingsResponse[]) => void
}

const GameSettingsForm = ({isLoading, initialValues, submitForm}: GameSettingsFormProps) => {
  const {formik, onSubmit, originalValues} = useGameSettingsForm(initialValues, submitForm)
  return (
    <Form>
      <Row className='justify-content-start'>
        <Col md={6}>
          <Card className='mb-2'>
            <Card.Header className={'p-2 rounded-2 bg-primary'}>
              <Card.Title className={'w-100 text-white'}>Configuración global juegos</Card.Title>
            </Card.Header>
            <Card.Body>
              {formik.values.map((setting, index) => (
                <Row key={setting.gameSettingsName} className='mb-2'>
                  <Col>
                    <Form.Label className={'text-dark'}>{setting.gameSettingsLabel}</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control
                      name={`gameSettingsValue[${index}]`}
                      id={`gameSettingsValue[${index}]`}
                      placeholder='Enter value'
                      value={formik.values[index].gameSettingsValue}
                      type='text'
                      onChange={(e) => {
                        const value = e.target.value
                        const updatedValues = formik.values.map((setting, idx) => {
                          if (idx === index) {
                            return {...setting, gameSettingsValue: value}
                          }
                          return setting
                        })
                        formik.setValues(updatedValues)
                      }}
                      isInvalid={!!formik.errors[index]?.gameSettingsValue}
                      autoComplete='off'
                    />

                    <Form.Text className='text-muted'>
                      Valor actual: {originalValues[index].gameSettingsValue}{' '}
                    </Form.Text>
                    <Form.Control.Feedback type='invalid'>
                      {formik.errors[index]?.gameSettingsValue}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              ))}
            </Card.Body>
          </Card>
          <Stack className='mt-2 justify-content-end' direction='horizontal'>
            <Button
              variant='primary'
              disabled={!formik.dirty || !formik.isValid}
              onClick={onSubmit}
            >
              Actualizar <RenderLoader show={isLoading} />
            </Button>
          </Stack>
        </Col>
      </Row>
    </Form>
  )
}

export default GameSettingsForm
