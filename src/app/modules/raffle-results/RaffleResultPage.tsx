import React, {useEffect} from 'react'
import {Outlet, Route, Routes, useNavigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import RaffleResultsAnimalitos from '../../pages/raffle-results/RaffleResultsAnimalitos/RaffleResultsAnimalitos'
import RaffleResultsChance3Digits from '../../pages/raffle-results/RaffleResultsChance3Digits/RaffleResultsChance3Digits'
import RaffleResultsChance4Digits from '../../pages/raffle-results/RaffleResultsChance4Digits/RaffleResultsChance4Digits'
import RaffleResultsChanceZodiacal from '../../pages/raffle-results/RaffleResultsChanceZodiacal/RaffleResultsChanceZodiacal'

const raffleResultBreadCrumbs: Array<PageLink> = [
  {
    title: 'Resultados de sorteos',
    path: '/pages/raffle-results/animal-game',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]
const RaffleResultPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='animal-game'
          element={
            <>
              <PageTitle breadcrumbs={raffleResultBreadCrumbs}>Animalitos</PageTitle>
              <RaffleResultsAnimalitos />
            </>
          }
        />
        <Route
          path='chance-3-digits'
          element={
            <>
              <PageTitle breadcrumbs={raffleResultBreadCrumbs}>Chance 3 Cifras</PageTitle>
              <RaffleResultsChance3Digits />
            </>
          }
        />
        <Route
          path='chance-4-digits'
          element={
            <>
              <PageTitle breadcrumbs={raffleResultBreadCrumbs}>Chance 4 Cifras</PageTitle>
              <RaffleResultsChance4Digits />
            </>
          }
        />
        <Route
          path='chance-zodiac'
          element={
            <>
              <PageTitle breadcrumbs={raffleResultBreadCrumbs}>Chance Zodiacal</PageTitle>
              <RaffleResultsChanceZodiacal />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default RaffleResultPage
