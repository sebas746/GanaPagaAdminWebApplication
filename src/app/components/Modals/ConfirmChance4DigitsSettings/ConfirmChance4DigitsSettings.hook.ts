import {IChance4DigitsUpdateSettings} from '../../../../types/Chance4Digits.types'
import {mapChance4DigitsSettingsLabel} from '../../../constants/settings.constants'

export const useConfirmChance4DigitsSettings = () => {
  const getChance4DigitsSettingsLabel = (
    chance4DigitsSettingsName: keyof IChance4DigitsUpdateSettings
  ): string => {
    return mapChance4DigitsSettingsLabel[chance4DigitsSettingsName] || ''
  }

  return {
    getChance4DigitsSettingsLabel,
  }
}
