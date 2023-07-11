import React from 'react'
import {useScrutinyChance4Digits} from './ScrutinyChance4Digits.hook'
import Chance4DigitsTabs from '../../../components/Tabs/Chance4DigitsTabs'
import ScrutinyForm from '../../../components/Forms/ScrutinyForm/ScrutinyForm'
import ConditionalRedering from '../../../helpers/ConditionalRedering'
import Chance4DigitsScrutinyCardList from '../../../components/Cards/Chance4DigitsScrutiny/components/Chance4DigitsScrutinyCardList'

const ScrutinyChance4Digits = () => {
  const {
    raffleScrutinyState,
    Chance4DigitsLotteries,
    hasError,
    setScrutinyForm,
    setScrutinyResults,
    setScrutinyResultsByLottery,
    setIsLoadingScrutinyResults,
    isLoading,
    setSelectedTab,
    addRaffleScrutinyChance4Digits,
    loadingAdd,
  } = useScrutinyChance4Digits()

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
            <Chance4DigitsTabs
              tabs={Chance4DigitsLotteries}
              setSelectedTab={setSelectedTab}
              selectedTab={raffleScrutinyState.selectedTab}
            />
          </ConditionalRedering>
        </ul>
      </div>
      <div className='tab-content' id='pills-tabContent'>
        <ConditionalRedering isTrue={!isLoading}>
          <Chance4DigitsScrutinyCardList
            addRaffleScrutinyChance4Digits={addRaffleScrutinyChance4Digits}
            raffleScrutinyResults={raffleScrutinyState.raffleResultsByLottery}
            selectedTab={raffleScrutinyState.selectedTab}
            loadingAdd={loadingAdd}
            raffleId={raffleScrutinyState.Chance4DigitsRaffleId}
          />
        </ConditionalRedering>
      </div>
    </div>
  )
}

export default ScrutinyChance4Digits
