import {Button} from 'react-bootstrap'
import {IEmailScrutinySettingsResponse} from '../../../../types/ScrutinySettings.types'
import {EmailScrutinyActions} from '../../../pages/scrutiny-settings/email-scrutiny-settings/EmailScrutinySettings.hook'

interface EmailScrutinySettingsTableProps {
  emailScrutinySettings: IEmailScrutinySettingsResponse[]
  isDeleting: boolean
  setEmailId: (emailId: number | undefined, action: EmailScrutinyActions) => void
}

const ScrutinySettingsTable = ({
  emailScrutinySettings,
  isDeleting,
  setEmailId,
}: EmailScrutinySettingsTableProps) => {
  return (
    <>
      <div className='card-body py-3'>
        <div className='mb-3'>
          <Button variant='primary' onClick={() => setEmailId(0, 'create')}>
            {'Agregar Correo'}
          </Button>
        </div>
        <div className='table-responsive'>
          <table className='table table-row-bordered table-row-gray-300 gy-6'>
            <thead>
              <tr className='fw-bold text-light bg-success'>
                <th className='text-center'>Nombres</th>
                <th className='text-center'>Apellidos</th>
                <th className='text-center'>Correo</th>
                <th className='text-center'>Estado</th>
                <th className='text-center'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {emailScrutinySettings.map((email) => (
                <tr className='fw-bold fs-6 text-gray-800' key={email.adminEmailId}>
                  <td className='text-center'>{email.adminEmailName}</td>
                  <td className='text-center'>{email.adminEmailLastName}</td>
                  <td className='text-center'>{email.adminEmailEmail}</td>
                  <td className='text-center'>
                    <span
                      className={`badge ${
                        email.adminEmailStatus ? 'badge-light-success' : 'badge-light-warning'
                      } fs-7 fw-semibold`}
                    >
                      {email.adminEmailStatus ? 'ACTIVO' : 'INACTIVO'}
                    </span>
                  </td>
                  <td className='text-center'>
                    <div className='d-flex align-items-center justify-content-center'>
                      <div
                        onClick={() => setEmailId(email.adminEmailId, 'update')}
                        style={{cursor: 'pointer'}}
                      >
                        <i className='bi bi-pencil text-primary fs-2x'></i>
                      </div>
                      <div
                        onClick={() => setEmailId(email.adminEmailId, 'delete')}
                        style={{cursor: 'pointer'}}
                      >
                        <i className='bi bi-trash text-danger fs-2x'></i>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ScrutinySettingsTable
