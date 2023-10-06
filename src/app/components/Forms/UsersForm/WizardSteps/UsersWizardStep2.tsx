import {Row, Col, Form, Button} from 'react-bootstrap'
import {
  IUsersForm,
  IUsersResponse,
  documentTypeToName,
  roleIdToName,
} from '../../../../../types/Users.types'
import {useWizard} from 'react-use-wizard'
import {useUsersWizardSteps} from './UsersWizardSteps.hook'
import RenderLoader from '../../../RenderLoader/RenderLoader'

interface UsersWizardStep2Props {
  initialValues: IUsersResponse
  submitForm: (users: IUsersForm) => void
  isLoading: boolean
  setCompleteFormData: React.Dispatch<React.SetStateAction<IUsersForm>>
  completeFormData: IUsersForm
}
const UsersWizardStep2 = ({
  initialValues,
  submitForm,
  isLoading,
  setCompleteFormData,
  completeFormData,
}: UsersWizardStep2Props) => {
  const {activeStep, nextStep} = useWizard()
  const {formik, onSubmit} = useUsersWizardSteps(
    initialValues,
    submitForm,
    activeStep,
    nextStep,
    setCompleteFormData,
    completeFormData
  )
  return (
    <>
      <Form>
        <Row className='mb-3'>
          <Col md={6}>
            <Form.Label className={'text-dark'}>Usuario</Form.Label>
            <Form.Control
              id='email'
              placeholder={'Usuario'}
              value={formik.values.email}
              onChange={formik.handleChange}
              type='email'
              isInvalid={formik.touched.email && !!formik.errors.email}
              autoComplete='new-user'
              onBlur={formik.handleBlur}
              size='sm'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.touched.email && formik.errors.email}
            </Form.Control.Feedback>
          </Col>
          <Col md={6}>
            <Form.Label className={'text-dark'}>Rol</Form.Label>
            <Form.Select
              id='rolId'
              value={formik.values.rolId}
              onChange={formik.handleChange}
              isInvalid={formik.touched.rolId && !!formik.errors.rolId}
              onBlur={formik.handleBlur}
              size='sm'
            >
              <option value='' label='Selecione un rol' />
              {Object.entries(roleIdToName).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type='invalid'>
              {formik.touched.rolId && formik.errors.rolId}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col md={6}>
            <Form.Label className={'text-dark'}>Contraseña</Form.Label>
            <Form.Control
              type='password'
              id='password'
              placeholder={'Contraseña'}
              value={formik.values.password}
              onChange={formik.handleChange}
              isInvalid={formik.touched.password && !!formik.errors.password}
              autoComplete='off'
              onBlur={formik.handleBlur}
              size='sm'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.touched.password && formik.errors.password}
            </Form.Control.Feedback>
          </Col>
          <Col md={6}>
            <Form.Label className={'text-dark'}>Confirmación contraseña</Form.Label>
            <Form.Control
              type='password'
              id='passwordConfirm'
              placeholder={'Confirmar contraseña'}
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              isInvalid={formik.touched.passwordConfirm && !!formik.errors.passwordConfirm}
              autoComplete='off'
              onBlur={formik.handleBlur}
              size='sm'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.touched.passwordConfirm && formik.errors.passwordConfirm}
            </Form.Control.Feedback>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col md={6}></Col>
          <Col md={6} className='d-flex justify-content-end'>
            <Button
              variant='primary'
              onClick={onSubmit}
              disabled={isLoading || !formik.isValid || !formik.dirty}
            >
              {'Guardar'} <RenderLoader show={isLoading} />
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default UsersWizardStep2
