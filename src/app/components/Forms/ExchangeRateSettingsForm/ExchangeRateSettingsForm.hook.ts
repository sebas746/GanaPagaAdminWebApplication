import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useState} from 'react'
import {IExchangeRateSettingsResponse} from '../../../../types/ExchangeRateSettings.types'
import {DateTime} from 'luxon'

export const useExchangeRateSettingsForm = (
  initialValues: IExchangeRateSettingsResponse,
  submitForm: (animalitosSettings: IExchangeRateSettingsResponse) => void,
  setExchangeRateDate: (date: string) => void
) => {
  const [isShowingModalConfirmation, setIsShowingModalConfirmation] = useState(false)

  const settingExchangeRateSchema = Yup.object().shape({
    exchangeRateValue: Yup.number().required('El valor de tasa de cambio es requerido'),
    exchangeRateDate: Yup.date().required('La fecha es requerida'),
  })

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: settingExchangeRateSchema,
    onSubmit: () => {},
    enableReinitialize: true,
  })

  const showModalConfirmation = () => {
    setIsShowingModalConfirmation(true)
  }

  const hideModalConfirmation = () => {
    setIsShowingModalConfirmation(false)
  }

  const onSubmit = () => {
    const exchangeRateSettings = {
      exchangeRateValue: formik.values.exchangeRateValue,
      exchangeRateDate: formik.values.exchangeRateDate,
    }
    submitForm(exchangeRateSettings)
    //hideModalConfirmation()
  }

  const handleDateChange = (date: Date) => {
    if (date) {
      const event = {
        target: {
          name: 'exchangeRateDate',
          value: DateTime.fromISO(date.toISOString()).toISODate(),
        },
      }
      formik.handleChange(event)
      setExchangeRateDate(DateTime.fromISO(date.toISOString()).toFormat('yyyy-MM-dd'))
    }
  }

  return {
    formik,
    onSubmit,
    isShowingModalConfirmation,
    showModalConfirmation,
    hideModalConfirmation,
    initialValues,
    handleDateChange,
  }
}
