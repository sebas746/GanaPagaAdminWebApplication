import {IAnimalitoUpdateSettings} from '../../types/Animalitos.types'

export const mapAnimalitosSettingsLabel: {[K in keyof IAnimalitoUpdateSettings]?: string} = {
  betReturnedRate: 'Tasa de retorno de la apuesta',
  maxAnimalsByTicket: 'Número máximo de animales por ticket',
  maxBetByAnimal: 'Apuesta total máxima por animal',
  maxOverallAnimalitoBet: 'Cupo de Apuesta por animalito y sorteo',
}
