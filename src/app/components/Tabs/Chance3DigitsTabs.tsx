import React from 'react'
import clsx from 'clsx'
import {IChance3DigitsLotteries} from '../../../types/Chance3Digits.types'

interface IChance3DigitsTabsProps {
  tabs: IChance3DigitsLotteries[]
  setSelectedTab: (payload: number) => void
  selectedTab: number
}

const Chance3DigitsTabs = ({tabs, setSelectedTab, selectedTab}: IChance3DigitsTabsProps) => {
  return (
    <>
      {tabs.map((lottery) => {
        return (
          <li
            className='nav-item'
            role='presentation'
            key={`chance-3digits-tab-${lottery.lotteryId}`}
          >
            <button
              className={clsx('nav-link', {active: selectedTab === lottery.lotteryId})}
              id={`tab-${lottery.lotteryName.toLowerCase().split(' ').join('-')}-tab`}
              data-bs-toggle='pill'
              data-bs-target={`#tab-${lottery.lotteryName.toLowerCase().split(' ').join('-')}`}
              type='button'
              onClick={() => setSelectedTab(lottery.lotteryId)}
              role='tab'
              aria-controls={`tab-${lottery.lotteryName.toLowerCase().split(' ').join('-')}`}
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

export default Chance3DigitsTabs
