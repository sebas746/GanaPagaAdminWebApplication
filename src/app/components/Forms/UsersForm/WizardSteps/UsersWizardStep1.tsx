import {Row, Col, Button, Form} from 'react-bootstrap'
import {documentTypeToName} from '../../../../../types/Users.types'
import RenderLoader from '../../../RenderLoader/RenderLoader'
import {UsersActions} from '../../../../pages/users-management/users/Users.hook'
import {useWizard} from 'react-use-wizard'
import {useEffect} from 'react'

interface UsersWizardStep1Props {
  formik: any
  isLoading: boolean
  onSubmit: (nextStep: () => Promise<void>, currentStepSubmit: number) => void
  action: UsersActions
  setCurrentStep: (currentStep: number) => void
  currentStep: number
}

const UsersWizardStep1 = ({formik, isLoading, onSubmit, currentStep}: UsersWizardStep1Props) => {
  const {nextStep, activeStep} = useWizard()

  return (
    <Form>
      <Row className='mb-3'>
        {/* Reduced spacing */}
        <Col md={6}>
          <Form.Label className={'text-dark'}>Nombres</Form.Label>
          <Form.Control
            id='firstName'
            placeholder={'Nombres'}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.firstName}
            autoComplete='off'
            onBlur={formik.handleBlur}
            size='sm' // Set the size to small
          />
          <Form.Control.Feedback type='invalid'>
            {formik.touched.firstName && formik.errors.firstName}
          </Form.Control.Feedback>
        </Col>
        <Col md={6}>
          <Form.Label className={'text-dark'}>Apellidos</Form.Label>
          <Form.Control
            id='lastName'
            placeholder={'Apellidos'}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            isInvalid={formik.touched.lastName && !!formik.errors.lastName}
            autoComplete='off'
            onBlur={formik.handleBlur}
            size='sm'
          />
          <Form.Control.Feedback type='invalid'>
            {formik.touched.lastName && formik.errors.lastName}
          </Form.Control.Feedback>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col md={6}>
          <Form.Label className={'text-dark'}>Tipo de documento</Form.Label>
          <Form.Select
            id='documentType'
            value={formik.values.documentType}
            onChange={formik.handleChange}
            isInvalid={formik.touched.documentType && !!formik.errors.documentType}
            onBlur={formik.handleBlur}
            size='sm'
          >
            <option value='' label='Selecione un tipo de documento' />
            {Object.entries(documentTypeToName).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type='invalid'>
            {formik.touched.documentType && formik.errors.documentType}
          </Form.Control.Feedback>
        </Col>
        <Col md={6}>
          <Form.Label className={'text-dark'}># Documento</Form.Label>
          <Form.Control
            id='documentNumber'
            placeholder={'# Documento'}
            value={formik.values.documentNumber}
            onChange={formik.handleChange}
            isInvalid={formik.touched.documentNumber && !!formik.errors.documentNumber}
            autoComplete='off'
            onBlur={formik.handleBlur}
            size='sm'
          />
          <Form.Control.Feedback type='invalid'>
            {formik.touched.documentNumber && formik.errors.documentNumber}
          </Form.Control.Feedback>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col md={6}>
          <Form.Label className={'text-dark'}>Número teléfono</Form.Label>
          <Form.Control
            id='phoneNumber'
            placeholder={'Teléfono'}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            type='phoneNumber'
            isInvalid={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
            autoComplete='off'
            onBlur={formik.handleBlur}
            size='sm'
          />
          <Form.Control.Feedback type='invalid'>
            {formik.touched.phoneNumber && formik.errors.phoneNumber}
          </Form.Control.Feedback>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col md={6}></Col>
        <Col md={6} className='d-flex justify-content-end'>
          <Button
            variant='primary'
            onClick={() => onSubmit(nextStep, activeStep)}
            disabled={isLoading || !formik.isValid || !formik.dirty}
          >
            {'Siguiente'} <RenderLoader show={isLoading} />
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default UsersWizardStep1
