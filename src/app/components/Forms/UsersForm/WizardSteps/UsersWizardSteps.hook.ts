import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  IUsersResponse,
  IUsersForm,
  documentTypeNames,
  RoleIds,
  roleIdToName,
} from '../../../../../types/Users.types'
import { UsersActions } from '../../../../pages/users-management/users/Users.hook'

export const useUsersWizardSteps = (
  initialValues: IUsersResponse,
  submitForm: (usersForm: IUsersForm) => void,
  setCompleteFormData: React.Dispatch<React.SetStateAction<IUsersForm>>,
  completeFormData: IUsersForm,
  action: UsersActions,
  setCurrentStep: (currentStep: number) => void,
  currentStep: number,
  resetFormData: () => void
) => {
  const defaultInitialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    rolId: 0,
    documentType: '',
    documentNumber: '',
    isActive: true,
    description: '',
    promoterId: 0,
  }

  const combinedInitialValues = {
    ...defaultInitialValues,
    ...initialValues,
  }

  const passwordValidation = Yup.string()
    .required('La contraseña es requerida.')
    .matches(/[^A-Za-z0-9]/, 'La contraseña debe tener al menos un carácter no alfanumérico.')
    .matches(/[a-z]/, 'La contraseña debe tener al menos una minúscula.')
    .matches(/[A-Z]/, 'La contraseña debe tener al menos una mayúscula.')

  const personalInformationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('El nombre es requerido.')
      .max(100, 'El nombre no debe tener más de 100 dígitos.'),
    lastName: Yup.string()
      .required('El apellido es requerido.')
      .max(100, 'El apellido no debe tener más de 100 dígitos.'),
    phoneNumber: Yup.string()
      .required('El teléfono es requerido.')
      .max(30, 'El teléfono no debe tener más de 30 dígitos.'),
    documentType: Yup.string().oneOf(
      Object.values(['CC', 'CE', 'PA']) as documentTypeNames[],
      'El tipo de documento no es válido'
    ),
    documentNumber: Yup.string().required('El número de documento es requerido.'),
  })
  let accountInformationSchema

  if (action === 'create') {
    accountInformationSchema = Yup.object().shape({
      email: Yup.string()
        .required('El usuario es requerido.')
        .email('El usuario debe ser un correo válido.'),
      promoterId: Yup.string().test('requiredForPromoter', 'El promotor es requerido.', function (value) {
        const rolId = this.resolve(Yup.ref('rolId'));
        return rolId === '2' ? !!value : true;
      }),
      password: passwordValidation,
      passwordConfirm: Yup.string()
        .required('La confirmación de la contraseña es requerida.')
        .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir.'),
      rolId: Yup.string()
        .required('El rol es requerido.')
        .oneOf(Object.keys(roleIdToName) as RoleIds[], 'El rol seleccionado no es válido'),
    })
  } else {
    accountInformationSchema = Yup.object().shape({
      email: Yup.string()
        .required('El usuario es requerido.')
        .email('El usuario debe ser un correo válido.'),
      password: Yup.string()
        .nullable()
        .test('conditional-required', 'La contraseña es requerida.', function (value) {
          const { passwordConfirm } = this.parent
          if (!value && passwordConfirm) {
            return false
          }
          return true
        })
        .matches(/[^A-Za-z0-9]/, 'La contraseña debe tener al menos un carácter no alfanumérico.')
        .matches(/[a-z]/, 'La contraseña debe tener al menos una minúscula.')
        .matches(/[A-Z]/, 'La contraseña debe tener al menos una mayúscula.'),
      passwordConfirm: Yup.string()
        .nullable()
        .test(
          'conditional-required',
          'La confirmación de la contraseña es requerida.',
          function (value) {
            const { password } = this.parent
            if (!value && password) {
              return false
            }
            if (value !== password) {
              return this.createError({
                message: 'Las contraseñas deben coincidir.',
              })
            }
            return true
          }
        ),
      rolId: Yup.string()
        .required('El rol es requerido.')
        .oneOf(Object.keys(roleIdToName) as RoleIds[], 'El rol seleccionado no es válido'),
    });
    
  }

  const formik = useFormik({
    initialValues: combinedInitialValues,
    validationSchema: currentStep === 0 ? personalInformationSchema : accountInformationSchema,
    onSubmit: () => { },
    enableReinitialize: true,
  })

  const onSubmit = (nextStep: () => Promise<void>, currentStepSubmit: number) => {
    if (
      !formik.isValid || !formik.dirty
    ) {
      return
    }
    if (currentStep === 0) {
      const step1Data = {
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        phoneNumber: formik.values.phoneNumber,
        documentType: formik.values.documentType,
        documentNumber: formik.values.documentNumber,
      }
      setCompleteFormData((prevState) => ({ ...prevState, ...step1Data }))
      nextStep()
      setCurrentStep(1)
      
    } else {
      const step2Data = {
        email: formik.values.email,
        password: formik.values.password,
        rolId: Number(formik.values.rolId),
        isActive: formik.values.isActive,
        description: formik.values.description,
        promoterId: formik.values.promoterId
      }
      const dataForm = { ...completeFormData, ...step2Data }
      submitForm(dataForm)
      resetFormData()
      setCurrentStep(0)
    }
  }

  return {
    formik,
    onSubmit,
    initialValues,
  }
}
