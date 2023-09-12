import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useState} from 'react'
import {IEmailScrutinySettingsResponse} from '../../../../types/ScrutinySettings.types'

export const useEmailScrutinySettingsForm = (
  initialValues: IEmailScrutinySettingsResponse,
  submitForm: (emailScrutinySettings: IEmailScrutinySettingsResponse) => void
) => {
  const defaultInitialValues = {
    adminEmailName: '',
    adminEmailLastName: '',
    adminEmailEmail: '',
    adminEmailStatus: 0,
  }

  const combinedInitialValues = {
    ...defaultInitialValues,
    ...initialValues,
  }

  const emailScrutinySettingsFormSchema = Yup.object().shape({
    adminEmailName: Yup.string()
      .required('El nombre es requerido.')
      .max(100, 'El nombre no debe tener más de 100 dígitos.'),
    adminEmailLastName: Yup.string()
      .required('El apellido es requerido.')
      .max(100, 'El apellido no debe tener más de 100 dígitos.'),
    adminEmailEmail: Yup.string()
      .required('El correo es requerido.')
      .email('Ingrese un correo válido.'),
  })

  const formik = useFormik({
    initialValues: combinedInitialValues,
    validationSchema: emailScrutinySettingsFormSchema,
    onSubmit: () => {},
    enableReinitialize: true,
  })

  const onSubmit = () => {
    const emailScrutinySettings = {
      adminEmailName: formik.values.adminEmailName,
      adminEmailLastName: formik.values.adminEmailLastName,
      adminEmailEmail: formik.values.adminEmailEmail,
      adminEmailStatus: formik.values.adminEmailStatus,
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
