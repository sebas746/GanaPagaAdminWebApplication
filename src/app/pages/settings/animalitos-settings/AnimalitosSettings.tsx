import {useAnimalitosSettings} from './useAnimalitosSettings'
import ConditionalRendering from '../../../helpers/ConditionalRedering'
import {useMemo} from 'react'
import AnimalitosSettingsForm from '../../../components/Forms/AnimalitosSettingsForm/AnimalitosSettingsForm'
import clsx from 'clsx'
import RenderLoader from '../../../components/RenderLoader/RenderLoader'

const AnimalitosSettings = () => {
  const {
    isFetching,
    animalitosSettings,
    updateLotterySettings,
    onChangeTab,
    activeTab,
  } = useAnimalitosSettings();

  const renderTabs = useMemo(() => {
    return animalitosSettings.map((animalito) => {
      return (
        <li
          className='nav-item'
          role='presentation'
          onClick={() => onChangeTab(animalito.lotteryId)}
          key={`animalito-settings-tab-lottery-${animalito.lotteryId}`}
        >
          <a
            className={clsx('nav-link text-dark', {
              active: animalito.lotteryId === activeTab,
            })}
            data-bs-toggle='tab'
            href={`#animalito-settings-lottery-${animalito.lotteryId}`}
            role='tab'
          >
            {animalito.lotteryName}
          </a>
        </li>
      )
    })
  }, [animalitosSettings])

  const renderTabsContent = useMemo(() => {
    return animalitosSettings.map((animalito) => (
      <div
        className={clsx('tab-pane fade', {
          show: animalito.lotteryId === activeTab,
          active: animalito.lotteryId === activeTab,
        })}
        id={`animalito-settings-lottery-${animalito.lotteryId}`}
        role='tabpanel'
        key={`animalito-settings-tabs-content-lottery-${animalito.lotteryId}`}
        aria-labelledby={`animalito-settings-tabs-content-lottery-${animalito.lotteryId}`}
      >
        <AnimalitosSettingsForm
          initialValues={animalito.animalitosLotterySettings}
          submitForm={updateLotterySettings}
        />
      </div>
    ))
  }, [animalitosSettings])

  return (
    <>
      <RenderLoader show={isFetching} huge={true} />
      <ConditionalRendering isTrue={!isFetching}>
        <>
          <ul className='nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6' id='pills-tab' role='tablist'>
            {renderTabs}
          </ul>
          <div className='tab-content' id='pills-content'>
            {renderTabsContent}
          </div>
        </>
      </ConditionalRendering>
    </>
  )
}
export default AnimalitosSettings
