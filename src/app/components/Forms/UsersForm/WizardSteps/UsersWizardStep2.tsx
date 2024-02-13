import {Row, Col, Form, Button} from 'react-bootstrap'
import {
  IUsersResponse,
  RolesEnum,
  roleIdToName,
  roleTranslations,
} from '../../../../../types/Users.types'
import {useWizard} from 'react-use-wizard'
import RenderLoader from '../../../RenderLoader/RenderLoader'
import {UsersActions} from '../../../../pages/users-management/users/Users.hook'
import {IpaginationUsersResponse} from '../../../../../types/Pagination.types'
import {useMemo} from 'react'

interface UsersWizardStep2Props {
  formik: any
  isLoading: boolean
  onSubmit: (nextStep: () => Promise<void>, currentStepSubmit: number) => void
  action: UsersActions
  setCurrentStep: (currentStep: number) => void
  currentStep: number
  usersPaginated: IpaginationUsersResponse<IUsersResponse>
}
const UsersWizardStep2 = ({
  formik,
  isLoading,
  onSubmit,
  action,
  setCurrentStep,
  currentStep,
  usersPaginated,
}: UsersWizardStep2Props) => {
  const {nextStep, previousStep, activeStep} = useWizard()
  const isPromoterListReady = !isLoading && !!usersPaginated.promoterList
  const memoizedPromoterListOptions = useMemo(() => {
    if (isPromoterListReady && usersPaginated.promoterList) {
      return usersPaginated.promoterList.map((promoter, index) => (
        <option key={index} value={promoter.promoterId}>
          {promoter.promoterName}
        </option>
      ))
    }

    return []
  }, [isPromoterListReady, usersPaginated.promoterList])
  return (
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
            disabled={action === 'update'}
          />
          <Form.Control.Feedback type='invalid'>
            {formik.touched.email && formik.errors.email}
          </Form.Control.Feedback>
        </Col>
        <Col md={6}>
          <Form.Label className={'text-dark'}>Rol</Form.Label>
          <Form.Select
            id='rolId'
            value={String(formik.values.rolId)}
            onChange={formik.handleChange}
            isInvalid={formik.touched.rolId && !!formik.errors.rolId}
            onBlur={formik.handleBlur}
            size='sm'
            disabled={action === 'update'}
          >
            <option value='' label='Selecione un rol' />
            {Object.entries(roleIdToName).map(([key, value]) => (
              <option key={key} value={key}>
                {roleTranslations[value] || value}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type='invalid'>
            {formik.touched.rolId && formik.errors.rolId}
          </Form.Control.Feedback>
        </Col>
      </Row>
      {formik.values.rolId.toString() === RolesEnum.Promoter && (
        <Row className='mb-3'>
          <Col md={12}>
            <Form.Label className={'text-dark'}>Descripción</Form.Label>
            <Form.Control
              as='textarea'
              id='description'
              placeholder={'Descripción promotor'}
              value={formik.values.description}
              onChange={formik.handleChange}
              type='text'
              isInvalid={formik.touched.description && !!formik.errors.description}
              autoComplete='new-user'
              onBlur={formik.handleBlur}
              size='sm'
            />
            <Form.Control.Feedback type='invalid'>
              {formik.touched.description && formik.errors.description}
            </Form.Control.Feedback>
          </Col>
        </Row>
      )}

      {formik.values.rolId.toString() === RolesEnum.Seller && (
        <Row className='mb-3'>
          <Col md={12}>
            <Form.Label className={'text-dark'}>Promotor</Form.Label>
            <Form.Select
              id='promoterId'
              value={String(formik.values.promoterId)}
              onChange={formik.handleChange}
              isInvalid={formik.touched.promoterId && !!formik.errors.promoterId}
              onBlur={formik.handleBlur}
              size='sm'
              disabled={action === 'update'}
            >
              <option value='' label='Selecione un promotor' />
              {memoizedPromoterListOptions}
            </Form.Select>
            <Form.Control.Feedback type='invalid'>
              {formik.touched.promoterId && formik.errors.promoterId}
            </Form.Control.Feedback>
          </Col>
        </Row>
      )}

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
        <Col md={6}>
          <Form.Label className={'text-dark'}>Estado</Form.Label>
          <div className='form-check form-switch form-check-custom form-check-solid'>
            <Form.Check
              id='status'
              placeholder={'Correo electrónico'}
              isInvalid={!!formik.errors.isActive}
              type='checkbox'
              checked={formik.values.isActive}
              onChange={() => {
                formik.setFieldValue('isActive', !formik.values.isActive)
              }}
            />
            <label className='form-check-label'>Activo</label>
          </div>
          <Form.Control.Feedback type='invalid'>{formik.errors.isActive}</Form.Control.Feedback>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col md={6}></Col>
        <Col md={6} className='d-flex justify-content-end'>
          <div className='btn-group'>
            <Button variant='secondary' onClick={() => previousStep()}>
              {'Regresar'}
            </Button>
            <Button
              variant='primary'
              onClick={() => onSubmit(nextStep, activeStep)}
              disabled={isLoading || !formik.isValid || !formik.dirty}
            >
              {action === 'create' ? 'Guardar' : 'Actualizar'} <RenderLoader show={isLoading} />
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  )
}

export default UsersWizardStep2
