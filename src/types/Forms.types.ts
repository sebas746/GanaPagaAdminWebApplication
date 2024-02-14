export interface RaffleResultsForm {
  date: string
  raffleResultStateId: string
}

export interface GeneralSettingsForm {
  generalSettingsName: string
  generalSettingsValue: string
}

export interface GeneralSettingsPromoterForm {
  promoterId: string
  settings: GeneralSettingsForm[]
}

export interface GeneralSettingsData {
  generalSettingsName: string
  generalSettingsValue: string
}

export interface CurrentGeneralSettings extends GeneralSettingsForm {
  generalSettingsLabel: string
  generalSettingsCurrentValue: string
}
