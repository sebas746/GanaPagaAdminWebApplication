import {Button, Modal} from 'react-bootstrap'
import RenderLoader from '../RenderLoader/RenderLoader'

interface ConfirmDialogProps {
  show: boolean
  title: string
  text: string
  onHide: () => void
  onConfirm: () => void
  isLoading: boolean
}

const ConfirmDialog = ({show, title, text, onHide, onConfirm, isLoading}: ConfirmDialogProps) => {
  return (
    <>
      <div className='static-modal'>
        <Modal animation={false} show={show} onHide={onHide}>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{text}</Modal.Body>
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
