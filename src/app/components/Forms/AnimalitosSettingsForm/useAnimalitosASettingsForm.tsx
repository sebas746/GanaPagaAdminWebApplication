import {useFormik} from 'formik'
import {IAnimalitosLotterySetting, IAnimalitoUpdateSettings} from '../../../../types/Animalitos.types'
import {CurrencyCode} from '../../../../types/Currency.types'
import * as Yup from 'yup'
import {useState} from 'react'

export const useAnimalitosSettingsForm = (
  initialValues: IAnimalitosLotterySetting[],
  submitForm: (animalitosSettings: IAnimalitoUpdateSettings[]) => void
) => {
  const [isShowingModalConfirmation, setIsShowingModalConfirmation] = useState(false)
  let initialValuesVes = {} as IAnimalitosLotterySetting
  let initialValuesUsd = {} as IAnimalitosLotterySetting

  const settingAnimalitosSchema = Yup.object().shape({
    currencyCode: Yup.string(),
    maxBetByAnimal: Yup.number().required('Cupo de apuestas es requerido'),
    betReturnedRate: Yup.number().required('Tasa de retorno de la apuesta es requerido'),
    maxAnimalsByTicket: Yup.number().required('Número máximo de animales por ticket es requerido'),
    maxOverallAnimalitoBet: Yup.number().required('Máximo de apuestas animalitos es requerido')
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
      betReturnedRate: initialValuesVes.betReturnedRate,
      maxAnimalsByTicket: initialValuesVes.maxAnimalsByTicket,
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
      maxBetByAnimal: initialValuesUsd.maxBetByAnimal,
      betReturnedRate: initialValuesUsd.betReturnedRate,
      maxAnimalsByTicket: initialValuesUsd.maxAnimalsByTicket,
      maxOverallAnimalitoBet: initialValuesUsd.maxOverallAnimalitoBet,
    },
    validationSchema: settingAnimalitosSchema,
    onSubmit: () => {},
  });

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
        betReturnedRate: formikVes.values.betReturnedRate,
        maxAnimalsByTicket: formikVes.values.maxAnimalsByTicket,
        maxOverallAnimalitoBet: formikVes.values.maxOverallAnimalitoBet,
      },
      {
        currencyCode: formikUsd.values.currencyCode,
        maxBetByAnimal: formikUsd.values.maxBetByAnimal,
        betReturnedRate: formikUsd.values.betReturnedRate,
        maxAnimalsByTicket: formikUsd.values.maxAnimalsByTicket,
        maxOverallAnimalitoBet: formikUsd.values.maxOverallAnimalitoBet,
      }
    ]
    submitForm(animalitosSettings)
    hideModalConfirmation()
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
