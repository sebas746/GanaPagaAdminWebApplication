import React from 'react'
import {useScrutinyAnimalitos} from './ScrutinyAnimalitos.hook'
import AnimalitosTabs from '../../../components/Tabs/AnimalitosTabs'
import ScrutinyForm from '../../../components/Forms/ScrutinyForm/ScrutinyForm'
import ConditionalRedering from '../../../helpers/ConditionalRedering'
import AnimalitosScrutinyCardList from '../../../components/AnimalitosScrutinyCardList/AnimalitosScrutinyCardList'
import {useRaffleResultsAnimalitos} from '../../raffle-results/RaffleResultsAnimalitos/RaffleResultsAnimalitos.hook'

const ScrutinyAnimalitos = () => {
  const {
    raffleScrutinyState,
    animalitosLotteries,
    hasError,
    setScrutinyForm,
    setScrutinyResults,
    setScrutinyResultsByLottery,
    setIsLoadingScrutinyResults,
    isLoading,
    setSelectedTab,
    addRaffleScrutinyAnimalitos,
    loadingAdd,
    onClickScrutinyAnimalitosDetail,
    changeRaffleAnimalitoResult,
  } = useScrutinyAnimalitos()

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
            <AnimalitosTabs
              tabs={animalitosLotteries}
              setSelectedTab={setSelectedTab}
              selectedTab={raffleScrutinyState.selectedTab}
            />
          </ConditionalRedering>
        </ul>
      </div>
      <div className='tab-content' id='pills-tabContent'>
        <ConditionalRedering isTrue={!isLoading}>
          <AnimalitosScrutinyCardList
            addRaffleScrutinyAnimalitos={addRaffleScrutinyAnimalitos}
            raffleScrutinyResults={raffleScrutinyState.raffleResultsByLottery}
            selectedTab={raffleScrutinyState.selectedTab}
            loadingAdd={loadingAdd}
            raffleId={raffleScrutinyState.animalitosRaffleId}
            onClickScrutinyAnimalitosDetail={onClickScrutinyAnimalitosDetail}
            isLoading={isLoading}
            changeRaffleAnimalitoResult={changeRaffleAnimalitoResult}
            animalitosLotteries={raffleScrutinyState.animalitosLotteries}
          />
        </ConditionalRedering>
      </div>
    </div>
  )
}

export default ScrutinyAnimalitos
