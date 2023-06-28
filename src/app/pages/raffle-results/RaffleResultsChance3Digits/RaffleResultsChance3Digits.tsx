import React, {useMemo} from 'react'
import RaffleResultForm from '../../../components/Forms/RaffleResultForm/RaffleResultForm'
import {useRaffleResultsChance3Digits} from './RaffleResultsChance3Digits.hook'
import clsx from 'clsx'
import {IRaffleResultChance3DigitsDetail} from '../../../../types/Chance3Digits.types'
import Chance3DigitsRaffleResultCard from '../../../components/Cards/Chance3Digits/Chance3DigitsRaffleResultCard'

const RaffleResultsChance3Digits = () => {
  const {
    raffleResultState,
    isLoadingChance3,
    setSelectedTab,
    setRaffleResultForm,
    changeRaffleChance3DigitsResult,
    isLoadingStateChance3,
    createdBy,
  } = useRaffleResultsChance3Digits()

  const renderChance3DigitsTabs = useMemo(() => {
    return raffleResultState.chance3DigitsLotteries.map((lottery) => {
      return (
        <li className='nav-link' role='presentation' key={`chance3Digits-tab-${lottery.lotteryId}`}>
          <button
            className={clsx('nav-link', {active: 1 === lottery.lotteryId})}
            id={`pills-${lottery.lotteryName.toLowerCase().split(' ').join('-')}-tab`}
            data-bs-toggle='pill'
            data-bs-target={`#pills-${lottery.lotteryName.toLowerCase().split(' ').join('-')}`}
            type='button'
            onClick={() => setSelectedTab(lottery.lotteryId)}
            role='tab'
            aria-controls={`pills-${lottery.lotteryName.toLowerCase().split(' ').join('-')}`}
            aria-selected='true'
          >
            {lottery.lotteryName}
          </button>
        </li>
      )
    })
  }, [raffleResultState.chance3DigitsLotteries])

  const renderResultCard = (raffles: IRaffleResultChance3DigitsDetail[]) =>
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
        key={`tab-content-${raffleResult.chanceThreeLotteryName
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
          />
        </div>

        <ul
          className='nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6'
          id='pills-tab'
          role='tablist'
        >
          {!isLoadingChance3 && renderChance3DigitsTabs}
        </ul>
      </div>
      <div className='tab-content' id='pills-tabContent'>
        {!isLoadingChance3 && renderChance3DigitsTabContent()}
      </div>
    </div>
  )
}

export default RaffleResultsChance3Digits
