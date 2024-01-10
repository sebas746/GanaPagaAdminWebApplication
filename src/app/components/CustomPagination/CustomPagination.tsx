import React from 'react'
import clsx from 'clsx'
import {Pagination} from 'react-bootstrap'

interface PaginationProps {
  totalElements: number
  pageSize: number
  currentPage: number
  onClickPage: (page: number) => void
}

const CustomPagination = ({totalElements, pageSize, onClickPage, currentPage}: PaginationProps) => {
  const showPagination = totalElements / pageSize > 1
  const numberOfPages = Math.ceil(totalElements / pageSize)

  const _onClickPage = (page: number) => {
    onClickPage(page)
  }

  const _onClickPrevious = () => {
    if (currentPage > 0) {
      onClickPage(currentPage - 1)
    }
  }

  const _onClickNext = () => {
    if (currentPage < numberOfPages) {
      onClickPage(currentPage + 1)
    }
  }

  const renderPages = () => {
    const pages = []
    for (let i = 0; i < numberOfPages; i++) {
      const onClickWrapper = () => _onClickPage(i)
      pages.push(
        <Pagination.Item
          key={`page-pagination-${i}`}
          onClick={onClickWrapper}
          active={i === currentPage}
        >
          {i + 1}
        </Pagination.Item>
      )
    }
    return pages
  }

  if (!showPagination) return <></>

  return (
    <Pagination size="lg">
      <Pagination.Prev onClick={_onClickPrevious} disabled={currentPage === 0} />
      {renderPages()}
      <Pagination.Next onClick={_onClickNext} disabled={numberOfPages - 1 === currentPage} />
    </Pagination>
  )
}

export default CustomPagination
