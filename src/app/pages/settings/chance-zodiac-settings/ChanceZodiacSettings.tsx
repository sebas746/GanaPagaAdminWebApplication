import {useMemo} from 'react'
import {useChanceZodiacSettings} from './ChanceZodiacSettings.hook'
import clsx from 'clsx'
import RenderLoader from '../../../components/RenderLoader/RenderLoader'
import ConditionalRendering from '../../../helpers/ConditionalRedering'
import ChanceZodiacSettingsForm from '../../../components/Forms/ChanceZodiacSettingsForm/ChanceZodiacSettingsForm'

const ChanceZodiacSettings = () => {
  const {
    activeTab,
    chanceZodiacSettings,
    isFetching,
    isUpdatingSettings,
    onChangeTab,
    updateLotterySettings,
  } = useChanceZodiacSettings()

  const renderTabs = useMemo(() => {
    return chanceZodiacSettings.map((setting) => {
      return (
        <li
          className='nav-item'
          role='presentation'
          onClick={() => onChangeTab(setting.lotteryId)}
          key={`chance-zodiac-settings-tab-lottery-${setting.lotteryId}`}
        >
          <a
            className={clsx('nav-link text-dark', {
              active: setting.lotteryId === activeTab,
            })}
            data-bs-toggle='tab'
            href={`#chance-zodiac-settings-lottery-${setting.lotteryId}`}
            role='tab'
          >
            {setting.lotteryName}
          </a>
        </li>
      )
    })
  }, [chanceZodiacSettings])

  const renderTabsContent = useMemo(() => {
    return chanceZodiacSettings.map((setting) => (
      <div
        className={clsx('tab-pane fade', {
          show: setting.lotteryId === activeTab,
          active: setting.lotteryId === activeTab,
        })}
        id={`chance-zodiac-settings-lottery-${setting.lotteryId}`}
        role='tabpanel'
        key={`chance-zodiac-settings-tabs-content-lottery-${setting.lotteryId}`}
        aria-labelledby={`chance-zodiac-settings-tabs-content-lottery-${setting.lotteryId}`}
      >
        <ChanceZodiacSettingsForm
          initialValues={setting.chanceZodiacLotterySettings}
          submitForm={updateLotterySettings}
          isLoading={isUpdatingSettings}
        />
      </div>
    ))
  }, [chanceZodiacSettings, isUpdatingSettings])

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
export default ChanceZodiacSettings
