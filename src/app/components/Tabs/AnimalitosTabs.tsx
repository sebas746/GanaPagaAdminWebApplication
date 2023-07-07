import React from 'react'
import clsx from 'clsx'
import {IAnimalitosLotteries} from '../../../types/Animalitos.types'

interface IAnimalitosTabsProps {
  tabs: IAnimalitosLotteries[]
  setSelectedTab: (payload: number) => void
  selectedTab: number
}

const AnimalitosTabs = ({tabs, setSelectedTab, selectedTab}: IAnimalitosTabsProps) => {
  return (
    <>
      {tabs.map((lottery) => {
        return (
          <li className='nav-link' role='presentation' key={`animalitos-tab-${lottery.lotteryId}`}>
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

export default AnimalitosTabs
