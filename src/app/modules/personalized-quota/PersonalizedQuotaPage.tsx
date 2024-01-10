import React from 'react'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {Outlet, Route, Routes} from 'react-router-dom'

import CreatePersonalizedQuota from '../../pages/personalized-quota/CreatePersonalizedQuota/CreatePersonalizedQuota'
import PersonalizedQuotaOverview from '../../pages/personalized-quota/PersonalizedQuotaOverview/PersonalizedQuotaOverview'

const personalizedBetBreadCrumbs: Array<PageLink> = [
  {
    title: 'Create Personalized Bet',
    path: '/pages/personalized-quota/overview',
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

const PersonalizedQuotaPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='overview'
          element={
            <>
              <PageTitle breadcrumbs={personalizedBetBreadCrumbs}>
                Listado Personalizar cupo
              </PageTitle>
              <PersonalizedQuotaOverview />
            </>
          }
        />
        <Route
          path='create'
          element={
            <>
              <PageTitle breadcrumbs={personalizedBetBreadCrumbs}>
                Crear Cupo personalizado
              </PageTitle>
              <CreatePersonalizedQuota />
            </>
          }
        />
        <Route
          path='create/:lotteryId/:animalId'
          element={
            <>
              <PageTitle breadcrumbs={personalizedBetBreadCrumbs}>
                Crear Cupo personalizado
              </PageTitle>
              <CreatePersonalizedQuota />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default PersonalizedQuotaPage
