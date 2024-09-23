import {CurrencyCode} from './Currency.types'

export interface IAnimalitosLotteries {
  lotteryId: number
  lotteryName: string
  animalitosLotteryFruitCombined?: boolean
}

export interface IAnimalDetail {
  animalId: number
  animalUserId: string
  animalName: string
  animalImageUrl: string
  animalIsFruit: boolean
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
  NoTicketBets = 'NoTicketBets',
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
  animalitosRaffleResultFruitValue: string
  animalitosRaffleResultFruit: string
  animalitosRaffleScrutinyWasRecalculated: boolean
  animalitosRaffleScrutinyRecalculatedCount: number
}

export interface IRaffleResultAnimalitosResponse {
  animalitosLotteryId: number
  animalitosLotteryName: string
  animalitosLotteryFruitCombined: boolean
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
  betReturnedRate: number
  maxOverallAnimalitoBet: number
}

export interface IAnimalitosLotteryGeneralSetting {
  currencyId: number
  currencyName: string
  currencyCode: CurrencyCode
  maxBetByAnimal: number
  maxAnimalsByTicket: number
  maxOverallTripletaBet: number
}

export interface IAnimalitoUpdateSettings {
  currencyCode: CurrencyCode
  betReturnedRate: number
  maxOverallAnimalitoBet: number
}

export interface IAnimalitoUpdateGeneralSettings {
  currencyCode: CurrencyCode
  maxBetByAnimal: number
  maxAnimalsByTicket: number
  maxOverallTripletaBet: number
}

export interface ISettingsAnimalitosResponse {
  lotteryId: number
  lotteryName: string
  animalitosLotterySettings: IAnimalitosLotterySetting[]
}

export interface IGeneralSettingsAnimalitosResponse {
  lotteryId: number
  lotteryName: string
  animalitosLotterySettings: IAnimalitosLotteryGeneralSetting[]
}

export interface IAnimalitosDetailByLottery extends IAnimalDetail {
  animalHasOverallLimit: boolean
  animalitosOverallBetUsdValue: number
  animalitosOverallBetVesValue: number
}

export interface IAnimalitosByLottery {
  animalitosLotteryId: number
  animalitosLotteryName: string
  animalitosMaxOverallUsd: number
  animalitosMaxOverallVes: number
  maxBetByAnimalUsd: number
  maxBetByAnimalVes: number
  animalDetails: IAnimalitosDetailByLottery[]
}

export interface ISetAnimalQuota {
  animalitosAnimalId: number
  animalitosOverallBetUsdValue: number
  animalitosOverallBetVesValue: number
  animalitosLotteryId: number
}

export interface IAllAnimalitosQuotaResponse {
  items: IAnimalitosQuota[]
  totalCount: number
}

export interface IAnimalitosQuota {
  animalitosLotteryId: number
  animalitosLotteryName: string
  animalitosAnimalName: string
  animalitosAnimalId: number
  animalitosOverallBetUsdValue: number
  animalitosOverallBetVesValue: number
}

export interface IDeleteAnimalitosQuota {
  lotteryId: number
  animalitoId: number
}
