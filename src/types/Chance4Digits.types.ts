export interface IChance4DigitsLotteries {
  lotteryId: number
  lotteryName: string
}

export interface Chance4DigitsRaffleStatus {
  chanceFourRaffleStatus: Chance4DigitsRaffleResultStatus
}

export interface Chance4ScrutinyStatus {
  chanceFourRaffleScrutinyStatus: Chance4DigitsRaffleScrutinyStatus
}

export interface IRaffleResultChance4DigitsDetail
  extends Chance4DigitsRaffleStatus,
  Chance4ScrutinyStatus {
  chanceFourRaffleId: number
  chanceFourRaffleName: string
  chanceFourRaffleDrawTime: string
  chanceFourRaffleResultValue: string
  chanceFourRaffleResultCreatedBy: string
  chanceFourRaffleResultLastUpdatedBy: string
  chanceFourRaffleResultApprovedBy: string
}

export enum Chance4DigitsRaffleResultStatus {
  PendingDraw = 'PendingDraw',
  PendingResult = 'PendingResult',
  PendingApprove = 'PendingApprove',
  Approved = 'Approved',
}

export enum Chance4DigitsRaffleScrutinyStatus {
  PendingResultApprove = 'PendingScrutiny',
  Scrutinized = 'Scrutinized',
}

export interface IRaffleResultChance4DigitsResponse {
  chanceFourLotteryId: number
  chanceFourLotteryName: string
  raffleResultDetailResponse: IRaffleResultChance4DigitsDetail[]
}

export interface AddRaffleChance4DigitsResultBody {
  raffleId: number
  raffleResultValue: string
}

export interface AddScrutinyChance4DigitsBody {
  raffleId: number
}

export interface IRaffleScrutinyChance4DigitsResponse extends IRaffleResultChance4DigitsResponse { }

export interface IChance4DigitsLotterySetting {
  currencyId: number
  currencyName: string
  currencyCode: string
  maxBetByChance: number
  betReturnedRate2Digits: number
  betReturnedRate3Digits: number
  betReturnedRate4Digits: number
  maxOverallChanceBet: number
}

export interface IChance4DigitsUpdateSettings {
  currencyCode: string
  maxBetByChance: number
  maxOverallChanceBet: number
  betReturnedRate2Digits: number
  betReturnedRate3Digits: number
  betReturnedRate4Digits: number
}

export interface ISettingsChance4DigitsResponse {
  lotteryId: number
  lotteryName: string
  chanceFourLotterySettings: IChance4DigitsLotterySetting[]
}
