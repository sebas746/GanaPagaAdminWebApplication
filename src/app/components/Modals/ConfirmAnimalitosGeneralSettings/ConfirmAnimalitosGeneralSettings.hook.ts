import {IAnimalitoUpdateGeneralSettings} from '../../../../types/Animalitos.types'
import {mapAnimalitosGeneralSettingsLabel} from '../../../constants/settings.constants'

export const useConfirmAnimalitosGeneralSettings = () => {
  const getAnimalitosGeneralSettingsLabel = (
    animalitosSettingsName: keyof IAnimalitoUpdateGeneralSettings
  ): string => {
    return mapAnimalitosGeneralSettingsLabel[animalitosSettingsName] || ''
  }

  return {
    getAnimalitosGeneralSettingsLabel,
  }
}
