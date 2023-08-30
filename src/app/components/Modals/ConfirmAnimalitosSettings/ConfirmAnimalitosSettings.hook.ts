import {IAnimalitoUpdateSettings} from '../../../../types/Animalitos.types'
import {mapAnimalitosSettingsLabel} from '../../../constants/settings.constants'

export const useConfirmAnimalitosSettings = () => {
  const getAnimalitosSettingsLabel = (
    animalitosSettingsName: keyof IAnimalitoUpdateSettings
  ): string => {
    return mapAnimalitosSettingsLabel[animalitosSettingsName] || ''
  }

  return {
    getAnimalitosSettingsLabel,
  }
}
