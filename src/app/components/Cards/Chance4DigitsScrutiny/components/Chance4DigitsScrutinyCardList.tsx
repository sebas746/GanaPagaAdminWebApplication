import React from 'react'
import clsx from 'clsx'

import Chance4DigitsScrutinyCard from '../Chance4DigitsScrutinyCard'
import {
  IRaffleResultChance4DigitsDetail,
  IRaffleScrutinyChance4DigitsResponse,
} from '../../../../../types/Chance4Digits.types'

interface IChance4DigitsCardListProps {
  addRaffleScrutinyChance4Digits: (raffleId: number) => void
  raffleScrutinyResults: IRaffleScrutinyChance4DigitsResponse[]
  selectedTab: number
  loadingAdd: boolean
  raffleId: number
  onClickScrutinyChance4DigitsDetail: (raffleId: number) => void
}

const Chance4DigitsScrutinyCardList = ({
  addRaffleScrutinyChance4Digits,
  raffleScrutinyResults,
  selectedTab,
  loadingAdd,
  raffleId,
  onClickScrutinyChance4DigitsDetail,
}: IChance4DigitsCardListProps) => {
  const renderResultCard = (raffles: IRaffleResultChance4DigitsDetail[]) =>
    raffles.map((raffle) => {
      const wrapAddRaffleChance4DigitsResult = () =>
        addRaffleScrutinyChance4Digits(raffle.chanceFourRaffleId)
      const wrapOnClickScrutinyChance4DigitsDetail = () =>
        onClickScrutinyChance4DigitsDetail(raffle.chanceFourRaffleId)
      return (
        <div
          className='col-sm-12 col-md-6'
          key={`card-raffle-${raffle.chanceFourRaffleName.split('').join('-')}-${
            raffle.chanceFourRaffleId
          }`}
        >
          <Chance4DigitsScrutinyCard
            raffle={raffle}
            addRaffleScrutinyChance4Digits={wrapAddRaffleChance4DigitsResult}
            loadingAdd={loadingAdd}
            raffleId={raffleId}
            onClickScrutinyChance4DigitsDetail={wrapOnClickScrutinyChance4DigitsDetail}
          />
        </div>
      )
    })

  return (
    <>
      {raffleScrutinyResults.length > 0 &&
        raffleScrutinyResults.map((raffleResult) => (
          <div
            className={clsx('tab-pane', 'fade', {
              show: selectedTab === raffleResult.chanceFourLotteryId,
              active: selectedTab === raffleResult.chanceFourLotteryId,
            })}
            id={`pill-${raffleResult.chanceFourLotteryName.toLowerCase().split(' ').join('-')}`}
            key={`tab-content-${raffleResult.chanceFourLotteryName
              .toLowerCase()
              .split(' ')
              .join('-')}`}
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
        ))}
    </>
  )
}

export default Chance4DigitsScrutinyCardList
