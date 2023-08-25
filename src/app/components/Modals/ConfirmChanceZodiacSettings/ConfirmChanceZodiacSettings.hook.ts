import {IChanceZodiacUpdateSettings} from '../../../../types/ChanceZodiac.types'
import {mapChanceZodiacSettingsLabel} from '../../../constants/settings.constants'

export const useConfirmChanceZodiacSettings = () => {
  const getChanceZodiacSettingsLabel = (
    chanceZodiacSettingsName: keyof IChanceZodiacUpdateSettings
  ): string => {
    return mapChanceZodiacSettingsLabel[chanceZodiacSettingsName] || ''
  }

  return {
    getChanceZodiacSettingsLabel,
  }
}
