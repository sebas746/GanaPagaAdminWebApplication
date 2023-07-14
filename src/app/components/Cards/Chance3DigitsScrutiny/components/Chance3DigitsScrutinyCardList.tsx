import React from 'react'
import clsx from 'clsx'

import Chance3DigitsScrutinyCard from '../Chance3DigitsScrutinyCard'
import {
  IRaffleResultChance3DigitsDetail,
  IRaffleScrutinyChance3DigitsResponse,
} from '../../../../../types/Chance3Digits.types'

interface IChance3DigitsCardListProps {
  addRaffleScrutinyChance3Digits: (raffleId: number) => void
  raffleScrutinyResults: IRaffleScrutinyChance3DigitsResponse[]
  selectedTab: number
  loadingAdd: boolean
  raffleId: number
  onClickScrutinyChance3DigitsDetail: (raffleId: number) => void
}

const Chance3DigitsScrutinyCardList = ({
  addRaffleScrutinyChance3Digits,
  raffleScrutinyResults,
  selectedTab,
  loadingAdd,
  raffleId,
  onClickScrutinyChance3DigitsDetail,
}: IChance3DigitsCardListProps) => {
  const renderResultCard = (raffles: IRaffleResultChance3DigitsDetail[]) =>
    raffles.map((raffle) => {
      const wrapAddRaffleChance3DigitsResult = () =>
        addRaffleScrutinyChance3Digits(raffle.chanceThreeRaffleId)
      const wrapOnClickRaffleChance3DigitsResult = () =>
        onClickScrutinyChance3DigitsDetail(raffle.chanceThreeRaffleId)
      return (
        <div
          className='col-sm-12 col-md-6'
          key={`card-raffle-${raffle.chanceThreeRaffleName.split('').join('-')}-${
            raffle.chanceThreeRaffleId
          }`}
        >
          <Chance3DigitsScrutinyCard
            raffle={raffle}
            addRaffleScrutinyChance3Digits={wrapAddRaffleChance3DigitsResult}
            loadingAdd={loadingAdd}
            raffleId={raffleId}
            onClickScrutinyChance3DigitsDetail={wrapOnClickRaffleChance3DigitsResult}
          />
        </div>
      )
    })

  return (
    <>
      {raffleScrutinyResults.map((raffleResult) => (
        <div
          className={clsx('tab-pane', 'fade', {
            show: selectedTab === raffleResult.chanceThreeLotteryId,
            active: selectedTab === raffleResult.chanceThreeLotteryId,
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
      ))}
    </>
  )
}

export default Chance3DigitsScrutinyCardList
