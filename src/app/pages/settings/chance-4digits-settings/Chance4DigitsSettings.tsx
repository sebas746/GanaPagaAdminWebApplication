import {useMemo} from 'react'
import {useChance4DigitsSettings} from './Chance4DigitsSettings.hook'
import clsx from 'clsx'
import RenderLoader from '../../../components/RenderLoader/RenderLoader'
import ConditionalRendering from '../../../helpers/ConditionalRedering'
import Chance4DigitsSettingsForm from '../../../components/Forms/Chance4DigitsSettingsForm/Chance4DigitsSettingsForm'

const Chance4DigitsSettings = () => {
  const {
    activeTab,
    chance4DigitsSettings,
    isFetching,
    isUpdatingSettings,
    onChangeTab,
    updateLotterySettings,
  } = useChance4DigitsSettings()

  const renderTabs = useMemo(() => {
    return chance4DigitsSettings.map((setting) => {
      return (
        <li
          className='nav-item'
          role='presentation'
          onClick={() => onChangeTab(setting.lotteryId)}
          key={`chance4-settings-tab-lottery-${setting.lotteryId}`}
        >
          <a
            className={clsx('nav-link text-dark', {
              active: setting.lotteryId === activeTab,
            })}
            data-bs-toggle='tab'
            href={`#chance4-settings-lottery-${setting.lotteryId}`}
            role='tab'
          >
            {setting.lotteryName}
          </a>
        </li>
      )
    })
  }, [chance4DigitsSettings])

  const renderTabsContent = useMemo(() => {
    return chance4DigitsSettings.map((setting) => (
      <div
        className={clsx('tab-pane fade', {
          show: setting.lotteryId === activeTab,
          active: setting.lotteryId === activeTab,
        })}
        id={`chance4-settings-lottery-${setting.lotteryId}`}
        role='tabpanel'
        key={`chance4-settings-tabs-content-lottery-${setting.lotteryId}`}
        aria-labelledby={`chance4-settings-tabs-content-lottery-${setting.lotteryId}`}
      >
        <Chance4DigitsSettingsForm
          initialValues={setting.chanceFourLotterySettings}
          submitForm={updateLotterySettings}
          isLoading={isUpdatingSettings}
        />
      </div>
    ))
  }, [chance4DigitsSettings, isUpdatingSettings])

  return (
    <>
      <RenderLoader show={isFetching} huge={true} />
      <ConditionalRendering isTrue={!isFetching}>
        <>
          <ul
            className='nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6'
            id='pills-tab'
            role='tablist'
          >
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
export default Chance4DigitsSettings
