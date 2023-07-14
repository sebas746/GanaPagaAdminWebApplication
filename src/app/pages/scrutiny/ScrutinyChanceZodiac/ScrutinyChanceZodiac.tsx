import React from 'react'
import ScrutinyForm from '../../../components/Forms/ScrutinyForm/ScrutinyForm'
import ConditionalRedering from '../../../helpers/ConditionalRedering'
import {useScrutinyChanceZodiac} from './ScrutinyChanceZodiac.hook'
import ChanceZodiacTabs from '../../../components/Tabs/ChanceZodiacTabs'
import ChanceZodiacScrutinyCardList from '../../../components/Cards/ChanceZodiacScrutiny/components/ChanceZodiacScrutinyCardList'

const ScrutinyChanceZodiac = () => {
  const {
    raffleScrutinyState,
    chanceZodiacLotteries,
    hasError,
    setScrutinyForm,
    setScrutinyResults,
    setScrutinyResultsByLottery,
    setIsLoadingScrutinyResults,
    isLoading,
    setSelectedTab,
    addRaffleScrutinyChanceZodiac,
    loadingAdd,
    onClickScrutinyChanceZodiacDetail,
  } = useScrutinyChanceZodiac()

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
            <ChanceZodiacTabs
              tabs={chanceZodiacLotteries}
              setSelectedTab={setSelectedTab}
              selectedTab={raffleScrutinyState.selectedTab}
            />
          </ConditionalRedering>
        </ul>
      </div>
      <div className='tab-content' id='pills-tabContent'>
        <ConditionalRedering isTrue={!isLoading}>
          <ChanceZodiacScrutinyCardList
            addRaffleScrutinyChanceZodiac={addRaffleScrutinyChanceZodiac}
            raffleScrutinyResults={raffleScrutinyState.raffleResultsByLottery}
            selectedTab={raffleScrutinyState.selectedTab}
            loadingAdd={loadingAdd}
            raffleId={raffleScrutinyState.chanceZodiacRaffleId}
            onClickScrutinyChanceZodiacDetail={onClickScrutinyChanceZodiacDetail}
          />
        </ConditionalRedering>
      </div>
    </div>
  )
}

export default ScrutinyChanceZodiac
