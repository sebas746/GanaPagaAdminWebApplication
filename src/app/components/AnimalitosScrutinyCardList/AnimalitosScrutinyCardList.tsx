import React from 'react'
import clsx from 'clsx'
import {
  IAnimalDetail,
  IRaffleResultAnimalitosDetail,
  IRaffleScrutinyAnimalitosResponse,
} from '../../../types/Animalitos.types'
import AnimalitosRaffleResultCard from '../Cards/AnimalitosRaffleResult/AnimalitosRaffleResultCard'
import AnimalitosScrutinyCard from '../Cards/AnimalitosScrutiny/AnimalitosScrutinyCard'

interface IAnimalitosCardListProps {
  addRaffleScrutinyAnimalitos: (raffleId: number) => void
  raffleScrutinyResults: IRaffleScrutinyAnimalitosResponse[]
  selectedTab: number
}

const AnimalitosScrutinyCardList = ({
  addRaffleScrutinyAnimalitos,
  raffleScrutinyResults,
  selectedTab,
}: IAnimalitosCardListProps) => {
  const renderResultCard = (raffles: IRaffleResultAnimalitosDetail[]) =>
    raffles.map((raffle) => {
      const wrapAddRaffleAnimalitosResult = () =>
        addRaffleScrutinyAnimalitos(raffle.animalitosRaffleId)
      return (
        <div
          className='col-sm-12 col-md-6'
          key={`card-raffle-${raffle.animalitosRaffleName.split('').join('-')}-${
            raffle.animalitosRaffleId
          }`}
        >
          <AnimalitosScrutinyCard raffle={raffle} addRaffleScrutinyAnimalitos={wrapAddRaffleAnimalitosResult} />
        </div>
      )
    })

  return (
    <>
      {raffleScrutinyResults.map((raffleResult) => (
        <div
          className={clsx('tab-pane', 'fade', {
            show: selectedTab === raffleResult.animalitosLotteryId,
            active: selectedTab === raffleResult.animalitosLotteryId,
          })}
          id={`pill-${raffleResult.animalitosLotteryName.toLowerCase().split(' ').join('-')}`}
          key={`tab-content-${raffleResult.animalitosLotteryName
            .toLowerCase()
            .split(' ')
            .join('-')}`}
          role='tabpanel'
          aria-labelledby={`pills-${raffleResult.animalitosLotteryName
            .toLowerCase()
            .split(' ')
            .join('-')}-tab`}
          tabIndex={0}
        >
          <div className='row row-gap-8'>
            {renderResultCard(raffleResult.raffleResultDetailResponse)}
          </div>
        </div>
      ))}
    </>
  )
}

export default AnimalitosScrutinyCardList
