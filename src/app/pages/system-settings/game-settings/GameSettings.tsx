import GameSettingsForm from '../../../components/Forms/GameSettingsForm/GameSettingsForm'
import RenderLoader from '../../../components/RenderLoader/RenderLoader'
import {useGameSettings} from './GameSettings.hook'

const GameSettings = () => {
  const {gameSettingsState, isLoading, addGameSettings, isLoadingForm} = useGameSettings()

  return (
    <>
      <RenderLoader show={isLoading} huge={true} />
      {!isLoading && gameSettingsState.GameSettings.length > 0 && (
        <GameSettingsForm
          initialValues={gameSettingsState.GameSettings}
          isLoading={isLoadingForm}
          submitForm={addGameSettings}
        />
      )}
    </>
  )
}
export default GameSettings
