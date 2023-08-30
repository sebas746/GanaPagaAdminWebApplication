import {Button, Modal} from 'react-bootstrap'
import RenderLoader from '../RenderLoader/RenderLoader'
import {ReactNode} from 'react'

interface ConfirmDialogProps {
  show: boolean
  title: string
  text: string
  values?: JSX.Element | (() => JSX.Element)
  onHide: () => void
  onConfirm: () => void
  isLoading: boolean
  size: 'sm' | 'lg' | 'xl'
}

const ConfirmDialog = ({
  show,
  title,
  text,
  values,
  onHide,
  onConfirm,
  isLoading,
  size,
}: ConfirmDialogProps) => {
  return (
    <>
      <div className='static-modal'>
        <Modal animation={false} show={show} onHide={onHide} size={size}>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='mb-5'>{text}</div>
            {typeof values === 'function' ? values() : values}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={onHide}>
              {'Cancelar'}
            </Button>
            <Button variant='primary' onClick={onConfirm} disabled={isLoading}>
              {'Confirmar'} <RenderLoader show={isLoading} />
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default ConfirmDialog
