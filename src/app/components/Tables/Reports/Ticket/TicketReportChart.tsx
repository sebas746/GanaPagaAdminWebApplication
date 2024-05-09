/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Dropdown1} from '../../../../../_metronic/partials/content/dropdown/Dropdown1'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import {ITicketReportResponse, TicketStatusEnum} from '../../../../../types/TicketReport.types'
import {useHelperUtility} from '../../../../hooks/helperUtility.hook'
import {useTicketReportTable} from './TicketReportTable.hook'

type Props = {
  className: string
  ticketInfo: ITicketReportResponse
}

const TicketReportChart: React.FC<Props> = ({className, ticketInfo}) => {
  const {calculatePercentage} = useHelperUtility()
  const {stateToColor, stateToText, stateToBarColor, stateToLinkColor} = useTicketReportTable()
  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-3 pb-0'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>
            Total Tiquetes Vendidos: {ticketInfo.ticketsCount}
          </span>
        </h3>
        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
          </button>
          {/* begin::Menu 1 */}
          <Dropdown1 />
          {/* end::Menu 1 */}
          {/* end::Menu */}
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Body */}
      <div className='card-body py-2'>
        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-3'>
            {/* begin::Table head */}
            <thead>
              <tr>
                <th className='p-0 w-50px'></th>
                <th className='p-0 min-w-200px'></th>
                <th className='p-0 min-w-100px'></th>
                <th className='p-0 min-w-40px'></th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              <tr>
                <th>
                  <div className='symbol symbol-50px me-2'>
                    <span className='symbol-label'>
                      <span className={`fs-4 ${stateToColor(TicketStatusEnum.pending)}`}>
                        {ticketInfo.ticketsPendingCount}
                      </span>
                    </span>
                  </div>
                </th>
                <td>
                  <a
                    href='#'
                    className={`fw-bold text-hover-primary mb-1 fs-6 ${stateToColor(
                      TicketStatusEnum.pending
                    )}`}
                  >
                    {stateToText(TicketStatusEnum.pending)}
                  </a>
                </td>
                <td>
                  <div className='d-flex flex-column w-100 me-2'>
                    <div className='d-flex flex-stack mb-2'>
                      <span className='text-muted me-2 fs-7 fw-semibold'>
                        {`${calculatePercentage(
                          ticketInfo.ticketsCount,
                          ticketInfo.ticketsPendingCount
                        )}
                        %`}
                      </span>
                    </div>
                    <div className='progress h-6px w-100'>
                      <div
                        className={`progress-bar bg-primary ${stateToBarColor(
                          TicketStatusEnum.pending
                        )}`}
                        role='progressbar'
                        style={{
                          width: `${calculatePercentage(
                            ticketInfo.ticketsCount,
                            ticketInfo.ticketsPendingCount
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className={`btn btn-sm btn-icon btn-bg-light btn-active-color-warning ${stateToLinkColor(
                      TicketStatusEnum.pending
                    )}`}
                  >
                    <KTSVG path='/media/icons/duotune/arrows/arr064.svg' className='svg-icon-2' />
                  </a>
                </td>
              </tr>
              <tr>
                <th>
                  <div className='symbol symbol-50px me-2'>
                    <span className='symbol-label'>
                      <span className={`fs-4 ${stateToColor(TicketStatusEnum.loser)}`}>
                        {ticketInfo.ticketLoserCount}
                      </span>
                    </span>
                  </div>
                </th>
                <td>
                  <a
                    href='#'
                    className={`fw-bold text-hover-primary mb-1 fs-6 ${stateToColor(
                      TicketStatusEnum.loser
                    )}`}
                  >
                    {stateToText(TicketStatusEnum.loser)}
                  </a>
                </td>
                <td>
                  <div className='d-flex flex-column w-100 me-2'>
                    <div className='d-flex flex-stack mb-2'>
                      <span className='text-muted me-2 fs-7 fw-semibold'>{`${calculatePercentage(
                        ticketInfo.ticketsCount,
                        ticketInfo.ticketLoserCount
                      )}
                        %`}</span>
                    </div>
                    <div className='progress h-6px w-100'>
                      <div
                        className={`progress-bar bg-primary ${stateToBarColor(
                          TicketStatusEnum.loser
                        )}`}
                        role='progressbar'
                        style={{
                          width: `${calculatePercentage(
                            ticketInfo.ticketsCount,
                            ticketInfo.ticketLoserCount
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className={`btn btn-sm btn-icon btn-bg-light ${stateToLinkColor(
                      TicketStatusEnum.loser
                    )}`}
                  >
                    <KTSVG path='/media/icons/duotune/arrows/arr064.svg' className='svg-icon-2' />
                  </a>
                </td>
              </tr>
              <tr>
                <th>
                  <div className='symbol symbol-50px me-2'>
                    <span className='symbol-label'>
                      <span className={`fs-4 ${stateToColor(TicketStatusEnum.pendingPayment)}`}>
                        {ticketInfo.ticketsPendingPaymentCount}
                      </span>
                    </span>
                  </div>
                </th>
                <td>
                  <a
                    href='#'
                    className={`fw-bold text-hover-primary mb-1 fs-6 ${stateToLinkColor(
                      TicketStatusEnum.pendingPayment
                    )}`}
                  >
                    {stateToText(TicketStatusEnum.pendingPayment)}
                  </a>
                </td>
                <td>
                  <div className='d-flex flex-column w-100 me-2'>
                    <div className='d-flex flex-stack mb-2'>
                      <span className='text-muted me-2 fs-7 fw-semibold'>{`${calculatePercentage(
                        ticketInfo.ticketsCount,
                        ticketInfo.ticketsPendingPaymentCount
                      )}
                        %`}</span>
                    </div>
                    <div className='progress h-6px w-100'>
                      <div
                        className={`progress-bar bg-primary ${stateToBarColor(
                          TicketStatusEnum.pendingPayment
                        )}`}
                        role='progressbar'
                        style={{
                          width: `${calculatePercentage(
                            ticketInfo.ticketsCount,
                            ticketInfo.ticketsPendingPaymentCount
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className={`btn btn-sm btn-icon btn-bg-light ${stateToLinkColor(
                      TicketStatusEnum.pendingPayment
                    )}`}
                  >
                    <KTSVG path='/media/icons/duotune/arrows/arr064.svg' className='svg-icon-2' />
                  </a>
                </td>
              </tr>
              <tr>
                <th>
                  <div className='symbol symbol-50px me-2'>
                    <span className='symbol-label'>
                      <span className={`fs-4 ${stateToColor(TicketStatusEnum.cancelled)}`}>
                        {ticketInfo.ticketsCancelledCount}
                      </span>
                    </span>
                  </div>
                </th>
                <td>
                  <a
                    href='#'
                    className={`fw-bold text-hover-primary mb-1 fs-6 ${stateToColor(
                      TicketStatusEnum.cancelled
                    )}`}
                  >
                    {stateToText(TicketStatusEnum.cancelled)}
                  </a>
                </td>
                <td>
                  <div className='d-flex flex-column w-100 me-2'>
                    <div className='d-flex flex-stack mb-2'>
                      <span className='text-muted me-2 fs-7 fw-semibold'>{`${calculatePercentage(
                        ticketInfo.ticketsCount,
                        ticketInfo.ticketsCancelledCount
                      )}
                        %`}</span>
                    </div>
                    <div className='progress h-6px w-100'>
                      <div
                        className={`progress-bar bg-primary ${stateToBarColor(
                          TicketStatusEnum.cancelled
                        )}`}
                        role='progressbar'
                        style={{
                          width: `${calculatePercentage(
                            ticketInfo.ticketsCount,
                            ticketInfo.ticketsCancelledCount
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className={`btn btn-sm btn-icon btn-bg-light ${stateToLinkColor(
                      TicketStatusEnum.cancelled
                    )}`}
                  >
                    <KTSVG path='/media/icons/duotune/arrows/arr064.svg' className='svg-icon-2' />
                  </a>
                </td>
              </tr>
              <tr>
                <th>
                  <div className='symbol symbol-50px me-2'>
                    <span className='symbol-label'>
                      <span className={`fs-4 ${stateToColor(TicketStatusEnum.winner)}`}>
                        {ticketInfo.ticketsWinnerCount}
                      </span>
                    </span>
                  </div>
                </th>
                <td>
                  <a
                    href='#'
                    className={`fw-bold text-hover-primary mb-1 fs-6 ${stateToColor(
                      TicketStatusEnum.winner
                    )}`}
                  >
                    {stateToText(TicketStatusEnum.winner)}
                  </a>
                </td>
                <td>
                  <div className='d-flex flex-column w-100 me-2'>
                    <div className='d-flex flex-stack mb-2'>
                      <span className='text-muted me-2 fs-7 fw-semibold'>{`${calculatePercentage(
                        ticketInfo.ticketsCount,
                        ticketInfo.ticketsWinnerCount
                      )}
                        %`}</span>
                    </div>
                    <div className='progress h-6px w-100'>
                      <div
                        className={`progress-bar bg-primary ${stateToBarColor(
                          TicketStatusEnum.winner
                        )}`}
                        role='progressbar'
                        style={{
                          width: `${calculatePercentage(
                            ticketInfo.ticketsCount,
                            ticketInfo.ticketsWinnerCount
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className='text-end'>
                  <a
                    href='#'
                    className={`btn btn-sm btn-icon btn-bg-light ${stateToLinkColor(
                      TicketStatusEnum.winner
                    )}`}
                  >
                    <KTSVG path='/media/icons/duotune/arrows/arr064.svg' className='svg-icon-2' />
                  </a>
                </td>
              </tr>
            </tbody>
            {/* end::Table body */}
          </table>
          {/* end::Table */}
        </div>
        {/* end::Table container */}
      </div>
    </div>
  )
}

export {TicketReportChart}
