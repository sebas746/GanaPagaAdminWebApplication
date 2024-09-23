import {useFormik} from 'formik'
import {
  IAnimalitosLotteryGeneralSetting,
  IAnimalitoUpdateGeneralSettings,
} from '../../../../types/Animalitos.types'
import {CurrencyCode} from '../../../../types/Currency.types'
import * as Yup from 'yup'
import {useState} from 'react'
import {animalitosSettingsLimits} from '../../../constants/settings.constants'

export const useAnimalitosGeneralSettingsForm = (
  initialValues: IAnimalitosLotteryGeneralSetting[],
  submitForm: (animalitosSettings: IAnimalitoUpdateGeneralSettings[]) => void
) => {
  const [isShowingModalConfirmation, setIsShowingModalConfirmation] = useState(false)
  let initialValuesVes = {} as IAnimalitosLotteryGeneralSetting
  let initialValuesUsd = {} as IAnimalitosLotteryGeneralSetting

  const settingAnimalitosSchema = Yup.object().shape({
    currencyCode: Yup.string(),
    maxBetByAnimal: Yup.number()
      .typeError(animalitosSettingsLimits.numericValue)
      .required('Apuesta total máxima por animal es requerido')
      .min(
        animalitosSettingsLimits.minBetByAnimal,
        `Apuesta total máxima por animal debe ser superior a ${animalitosSettingsLimits.minBetByAnimal}`
      )
      .max(
        animalitosSettingsLimits.maxBetByAnimal,
        `Apuesta total máxima por animal debe ser inferior a ${animalitosSettingsLimits.maxBetByAnimal}`
      ),
    maxAnimalsByTicket: Yup.number()
      .typeError(animalitosSettingsLimits.numericValue)
      .required('Número máximo de animales por sorteo y tiquete es requerido')
      .min(
        animalitosSettingsLimits.minAnimalsByTicket,
        `Número máximo de animales por sorteo y tiquete debe ser superior a ${animalitosSettingsLimits.minAnimalsByTicket}`
      )
      .max(
        animalitosSettingsLimits.maxAnimalsByTicket,
        `Número máximo de animales por sorteo y tiquete debe ser inferior a ${animalitosSettingsLimits.maxAnimalsByTicket}`
      ),
    maxOverallTripletaBet: Yup.number()
      .typeError(animalitosSettingsLimits.numericValue)
      .required('Cupo máximo por sorteo y combinación de tripleta es requerido')
      .min(
        animalitosSettingsLimits.minOverallTripletaBet,
        `Cupo máximo por sorteo y combinación de tripleta debe ser superior a ${animalitosSettingsLimits.minOverallTripletaBet}`
      )
      .max(
        animalitosSettingsLimits.maxOverallTripletaBet,
        `Cupo máximo por sorteo y combinación de tripleta debe ser inferior a ${animalitosSettingsLimits.maxOverallTripletaBet}`
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
      maxBetByAnimal: initialValuesVes.maxBetByAnimal,
      maxAnimalsByTicket: initialValuesVes.maxAnimalsByTicket,
      maxOverallTripletaBet: initialValuesVes.maxOverallTripletaBet,
    },
    validationSchema: settingAnimalitosSchema,
    onSubmit: () => {},
  })

  const formikUsd = useFormik({
    initialValues: {
      currencyId: initialValuesUsd.currencyId,
      currencyName: initialValuesUsd.currencyName,
      currencyCode: initialValuesUsd.currencyCode,
      maxBetByAnimal: initialValuesUsd.maxBetByAnimal,
      maxAnimalsByTicket: initialValuesUsd.maxAnimalsByTicket,
      maxOverallTripletaBet: initialValuesUsd.maxOverallTripletaBet,
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
        maxBetByAnimal: formikVes.values.maxBetByAnimal,
        maxAnimalsByTicket: formikVes.values.maxAnimalsByTicket,
        maxOverallTripletaBet: formikVes.values.maxOverallTripletaBet,
      },
      {
        currencyCode: formikUsd.values.currencyCode,
        maxBetByAnimal: formikUsd.values.maxBetByAnimal,
        maxAnimalsByTicket: formikUsd.values.maxAnimalsByTicket,
        maxOverallTripletaBet: formikUsd.values.maxOverallTripletaBet,
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
