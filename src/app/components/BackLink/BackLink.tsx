import React from 'react'
import { useNavigate } from 'react-router-dom'

function BackLink() {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  }

  return (
    <button onClick={back} className='btn btn-link'>
      <i className="fa-solid fa-arrow-left fs-3 text-danger"></i>
      <span className="text-danger">Regresar</span>
    </button>
  )
}

export default BackLink
