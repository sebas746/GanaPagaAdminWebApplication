import {
  Modal,
  Button,
  Card,
  Col,
  Form,
  Row,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap'
import RenderLoader from '../../RenderLoader/RenderLoader'
import {useEmailScrutinySettingsForm} from './EmailScrutinySettingsForm.hook'
import {IEmailScrutinySettingsResponse} from '../../../../types/ScrutinySettings.types'
import {useEffect} from 'react'

interface EmailScrutinySettingsFormProps {
  isLoading: boolean
  initialValues: IEmailScrutinySettingsResponse
  submitForm: (emailScrutinySettings: IEmailScrutinySettingsResponse) => void
  showFormModal: boolean
  setShowFormModal: (show: boolean) => void
}

const EmailScrutinySettingsForm = ({
  isLoading,
  initialValues,
  submitForm,
  showFormModal,
  setShowFormModal,
}: EmailScrutinySettingsFormProps) => {
  const {formik, onSubmit} = useEmailScrutinySettingsForm(initialValues, submitForm)
  useEffect(() => {
    formik.resetForm({values: initialValues})
  }, [initialValues])

  if (!formik.initialValues.adminEmailEmail) return <RenderLoader show={true} />
  return (
    <>
      <div className='static-modal'>
        <Modal
          animation={false}
          show={showFormModal}
          onHide={() => setShowFormModal(false)}
          size={'lg'}
        >
          <Modal.Header>
            <Modal.Title>{'Correo escrutinios'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <Stack className='w-100' gap={4} direction='horizontal'>
                <Card className='w-100'>
                  <Card.Header className={'p-2 rounded-2 bg-success'}>
                    <Card.Title className={'w-100 text-white'}>
                      Datos del usuario para el envío de correos
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Row className='mb-6'>
                        <Col>
                          <Form.Label className={'text-dark'}>Nombres</Form.Label>
                        </Col>
                        <Col>
                          <Form.Control
                            id='adminEmailName'
                            placeholder={'Nombres'}
                            value={formik.values.adminEmailName}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.adminEmailName}
                            autoComplete='off'
                          />
                          <Form.Control.Feedback type='invalid'>
                            {formik.errors.adminEmailName}
                          </Form.Control.Feedback>
                        </Col>
                      </Row>
                      <Row className='mb-6'>
                        <Col>
                          <Form.Label className={'text-dark'}>Apellidos</Form.Label>
                        </Col>
                        <Col>
                          <Form.Control
                            id='adminEmailLastName'
                            placeholder={'Apellidos'}
                            value={formik.values.adminEmailLastName}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.adminEmailLastName}
                            autoComplete='off'
                          />
                          <Form.Control.Feedback type='invalid'>
                            {formik.errors.adminEmailLastName}
                          </Form.Control.Feedback>
                        </Col>
                      </Row>
                      <Row className='mb-6'>
                        <Col>
                          <Form.Label className={'text-dark'}>Correo electrónico</Form.Label>
                        </Col>
                        <Col>
                          <Form.Control
                            id='adminEmailEmail'
                            placeholder={'Correo electrónico'}
                            value={formik.values.adminEmailEmail}
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.adminEmailEmail}
                            autoComplete='off'
                          />
                          <Form.Control.Feedback type='invalid'>
                            {formik.errors.adminEmailEmail}
                          </Form.Control.Feedback>
                        </Col>
                      </Row>
                      <Row className='mb-6'>
                        <Col>
                          <Form.Label className={'text-dark'}>Estado</Form.Label>
                        </Col>
                        <Col>
                          <ToggleButtonGroup
                            type='radio'
                            name='options'
                            value={formik.values.adminEmailStatus}
                            onChange={formik.handleChange}
                          >
                            <ToggleButton value={'active'} variant='outline-success'>
                              Active
                            </ToggleButton>
                            <ToggleButton value={'inactive'} variant='outline-danger'>
                              Inactive
                            </ToggleButton>
                          </ToggleButtonGroup>
                          <Form.Control.Feedback type='invalid'>
                            {formik.errors.adminEmailStatus}
                          </Form.Control.Feedback>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </Stack>
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowFormModal(false)}>
              {'Cancelar'}
            </Button>
            <Button variant='primary' onClick={onSubmit} disabled={isLoading}>
              {'Confirmar'} <RenderLoader show={isLoading} />
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default EmailScrutinySettingsForm
