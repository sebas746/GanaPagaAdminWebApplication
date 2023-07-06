export interface IChanceZodiacLotteries {
  lotteryId: number
  lotteryName: string
}

export interface ChanceZodiacRaffleStatus {
  chanceZodiacRaffleStatus: 'PendingDraw' | 'PendingResult' | 'PendingApprove' | 'Approved'
}

export interface ChanceZodiacScrutinyStatus {
  chanceZodiacRaffleScrutinyStatus: 'PendingResultApprove' | 'PendingResultApprove' | 'Scrutinized'
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

export interface AddRaffleChanceZodiacResultBody {
  raffleId: number
  raffleResultValue: string
}

export interface IStarSignDetailSelect {
  id: number
  label: string
}
