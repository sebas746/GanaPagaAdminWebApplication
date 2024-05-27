import React from 'react'
import {Pagination} from 'react-bootstrap'

interface ICustomPaginatorProps {
  totalItems: number
  pageSize: number
  handleChange: (index: number) => void
  showPagination: boolean
  pageIndex: number
}

const CustomPaginator = ({
  totalItems,
  pageSize,
  handleChange,
  showPagination,
  pageIndex,
}: ICustomPaginatorProps) => {
  if (!showPagination) return null

  const totalPages = Math.ceil(totalItems / pageSize)
  const currentPage = pageIndex + 1 // assuming pageIndex is 0-based
  const maxPagesToShow = 5

  const getPaginationItems = () => {
    let items = []

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

    if (startPage > 1) {
      items.push(
        <Pagination.Item key={1} onClick={() => handleChange(0)}>
          1
        </Pagination.Item>
      )

      if (startPage > 2) {
        items.push(<Pagination.Ellipsis key='start-ellipsis' />)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => handleChange(i - 1)}>
          {i}
        </Pagination.Item>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<Pagination.Ellipsis key='end-ellipsis' />)
      }

      items.push(
        <Pagination.Item key={totalPages} onClick={() => handleChange(totalPages - 1)}>
          {totalPages}
        </Pagination.Item>
      )
    }

    return items
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => handleChange(0)} disabled={pageIndex === 0} />
      <Pagination.Prev onClick={() => handleChange(pageIndex - 1)} disabled={pageIndex === 0} />
      {getPaginationItems()}
      <Pagination.Next
        onClick={() => handleChange(pageIndex + 1)}
        disabled={pageIndex === totalPages - 1}
      />
      <Pagination.Last
        onClick={() => handleChange(totalPages - 1)}
        disabled={pageIndex === totalPages - 1}
      />
    </Pagination>
  )
}

export default CustomPaginator
