import React, {useMemo} from 'react'
import RaffleResultForm from '../../../components/Forms/RaffleResultForm/RaffleResultForm'
import RaffleResultCard from '../../../components/Cards/Animalitos/AnimalitosRaffleResultCard'
import {useRaffleResultsChance3Digits} from './RaffleResultsChance3Digits.hook'
import clsx from 'clsx'
import {
  IAnimalDetail,
  IRaffleResultChance3DigitsDetail,
} from '../../../../types/Chance3Digits.types'

const RaffleResultsChance3Digits = () => {
  const {
    raffleResultState,
    isLoading,
    setSelectedTab,
    setRaffleResultForm,
    changeRaffleAnimalitoResult,
    isLoadingState,
    createdBy,
  } = useRaffleResultsChance3Digits()

  const renderChance3DigitsTabs = useMemo(() => {
    return raffleResultState.Chance3DigitsLotteries.map((lottery) => {
      return (
        <li className='nav-link' role='presentation' key={`Chance3Digits-tab-${lottery.lotteryId}`}>
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
  }, [raffleResultState.Chance3DigitsLotteries])

  const renderResultCard = (
    raffles: IRaffleResultChance3DigitsDetail[],
    animalOptions: IAnimalDetail[]
  ) =>
    raffles.map((raffle) => {
      const wrapAddRaffleChance3DigitsResult = (selectedAnimal: string) =>
        changeRaffleAnimalitoResult(raffle, selectedAnimal)
      return (
        <div
          className='col-sm-12 col-md-6'
          key={`card-raffle-${raffle.Chance3DigitsRaffleName.split('').join('-')}-${
            raffle.Chance3DigitsRaffleId
          }`}
        >
          <RaffleResultCard
            raffle={raffle}
            animalOptions={animalOptions}
            addRaffleChance3DigitsResult={wrapAddRaffleChance3DigitsResult}
            isLoadingState={isLoadingState}
            createdBy={createdBy ?? ''}
          />
        </div>
      )
    })

  const renderChance3DigitsTabContent = () =>
    raffleResultState.raffleResultsByLottery.map((raffleResult) => (
      <div
        className={clsx('tab-pane', 'fade', {
          show: raffleResultState.selectedTab === raffleResult.Chance3DigitsLotteryId,
          active: raffleResultState.selectedTab === raffleResult.Chance3DigitsLotteryId,
        })}
        id={`pill-${raffleResult.Chance3DigitsLotteryName.toLowerCase().split(' ').join('-')}`}
        key={`tab-content-${raffleResult.Chance3DigitsLotteryName.toLowerCase()
          .split(' ')
          .join('-')}`}
        role='tabpanel'
        aria-labelledby={`pills-${raffleResult.Chance3DigitsLotteryName.toLowerCase()
          .split(' ')
          .join('-')}-tab`}
        tabIndex={0}
      >
        <div className='row row-gap-8'>
          {renderResultCard(raffleResult.raffleResultDetailResponse, raffleResult.animalDetails)}
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
          {!isLoading && renderChance3DigitsTabs}
        </ul>
      </div>
      <div className='tab-content' id='pills-tabContent'>
        {!isLoading && renderChance3DigitsTabContent()}
      </div>
    </div>
  )
}

export default RaffleResultsChance3Digits
