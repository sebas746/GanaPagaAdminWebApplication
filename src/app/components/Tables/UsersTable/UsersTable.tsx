import {Button, Form, Pagination} from 'react-bootstrap'
import {IpaginationResponse, IpaginationUsersResponse} from '../../../../types/Pagination.types'
import {IUsersResponse, RoleNames, UsersQueryParams, roleTranslations} from '../../../../types/Users.types'
import {UsersActions} from '../../../pages/users-management/users/Users.hook'
import clsx from 'clsx'
import RenderLoader from '../../RenderLoader/RenderLoader'
import { useMemo } from 'react'

interface UsersTableProps {
  usersPaginated: IpaginationUsersResponse<IUsersResponse>
  setEmail: (emailId: string | null, action: UsersActions) => void
  params: UsersQueryParams
  handleFilterChange: (filterName: keyof UsersQueryParams, value: any) => void
  isLoading: boolean
  setTempFilters: React.Dispatch<React.SetStateAction<UsersQueryParams>>
  setUsersParams: () => void
  tempFilters: UsersQueryParams
  resetFilters: () => void
}

const UsersTable = ({
  usersPaginated,
  setEmail,
  params,
  handleFilterChange,
  isLoading,
  setTempFilters,
  setUsersParams,
  tempFilters,
  resetFilters,
}: UsersTableProps) => {
  const isPromoterListReady = !isLoading && !!usersPaginated.promoterList
  const isUsersListReady = !isLoading && !!usersPaginated

  const memoizedPromoterListOptions = useMemo(() => {
    if (isPromoterListReady && usersPaginated.promoterList) {
      return usersPaginated.promoterList.map((promoter, index) => (
        <option key={index} value={promoter.promoterId}>
          {promoter.promoterName}
        </option>
      ));
    }

    return [];
  }, [isPromoterListReady, usersPaginated.promoterList]);
  return (
    <>
      <div className='card-body py-3'>
        <div className='mb-3'>
          <Button variant='primary' onClick={() => setEmail(null, 'create')} disabled={isLoading}>
            {'Crear Usuario'}
          </Button>
        </div>
        <div className='mb-4'>
          <div className='row mb-2'>
            {/* Name Input */}
            <div className='col-md-2'>
              <label htmlFor='nameInput' className='form-label'>
                Nombres
              </label>
              <input
                id='nameInput'
                type='text'
                className='form-control'
                placeholder='Nombre'
                onChange={(e) => setTempFilters((prev) => ({...prev, name: e.target.value}))}
                value={tempFilters.name}
              />
            </div>

            {/* Email Input */}
            <div className='col-md-2'>
              <label htmlFor='emailInput' className='form-label'>
                Usuario
              </label>
              <input
                id='emailInput'
                type='email'
                className='form-control'
                placeholder='Usuario'
                onChange={(e) => setTempFilters((prev) => ({...prev, email: e.target.value}))}
                value={tempFilters.email}
              />
            </div>

            {/* Document Number Input */}
            <div className='col-md-2'>
              <label htmlFor='docNumberInput' className='form-label'>
                # Documento
              </label>
              <input
                id='docNumberInput'
                type='text'
                className='form-control'
                placeholder='# Documento'
                onChange={(e) =>
                  setTempFilters((prev) => ({...prev, documentNumber: e.target.value}))
                }
                value={tempFilters.documentNumber}
              />
            </div>

            {/* Role Selector */}
            <div className='col-md-2'>
              <label htmlFor='roleSelector' className='form-label'>
                Rol
              </label>
              <Form.Select
                id='roleSelector'
                className='form-control'
                onChange={(e) => setTempFilters((prev) => ({...prev, roleName: e.target.value}))}
                value={tempFilters.roleName}
              >
                <option value=''>Todos</option>
                {Object.keys(roleTranslations).map((roleKey) => (
                  <option key={roleKey} value={roleKey as RoleNames}>
                    {roleTranslations[roleKey as RoleNames]}
                  </option>
                ))} 
              </Form.Select>
            </div>

            {/* Promoter Selector */}
            <div className='col-md-2'>
              <label htmlFor='promoterSelector' className='form-label'>
                Promotor
              </label>
              <Form.Select
                id='promoterSelector'
                className='form-control'
                onChange={(e) => setTempFilters((prev) => ({...prev, promoterId: e.target.value}))}
                value={tempFilters.promoterId}
              >
                <option value=''>Todos</option>
                {memoizedPromoterListOptions} 
              </Form.Select>
            </div>
          </div>

          <div className='row mb-2'>
            <div className='col-md-12'>
              <div className='btn-group'>
                <button className='btn btn-primary' onClick={() => setUsersParams()}>
                  Buscar
                </button>
                <button className='btn btn-secondary' onClick={resetFilters}>
                  Limpiar
                </button>
              </div>
            </div>
          </div>
        </div>

        {isLoading && <RenderLoader show={isLoading} huge={true} />}
        {isUsersListReady && usersPaginated.totalCount > 0 && (
          <div className='table-responsive'>
            <table className='table table-row-bordered table-row-gray-300 gy-6'>
              <thead>
                <tr className='fw-bold text-light bg-success'>
                  <th className='text-center'>Nombres</th>
                  <th className='text-center'>Apellidos</th>
                  <th className='text-center'>Usuario</th>
                  <th className='text-center'>Tipo Documento</th>
                  <th className='text-center'># Documento</th>
                  <th className='text-center'>Rol</th>
                  <th className='text-center'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usersPaginated.totalCount > 0 &&
                  usersPaginated.items.map((user, index) => (
                    <tr
                      className='fw-bold fs-6 text-gray-800'
                      key={`${user.documentNumber}-${index}`}
                    >
                      <td className='text-center'>{user.firstName}</td>
                      <td className='text-center'>{user.lastName}</td>
                      <td className='text-center'>{user.username}</td>
                      <td className='text-center'>{user.documentType}</td>
                      <td className='text-center'>{user.documentNumber}</td>
                      <td className='text-center'>
                        {roleTranslations[user.roleName] || user.roleName}
                      </td>
                      <td className='text-center'>
                        <div className='d-flex align-items-center justify-content-center'>
                          <div
                            onClick={() => setEmail(user.email, 'update')}
                            style={{cursor: 'pointer', marginRight: '10px'}}
                          >
                            <i className='bi bi-pencil text-primary btn-lg'></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}                
              </tbody>
            </table>
          </div>
        )}
        <div>
        {isUsersListReady && usersPaginated.totalCount === 0 && (
                  <tr>
                    <td colSpan={7} className='text-center'>
                      No hay resultados...
                    </td>
                  </tr>
                )}
        </div>
        {isUsersListReady && usersPaginated.totalCount > 0 && (
          <Pagination>
            {Array.from({length: Math.ceil(usersPaginated.totalCount / params.pageSize)}).map(
              (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index === params.pageIndex}
                  onClick={() => handleFilterChange('pageIndex', index)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
        )}
      </div>
    </>
  )
}

export default UsersTable
