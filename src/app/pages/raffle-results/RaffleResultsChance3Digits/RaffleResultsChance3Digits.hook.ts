import {RaffleResultsForm} from '../../../../types/Forms.types'

enum RaffleResultsChance3DigitsKind{
  SET_RAFFLE_RESULTS_CHANCE_3_DIGITS = 'SET_RAFFLE_RESULTS_CHANCE_3_DIGITS',
  SET_IS_LOADING_RAFFLE_RESULTS_CHANCE_3_DIGITS = 'SET_IS_LOADING_RAFFLE_RESULTS_CHANCE_3_DIGITS',
  SET_RAFFLE_FORM = 'SET_RAFFLE_FORM',
  SET_SELECTED_TAB = 'SET_SELECTED_TAB',
  SET_RAFFLE_RESULTS_BY_LOTTERY = 'SET_RAFFLE_RESULTS_BY_LOTTERY',
}

interface RaffleResultsChance3DigitsAction {
  type: RaffleResultsChance3DigitsKind
  payload: boolean | number | RaffleResultsForm
}

interface RaffleResultsChance3DigitsState {}

export const useRaffleResultsChance3Digits = () => {};