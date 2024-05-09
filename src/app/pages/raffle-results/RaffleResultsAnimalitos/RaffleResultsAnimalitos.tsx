import React from 'react'
import RaffleResultForm from '../../../components/Forms/RaffleResultForm/RaffleResultForm'
import {useRaffleResultsAnimalitos} from './RaffleResultsAnimalitos.hook'
import clsx from 'clsx'
import {IAnimalDetail, IRaffleResultAnimalitosDetail} from '../../../../types/Animalitos.types'
import AnimalitosRaffleResultCard from '../../../components/Cards/AnimalitosRaffleResult/AnimalitosRaffleResultCard'
import AnimalitosTabs from '../../../components/Tabs/AnimalitosTabs'
import ConditionalRedering from '../../../helpers/ConditionalRedering'

const RaffleResultsAnimalitos = () => {
  const {
    animalitosLotteriesState,
    raffleResultState,
    isLoading,
    setSelectedTab,
    setRaffleResultForm,
    changeRaffleAnimalitoResult,
    isLoadingState,
    createdBy,
  } = useRaffleResultsAnimalitos()

  const selectedLottery = animalitosLotteriesState.animalitosLotteries.find(
    (a) => a.lotteryId === raffleResultState.selectedTab
  )

  const renderResultCard = (
    raffles: IRaffleResultAnimalitosDetail[],
    animalOptions: IAnimalDetail[]
  ) =>
    raffles.map((raffle, index) => {
      const wrapAddRaffleAnimalitosResult = (selectedAnimal: string) =>
        changeRaffleAnimalitoResult(raffle, selectedAnimal)
      return (
        <div
          className='col-sm-12 col-md-6'
          key={`card-raffle-${raffle.animalitosRaffleName.split('').join('-')}-${
            raffle.animalitosRaffleId
          }-${index}`}
        >
          <AnimalitosRaffleResultCard
            raffle={raffle}
            animalOptions={animalOptions}
            addRaffleAnimalitosResult={wrapAddRaffleAnimalitosResult}
            isLoadingState={isLoadingState}
            createdBy={createdBy ?? ''}
            selectedLottery={selectedLottery}
          />
        </div>
      )
    })

  const renderAnimalitosTabContent = () =>
    raffleResultState.raffleResultsByLottery.map((raffleResult, index) => (
      <div
        className={clsx('tab-pane', 'fade', {
          show: raffleResultState.selectedTab === raffleResult.animalitosLotteryId,
          active: raffleResultState.selectedTab === raffleResult.animalitosLotteryId,
        })}
        id={`pill-${raffleResult.animalitosLotteryName.toLowerCase().split(' ').join('-')}`}
        key={`tab-content-${raffleResult.animalitosLotteryName
          .toLowerCase()
          .split(' ')
          .join('-')}-${index}`}
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

  return (
    <div className='container-fluid'>
      <div className='mb-10'>
        <div className='mb-10'>
          <RaffleResultForm
            raffleFormState={raffleResultState.raffleResultForm}
            setRaffleForm={setRaffleResultForm}
            isLoading={isLoading}
          />
        </div>

        <ul
          className='nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6'
          id='pills-tab'
          role='tablist'
        >
          <ConditionalRedering isTrue={!isLoading}>
            <AnimalitosTabs
              tabs={animalitosLotteriesState.animalitosLotteries}
              setSelectedTab={setSelectedTab}
              selectedTab={raffleResultState.selectedTab}
            />
          </ConditionalRedering>
        </ul>
      </div>
      <div className='tab-content' id='pills-tabContent'>
        {!isLoading && renderAnimalitosTabContent()}
      </div>
    </div>
  )
}

export default RaffleResultsAnimalitos
