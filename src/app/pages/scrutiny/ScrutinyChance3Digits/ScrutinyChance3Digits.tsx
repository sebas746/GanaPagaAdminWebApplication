import React from 'react'
import {useScrutinyChance3Digits} from './ScrutinyChance3Digits.hook'
import Chance3DigitsTabs from '../../../components/Tabs/Chance3DigitsTabs'
import ScrutinyForm from '../../../components/Forms/ScrutinyForm/ScrutinyForm'
import ConditionalRedering from '../../../helpers/ConditionalRedering'
import Chance3DigitsScrutinyCardList from '../../../components/Cards/Chance3DigitsScrutiny/components/Chance3DigitsScrutinyCardList'

const ScrutinyChance3Digits = () => {
  const {
    raffleScrutinyState,
    chance3DigitsLotteries,
    hasError,
    setScrutinyForm,
    setScrutinyResults,
    setScrutinyResultsByLottery,
    setIsLoadingScrutinyResults,
    isLoading,
    setSelectedTab,
    addRaffleScrutinyChance3Digits,
    loadingAdd,
  } = useScrutinyChance3Digits()

  return (
    <div className='container-fluid'>
      <div className='mb-10'>
        <div className='mb-10'>
          <ScrutinyForm
            raffleFormState={raffleScrutinyState.raffleResultForm}
            setRaffleForm={setScrutinyForm}
            loading={isLoading}
          />
        </div>
        <ul
          className='nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6'
          id='pills-tab'
          role='tablist'
        >
          <ConditionalRedering isTrue={!isLoading}>
            <Chance3DigitsTabs
              tabs={chance3DigitsLotteries}
              setSelectedTab={setSelectedTab}
              selectedTab={raffleScrutinyState.selectedTab}
            />
          </ConditionalRedering>
        </ul>
      </div>
      <div className='tab-content' id='pills-tabContent'>
        <ConditionalRedering isTrue={!isLoading}>
          <Chance3DigitsScrutinyCardList
            addRaffleScrutinyChance3Digits={addRaffleScrutinyChance3Digits}
            raffleScrutinyResults={raffleScrutinyState.raffleResultsByLottery}
            selectedTab={raffleScrutinyState.selectedTab}
            loadingAdd={loadingAdd}
            raffleId={raffleScrutinyState.Chance3DigitsRaffleId}
          />
        </ConditionalRedering>
      </div>
    </div>
  )
}

export default ScrutinyChance3Digits
