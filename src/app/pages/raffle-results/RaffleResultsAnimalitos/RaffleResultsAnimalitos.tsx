import React, {useMemo} from 'react'
import RaffleResultForm from '../../../components/Forms/RaffleResultForm/RaffleResultForm'
import RaffleResultCard from '../../../components/Cards/RaffleResultCard/RaffleResultCard'
import {useRaffleResultsAnimalitos} from './RaffleResultsAnimalitos.hook'
import clsx from 'clsx'
import {IAnimalDetail, IRaffleResultAnimalitosDetail} from '../../../../types/Animalitos.types'

const RaffleResultsAnimalitos = () => {
  const {raffleResultState, isLoading, setSelectedTab, setRaffleResultForm, changeRaffleAnimalitoResult} =
    useRaffleResultsAnimalitos()

  const renderAnimalitosTabs = useMemo(() => {
    return raffleResultState.animalitosLotteries.map((lottery) => {
      return (
        <li className='nav-link' role='presentation' key={`animalitos-tab-${lottery.lotteryId}`}>
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
  }, [raffleResultState.animalitosLotteries])

  const renderResultCard = (raffles: IRaffleResultAnimalitosDetail[], animalOptions: IAnimalDetail[]) =>
    raffles.map((raffle) => {
      const wrapAddRaffleAnimalitosResult = (selectedAnimal: string) => changeRaffleAnimalitoResult(raffle, selectedAnimal)
      return (
        <div
          className='col-sm-12 col-md-4'
          key={`card-raffle-${raffle.animalitosRaffleName.split('').join('-')}-${
            raffle.animalitosRaffleId
          }`}
        >
          <RaffleResultCard
            raffle={raffle}
            animalOptions={animalOptions}
            addRaffleAnimalitosResult={wrapAddRaffleAnimalitosResult}
          />
        </div>
      )
    })

  const renderAnimalitosTabContent = () =>
    raffleResultState.raffleResultsByLottery.map((raffleResult) => (
      <div
        className={clsx('tab-pane', 'fade', {
          show: raffleResultState.selectedTab === raffleResult.animalitosLotteryId,
          active: raffleResultState.selectedTab === raffleResult.animalitosLotteryId,
        })}
        id={`pill-${raffleResult.animalitosLotteryName.toLowerCase().split(' ').join('-')}`}
        key={`tab-content-${raffleResult.animalitosLotteryName.toLowerCase().split(' ').join('-')}`}
        role='tabpanel'
        aria-labelledby={`pills-${raffleResult.animalitosLotteryName
          .toLowerCase()
          .split(' ')
          .join('-')}-tab`}
        tabIndex={0}
      >
        <div className='row row-gap-8'>
          {renderResultCard(raffleResult.raffleResultDetailResponse, raffleResult.animalDetails)}
        </div>
      </div>
    ))

  if (isLoading) {
    return (
      <div className='spinner-border' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
    )
  }
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
          {renderAnimalitosTabs}
        </ul>
      </div>
      <div className='tab-content' id='pills-tabContent'>
        {renderAnimalitosTabContent()}
      </div>
    </div>
  )
}

export default RaffleResultsAnimalitos
