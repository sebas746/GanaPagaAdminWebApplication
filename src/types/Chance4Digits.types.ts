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

export interface IRaffleScrutinyChance4DigitsResponse extends IRaffleResultChance4DigitsResponse {}
