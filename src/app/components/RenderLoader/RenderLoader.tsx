import ConditionalRendering from '../../helpers/ConditionalRedering'

interface renderLoaderProps {
  show: boolean
}

const RenderLoader = ({show}: renderLoaderProps) => {
  return (
    <ConditionalRendering isTrue={show}>
      <div className='spinner-border' role='status'>
        <span className='sr-only'>Cargando...</span>
      </div>
    </ConditionalRendering>
  )
}

export default RenderLoader
