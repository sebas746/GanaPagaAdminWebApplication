import clsx from 'clsx'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {HeaderNotificationsMenu, HeaderUserMenu, Search, ThemeModeSwitcher} from '../../../partials'
import {useLayout} from '../../core'
import HasPermission from '../../../../app/components/HasPermissions/HasPermissions'
import PromoterSelector from '../../../../app/components/PromoterSelector/PromoterSelector'
import {useAuth, User} from 'oidc-react'
import {useEffect, useState} from 'react'

const itemClass = 'ms-1 ms-lg-3'
const btnClass =
  'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px'
const userAvatarClass = 'symbol-35px symbol-md-40px'
const btnIconClass = 'svg-icon-1'

const Navbar = () => {
  const {config} = useLayout()
  const auth = useAuth()
  const [username, setUsername] = useState<string | undefined>('')

  const getUsername = () => {
    auth.userManager.getUser().then((user: User | null) => {
      console.log(user)
      const fullName = user?.profile.preferred_username ?? ''
      setUsername(fullName)
    })
  }

  useEffect(() => {
    if (!username) {
      getUsername()
    }
  }, [auth])

  return (
    <div className='app-navbar flex-shrink-0'>
      <div className={clsx('app-navbar-item', itemClass)}>
        <HasPermission resource='promoter' actions={['change-promoter']}>
          <PromoterSelector />
        </HasPermission>
        <HasPermission resource='promoter' actions={['label-promoter']}>
          <div style={{paddingRight: '10px'}}>
            <button type='button' className='btn btn-primary'>
              {username}
            </button>
          </div>
        </HasPermission>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <img src={toAbsoluteUrl('/media/avatars/300-1.jpg')} alt='' />
        </div>
        <HeaderUserMenu />
      </div>

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
