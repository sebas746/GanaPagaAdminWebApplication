import { useFormik } from 'formik'
import { CurrencyCode } from '../../../../types/Currency.types'
import * as Yup from 'yup'
import { useState } from 'react'
import { chance4DigitsSettingsLimits } from '../../../constants/settings.constants'
import {
  IChance4DigitsLotterySetting,
  IChance4DigitsUpdateSettings,
} from '../../../../types/Chance4Digits.types'
import { useConfirmChance4DigitsSettings } from '../../Modals/ConfirmChance4DigitsSettings/ConfirmChance4DigitsSettings.hook'

export const useChance4DigitsSettingsForm = (
  initialValues: IChance4DigitsLotterySetting[],
  submitForm: (animalitosSettings: IChance4DigitsUpdateSettings[]) => void
) => {
  const { getChance4DigitsSettingsLabel } = useConfirmChance4DigitsSettings()
  const [isShowingModalConfirmation, setIsShowingModalConfirmation] = useState(false)
  let initialValuesVes = {} as IChance4DigitsLotterySetting
  let initialValuesUsd = {} as IChance4DigitsLotterySetting

  const settingChance4Schema = Yup.object().shape({
    currencyCode: Yup.string(),
    betReturnedRate2Digits: Yup.number()
      .typeError(chance4DigitsSettingsLimits.numericValue)
      .required(`${getChance4DigitsSettingsLabel('betReturnedRate2Digits')} es requerido`)
      .min(
        chance4DigitsSettingsLimits.minBetReturnedRate2Digits,
        `${getChance4DigitsSettingsLabel('betReturnedRate2Digits')} debe ser superior a ${chance4DigitsSettingsLimits.minBetReturnedRate2Digits
        }`
      )
      .max(
        chance4DigitsSettingsLimits.maxBetReturnedRate2Digits,
        `${getChance4DigitsSettingsLabel('betReturnedRate2Digits')} debe ser inferior a ${chance4DigitsSettingsLimits.maxBetReturnedRate2Digits
        }`
      ),
    betReturnedRate3Digits: Yup.number()
      .typeError(chance4DigitsSettingsLimits.numericValue)
      .required(`${getChance4DigitsSettingsLabel('betReturnedRate3Digits')} es requerido`)
      .min(
        chance4DigitsSettingsLimits.minBetReturnedRate3Digits,
        `${getChance4DigitsSettingsLabel('betReturnedRate3Digits')} debe ser superior a ${chance4DigitsSettingsLimits.minBetReturnedRate3Digits
        }`
      )
      .max(
        chance4DigitsSettingsLimits.maxBetReturnedRate3Digits,
        `${getChance4DigitsSettingsLabel('betReturnedRate3Digits')} debe ser inferior a ${chance4DigitsSettingsLimits.maxBetReturnedRate3Digits
        }`
      ),
    betReturnedRate4Digits: Yup.number()
      .typeError(chance4DigitsSettingsLimits.numericValue)
      .required(`${getChance4DigitsSettingsLabel('betReturnedRate4Digits')} es requerido`)
      .min(
        chance4DigitsSettingsLimits.minBetReturnedRate4Digits,
        `${getChance4DigitsSettingsLabel('betReturnedRate4Digits')} debe ser superior a ${chance4DigitsSettingsLimits.minBetReturnedRate4Digits
        }`
      )
      .max(
        chance4DigitsSettingsLimits.maxBetReturnedRate4Digits,
        `${getChance4DigitsSettingsLabel('betReturnedRate4Digits')} debe ser inferior a ${chance4DigitsSettingsLimits.maxBetReturnedRate4Digits
        }`
      ),
    maxBetByChance: Yup.number()
      .typeError(chance4DigitsSettingsLimits.numericValue)
      .required(`${getChance4DigitsSettingsLabel('maxBetByChance')} es requerido`)
      .min(
        chance4DigitsSettingsLimits.minBetByChance,
        `${getChance4DigitsSettingsLabel('maxBetByChance')} debe ser superior a ${chance4DigitsSettingsLimits.minBetByChance
        }`
      )
      .max(
        chance4DigitsSettingsLimits.maxBetByChance,
        `${getChance4DigitsSettingsLabel('maxBetByChance')} debe ser inferior a ${chance4DigitsSettingsLimits.maxBetByChance
        }`
      ),
    maxOverallChanceBet: Yup.number()
      .typeError(chance4DigitsSettingsLimits.numericValue)
      .required(`${getChance4DigitsSettingsLabel('maxOverallChanceBet')} es requerido`)
      .min(
        chance4DigitsSettingsLimits.minOverallChanceBet,
        `${getChance4DigitsSettingsLabel('maxOverallChanceBet')} debe ser superior a ${chance4DigitsSettingsLimits.minOverallChanceBet
        }`
      )
      .max(
        chance4DigitsSettingsLimits.maxOverallChanceBet,
        `${getChance4DigitsSettingsLabel('maxOverallChanceBet')} debe ser inferior a ${chance4DigitsSettingsLimits.maxOverallChanceBet
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
      betReturnedRate2Digits: initialValuesVes.betReturnedRate2Digits,
      betReturnedRate3Digits: initialValuesVes.betReturnedRate3Digits,
      betReturnedRate4Digits: initialValuesVes.betReturnedRate4Digits,
      maxOverallChanceBet: initialValuesVes.maxOverallChanceBet,
      maxBetByChance: initialValuesVes.maxBetByChance,
    },
    validationSchema: settingChance4Schema,
    onSubmit: () => { },
  })

  const formikUsd = useFormik({
    initialValues: {
      currencyId: initialValuesUsd.currencyId,
      currencyName: initialValuesUsd.currencyName,
      currencyCode: initialValuesUsd.currencyCode,
      betReturnedRate2Digits: initialValuesUsd.betReturnedRate2Digits,
      betReturnedRate3Digits: initialValuesUsd.betReturnedRate3Digits,
      betReturnedRate4Digits: initialValuesUsd.betReturnedRate4Digits,
      maxOverallChanceBet: initialValuesUsd.maxOverallChanceBet,
      maxBetByChance: initialValuesUsd.maxBetByChance,
    },
    validationSchema: settingChance4Schema,
    onSubmit: () => { },
  })

  const showModalConfirmation = () => {
    setIsShowingModalConfirmation(true)
  }

  const hideModalConfirmation = () => {
    setIsShowingModalConfirmation(false)
  }

  const onSubmit = () => {
    const chance4DigitsSettings = [
      {
        currencyCode: formikVes.values.currencyCode,
        betReturnedRate2Digits: formikVes.values.betReturnedRate2Digits,
        betReturnedRate3Digits: formikVes.values.betReturnedRate3Digits,
        betReturnedRate4Digits: formikVes.values.betReturnedRate4Digits,
        maxOverallChanceBet: formikVes.values.maxOverallChanceBet,
        maxBetByChance: formikVes.values.maxBetByChance,
      },
      {
        currencyCode: formikUsd.values.currencyCode,
        betReturnedRate2Digits: formikUsd.values.betReturnedRate2Digits,
        betReturnedRate3Digits: formikUsd.values.betReturnedRate3Digits,
        betReturnedRate4Digits: formikUsd.values.betReturnedRate4Digits,
        maxOverallChanceBet: formikUsd.values.maxOverallChanceBet,
        maxBetByChance: formikUsd.values.maxBetByChance,
      },
    ]
    submitForm(chance4DigitsSettings)
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
