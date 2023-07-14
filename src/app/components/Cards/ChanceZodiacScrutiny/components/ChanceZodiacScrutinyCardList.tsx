import React from 'react'
import clsx from 'clsx'

import {
  IRaffleResultChanceZodiacDetail,
  IRaffleScrutinyChanceZodiacResponse,
} from '../../../../../types/ChanceZodiac.types'
import ChanceZodiacScrutinyCard from '../ChanceZodiacScrutinyCard'

interface IChanceZodiacCardListProps {
  addRaffleScrutinyChanceZodiac: (raffleId: number) => void
  raffleScrutinyResults: IRaffleScrutinyChanceZodiacResponse[]
  selectedTab: number
  loadingAdd: boolean
  raffleId: number
  onClickScrutinyChanceZodiacDetail: (raffleId: number) => void
}

const ChanceZodiacScrutinyCardList = ({
  addRaffleScrutinyChanceZodiac,
  raffleScrutinyResults,
  selectedTab,
  loadingAdd,
  raffleId,
  onClickScrutinyChanceZodiacDetail,
}: IChanceZodiacCardListProps) => {
  const renderResultCard = (raffles: IRaffleResultChanceZodiacDetail[]) =>
    raffles.map((raffle) => {
      const wrapAddRaffleChanceZodiacResult = () =>
        addRaffleScrutinyChanceZodiac(raffle.chanceZodiacRaffleId)
      const wrapOnClickScrutinyChanceZodiacDetail = () =>
        onClickScrutinyChanceZodiacDetail(raffle.chanceZodiacRaffleId)
      return (
        <div
          className='col-sm-12 col-md-6'
          key={`card-raffle-${raffle.chanceZodiacRaffleName.split('').join('-')}-${
            raffle.chanceZodiacRaffleId
          }`}
        >
          <ChanceZodiacScrutinyCard
            raffle={raffle}
            addRaffleScrutinyChanceZodiac={wrapAddRaffleChanceZodiacResult}
            loadingAdd={loadingAdd}
            raffleId={raffleId}
            onClickScrutinyChanceZodiacDetail={wrapOnClickScrutinyChanceZodiacDetail}
          />
        </div>
      )
    })

  return (
    <>
      {raffleScrutinyResults.map((raffleResult) => (
        <div
          className={clsx('tab-pane', 'fade', {
            show: selectedTab === raffleResult.chanceZodiacLotteryId,
            active: selectedTab === raffleResult.chanceZodiacLotteryId,
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
      ))}
    </>
  )
}

export default ChanceZodiacScrutinyCardList
