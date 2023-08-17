import React from 'react'
import clsx from 'clsx'
import {IChanceZodiacLotteries} from '../../../types/ChanceZodiac.types'

interface IChanceZodiacTabsProps {
  tabs: IChanceZodiacLotteries[]
  setSelectedTab: (payload: number) => void
  selectedTab: number
}

const ChanceZodiacTabs = ({tabs, setSelectedTab, selectedTab}: IChanceZodiacTabsProps) => {
  return (
    <>
      {tabs.map((lottery) => {
        return (
          <li
            className='nav-item'
            role='presentation'
            key={`chance-zodiac-tab-${lottery.lotteryId}`}
          >
            <button
              className={clsx('nav-link', {active: selectedTab === lottery.lotteryId})}
              id={`tab-${lottery.lotteryName.toLowerCase().split(' ').join('-')}-tab`}
              data-bs-toggle='tab'
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

export default ChanceZodiacTabs
