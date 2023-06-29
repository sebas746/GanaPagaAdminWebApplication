export interface IChance3DigitsLotteries {
  lotteryId: number
  lotteryName: string
}

export interface Chance3DigitsRaffleStatus {
  chanceThreeRaffleStatus: 'PendingDraw' | 'PendingResult' | 'PendingApprove' | 'Approved'
}

export interface Chance3ScrutinyStatus {
  chanceThreeRaffleScrutinyStatus: 'PendingResultApprove' | 'PendingResultApprove' | 'Scrutinized'
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
