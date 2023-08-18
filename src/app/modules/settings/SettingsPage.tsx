import {Outlet, Route, Routes, useNavigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import GeneralSettings from '../../pages/settings/general-settings/GeneralSettings'
import AnimalitosSettings from '../../pages/settings/animalitos-settings/AnimalitosSettings'
import Chance3DigitsSettings from '../../pages/settings/chance-3digits-settings/Chance3DigitsSettings'
import ChanceZodiacSettings from '../../pages/settings/chance-zodiac-settings/ChanceZodiacSettings'
import Chance4DigitsSettings from '../../pages/settings/chance-4digits-settings/Chance4DigitsSettings'

const settingsBreadCrumbs: Array<PageLink> = [
  {
    title: 'General settings',
    path: '/pages/settings/general-settings',
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

const SettinsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='general-settings'
          element={
            <>
              <PageTitle breadcrumbs={settingsBreadCrumbs}>Configuración general</PageTitle>
              <GeneralSettings />
            </>
          }
        />
        <Route
          path='animalitos-settings'
          element={
            <>
              <PageTitle breadcrumbs={settingsBreadCrumbs}>Configuración animalitos</PageTitle>
              <AnimalitosSettings />
            </>
          }
        />
        <Route
          path='chance-3digits-settings'
          element={
            <>
              <PageTitle breadcrumbs={settingsBreadCrumbs}>Configuración chance 3 cifras</PageTitle>
              <Chance3DigitsSettings />
            </>
          }
        />
        <Route
          path='chance-4digits-settings'
          element={
            <>
              <PageTitle breadcrumbs={settingsBreadCrumbs}>Configuración chance 4 cifras</PageTitle>
              <Chance4DigitsSettings />
            </>
          }
        />
        <Route
          path='chance-zodiac-settings'
          element={
            <>
              <PageTitle breadcrumbs={settingsBreadCrumbs}>Configuración chance zodiacal</PageTitle>
              <ChanceZodiacSettings />
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default SettinsPage
