import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useState} from 'react'
import {IEmailScrutinySettingsResponse} from '../../../../types/ScrutinySettings.types'

export const useEmailScrutinySettingsForm = (
  initialValues: IEmailScrutinySettingsResponse,
  submitForm: (emailScrutinySettings: IEmailScrutinySettingsResponse) => void
) => {
  const emailScrutinySettingsFormSchema = Yup.object().shape({
    adminEmailName: Yup.string()
      .required('El nombre es requerido.')
      .max(100, 'El nombre no debe tener más de 100 dígitos.'),
    adminEmailLastName: Yup.string()
      .required('El apellido es requerido.')
      .max(100, 'El apellido no debe tener más de 100 dígitos.'),
    adminEmailEmail: Yup.string()
      .email('Ingrese un correo válido.')
      .required('El correo es requerido.'),
    adminEmailStatus: Yup.number().required('Campo requerido'),
  })

  const formik = useFormik({
    initialValues: {
      adminEmailName: initialValues.adminEmailName,
      adminEmailLastName: initialValues.adminEmailLastName,
      adminEmailEmail: initialValues.adminEmailEmail,
      adminEmailStatus: initialValues.adminEmailStatus,
      adminEmailId: 0,
    },
    validationSchema: emailScrutinySettingsFormSchema,
    onSubmit: () => {},
  })

  const onSubmit = () => {
    const emailScrutinySettings = {
      adminEmailName: formik.values.adminEmailName,
      adminEmailLastName: formik.values.adminEmailLastName,
      adminEmailEmail: formik.values.adminEmailEmail,
      adminEmailStatus: formik.values.adminEmailStatus,
      adminEmailId: 0,
    }

    submitForm(emailScrutinySettings)
    //hideModalConfirmation()
  }

  console.log('Formik initial values:', formik.initialValues)

  return {
    formik,
    onSubmit,
    initialValues,
  }
}
