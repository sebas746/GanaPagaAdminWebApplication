import {useFormik} from 'formik'
import {GeneralSettingsForm} from '../../../../types/Forms.types'
import {IGeneralSetting} from '../../../../types/GeneralSettings.types'

type InitialValuesType = {
  [key: string]: string | number // Adjust this to your needs. If it can only be a string, then just use string.
}

export const useGeneralSettingsForm = (
  generalSettingsFormState: IGeneralSetting[],
  setGeneralSettingsForm: (form: GeneralSettingsForm[]) => void
) => {
  const initialValues: InitialValuesType = {}
  if (generalSettingsFormState && generalSettingsFormState.length > 0) {
    generalSettingsFormState.forEach((setting) => {
      initialValues[setting.generalSettingsName] = setting.generalSettingsValue
    })
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: any) => {
      setGeneralSettingsForm(values)
    },
    validate: (values: any) => {
      const errors: any = {}

      for (const settingName in values) {
        if (typeof values[settingName] === 'number') {
          const currentSetting = generalSettingsFormState.find(
            (s) => s.generalSettingsName === settingName
          )

          if (currentSetting) {
            if (values[settingName] < currentSetting.generalSettingsMinValue) {
              errors[settingName] = `El valor mínimo es ${currentSetting.generalSettingsMinValue}`
            } else if (values[settingName] > currentSetting.generalSettingsMaxValue) {
              errors[settingName] = `El valor máximo es ${currentSetting.generalSettingsMaxValue}`
            }
          }
        } else if (typeof values[settingName] === 'string') {
          if (!values[settingName].trim()) {
            errors[settingName] = 'El campo es obligatorio'
          }
        }
      }
      return errors
    },
  })

  return {
    formik,
  }
}
