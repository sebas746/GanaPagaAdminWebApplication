export interface IChanceZodiacLotteries {
  lotteryId: number
  lotteryName: string
}

export interface ChanceZodiacRaffleStatus {
  chanceZodiacRaffleStatus: ChanceZodiacRaffleResultStatus
}

export interface ChanceZodiacScrutinyStatus {
  chanceZodiacRaffleScrutinyStatus: ChanceZodiacRaffleScrutinyStatus
}

export interface IRaffleResultChanceZodiacDetail
  extends ChanceZodiacRaffleStatus,
    ChanceZodiacScrutinyStatus {
  chanceZodiacRaffleId: number
  chanceZodiacRaffleName: string
  chanceZodiacRaffleDrawTime: string
  chanceZodiacRaffleResultValue: string
  chanceZodiacStarSignId: number
  chanceZodiacStarSignName: string
  chanceZodiacRaffleResultCreatedBy: string
  chanceZodiacRaffleResultLastUpdatedBy: string
  chanceZodiacRaffleResultApprovedBy: string
}

export interface IRaffleResultChanceZodiacResponse {
  chanceZodiacLotteryId: number
  chanceZodiacLotteryName: string
  raffleResultDetailResponse: IRaffleResultChanceZodiacDetail[]
}

export enum ChanceZodiacRaffleResultStatus {
  PendingDraw = 'PendingDraw',
  PendingResult = 'PendingResult',
  PendingApprove = 'PendingApprove',
  Approved = 'Approved',
}

export enum ChanceZodiacRaffleScrutinyStatus {
  PendingResultApprove = 'PendingScrutiny',
  Scrutinized = 'Scrutinized',
}

export interface AddRaffleChanceZodiacResultBody {
  raffleId: number
  raffleResultValue: string
}

export interface IStarSignDetailSelect {
  id: number
  label: string
}

export interface AddScrutinyChanceZodiacBody {
  raffleId: number
}

export interface IRaffleScrutinyChanceZodiacResponse extends IRaffleResultChanceZodiacResponse {}

export interface IChanceZodiacLotterySetting {
  currencyId: number
  currencyName: string
  currencyCode: string
  maxBetByChance: number
  betReturnedRate2Digits: number
  betReturnedRate3Digits: number
  maxOverallChanceBet: number
  maxDigitsByBet: number
  minDigitsByBet: number
}

export interface IChanceZodiacUpdateSettings {
  currencyCode: string
  maxBetByChance: number
  maxDigitsByBet: number
  minDigitsByBet: number
  maxOverallChanceBet: number
  betReturnedRate2Digits: number
  betReturnedRate3Digits: number
}

export interface ISettingsChanceZodiacResponse {
  lotteryId: number
  lotteryName: string
  animalitosLotterySettings: IChanceZodiacUpdateSettings[]
}
