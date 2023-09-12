import {Modal, Button, Card, Col, Form, Row, Stack} from 'react-bootstrap'
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
                  <div className='form-check form-switch form-check-custom form-check-solid'>
                    <Form.Check
                      id='adminEmailStatus'
                      placeholder={'Correo electrónico'}
                      isInvalid={!!formik.errors.adminEmailStatus}
                      type='checkbox'
                      checked={formik.values.adminEmailStatus === 1}
                      onChange={() => {
                        formik.setFieldValue(
                          'adminEmailStatus',
                          formik.values.adminEmailStatus === 1 ? 0 : 1
                        )
                      }}
                    />
                    <label className='form-check-label'>Activo</label>
                  </div>
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.adminEmailStatus}
                  </Form.Control.Feedback>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowFormModal(false)}>
              {'Cancelar'}
            </Button>
            <Button
              variant='primary'
              onClick={onSubmit}
              disabled={isLoading || !formik.isValid || !formik.dirty}
            >
              {'Guardar'} <RenderLoader show={isLoading} />
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default EmailScrutinySettingsForm
