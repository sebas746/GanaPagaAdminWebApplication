import {useFormik} from 'formik'
import * as Yup from 'yup'
import {IUsersForm, IUsersResponse, RoleIds, documentTypeNames} from '../../../../types/Users.types'

export const useUsersForm = (
  initialValues: IUsersResponse,
  submitForm: (usersForm: IUsersForm) => void
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

  const emailScrutinySettingsFormSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('El nombre es requerido.')
      .max(100, 'El nombre no debe tener más de 100 dígitos.'),
    lastName: Yup.string()
      .required('El apellido es requerido.')
      .max(100, 'El apellido no debe tener más de 100 dígitos.'),
    email: Yup.string().required('El correo es requerido.').email('Ingrese un correo válido.'),
    phoneNumber: Yup.string()
      .required('El apellido es requerido.')
      .max(30, 'El apellido no debe tener más de 30 dígitos.'),
    password: passwordValidation,
    passwordConfirm: Yup.string()
      .required('La confirmación de la contraseña es requerida.')
      .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir.'),
    roleId: Yup.number().oneOf(
      Object.values([1, 2]) as RoleIds[],
      'El rol selecionado no es válido'
    ),
    documentType: Yup.string().oneOf(
      Object.values(['CC', 'CE', 'PA']) as documentTypeNames[],
      'El tipo de documento no es válido'
    ),
    documentNumber: Yup.string()
      .required('El apellido es requerido.')
      .max(30, 'El apellido no debe tener más de 30 dígitos.'),
  })

  const formik = useFormik({
    initialValues: combinedInitialValues,
    validationSchema: emailScrutinySettingsFormSchema,
    onSubmit: () => {},
    enableReinitialize: true,
  })

  const onSubmit = () => {
    const emailScrutinySettings = {
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      email: formik.values.email,
      phoneNumber: formik.values.phoneNumber,
      password: formik.values.password,
      rolId: formik.values.rolId,
      documentType: formik.values.documentType,
      documentNumber: formik.values.documentNumber,
    }

    if (!formik.isValid || !formik.dirty) {
      return
    }
    submitForm(emailScrutinySettings)
    //hideModalConfirmation()
  }

  return {
    formik,
    onSubmit,
    initialValues,
  }
}
