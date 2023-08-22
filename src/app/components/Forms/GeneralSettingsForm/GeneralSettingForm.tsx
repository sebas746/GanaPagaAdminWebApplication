import {GeneralSettingsForm} from '../../../../types/Forms.types'
import {IGeneralSetting} from '../../../../types/GeneralSettings.types'
import {useGeneralSettingsForm} from './GeneralSettingForm.hook'
import {Form as BForm, Button} from 'react-bootstrap'
import RenderLoader from '../../RenderLoader/RenderLoader'
import {useNavigate} from 'react-router-dom'

interface GeneralSettingsFormProps {
  generalSettingsFormState: IGeneralSetting[]
  setGeneralSettingsForm: (form: GeneralSettingsForm[]) => void
  isLoadingForm: boolean
  submitIsLoading: boolean
}

const GeneralSettingForm = ({
  generalSettingsFormState,
  setGeneralSettingsForm,
  isLoadingForm,
  submitIsLoading,
}: GeneralSettingsFormProps) => {
  const {formik} = useGeneralSettingsForm(generalSettingsFormState, setGeneralSettingsForm)
  const navigate = useNavigate()
  return (
    <div className='mb-10'>
      <RenderLoader show={isLoadingForm} huge={true}></RenderLoader>
      {!isLoadingForm && generalSettingsFormState && (
        <form onSubmit={formik.handleSubmit}>
          {generalSettingsFormState.length > 0
            ? generalSettingsFormState.map((setting, index) => (
                <div key={index} className='row mb-3'>
                  <label className='form-label col-sm-3 col-form-label'>
                    {setting.generalSettingsLabel}
                  </label>
                  <div className='col-sm-3'>
                    {setting.generalSettingsDataType === 'number' ? (
                      <BForm.Control
                        max={Number(setting.generalSettingsMaxValue)}
                        min={Number(setting.generalSettingsMinValue)}
                        id={setting.generalSettingsName}
                        name={setting.generalSettingsName}
                        defaultValue={Number(setting.generalSettingsValue)}
                        onChange={formik.handleChange}
                        autoComplete={'off'}
                        type='number'
                      />
                    ) : (
                      <BForm.Control
                        id={setting.generalSettingsName}
                        name={setting.generalSettingsName}
                        maxLength={setting.generalSettingsMaxValue}
                        defaultValue={setting.generalSettingsValue}
                        onChange={formik.handleChange}
                        autoComplete={'off'}
                      />
                    )}
                  </div>
                </div>
              ))
            : null}
          <div className='row mb-3'>
            <div className='col-sm-6 d-flex justify-content-end'>
              <Button variant='secondary' className='me-2' onClick={() => navigate('/dashboard')}>
                Cancelar
              </Button>

              {/* Submit Button */}
              <Button variant='primary' type='submit' disabled={!formik.dirty}>
                Guardar <RenderLoader show={submitIsLoading} />
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default GeneralSettingForm
