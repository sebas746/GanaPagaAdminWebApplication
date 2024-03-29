import {useFormik} from 'formik'
import {
  IAnimalitosLotterySetting,
  IAnimalitoUpdateSettings,
} from '../../../../types/Animalitos.types'
import {CurrencyCode} from '../../../../types/Currency.types'
import * as Yup from 'yup'
import {useState} from 'react'
import {animalitosSettingsLimits} from '../../../constants/settings.constants'

export const useAnimalitosSettingsForm = (
  initialValues: IAnimalitosLotterySetting[],
  submitForm: (animalitosSettings: IAnimalitoUpdateSettings[]) => void
) => {
  const [isShowingModalConfirmation, setIsShowingModalConfirmation] = useState(false)
  let initialValuesVes = {} as IAnimalitosLotterySetting
  let initialValuesUsd = {} as IAnimalitosLotterySetting

  const settingAnimalitosSchema = Yup.object().shape({
    currencyCode: Yup.string(),
    betReturnedRate: Yup.number()
      .typeError(animalitosSettingsLimits.numericValue)
      .required('Tasa de retorno de la apuesta es requerido')
      .min(
        animalitosSettingsLimits.minBetReturnedRate,
        `Tasa de retorno de la apuesta debe ser superior a ${animalitosSettingsLimits.minBetReturnedRate}`
      )
      .max(
        animalitosSettingsLimits.maxBetReturnedRate,
        `Tasa de retorno de la apuesta debe ser inferior a ${animalitosSettingsLimits.maxBetReturnedRate}`
      ),
    maxOverallAnimalitoBet: Yup.number()
      .typeError(animalitosSettingsLimits.numericValue)
      .required('Cupo de Apuesta por animalito y sorteo es requerido')
      .min(
        animalitosSettingsLimits.minOverallAnimalitoBet,
        `Cupo de Apuesta por animalito y sorteo debe ser superior a ${animalitosSettingsLimits.minOverallAnimalitoBet}`
      )
      .max(
        animalitosSettingsLimits.maxOverallAnimalitoBet,
        `Cupo de Apuesta por animalito y sorteo debe ser inferior a ${animalitosSettingsLimits.maxOverallAnimalitoBet}`
      ),
  })

  initialValues.forEach((animalito) => {
    if (animalito.currencyCode === CurrencyCode.VES) {
      initialValuesVes = animalito
    } else {
      initialValuesUsd = animalito
    }
  })

  const formikVes = useFormik({
    initialValues: {
      currencyId: initialValuesVes.currencyId,
      currencyName: initialValuesVes.currencyName,
      currencyCode: initialValuesVes.currencyCode,
      betReturnedRate: initialValuesVes.betReturnedRate,
      maxOverallAnimalitoBet: initialValuesVes.maxOverallAnimalitoBet,
    },
    validationSchema: settingAnimalitosSchema,
    onSubmit: () => {},
  })

  const formikUsd = useFormik({
    initialValues: {
      currencyId: initialValuesUsd.currencyId,
      currencyName: initialValuesUsd.currencyName,
      currencyCode: initialValuesUsd.currencyCode,
      betReturnedRate: initialValuesUsd.betReturnedRate,
      maxOverallAnimalitoBet: initialValuesUsd.maxOverallAnimalitoBet,
    },
    validationSchema: settingAnimalitosSchema,
    onSubmit: () => {},
  })

  const showModalConfirmation = () => {
    setIsShowingModalConfirmation(true)
  }

  const hideModalConfirmation = () => {
    setIsShowingModalConfirmation(false)
  }

  const onSubmit = () => {
    const animalitosSettings = [
      {
        currencyCode: formikVes.values.currencyCode,
        betReturnedRate: formikVes.values.betReturnedRate,
        maxOverallAnimalitoBet: formikVes.values.maxOverallAnimalitoBet,
      },
      {
        currencyCode: formikUsd.values.currencyCode,
        betReturnedRate: formikUsd.values.betReturnedRate,
        maxOverallAnimalitoBet: formikUsd.values.maxOverallAnimalitoBet,
      },
    ]
    submitForm(animalitosSettings)
    //hideModalConfirmation()
  }

  return {
    formikVes,
    formikUsd,
    onSubmit,
    isShowingModalConfirmation,
    showModalConfirmation,
    hideModalConfirmation,
    initialValuesVes,
    initialValuesUsd,
  }
}
