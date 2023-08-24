import {useMemo} from 'react'
import {useChance3DigitsSettings} from './Chance3DigitsSettings.hook'
import clsx from 'clsx'
import RenderLoader from '../../../components/RenderLoader/RenderLoader'
import ConditionalRendering from '../../../helpers/ConditionalRedering'
import Chance3DigitsSettingsForm from '../../../components/Forms/Chance3DigitsSettingsForm/Chance3DigitsSettingsForm'

const Chance3DigitsSettings = () => {
  const {
    activeTab,
    chance3DigitsSettings,
    isFetching,
    isUpdatingSettings,
    onChangeTab,
    updateLotterySettings,
  } = useChance3DigitsSettings()

  const renderTabs = useMemo(() => {
    return chance3DigitsSettings.map((setting) => {
      return (
        <li
          className='nav-item'
          role='presentation'
          onClick={() => onChangeTab(setting.lotteryId)}
          key={`chance3-settings-tab-lottery-${setting.lotteryId}`}
        >
          <a
            className={clsx('nav-link text-dark', {
              active: setting.lotteryId === activeTab,
            })}
            data-bs-toggle='tab'
            href={`#chance3-settings-lottery-${setting.lotteryId}`}
            role='tab'
          >
            {setting.lotteryName}
          </a>
        </li>
      )
    })
  }, [chance3DigitsSettings])

  const renderTabsContent = useMemo(() => {
    return chance3DigitsSettings.map((setting) => (
      <div
        className={clsx('tab-pane fade', {
          show: setting.lotteryId === activeTab,
          active: setting.lotteryId === activeTab,
        })}
        id={`chance3-settings-lottery-${setting.lotteryId}`}
        role='tabpanel'
        key={`chance3-settings-tabs-content-lottery-${setting.lotteryId}`}
        aria-labelledby={`chance3-settings-tabs-content-lottery-${setting.lotteryId}`}
      >
        <Chance3DigitsSettingsForm
          initialValues={setting.chanceThreeLotterySettings}
          submitForm={updateLotterySettings}
          isLoading={isUpdatingSettings}
        />
      </div>
    ))
  }, [chance3DigitsSettings, isUpdatingSettings])

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
export default Chance3DigitsSettings
