import React, {useEffect} from 'react'
import {Outlet, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import ScrutinyAnimalitos from '../../pages/scrutiny/ScrutinyAnimalitos/ScrutinyAnimalitos'
import ScrutinyChance3Digits from '../../pages/scrutiny/ScrutinyChance3Digits/ScrutinyChance3Digits'
import ScrutinyChanceZodiacal from '../../pages/scrutiny/ScrutinyChanceZodiac/ScrutinyChanceZodiac'
import ScrutinyChance4Digits from '../../pages/scrutiny/ScrutinyChance4Digits/ScrutinyChance4Digits'
import ScrutinyDetail from '../../pages/scrutiny/ScrutinyDetail/ScrutinyDetail'

const scrutinyBreadCrumbs: Array<PageLink> = [
  {
    title: 'Escrutinio de sorteos',
    path: '/pages/scrutiny/animalitos',
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
const ScrutinyPage = () => {
  const location = useLocation()

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='animal-game'
          element={
            <>
              <PageTitle breadcrumbs={scrutinyBreadCrumbs}>Animalitos</PageTitle>
              <ScrutinyAnimalitos />
            </>
          }
        />
        <Route
          path='chance-3-digits'
          element={
            <>
              <PageTitle breadcrumbs={scrutinyBreadCrumbs}>Chance 3 Cifras</PageTitle>
              <ScrutinyChance3Digits />
            </>
          }
        />
        <Route
          path='chance-4-digits'
          element={
            <>
              <PageTitle breadcrumbs={scrutinyBreadCrumbs}>Chance 4 Cifras</PageTitle>
              <ScrutinyChance4Digits />
            </>
          }
        />
        <Route
          path='chance-zodiac'
          element={
            <>
              <PageTitle breadcrumbs={scrutinyBreadCrumbs}>Chance Zodiacal</PageTitle>
              <ScrutinyChanceZodiacal />
            </>
          }
        />
        {location.state && location.state.raffleId && (
          <Route
            path='scrutiny-detail'
            element={
              <>
                <PageTitle breadcrumbs={scrutinyBreadCrumbs}>Escrutinio detalle</PageTitle>
                <ScrutinyDetail />
              </>
            }
          />
        )}
      </Route>
    </Routes>
  )
}

export default ScrutinyPage
