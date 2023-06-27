export interface IChance4DigitsLotteries {
  lotteryId: number
  lotteryName: string
}

export interface Chance4DigitsRaffleStatus {
  chanceFourRaffleStatus: 'PendingDraw' | 'PendingResult' | 'PendingApprove' | 'Approved'
}

export interface Chance4ScrutinyStatus {
  chanceFourRaffleScrutinyStatus: 'PendingResultApprove' | 'PendingResultApprove' | 'Scrutinized'
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

export interface IRaffleResultChance4DigitsResponse {
  chanceFourLotteryId: number
  chanceFourLotteryName: string
  raffleResultDetailResponse: IRaffleResultChance4DigitsDetail[]
}

export interface AddRaffleChance4DigitsResultBody {
  raffleId: number
  raffleResultValue: string
}
