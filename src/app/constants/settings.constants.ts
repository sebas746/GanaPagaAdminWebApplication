import {
  IAnimalitoUpdateGeneralSettings,
  IAnimalitoUpdateSettings,
} from '../../types/Animalitos.types'
import { IChance3DigitsUpdateSettings } from '../../types/Chance3Digits.types'
import { IChance4DigitsUpdateSettings } from '../../types/Chance4Digits.types'
import { IChanceZodiacUpdateSettings } from '../../types/ChanceZodiac.types'

export const mapAnimalitosSettingsLabel: { [K in keyof IAnimalitoUpdateSettings]?: string } = {
  betReturnedRate: 'Tasa de retorno de la apuesta',
  maxOverallAnimalitoBet: 'Cupo máximo de Apuesta por animalito y sorteo',
}

export const mapAnimalitosGeneralSettingsLabel: {
  [K in keyof IAnimalitoUpdateGeneralSettings]?: string
} = {
  maxAnimalsByTicket: 'Número máximo de animales por ticket',
  maxBetByAnimal: 'Apuesta total máxima por animal',
}

export const animalitosSettingsLimits = {
  maxBetReturnedRate: 10000,
  minBetReturnedRate: 1,
  maxAnimalsByTicket: 30,
  minAnimalsByTicket: 1,
  maxBetByAnimal: 1000000,
  minBetByAnimal: 1,
  maxOverallAnimalitoBet: 1000000,
  minOverallAnimalitoBet: 1,
  numericValue: 'El campo debe ser númerico',
}

export const mapChance4DigitsSettingsLabel: { [K in keyof IChance4DigitsUpdateSettings]?: string } = {
  maxBetByChance: 'Apuesta máxima por número',
  betReturnedRate2Digits: 'Tasa de retorno apuesta 2 cifras',
  betReturnedRate3Digits: 'Tasa de retorno apuesta 3 cifras',
  betReturnedRate4Digits: 'Tasa de retorno apuesta 4 cifras',
  maxOverallChanceBet: 'Cupo máximo de apuesta por número y sorteo',
}

export const mapChance3DigitsSettingsLabel: { [K in keyof IChance3DigitsUpdateSettings]?: string } = {
  maxBetByChance: 'Apuesta máxima por número',
  betReturnedRate2Digits: 'Tasa de retorno apuesta 2 cifras',
  betReturnedRate3Digits: 'Tasa de retorno apuesta 3 cifras',
  maxOverallChanceBet: 'Cupo máximo de apuesta por número y sorteo',
  maxDigitsByBet: 'Máximo de digitos por apuesta',
  minDigitsByBet: 'Mínimo de dígitos por apuesta',
}

export const mapChanceZodiacSettingsLabel: { [K in keyof IChanceZodiacUpdateSettings]?: string } = {
  maxBetByChance: 'Apuesta máxima por número',
  betReturnedRate2Digits: 'Tasa de retorno apuesta 2 cifras',
  betReturnedRate3Digits: 'Tasa de retorno apuesta 3 cifras',
  maxOverallChanceBet: 'Cupo máximo de apuesta por número y sorteo',
  maxDigitsByBet: 'Máximo de digitos por apuesta',
  minDigitsByBet: 'Mínimo de dígitos por apuesta',
}

export const chance3DigitsSettingsLimits = {
  maxBetByChance: 1000000,
  minBetByChance: 1,
  maxBetReturnedRate2Digits: 500,
  minBetReturnedRate2Digits: 1,
  maxBetReturnedRate3Digits: 5000,
  minBetReturnedRate3Digits: 1,
  maxOverallChanceBet: 1000000,
  minOverallChanceBet: 1,
  maxDigitsByBet: 3,
  minDigitsByBet: 2,
  numericValue: 'El campo debe ser númerico',
}

export const chanceZodiacSettingsLimits = {
  maxBetByChance: 1000000,
  minBetByChance: 1,
  maxBetReturnedRate2Digits: 500,
  minBetReturnedRate2Digits: 1,
  maxBetReturnedRate3Digits: 5000,
  minBetReturnedRate3Digits: 1,
  maxOverallChanceBet: 1000000,
  minOverallChanceBet: 1,
  maxDigitsByBet: 3,
  minDigitsByBet: 2,
  numericValue: 'El campo debe ser númerico',
}

export const chance4DigitsSettingsLimits = {
  maxBetByChance: 1000000,
  minBetByChance: 1,
  maxBetReturnedRate2Digits: 500,
  minBetReturnedRate2Digits: 1,
  maxBetReturnedRate3Digits: 5000,
  minBetReturnedRate3Digits: 1,
  maxBetReturnedRate4Digits: 50000,
  minBetReturnedRate4Digits: 1,
  maxOverallChanceBet: 1000000,
  minOverallChanceBet: 1,
  maxDigitsByBet: 4,
  minDigitsByBet: 2,
  numericValue: 'El campo debe ser númerico',
}

export const urls = {
  logoFolder: process.env.REACT_APP_USERS_ENDPOINT_BASE_URL
}
