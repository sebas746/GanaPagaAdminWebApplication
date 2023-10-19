import {useNavigate} from 'react-router-dom'
import {useProtectedRoute} from './ProtectedRoute.hook'
import {UserRole} from '../../../types/UserRoles.types'
import {useEffect} from 'react'

type ProtectedRouteProps = {
  roles: UserRole[]
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({roles, children}) => {
  const hasAccess = useProtectedRoute(roles)
  const navigate = useNavigate()

  useEffect(() => {
    if (!hasAccess) {
      setTimeout(() => {
        navigate('/error/401') // or whatever your unauthorized redirect should be
      }, 100)
    }
  }, [hasAccess, navigate])

  return hasAccess ? <>{children}</> : null
}

export default ProtectedRoute
