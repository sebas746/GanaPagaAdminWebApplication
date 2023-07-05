import React, {useMemo} from 'react'
import RaffleResultForm from '../../../components/Forms/RaffleResultForm/RaffleResultForm'
import {useRaffleResultsChance3Digits} from './RaffleResultsChance3Digits.hook'
import clsx from 'clsx'
import {IRaffleResultChance3DigitsDetail} from '../../../../types/Chance3Digits.types'
import Chance3DigitsRaffleResultCard from '../../../components/Cards/Chance3Digits/Chance3DigitsRaffleResultCard'
import Chance3DigitsTabs from '../../../components/Tabs/Chance3DigitsTabs'
import ConditionalRedering from '../../../helpers/ConditionalRedering'

const RaffleResultsChance3Digits = () => {
  const {
    raffleResultState,
    chance3DigitsLotteriesState,
    isLoadingChance3,
    setSelectedTab,
    setRaffleResultForm,
    changeRaffleChance3DigitsResult,
    isLoadingStateChance3,
    createdBy,
  } = useRaffleResultsChance3Digits()

  const renderResultCard = (raffles: IRaffleResultChance3DigitsDetail[], maxDigitsByBet: number) =>
    raffles.map((raffle) => {
      const wrapAddRaffleChance3DigitsResult = (resultValue: string) =>
        changeRaffleChance3DigitsResult(raffle, resultValue)
      return (
        <div
          className='col-sm-12 col-md-6'
          key={`card-chance3digits-raffle-${raffle.chanceThreeRaffleName.split('').join('-')}-${
            raffle.chanceThreeRaffleId
          }`}
        >
          <Chance3DigitsRaffleResultCard
            raffle={raffle}
            addRaffleChance3DigitsResult={wrapAddRaffleChance3DigitsResult}
            isLoadingState={isLoadingStateChance3}
            createdBy={createdBy ?? ''}
            maxDigitsByBet={maxDigitsByBet}
          />
        </div>
      )
    })

  const renderChance3DigitsTabContent = () =>
    raffleResultState.raffleResultsByLottery.map((raffleResult) => (
      <div
        className={clsx('tab-pane', 'fade', {
          show: raffleResultState.selectedTab === raffleResult.chanceThreeLotteryId,
          active: raffleResultState.selectedTab === raffleResult.chanceThreeLotteryId,
        })}
        id={`pill-${raffleResult.chanceThreeLotteryName.toLowerCase().split(' ').join('-')}`}
        key={`tab-content-chance3-${raffleResult.chanceThreeLotteryName
          .toLowerCase()
          .split(' ')
          .join('-')}`}
        role='tabpanel'
        aria-labelledby={`pills-${raffleResult.chanceThreeLotteryName
          .toLowerCase()
          .split(' ')
          .join('-')}-tab`}
        tabIndex={0}
      >
        <div className='row row-gap-8'>
          {renderResultCard(
            raffleResult.raffleResultDetailResponse,
            raffleResult.chanceThreeLotteryMaxDigitsByBet
          )}
        </div>
      </div>
    ))

  return (
    <div className='container-fluid'>
      <div className='mb-10'>
        <div className='mb-10'>
          <RaffleResultForm
            raffleFormState={raffleResultState.raffleResultForm}
            setRaffleForm={setRaffleResultForm}
            isLoading={isLoadingChance3}
          />
        </div>

        <ul
          className='nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6'
          id='pills-tab'
          role='tablist'
        >
          <ConditionalRedering isTrue={!isLoadingChance3}>
            <Chance3DigitsTabs
              tabs={chance3DigitsLotteriesState.chance3DigitsLotteries}
              setSelectedTab={setSelectedTab}
              selectedTab={raffleResultState.selectedTab}
            />
          </ConditionalRedering>
        </ul>
      </div>
      <div className='tab-content' id='pills-tabContent'>
        {!isLoadingChance3 && renderChance3DigitsTabContent()}
      </div>
    </div>
  )
}

export default RaffleResultsChance3Digits
