import React from 'react'
import clsx from 'clsx'
import {IChance4DigitsLotteries} from '../../../types/Chance4Digits.types'

interface IChance4DigitsTabsProps {
  tabs: IChance4DigitsLotteries[]
  setSelectedTab: (payload: number) => void
  selectedTab: number
}

const Chance4DigitsTabs = ({tabs, setSelectedTab, selectedTab}: IChance4DigitsTabsProps) => {
  return (
    <>
      {tabs.map((lottery) => {
        return (
          <li
            className='nav-link'
            role='presentation'
            key={`chance-4digits-tab-${lottery.lotteryId}`}
          >
            <button
              className={clsx('nav-link', {active: selectedTab === lottery.lotteryId})}
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
      })}
    </>
  )
}

export default Chance4DigitsTabs
