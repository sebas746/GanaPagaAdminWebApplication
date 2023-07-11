import React, {useMemo} from 'react'
import RaffleResultForm from '../../../components/Forms/RaffleResultForm/RaffleResultForm'
import clsx from 'clsx'
import {IRaffleResultChanceZodiacDetail} from '../../../../types/ChanceZodiac.types'
import {useRaffleResultsChanceZodiac} from './RaffleResultsChanceZodiacal.hook'
import ChanceZodiacRaffleResultCard from '../../../components/Cards/ChanceZodiacRaffleResult/ChanceZodiacRaffleResultCard'
import ConditionalRedering from '../../../helpers/ConditionalRedering'
import ChanceZodiacTabs from '../../../components/Tabs/ChanceZodiacTabs'

const RaffleResultsChanceZodiac = () => {
  const {
    raffleResultState,
    chanceZodiacLotteriesState,
    isLoadingChanceZodiac,
    setSelectedTab,
    setRaffleResultForm,
    changeRaffleChanceZodiacResult,
    isLoadingStateChanceZodiac,
    createdBy,
  } = useRaffleResultsChanceZodiac()

  const renderResultCard = (raffles: IRaffleResultChanceZodiacDetail[]) =>
    raffles.map((raffle) => {
      const wrapAddRaffleChanceZodiacResult = (resultValue: string, starSignId: number) =>
        changeRaffleChanceZodiacResult(raffle, resultValue, starSignId)
      return (
        <div
          className='col-sm-12 col-md-6'
          key={`card-ChanceZodiac-raffle-${raffle.chanceZodiacRaffleName.split('').join('-')}-${
            raffle.chanceZodiacRaffleId
          }`}
        >
          <ChanceZodiacRaffleResultCard
            raffle={raffle}
            addRaffleChanceZodiacResult={wrapAddRaffleChanceZodiacResult}
            isLoadingState={isLoadingStateChanceZodiac}
            createdBy={createdBy ?? ''}
          />
        </div>
      )
    })

  const renderChanceZodiacTabContent = () =>
    raffleResultState.raffleResultsByLottery.map((raffleResult) => (
      <div
        className={clsx('tab-pane', 'fade', {
          show: raffleResultState.selectedTab === raffleResult.chanceZodiacLotteryId,
          active: raffleResultState.selectedTab === raffleResult.chanceZodiacLotteryId,
        })}
        id={`pill-${raffleResult.chanceZodiacLotteryName.toLowerCase().split(' ').join('-')}`}
        key={`tab-content-${raffleResult.chanceZodiacLotteryName
          .toLowerCase()
          .split(' ')
          .join('-')}`}
        role='tabpanel'
        aria-labelledby={`pills-${raffleResult.chanceZodiacLotteryName
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
            isLoading={isLoadingChanceZodiac}
          />
        </div>

        <ul
          className='nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6'
          id='pills-tab'
          role='tablist'
        >
          <ConditionalRedering isTrue={!isLoadingChanceZodiac}>
            <ChanceZodiacTabs
              tabs={chanceZodiacLotteriesState.chanceZodiacLotteries}
              setSelectedTab={setSelectedTab}
              selectedTab={raffleResultState.selectedTab}
            />
          </ConditionalRedering>
        </ul>
      </div>
      <div className='tab-content' id='pills-tabContent'>
        {!isLoadingChanceZodiac && renderChanceZodiacTabContent()}
      </div>
    </div>
  )
}

export default RaffleResultsChanceZodiac
