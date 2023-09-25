import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useState} from 'react'
import {IExchangeRateSettingsResponse} from '../../../../types/ExchangeRateSettings.types'

export const useExchangeRateSettingsForm = (
  initialValues: IExchangeRateSettingsResponse,
  submitForm: (exchangeRateSettings: IExchangeRateSettingsResponse) => void
) => {
  const [isShowingModalConfirmation, setIsShowingModalConfirmation] = useState(false)

  const settingExchangeRateSchema = Yup.object().shape({
    currencyExchangeRateValue: Yup.number()
      .min(1, 'El valor de tasa de cambio debe ser superior a 1')
      .max(5000, 'El valor de tasa de cambio máximo es 5000')
      .required('El valor de tasa de cambio es requerido'),
  })

  const now = new Date()
  const formattedDate = now.toISOString().slice(0, 10)

  const formik = useFormik({
    initialValues: {
      currencyExchangeRateValue: initialValues.currencyExchangeRateValue,
      currencyExchangeRateDate: formattedDate,
    },
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
      currencyExchangeRateValue: formik.values.currencyExchangeRateValue,
      currencyExchangeRateDate: formik.values.currencyExchangeRateDate,
    }
    submitForm(exchangeRateSettings)
    //hideModalConfirmation()
  }

  return {
    formik,
    onSubmit,
    isShowingModalConfirmation,
    showModalConfirmation,
    hideModalConfirmation,
    initialValues,
  }
}
