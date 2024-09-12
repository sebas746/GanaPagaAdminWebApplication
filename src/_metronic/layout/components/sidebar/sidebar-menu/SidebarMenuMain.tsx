/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import {useProtectedRoute} from '../../../../../app/components/RouteProtection/ProtectedRoute.hook'
import {
  ADMIN_ROLES,
  ALL_ROLES,
  PROMOTER_ROLES,
  SCRUTINY_ROLES,
} from '../../../../../app/constants/session.constants'

const SidebarMenuMain = () => {
  const intl = useIntl()
  const allRolesRoutes = useProtectedRoute(ALL_ROLES)
  const adminScrutinyRoutes = useProtectedRoute(SCRUTINY_ROLES)
  const adminRoutes = useProtectedRoute(ADMIN_ROLES)
  const adminPromoterRoutes = useProtectedRoute(PROMOTER_ROLES)

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

      {(adminRoutes || adminPromoterRoutes) && (
        <SidebarMenuItemWithSub
          to='/pages/sales-reports'
          title='Reportes de ventas'
          icon='/media/icons/duotune/coding/cod009.svg'
          fontIcon='bi-gear'
        >
          <SidebarMenuItem
            to='/pages/sales-reports/sales-seller-report'
            title='Reporte vendedores'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/pages/sales-reports/sales-salepoint-report'
            title='Reporte Puntos de Venta'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/pages/sales-reports/sales-game-type-report'
            title='Reporte Tipo de Juegos'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/pages/sales-reports/ticket-report'
            title='Reporte Tiquetes'
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
      {adminRoutes && (
        <SidebarMenuItemWithSub
          to='/pages/personalized-quota'
          title='Personalizar Cupo'
          icon='/media/icons/duotune/general/gen049.svg'
          fontIcon='bi-person'
        >
          <SidebarMenuItem
            to='/pages/personalized-quota/overview'
            title='Lista cupos personalizados'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/pages/personalized-quota/create'
            title='Crear Cupo Personalizada'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>
      )}
    </>
  )
}

export {SidebarMenuMain}
