import {useFormik} from 'formik'
import {CurrencyCode} from '../../../../types/Currency.types'
import * as Yup from 'yup'
import {useState} from 'react'
import {chance3DigitsSettingsLimits} from '../../../constants/settings.constants'
import {
  IChance3DigitsLotterySetting,
  IChance3DigitsUpdateSettings,
} from '../../../../types/Chance3Digits.types'
import {useConfirmChance3DigitsSettings} from '../../Modals/ConfirmChance3DigitsSettings/ConfirmChance3DigitsSettings.hook'

export const useChance3DigitsSettingsForm = (
  initialValues: IChance3DigitsLotterySetting[],
  submitForm: (animalitosSettings: IChance3DigitsUpdateSettings[]) => void
) => {
  const {getChance3DigitsSettingsLabel} = useConfirmChance3DigitsSettings()
  const [isShowingModalConfirmation, setIsShowingModalConfirmation] = useState(false)
  let initialValuesVes = {} as IChance3DigitsLotterySetting
  let initialValuesUsd = {} as IChance3DigitsLotterySetting

  const settingAnimalitosSchema = Yup.object().shape({
    currencyCode: Yup.string(),
    minDigitsByBet: Yup.number()
      .typeError(chance3DigitsSettingsLimits.numericValue)
      .required(`${getChance3DigitsSettingsLabel('maxDigitsByBet')} es requerido`)
      .min(
        chance3DigitsSettingsLimits.minDigitsByBet,
        `${getChance3DigitsSettingsLabel('minDigitsByBet')} debe ser superior a ${
          chance3DigitsSettingsLimits.minDigitsByBet
        }`
      )
      .max(
        chance3DigitsSettingsLimits.maxDigitsByBet,
        `${getChance3DigitsSettingsLabel('minDigitsByBet')} apuesta debe ser inferior a ${
          chance3DigitsSettingsLimits.maxDigitsByBet
        }`
      ),
    maxDigitsByBet: Yup.number()
      .typeError(chance3DigitsSettingsLimits.numericValue)
      .required(`${getChance3DigitsSettingsLabel('maxDigitsByBet')} es requerido`)
      .min(
        chance3DigitsSettingsLimits.minDigitsByBet,
        `${getChance3DigitsSettingsLabel('maxDigitsByBet')} debe ser superior a ${
          chance3DigitsSettingsLimits.minDigitsByBet
        }`
      )
      .max(
        chance3DigitsSettingsLimits.maxDigitsByBet,
        `${getChance3DigitsSettingsLabel('maxDigitsByBet')} apuesta debe ser inferior a ${
          chance3DigitsSettingsLimits.maxDigitsByBet
        }`
      ),
    betReturnedRate2Digits: Yup.number()
      .typeError(chance3DigitsSettingsLimits.numericValue)
      .required(`${getChance3DigitsSettingsLabel('betReturnedRate2Digits')} es requerido`)
      .min(
        chance3DigitsSettingsLimits.minBetReturnedRate2Digits,
        `${getChance3DigitsSettingsLabel('betReturnedRate2Digits')} debe ser superior a ${
          chance3DigitsSettingsLimits.minBetReturnedRate2Digits
        }`
      )
      .max(
        chance3DigitsSettingsLimits.maxBetReturnedRate2Digits,
        `${getChance3DigitsSettingsLabel('betReturnedRate2Digits')} debe ser inferior a ${
          chance3DigitsSettingsLimits.maxBetReturnedRate2Digits
        }`
      ),
    betReturnedRate3Digits: Yup.number()
      .typeError(chance3DigitsSettingsLimits.numericValue)
      .required(`${getChance3DigitsSettingsLabel('betReturnedRate3Digits')} es requerido`)
      .min(
        chance3DigitsSettingsLimits.minBetReturnedRate3Digits,
        `${getChance3DigitsSettingsLabel('betReturnedRate3Digits')} debe ser superior a ${
          chance3DigitsSettingsLimits.minBetReturnedRate3Digits
        }`
      )
      .max(
        chance3DigitsSettingsLimits.maxBetReturnedRate3Digits,
        `${getChance3DigitsSettingsLabel('betReturnedRate3Digits')} debe ser inferior a ${
          chance3DigitsSettingsLimits.maxBetReturnedRate3Digits
        }`
      ),
    maxBetByChance: Yup.number()
      .typeError(chance3DigitsSettingsLimits.numericValue)
      .required(`${getChance3DigitsSettingsLabel('maxBetByChance')} es requerido`)
      .min(
        chance3DigitsSettingsLimits.minBetByChance,
        `${getChance3DigitsSettingsLabel('maxBetByChance')} debe ser superior a ${
          chance3DigitsSettingsLimits.minBetByChance
        }`
      )
      .max(
        chance3DigitsSettingsLimits.maxBetByChance,
        `${getChance3DigitsSettingsLabel('maxBetByChance')} debe ser inferior a ${
          chance3DigitsSettingsLimits.maxBetByChance
        }`
      ),
    maxOverallChanceBet: Yup.number()
      .typeError(chance3DigitsSettingsLimits.numericValue)
      .required(`${getChance3DigitsSettingsLabel('maxOverallChanceBet')} es requerido`)
      .min(
        chance3DigitsSettingsLimits.minOverallChanceBet,
        `${getChance3DigitsSettingsLabel('maxOverallChanceBet')} debe ser superior a ${
          chance3DigitsSettingsLimits.minOverallChanceBet
        }`
      )
      .max(
        chance3DigitsSettingsLimits.maxOverallChanceBet,
        `${getChance3DigitsSettingsLabel('maxOverallChanceBet')} debe ser inferior a ${
          chance3DigitsSettingsLimits.maxOverallChanceBet
        }`
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
      maxDigitsByBet: initialValuesVes.maxDigitsByBet,
      minDigitsByBet: initialValuesVes.minDigitsByBet,
      betReturnedRate2Digits: initialValuesVes.betReturnedRate2Digits,
      betReturnedRate3Digits: initialValuesVes.betReturnedRate3Digits,
      maxOverallChanceBet: initialValuesVes.maxOverallChanceBet,
      maxBetByChance: initialValuesVes.maxBetByChance,
    },
    validationSchema: settingAnimalitosSchema,
    onSubmit: () => {},
  })

  const formikUsd = useFormik({
    initialValues: {
      currencyId: initialValuesUsd.currencyId,
      currencyName: initialValuesUsd.currencyName,
      currencyCode: initialValuesUsd.currencyCode,
      maxDigitsByBet: initialValuesUsd.maxDigitsByBet,
      minDigitsByBet: initialValuesUsd.minDigitsByBet,
      betReturnedRate2Digits: initialValuesUsd.betReturnedRate2Digits,
      betReturnedRate3Digits: initialValuesUsd.betReturnedRate3Digits,
      maxOverallChanceBet: initialValuesUsd.maxOverallChanceBet,
      maxBetByChance: initialValuesUsd.maxBetByChance,
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
    const chance3DigitsSettings = [
      {
        currencyCode: formikVes.values.currencyCode,
        maxDigitsByBet: formikVes.values.maxDigitsByBet,
        minDigitsByBet: formikVes.values.minDigitsByBet,
        betReturnedRate2Digits: formikVes.values.betReturnedRate2Digits,
        betReturnedRate3Digits: formikVes.values.betReturnedRate3Digits,
        maxOverallChanceBet: formikVes.values.maxOverallChanceBet,
        maxBetByChance: formikVes.values.maxDigitsByBet,
      },
      {
        currencyCode: formikUsd.values.currencyCode,
        maxDigitsByBet: formikUsd.values.maxDigitsByBet,
        minDigitsByBet: formikUsd.values.minDigitsByBet,
        betReturnedRate2Digits: formikUsd.values.betReturnedRate2Digits,
        betReturnedRate3Digits: formikUsd.values.betReturnedRate3Digits,
        maxOverallChanceBet: formikUsd.values.maxOverallChanceBet,
        maxBetByChance: formikUsd.values.maxDigitsByBet,
      },
    ]
    submitForm(chance3DigitsSettings)
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
