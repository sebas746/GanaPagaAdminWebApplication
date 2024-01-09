import React, {useMemo} from 'react'
import {usePersonalizedQuotaOverview} from './usePersonalizedQuotaOverview'
import {Modal, Spinner} from 'react-bootstrap'
import ConditionalRedering from '../../../helpers/ConditionalRedering'
import {Link} from 'react-router-dom'
import CustomPagination from '../../../components/CustomPagination/CustomPagination'
import Button from 'react-bootstrap/Button'

interface OverviewProps {}

const PersonalizedQuotaOverview = ({}: OverviewProps) => {
  const {
    deletePersonalizedQuota,
    handleDeleteAnimalitosQuota,
    isDeletingQuota,
    isFetching,
    listPersonalizedAnimalitosQuota,
    lotteries,
    onChangeDeleteAnimalitosQuota,
    onChangeLottery,
    onChangePageSizes,
    onHandleCloseModal,
    pageIndex,
    pageSize,
    pageSizeArray,
    selectedLottery,
    setPageIndex,
    showModal,
  } = usePersonalizedQuotaOverview()

  const onHandleDelete = (lotteryId: number, animalitoId: number) => {
    deletePersonalizedQuota({
      lotteryId,
      animalitoId,
    })
  }

  const renderRows = useMemo(() => {
    return listPersonalizedAnimalitosQuota?.items?.map((personalizedQuota) => {
      const onClickWrapper = () =>
        onChangeDeleteAnimalitosQuota(personalizedQuota.animalitosLotteryId, personalizedQuota.animalitosAnimalId)
      return (
        <tr
          key={`personalizede-quota-${personalizedQuota.animalitosAnimalId}-${personalizedQuota.animalitosLotteryId}`}
        >
          <td>{personalizedQuota.animalitosLotteryName}</td>
          <td>{personalizedQuota.animalitosAnimalName}</td>
          <td>{personalizedQuota.animalitosOverallBetUsdValue}</td>
          <td>{personalizedQuota.animalitosOverallBetVesValue}</td>
          <td>
            <div className='d-flex gap-3 align-items-center justify-content-center'>
              <Link
                to={`/pages/personalized-quota/create/${personalizedQuota.animalitosLotteryId}/${personalizedQuota.animalitosAnimalId}`}
                className='btn btn-color-gray-800'
              >
                <i className='bi bi-pencil fs-1'></i>
              </Link>
              <button className='btn btn-color-danger' onClick={onClickWrapper}>
                <i className='bi bi-trash fs-1'></i>
              </button>
            </div>
          </td>
        </tr>
      )
    })
  }, [listPersonalizedAnimalitosQuota])

  return (
    <div className='container-fluid'>
      <div className='mb-10'>
        <div className='d-flex gap-3 mb-10 align-items-center'>
          <div className='col-4 '>
            <label className='form-label'>Seleccione la loteria</label>
            <select className='form-select' onChange={onChangeLottery} value={selectedLottery}>
              <option value='0'>Todas las loterias</option>
              {lotteries.map((lottery) => (
                <option key={`lottery-${lottery.lotteryId}`} value={lottery.lotteryId}>
                  {lottery.lotteryName}
                </option>
              ))}
            </select>
          </div>
          <div className={`col-3`}>
            <label className='form-label'>Número de elementos por página</label>
            <select className='form-select' onChange={onChangePageSizes}>
              {pageSizeArray.map((size) => (
                <option key={`page-size-${size}`} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='d-flex justify-content-end mb-8'>
          <Link to={`/pages/personalized-quota/create`}>
            <Button variant={'success'}>
              Agregar Cupo Personalizado
            </Button>
          </Link>
        </div>
        <ConditionalRedering isTrue={!isFetching}>
          <div className='bg-white'>
            <table className='table table-hover table-bordered'>
              <thead className='text-center align-middle'>
              <tr>
                <th colSpan={5} className='text-center'>
                  Resumen
                </th>
              </tr>
              <tr>
                <th>Loteria</th>
                <th>Animalito</th>
                <th>Cupo USD</th>
                <th>Cupo VES</th>
                <th>Acciones</th>
              </tr>
              </thead>
              <tbody className='text-center align-middle'>{renderRows}</tbody>
            </table>
          </div>
        </ConditionalRedering>

        <ConditionalRedering isTrue={isFetching}>
          <div className='d-flex justify-content-center mb-8'>
            <Spinner className='fs-1' />
          </div>
        </ConditionalRedering>

        <CustomPagination
          totalElements={listPersonalizedAnimalitosQuota.totalCount}
          pageSize={pageSize}
          currentPage={pageIndex}
          onClickPage={setPageIndex}
        />
        <Modal
          show={showModal}
          backdrop='static'
          keyboard={false}
          centered
          onHide={onHandleCloseModal}
        >
          <Modal.Header closeButton onHide={onHandleCloseModal}>
            <Modal.Title>Borrar</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Esta seguro de ejecutar la acción?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='secondary' onClick={onHandleCloseModal}>
              No
            </Button>
            <Button variant='danger' onClick={handleDeleteAnimalitosQuota}>
              {isDeletingQuota && <Spinner />}
              {!isDeletingQuota && <span>Si, borrar</span>}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default PersonalizedQuotaOverview
