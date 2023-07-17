export interface IChance3DigitsLotteries {
  lotteryId: number
  lotteryName: string
}

export interface Chance3DigitsRaffleStatus {
  chanceThreeRaffleStatus: Chance3DigitsRaffleResultStatus
}

export interface Chance3ScrutinyStatus {
  chanceThreeRaffleScrutinyStatus: Chance3DigitsRaffleScrutinyStatus
}

export interface IRaffleResultChance3DigitsDetail
  extends Chance3DigitsRaffleStatus,
    Chance3ScrutinyStatus {
  chanceThreeRaffleId: number
  chanceThreeRaffleName: string
  chanceThreeRaffleDrawTime: string
  chanceThreeRaffleResultValue: string
  chanceThreeRaffleResultCreatedBy: string
  chanceThreeRaffleResultLastUpdatedBy: string
  chanceThreeRaffleResultApprovedBy: string
}

export interface IRaffleResultChance3DigitsResponse {
  chanceThreeLotteryId: number
  chanceThreeLotteryName: string
  chanceThreeLotteryMaxDigitsByBet: number
  raffleResultDetailResponse: IRaffleResultChance3DigitsDetail[]
}

export interface AddRaffleChance3DigitsResultBody {
  raffleId: number
  raffleResultValue: string
}

export enum Chance3DigitsRaffleResultStatus {
  PendingDraw = 'PendingDraw',
  PendingResult = 'PendingResult',
  PendingApprove = 'PendingApprove',
  Approved = 'Approved',
}

export enum Chance3DigitsRaffleScrutinyStatus {
  PendingResultApprove = 'PendingScrutiny',
  Scrutinized = 'Scrutinized',
}

export interface AddScrutinyChance3DigitsBody {
  raffleId: number
}

export interface IRaffleScrutinyChance3DigitsResponse extends IRaffleResultChance3DigitsResponse {}
