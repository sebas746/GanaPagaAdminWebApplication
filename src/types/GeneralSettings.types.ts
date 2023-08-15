export interface IGeneralSettingsResponse {
  total: number
  generalSettings: IGeneralSetting[]
}

export interface IGeneralSetting {
  generalSettingsName: string
  generalSettingsValue: string
  generalSettingsDataType: string
  generalSettingsMaxValue: number
  generalSettingsMinValue: number
  generalSettingsLabel: string
  generalSettingsDescription: string
}
