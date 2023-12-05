/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import {useProtectedRoute} from '../../../../../app/components/RouteProtection/ProtectedRoute.hook'

const SidebarMenuMain = () => {
  const intl = useIntl()
  const allRolesRoutes = useProtectedRoute(['Admin', 'Scrutiny'])
  const adminScrutinyRoutes = useProtectedRoute(['Admin', 'Scrutiny'])
  const adminRoutes = useProtectedRoute(['Admin'])

  return (
    <>
      {allRolesRoutes && (
        <SidebarMenuItem
          to='/dashboard'
          icon='/media/icons/duotune/art/art002.svg'
          title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
          fontIcon='bi-app-indicator'
        />
      )}
      <SidebarMenuItem
        to='/builder'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Layout Builder'
        fontIcon='bi-layers'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
        </div>
      </div>
      {adminScrutinyRoutes && (
        <SidebarMenuItemWithSub
          to='/pages/raffle-results'
          title='Resultados Sorteos'
          icon='/media/icons/duotune/graphs/gra001.svg'
          fontIcon='bi-graph-up-arrow'
        >
          <SidebarMenuItem
            to='/pages/raffle-results/animal-game'
            title='Animalitos'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/pages/raffle-results/chance-3-digits'
            title='Chance de 3 cifras'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/pages/raffle-results/chance-4-digits'
            title='Chance de 4 cifras'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/pages/raffle-results/chance-zodiac'
            title='Chance Zodiacal'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>
      )}
      {adminScrutinyRoutes && (
        <SidebarMenuItemWithSub
          to='/pages/scrutiny'
          title='Escrutinio Sorteos'
          icon='/media/icons/duotune/files/fil024.svg'
          fontIcon='bi-cash-coin'
        >
          <SidebarMenuItem to='/pages/scrutiny/animal-game' title='Animalitos' hasBullet={true} />
          <SidebarMenuItem
            to='/pages/scrutiny/chance-3-digits'
            title='Chance de 3 cifras'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/pages/scrutiny/chance-4-digits'
            title='Chance de 4 cifras'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/pages/scrutiny/chance-zodiac'
            title='Chance Zodiacal'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>
      )}
      {adminRoutes && (
        <SidebarMenuItemWithSub
          to='/pages/settings'
          title='Configuración de Juegos'
          icon='/media/icons/duotune/coding/cod009.svg'
          fontIcon='bi-gear'
        >
          <SidebarMenuItem
            to='/pages/settings/general-settings'
            title='Configuración general'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/pages/settings/animalitos-general-settings'
            title='Configuración general animalitos'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/pages/settings/animalitos-settings'
            title='Configuración animalitos'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/pages/settings/chance-3digits-settings'
            title='Configuración chance 3 Cifras'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/pages/settings/chance-4digits-settings'
            title='Configuración chance 4 cifras'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/pages/settings/chance-zodiac-settings'
            title='Configuración chance zodiacal'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>
      )}

      {adminRoutes && (
        <SidebarMenuItemWithSub
          to='/pages/scrutiny-settings'
          title='Configuración escrutinios'
          icon='/media/icons/duotune/coding/cod009.svg'
          fontIcon='bi-gear'
        >
          <SidebarMenuItem
            to='/pages/scrutiny-settings/email-scrutiny-settings'
            title='Configuración correos escrutinios'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>
      )}

      {adminRoutes && (
        <SidebarMenuItemWithSub
          to='/pages/system-settings'
          title='Configuración sistema'
          icon='/media/icons/duotune/coding/cod009.svg'
          fontIcon='bi-gear'
        >
          <SidebarMenuItem
            to='/pages/system-settings/exchange-rate-settings'
            title='Configuración tasa de cambio'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>
      )}

      {adminRoutes && (
        <SidebarMenuItemWithSub
          to='/pages/users-management'
          title='Gestión Usuarios'
          icon='/media/icons/duotune/general/gen049.svg'
          fontIcon='bi-person'
        >
          <SidebarMenuItem to='/pages/users-management/users' title='Usuarios' hasBullet={true} />
        </SidebarMenuItemWithSub>
      )}

      <SidebarMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <SidebarMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <SidebarMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <SidebarMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <SidebarMenuItem
            to='/crafted/pages/profile/campaigns'
            title='Campaigns'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/profile/documents'
            title='Documents'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>

        <SidebarMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <SidebarMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <SidebarMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </SidebarMenuItemWithSub>
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <SidebarMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/error'
        title='Errors'
        fontIcon='bi-sticky'
        icon='/media/icons/duotune/general/gen040.svg'
      >
        <SidebarMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <SidebarMenuItem to='/error/500' title='Error 500' hasBullet={true} />
        <SidebarMenuItem to='/error/401' title='Error 401' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <SidebarMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </SidebarMenuItemWithSub>
    </>
  )
}

export {SidebarMenuMain}
