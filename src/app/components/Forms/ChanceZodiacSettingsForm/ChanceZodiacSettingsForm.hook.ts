import {useFormik} from 'formik'
import {CurrencyCode} from '../../../../types/Currency.types'
import * as Yup from 'yup'
import {useState} from 'react'
import {chanceZodiacSettingsLimits} from '../../../constants/settings.constants'
import {
  IChanceZodiacLotterySetting,
  IChanceZodiacUpdateSettings,
} from '../../../../types/ChanceZodiac.types'
import {useConfirmChanceZodiacSettings} from '../../Modals/ConfirmChanceZodiacSettings/ConfirmChanceZodiacSettings.hook'

export const useChanceZodiacSettingsForm = (
  initialValues: IChanceZodiacLotterySetting[],
  submitForm: (animalitosSettings: IChanceZodiacUpdateSettings[]) => void
) => {
  const {getChanceZodiacSettingsLabel} = useConfirmChanceZodiacSettings()
  const [isShowingModalConfirmation, setIsShowingModalConfirmation] = useState(false)
  let initialValuesVes = {} as IChanceZodiacLotterySetting
  let initialValuesUsd = {} as IChanceZodiacLotterySetting

  const settingAnimalitosSchema = Yup.object().shape({
    currencyCode: Yup.string(),
    minDigitsByBet: Yup.number()
      .typeError(chanceZodiacSettingsLimits.numericValue)
      .required(`${getChanceZodiacSettingsLabel('maxDigitsByBet')} es requerido`)
      .min(
        chanceZodiacSettingsLimits.minDigitsByBet,
        `${getChanceZodiacSettingsLabel('minDigitsByBet')} debe ser superior a ${
          chanceZodiacSettingsLimits.minDigitsByBet
        }`
      )
      .max(
        chanceZodiacSettingsLimits.maxDigitsByBet,
        `${getChanceZodiacSettingsLabel('minDigitsByBet')} apuesta debe ser inferior a ${
          chanceZodiacSettingsLimits.maxDigitsByBet
        }`
      )
      .test(
        'lessThanMax',
        `${getChanceZodiacSettingsLabel(
          'minDigitsByBet'
        )} debe ser menor que ${getChanceZodiacSettingsLabel('maxDigitsByBet')}`,
        function (value) {
          const {maxDigitsByBet} = this.parent
          return value <= maxDigitsByBet
        }
      ),
    maxDigitsByBet: Yup.number()
      .typeError(chanceZodiacSettingsLimits.numericValue)
      .required(`${getChanceZodiacSettingsLabel('maxDigitsByBet')} es requerido`)
      .min(
        chanceZodiacSettingsLimits.minDigitsByBet,
        `${getChanceZodiacSettingsLabel('maxDigitsByBet')} debe ser superior a ${
          chanceZodiacSettingsLimits.minDigitsByBet
        }`
      )
      .max(
        chanceZodiacSettingsLimits.maxDigitsByBet,
        `${getChanceZodiacSettingsLabel('maxDigitsByBet')} apuesta debe ser inferior a ${
          chanceZodiacSettingsLimits.maxDigitsByBet
        }`
      ),
    betReturnedRate2Digits: Yup.number()
      .typeError(chanceZodiacSettingsLimits.numericValue)
      .required(`${getChanceZodiacSettingsLabel('betReturnedRate2Digits')} es requerido`)
      .min(
        chanceZodiacSettingsLimits.minBetReturnedRate2Digits,
        `${getChanceZodiacSettingsLabel('betReturnedRate2Digits')} debe ser superior a ${
          chanceZodiacSettingsLimits.minBetReturnedRate2Digits
        }`
      )
      .max(
        chanceZodiacSettingsLimits.maxBetReturnedRate2Digits,
        `${getChanceZodiacSettingsLabel('betReturnedRate2Digits')} debe ser inferior a ${
          chanceZodiacSettingsLimits.maxBetReturnedRate2Digits
        }`
      ),
    betReturnedRate3Digits: Yup.number()
      .typeError(chanceZodiacSettingsLimits.numericValue)
      .required(`${getChanceZodiacSettingsLabel('betReturnedRate3Digits')} es requerido`)
      .min(
        chanceZodiacSettingsLimits.minBetReturnedRate3Digits,
        `${getChanceZodiacSettingsLabel('betReturnedRate3Digits')} debe ser superior a ${
          chanceZodiacSettingsLimits.minBetReturnedRate3Digits
        }`
      )
      .max(
        chanceZodiacSettingsLimits.maxBetReturnedRate3Digits,
        `${getChanceZodiacSettingsLabel('betReturnedRate3Digits')} debe ser inferior a ${
          chanceZodiacSettingsLimits.maxBetReturnedRate3Digits
        }`
      ),
    maxBetByChance: Yup.number()
      .typeError(chanceZodiacSettingsLimits.numericValue)
      .required(`${getChanceZodiacSettingsLabel('maxBetByChance')} es requerido`)
      .min(
        chanceZodiacSettingsLimits.minBetByChance,
        `${getChanceZodiacSettingsLabel('maxBetByChance')} debe ser superior a ${
          chanceZodiacSettingsLimits.maxBetByChance
        }`
      )
      .max(
        chanceZodiacSettingsLimits.maxBetByChance,
        `${getChanceZodiacSettingsLabel('maxBetByChance')} debe ser inferior a ${
          chanceZodiacSettingsLimits.maxBetByChance
        }`
      ),
    maxOverallChanceBet: Yup.number()
      .typeError(chanceZodiacSettingsLimits.numericValue)
      .required(`${getChanceZodiacSettingsLabel('maxOverallChanceBet')} es requerido`)
      .min(
        chanceZodiacSettingsLimits.minOverallChanceBet,
        `${getChanceZodiacSettingsLabel('maxOverallChanceBet')} debe ser superior a ${
          chanceZodiacSettingsLimits.minOverallChanceBet
        }`
      )
      .max(
        chanceZodiacSettingsLimits.maxOverallChanceBet,
        `${getChanceZodiacSettingsLabel('maxOverallChanceBet')} debe ser inferior a ${
          chanceZodiacSettingsLimits.maxOverallChanceBet
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
    const chanceZodiacSettings = [
      {
        currencyCode: formikVes.values.currencyCode,
        maxDigitsByBet: formikVes.values.maxDigitsByBet,
        minDigitsByBet: formikVes.values.minDigitsByBet,
        betReturnedRate2Digits: formikVes.values.betReturnedRate2Digits,
        betReturnedRate3Digits: formikVes.values.betReturnedRate3Digits,
        maxOverallChanceBet: formikVes.values.maxOverallChanceBet,
        maxBetByChance: formikVes.values.maxBetByChance,
      },
      {
        currencyCode: formikUsd.values.currencyCode,
        maxDigitsByBet: formikUsd.values.maxDigitsByBet,
        minDigitsByBet: formikUsd.values.minDigitsByBet,
        betReturnedRate2Digits: formikUsd.values.betReturnedRate2Digits,
        betReturnedRate3Digits: formikUsd.values.betReturnedRate3Digits,
        maxOverallChanceBet: formikUsd.values.maxOverallChanceBet,
        maxBetByChance: formikUsd.values.maxBetByChance,
      },
    ]
    submitForm(chanceZodiacSettings)
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
