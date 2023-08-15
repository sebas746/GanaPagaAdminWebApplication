import {Field, FieldArray, Form} from 'formik'
import {GeneralSettingsForm} from '../../../../types/Forms.types'
import {IGeneralSetting} from '../../../../types/GeneralSettings.types'
import {useGeneralSettingsForm} from './GeneralSettingForm.hook'
import {Form as BForm, Button} from 'react-bootstrap'

interface GeneralSettingsFormProps {
  generalSettingsFormState: IGeneralSetting[]
  setGeneralSettingsForm: (form: GeneralSettingsForm[]) => void
  isLoadingForm: boolean
}

const GeneralSettingForm = ({
  generalSettingsFormState,
  setGeneralSettingsForm,
  isLoadingForm,
}: GeneralSettingsFormProps) => {
  const {formik} = useGeneralSettingsForm(generalSettingsFormState, setGeneralSettingsForm)

  return (
    <div className='mb-10'>
      <form onSubmit={formik.handleSubmit}>
        {generalSettingsFormState && generalSettingsFormState.length > 0
          ? generalSettingsFormState.map((setting, index) => (
              <div key={index} className='row mb-3'>
                <label className='form-label col-sm-3 col-form-label'>
                  {setting.generalSettingsLabel}
                </label>
                <div className='col-sm-8'>
                  {setting.generalSettingsDataType === 'number' ? (
                    <BForm.Control
                      max={Math.abs(Number(setting.generalSettingsMaxValue))}
                      min={Math.abs(Number(setting.generalSettingsMinValue))}
                      id={`setting_name_${setting.generalSettingsName}`}
                      name={`setting_name_${setting.generalSettingsName}`}
                      defaultValue={Math.abs(Number(setting.generalSettingsValue))}
                      onChange={formik.handleChange}
                      autoComplete={'off'}
                      type='number'
                    />
                  ) : (
                    <BForm.Control
                      id={`setting_name_${setting.generalSettingsName}`}
                      name={`setting_name_${setting.generalSettingsName}`}
                      maxLength={setting.generalSettingsMaxValue}
                      defaultValue={setting.generalSettingsValue}
                      onChange={formik.handleChange}
                      autoComplete={'off'}
                    />
                  )}
                </div>
                {/* Render any other fields here if needed */}
              </div>
            ))
          : null}
        <Button variant='primary'>Guardar</Button>
      </form>
    </div>
  )
}

export default GeneralSettingForm
