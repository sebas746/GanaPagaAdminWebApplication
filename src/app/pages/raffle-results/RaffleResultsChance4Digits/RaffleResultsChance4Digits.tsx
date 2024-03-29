import React, {useMemo} from 'react'
import RaffleResultForm from '../../../components/Forms/RaffleResultForm/RaffleResultForm'
import {useRaffleResultsChance4Digits} from './RaffleResultsChance4Digits.hook'
import clsx from 'clsx'
import {IRaffleResultChance4DigitsDetail} from '../../../../types/Chance4Digits.types'
import Chance4DigitsRaffleResultCard from '../../../components/Cards/Chance4DigitsRaffleResult/Chance4DigitsRaffleResultCard'
import ConditionalRedering from '../../../helpers/ConditionalRedering'
import Chance4DigitsTabs from '../../../components/Tabs/Chance4DigitsTabs'

const RaffleResultsChance4Digits = () => {
  const {
    raffleResultState,
    chance4DigitsLotteriesState,
    isLoadingChance4,
    setSelectedTab,
    setRaffleResultForm,
    changeRaffleChance4DigitsResult,
    isLoadingStateChance4,
    createdBy,
  } = useRaffleResultsChance4Digits()

  const renderResultCard = (raffles: IRaffleResultChance4DigitsDetail[]) =>
    raffles.map((raffle) => {
      const wrapAddRaffleChance4DigitsResult = (resultValue: string) =>
        changeRaffleChance4DigitsResult(raffle, resultValue)
      return (
        <div
          className='col-sm-12 col-md-6'
          key={`card-Chance4Digits-raffle-${raffle.chanceFourRaffleName.split('').join('-')}-${
            raffle.chanceFourRaffleId
          }`}
        >
          <Chance4DigitsRaffleResultCard
            raffle={raffle}
            addRaffleChance4DigitsResult={wrapAddRaffleChance4DigitsResult}
            isLoadingState={isLoadingStateChance4}
            createdBy={createdBy ?? ''}
          />
        </div>
      )
    })

  const renderChance4DigitsTabContent = () =>
    raffleResultState.raffleResultsByLottery.map((raffleResult) => (
      <div
        className={clsx('tab-pane', 'fade', {
          show: raffleResultState.selectedTab === raffleResult.chanceFourLotteryId,
          active: raffleResultState.selectedTab === raffleResult.chanceFourLotteryId,
        })}
        id={`pill-${raffleResult.chanceFourLotteryName.toLowerCase().split(' ').join('-')}`}
        key={`tab-content-${raffleResult.chanceFourLotteryName.toLowerCase().split(' ').join('-')}`}
        role='tabpanel'
        aria-labelledby={`pills-${raffleResult.chanceFourLotteryName
          .toLowerCase()
          .split(' ')
          .join('-')}-tab`}
        tabIndex={0}
      >
        <div className='row row-gap-8'>
          {renderResultCard(raffleResult.raffleResultDetailResponse)}
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
            isLoading={isLoadingChance4}
          />
        </div>

        <ul
          className='nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6'
          id='pills-tab'
          role='tablist'
        >
          <ConditionalRedering isTrue={!isLoadingChance4}>
            <Chance4DigitsTabs
              tabs={chance4DigitsLotteriesState.chance4DigitsLotteries}
              setSelectedTab={setSelectedTab}
              selectedTab={raffleResultState.selectedTab}
            />
          </ConditionalRedering>
        </ul>
      </div>
      <div className='tab-content' id='pills-tabContent'>
        {!isLoadingChance4 && renderChance4DigitsTabContent()}
      </div>
    </div>
  )
}

export default RaffleResultsChance4Digits
