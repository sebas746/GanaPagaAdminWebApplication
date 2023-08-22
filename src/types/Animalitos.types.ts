import {CurrencyCode} from './Currency.types'

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

export interface IAnimalDetailSelect {
  id: number
  label: string
}

export enum RaffleResulStatus {
  PendingDraw = 'PendingDraw',
  PendingResult = 'PendingResult',
  PendingApprove = 'PendingApprove',
  Approved = 'Approved',
}

export interface RaffleStatus {
  animalitosRaffleStatus: RaffleResulStatus
}

export enum RaffleScrutinyStatus {
  PendingResultApprove = 'PendingScrutiny',
  Scrutinized = 'Scrutinized',
}

export interface ScrutinyStatus {
  animalitosRaffleScrutinyStatus: RaffleScrutinyStatus
}

export interface IRaffleResultAnimalitosDetail extends RaffleStatus, ScrutinyStatus {
  animalitosRaffleId: number
  animalitosRaffleName: string
  animalitosRaffleDrawTime: string
  animalitosRaffleResultValue: string
  animalitosRaffleResultAnimal: string
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
}

export interface AddScrutinyAnimalitosBody {
  raffleId: number
}

export interface IRaffleScrutinyAnimalitosResponse extends IRaffleResultAnimalitosResponse {}

export interface IAnimalitosLotterySetting {
  currencyId: number
  currencyName: string
  currencyCode: CurrencyCode
  maxBetByAnimal: number
  betReturnedRate: number
  maxAnimalsByTicket: number
  maxOverallAnimalitoBet: number
}

export interface IAnimalitoUpdateSettings {
  currencyCode: CurrencyCode
  maxBetByAnimal: number
  betReturnedRate: number
  maxAnimalsByTicket: number
  maxOverallAnimalitoBet: number
}

export interface ISettingsAnimalitosResponse {
  lotteryId: number
  lotteryName: string
  animalitosLotterySettings: IAnimalitosLotterySetting[]
}
