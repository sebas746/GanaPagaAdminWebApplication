import clsx from 'clsx'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {HeaderNotificationsMenu, HeaderUserMenu, Search, ThemeModeSwitcher} from '../../../partials'
import {useLayout} from '../../core'
import {setPromoterId, getPromoterId} from '../../../../app/helpers/localstorage.helper'
import {usePromoterList} from '../../../../app/hooks/promoterList.hook'
import {Form} from 'react-bootstrap'
import {IPromoter} from '../../../../types/Promoter.types'

const itemClass = 'ms-1 ms-lg-3'
const btnClass =
  'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px'
const userAvatarClass = 'symbol-35px symbol-md-40px'
const btnIconClass = 'svg-icon-1'

const Navbar = () => {
  const {config} = useLayout()
  const {promoters, isLoading} = usePromoterList()
  const adminPromoter = promoters && promoters.find((p) => p.promoterIsAdmin)
  const handlePromoterChange = (promoter: string) => {
    setPromoterId(promoter)
  }
  const promoterId = getPromoterId()
  if (!!promoterId && adminPromoter) {
    setPromoterId(adminPromoter.promoterId.toString())
  }
  return (
    <div className='app-navbar flex-shrink-0'>
      <div className={clsx('app-navbar-item', itemClass)}>
        <div className='menu-item px-5 mb-4'>
          {!isLoading && promoters && promoters.length > 0 && (
            <Form.Select
              defaultValue={promoterId ?? ''}
              onChange={(e) => handlePromoterChange(e.target.value)}
              className='form-select form-select-solid'
            >
              {promoters.map((promoter: IPromoter) => (
                <option key={promoter.promoterId} value={promoter.promoterId}>
                  {promoter.promoterName}
                </option>
              ))}
            </Form.Select>
          )}
        </div>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='' />
        </div>
      </div>

      <HeaderUserMenu />

      {config.app?.header?.default?.menu?.display && (
        <div className='app-navbar-item d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-color-primary w-35px h-35px'
            id='kt_app_header_menu_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className={btnIconClass} />
          </div>
        </div>
      )}
    </div>
  )
}

export {Navbar}
