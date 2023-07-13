import ConditionalRendering from '../../helpers/ConditionalRedering'

interface renderLoaderProps {
  show: boolean
  huge?: boolean | undefined
}

const RenderLoader = ({show, huge}: renderLoaderProps) => {
  if (huge === undefined) {
    return (
      <ConditionalRendering isTrue={show}>
        <div className='spinner-border spinner-border-sm' role='status'>
          <span className='sr-only'>Cargando...</span>
        </div>
      </ConditionalRendering>
    )
  } else {
    return (
      <ConditionalRendering isTrue={show}>
        <div
          className='spinner-grow align-item-center'
          style={{width: '5rem', height: '5rem'}}
          role='status'
        >
          <span className='sr-only'>Cargando...</span>
        </div>
      </ConditionalRendering>
    )
  }
}

export const enableSplashScreen = () => {
  const splashScreen = document.getElementById('splash-screen')
  if (splashScreen) {
    splashScreen.style.setProperty('display', 'flex')
  }
}

export const disableSplashScreen = () => {
  const splashScreen = document.getElementById('splash-screen')
  if (splashScreen) {
    splashScreen.style.setProperty('display', 'none')
  }
}

export default RenderLoader
