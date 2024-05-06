import React from 'react'
import clsx from 'clsx'
import {
  IAnimalDetail,
  IRaffleResultAnimalitosDetail,
  IRaffleScrutinyAnimalitosResponse,
} from '../../../types/Animalitos.types'
import AnimalitosScrutinyCard from '../Cards/AnimalitosScrutiny/AnimalitosScrutinyCard'

interface IAnimalitosCardListProps {
  addRaffleScrutinyAnimalitos: (raffleId: number) => void
  raffleScrutinyResults: IRaffleScrutinyAnimalitosResponse[]
  selectedTab: number
  loadingAdd: boolean
  raffleId: number
  onClickScrutinyAnimalitosDetail: (raffleId: number) => void
}

const AnimalitosScrutinyCardList = ({
  addRaffleScrutinyAnimalitos,
  raffleScrutinyResults,
  selectedTab,
  loadingAdd,
  raffleId,
  onClickScrutinyAnimalitosDetail,
}: IAnimalitosCardListProps) => {
  const renderResultCard = (raffles: IRaffleResultAnimalitosDetail[]) =>
    raffles.map((raffle, index) => {
      const wrapAddRaffleAnimalitosResult = () =>
        addRaffleScrutinyAnimalitos(raffle.animalitosRaffleId)
      const wrapOnClickRaffleAnimalitosResult = () =>
        onClickScrutinyAnimalitosDetail(raffle.animalitosRaffleId)

      return (
        <div
          className='col-sm-12 col-md-6'
          key={`card-raffle-${raffle.animalitosRaffleName.split('').join('-')}-${
            raffle.animalitosRaffleId
          }-${index}`}
        >
          <AnimalitosScrutinyCard
            raffle={raffle}
            addRaffleScrutinyAnimalitos={wrapAddRaffleAnimalitosResult}
            loadingAdd={loadingAdd}
            raffleId={raffleId}
            onClickScrutinyAnimalitosDetail={wrapOnClickRaffleAnimalitosResult}
          />
        </div>
      )
    })

  return (
    <>
      {raffleScrutinyResults.length > 0 &&
        raffleScrutinyResults.map((raffleResult, index) => (
          <div
            className={clsx('tab-pane', 'fade', {
              show: selectedTab === raffleResult.animalitosLotteryId,
              active: selectedTab === raffleResult.animalitosLotteryId,
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
              {renderResultCard(raffleResult.raffleResultDetailResponse)}
            </div>
          </div>
        ))}
    </>
  )
}

export default AnimalitosScrutinyCardList
