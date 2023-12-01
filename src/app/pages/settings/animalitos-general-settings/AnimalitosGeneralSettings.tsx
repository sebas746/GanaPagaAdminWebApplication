import ConditionalRendering from '../../../helpers/ConditionalRedering'
import RenderLoader from '../../../components/RenderLoader/RenderLoader'
import {useAnimalitosGeneralSettings} from './AnimalitosGeneralSettings.hook'
import AnimalitosGeneralSettingsForm from '../../../components/Forms/AnimalitosGeneralSettingsForm/AnimalitosGeneralSettingsForm'

const AnimalitosGeneralSettings = () => {
  const {isFetching, animalitosGeneralSettings, updateGeneralLotterySettings, isUpdatingSettings} =
    useAnimalitosGeneralSettings()
  const setting = animalitosGeneralSettings.find(
    (ag) => ag.lotteryId === 1
  )?.animalitosLotterySettings
  return (
    <>
      <RenderLoader show={isFetching} huge={true} />
      <ConditionalRendering isTrue={!isFetching}>
        <>
          {setting !== undefined && (
            <AnimalitosGeneralSettingsForm
              initialValues={setting}
              submitForm={updateGeneralLotterySettings}
              isLoading={isUpdatingSettings}
            />
          )}
        </>
      </ConditionalRendering>
    </>
  )
}
export default AnimalitosGeneralSettings
