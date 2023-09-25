import ExchangeRateSettingsForm from '../../../components/Forms/ExchangeRateSettingsForm/ExchangeRateSettingsForm'
import RenderLoader from '../../../components/RenderLoader/RenderLoader'
import {useExchangeRateSettings} from './ExchangeRateSettings.hook'

const ExchangeRateSettings = () => {
  const {exchangeRateSettingsState, isLoading, addExchangeRateSettings, isLoadingForm} =
    useExchangeRateSettings()

  return (
    <>
      <RenderLoader show={isLoading} huge={true} />
      {!isLoading && exchangeRateSettingsState.exchangeRateSettings.currencyExchangeRateValue && (
        <ExchangeRateSettingsForm
          initialValues={exchangeRateSettingsState.exchangeRateSettings}
          isLoading={isLoadingForm}
          submitForm={addExchangeRateSettings}
        />
      )}
    </>
  )
}
export default ExchangeRateSettings
