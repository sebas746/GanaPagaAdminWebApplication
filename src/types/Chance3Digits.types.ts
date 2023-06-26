export interface IChance3DigitsLotteries {
  lotteryId: number
  lotteryName: string
}

export interface IAnimalDetail {
  animalId: number
  animalUserId: string
  animalName: string
  animalImageUrl: string
}

export interface IAnimalDetailSelect {
  id: number
  label: string
}

export interface RaffleStatus {
  Chance3DigitsRaffleStatus: 'PendingDraw' | 'PendingResult' | 'PendingApprove' | 'Approved'
}

export interface ScrutinyStatus {
  Chance3DigitsRaffleScrutinyStatus: 'PendingResultApprove' | 'PendingResultApprove' | 'Scrutinized'
}

export interface IRaffleResultChance3DigitsDetail extends RaffleStatus, ScrutinyStatus {
  Chance3DigitsRaffleId: number
  Chance3DigitsRaffleName: string
  Chance3DigitsRaffleDrawTime: string
  Chance3DigitsRaffleResultValue: string
  Chance3DigitsRaffleResultCreatedBy: string
  Chance3DigitsRaffleResultLastUpdatedBy: string
  Chance3DigitsRaffleResultApprovedBy: string
}

export interface IRaffleResultChance3DigitsResponse {
  Chance3DigitsLotteryId: number
  Chance3DigitsLotteryName: string
  animalDetails: IAnimalDetail[]
  raffleResultDetailResponse: IRaffleResultChance3DigitsDetail[]
}

export interface AddRaffleChance3DigitsResultBody {
  raffleId: number
  raffleResultValue: string
}
