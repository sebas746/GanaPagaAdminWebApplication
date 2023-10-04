import {Modal, Button, Col, Form, Row} from 'react-bootstrap'
import RenderLoader from '../../RenderLoader/RenderLoader'
import {useEffect} from 'react'
import {IUsersForm, IUsersResponse} from '../../../../types/Users.types'
import {useUsersForm} from './UsersForm.hook'

interface UsersFormProps {
  isLoading: boolean
  initialValues: IUsersResponse
  submitForm: (users: IUsersForm) => void
  showFormModal: boolean
  setShowFormModal: (show: boolean) => void
}

const UsersForm = ({
  isLoading,
  initialValues,
  submitForm,
  showFormModal,
  setShowFormModal,
}: UsersFormProps) => {
  const {formik, onSubmit} = useUsersForm(initialValues, submitForm)

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
                    id='firstName'
                    placeholder={'Nombres'}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.firstName}
                    autoComplete='off'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.firstName}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>Apellidos</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='lastName'
                    placeholder={'Apellidos'}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.lastName}
                    autoComplete='off'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.lastName}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>Correo electrónico</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='email'
                    placeholder={'Correo electrónico'}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.email}
                    autoComplete='off'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Col>
              </Row>
              <Row className='mb-6'>
                <Col>
                  <Form.Label className={'text-dark'}>Número teléfono</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id='phoneNumber'
                    placeholder={'Correo electrónico'}
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.phoneNumber}
                    autoComplete='off'
                  />
                  <Form.Control.Feedback type='invalid'>
                    {formik.errors.phoneNumber}
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

export default UsersForm
