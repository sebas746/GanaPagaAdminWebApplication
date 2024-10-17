import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useEffect, useState} from 'react'
import {IGameSettingsResponse} from '../../../../types/GameSettings.types'

export const useGameSettingsForm = (
  initialValues: IGameSettingsResponse[],
  submitForm: (gameSettings: IGameSettingsResponse[]) => void
) => {
  const [originalValues, setOriginalValues] = useState(initialValues)

  const settingGameSchema = Yup.object().shape({
    gameSettingsValue: Yup.array().of(
      Yup.number()
        .min(1, 'El valor debe ser superior a 1')
        .max(5000, 'El valor máximo es 5000')
        .required('El valor es requerido')
    ),
  })

  const formik = useFormik({
    initialValues: initialValues.map((setting) => ({
      gameSettingsName: setting.gameSettingsName,
      gameSettingsValue: setting.gameSettingsValue,
      gameSettingsLabel: setting.gameSettingsLabel,
    })),
    validationSchema: settingGameSchema,
    onSubmit: (values) => {
      submitForm(values) // Submit the current values
    },
    enableReinitialize: true,
  })

  const onSubmit = () => {
    const gameSettings = formik.values.map((value) => ({
      gameSettingsName: value.gameSettingsName,
      gameSettingsValue: value.gameSettingsValue,
      gameSettingsLabel: value.gameSettingsLabel,
    }))
    submitForm(gameSettings)
  }

  useEffect(() => {
    setOriginalValues(initialValues)
  }, [initialValues])

  return {
    formik,
    onSubmit,
    originalValues, // Return original values for reference
  }
}
