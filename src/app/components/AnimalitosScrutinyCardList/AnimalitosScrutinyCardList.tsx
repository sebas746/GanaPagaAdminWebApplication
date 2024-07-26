import React from 'react'
import clsx from 'clsx'
import {
  IAnimalDetail,
  IAnimalitosLotteries,
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
  isLoading: boolean
  animalitosLotteries: IAnimalitosLotteries[]
  changeRaffleAnimalitoResult: (
    raffleDetail: IRaffleResultAnimalitosDetail,
    animalitoSelected: string
  ) => Promise<void>
}

const AnimalitosScrutinyCardList = ({
  addRaffleScrutinyAnimalitos,
  raffleScrutinyResults,
  selectedTab,
  loadingAdd,
  raffleId,
  onClickScrutinyAnimalitosDetail,
  isLoading,
  animalitosLotteries,
  changeRaffleAnimalitoResult,
}: IAnimalitosCardListProps) => {
  const renderResultCard = (
    raffles: IRaffleResultAnimalitosDetail[],
    animalOptions: IAnimalDetail[]
  ) =>
    raffles.map((raffle, index) => {
      const wrapAddRaffleAnimalitosResult = () =>
        addRaffleScrutinyAnimalitos(raffle.animalitosRaffleId)
      const wrapOnClickRaffleAnimalitosResult = () =>
        onClickScrutinyAnimalitosDetail(raffle.animalitosRaffleId)
      const wrapRecalculateRaffleAnimalitosResult = (selectedAnimal: string) => {
        changeRaffleAnimalitoResult(raffle, selectedAnimal)
        // setRaffleResultForm()
      }
      const selectedLottery = animalitosLotteries.find((a) => a.lotteryId === selectedTab)
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
            animalOptions={animalOptions}
            selectedLottery={selectedLottery}
            isLoading={isLoading}
            selectedTab={selectedTab}
            wrapRecalculateRaffleAnimalitosResult={wrapRecalculateRaffleAnimalitosResult}
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
              {renderResultCard(
                raffleResult.raffleResultDetailResponse,
                raffleResult.animalDetails
              )}
            </div>
          </div>
        ))}
    </>
  )
}

export default AnimalitosScrutinyCardList
