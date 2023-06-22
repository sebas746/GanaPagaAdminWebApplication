export interface IAnimalitosLotteries {
  lotteryId: number
  lotteryName: string
}

export interface IAnimalDetail {
  animalId: number
  animalUserId: string
  animalName: string
  animalImageUrl: string
}

export interface RaffleStatus {
  animalitosRaffleStatus: 'PendingDraw' | 'PendingResult' | 'PendingApprove' | 'Approved'
}

export interface ScrutinyStatus {
  animalitosRaffleScrutinyStatus: 'PendingResultApprove' | 'PendingResultApprove' | 'Scrutinized'
}

export interface IRaffleResultAnimalitosDetail extends RaffleStatus, ScrutinyStatus {
  animalitosRaffleId: number
  animalitosRaffleName: string
  animalitosRaffleDrawTime: string
  animalitosRaffleResultValue: string
  animalitosRaffleResultCreatedBy: string
  animalitosRaffleResultLastUpdatedBy: string
  animalitosRaffleResultApprovedBy: string
}

export interface IRaffleResultAnimalitosResponse {
  animalitosLotteryId: number
  animalitosLotteryName: string
  animalDetails: IAnimalDetail[]
  raffleResultDetailResponse: IRaffleResultAnimalitosDetail[]
}

export interface AddRaffleAnimalitosResultBody {
  raffleId: number
  raffleResultValue: string
  raffleResultCreatedBy: string
}
