import {useFormik} from 'formik'
import {GeneralSettingsForm} from '../../../../types/Forms.types'
import {IGeneralSetting} from '../../../../types/GeneralSettings.types'

export const useGeneralSettingsForm = (
  generalSettingsFormState: IGeneralSetting[],
  setRaffleForm: (form: GeneralSettingsForm[]) => void
) => {
  const formik = useFormik({
    initialValues: {
      values: generalSettingsFormState,
    },
    onSubmit: (values) => {
      //setRaffleForm(values)
    },
  })

  return {
    formik,
  }
}
