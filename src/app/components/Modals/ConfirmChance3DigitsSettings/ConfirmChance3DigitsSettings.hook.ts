import {IChance3DigitsUpdateSettings} from '../../../../types/Chance3Digits.types'
import {mapChance3DigitsSettingsLabel} from '../../../constants/settings.constants'

export const useConfirmChance3DigitsSettings = () => {
  const getChance3DigitsSettingsLabel = (
    chance3DigitsSettingsName: keyof IChance3DigitsUpdateSettings
  ): string => {
    return mapChance3DigitsSettingsLabel[chance3DigitsSettingsName] || ''
  }

  return {
    getChance3DigitsSettingsLabel,
  }
}
