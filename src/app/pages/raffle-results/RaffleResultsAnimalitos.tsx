import React from 'react'
import RaffleResultForm from '../../components/Forms/RaffleResultForm/RaffleResultForm'
import RaffleResultCard from '../../components/Cards/RaffleResultCard/RaffleResultCard'

const RaffleResultsAnimalitos = () => {
  return (
    <div className='container-fluid'>
      <div className='mb-10'>
        <ul className='nav nav-pills mb-3' id='pills-tab' role='tablist'>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link active'
              id='pills-home-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-home'
              type='button'
              role='tab'
              aria-controls='pills-home'
              aria-selected='true'
            >
              Home
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link'
              id='pills-profile-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-profile'
              type='button'
              role='tab'
              aria-controls='pills-profile'
              aria-selected='false'
            >
              Profile
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link'
              id='pills-contact-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-contact'
              type='button'
              role='tab'
              aria-controls='pills-contact'
              aria-selected='false'
            >
              Contact
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link'
              id='pills-disabled-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-disabled'
              type='button'
              role='tab'
              aria-controls='pills-disabled'
              aria-selected='false'

            >
              Otro
            </button>
          </li>
        </ul>
      </div>

      <div className='tab-content' id='pills-tabContent'>
        <div
          className='tab-pane fade show active'
          id='pills-home'
          role='tabpanel'
          aria-labelledby='pills-home-tab'
          tabIndex={0}
        >
          This is some placeholder content the Home tab's associated content. Clicking another tab
          will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
          control the content visibility and styling. You can use it with tabs, pills, and any other
          .nav-powered navigation.
        </div>
        <div
          className='tab-pane fade'
          id='pills-profile'
          role='tabpanel'
          aria-labelledby='pills-profile-tab'
          tabIndex={0}
        >
          This is some placeholder content the Profile tab's associated content. Clicking another
          tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes
          to control the content visibility and styling. You can use it with tabs, pills, and any
          other .nav-powered navigation.
        </div>
        <div
          className='tab-pane fade'
          id='pills-contact'
          role='tabpanel'
          aria-labelledby='pills-contact-tab'
          tabIndex={0}
        >
          This is some placeholder content the Contact tab's associated content. Clicking another
          tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes
          to control the content visibility and styling. You can use it with tabs, pills, and any
          other .nav-powered navigation.
        </div>
        <div
          className='tab-pane fade'
          id='pills-disabled'
          role='tabpanel'
          aria-labelledby='pills-disabled-tab'
          tabIndex={0}
        >
          Danny
        </div>
      </div>

      <div className='mb-10'>
        <RaffleResultForm />
      </div>
      <div className='row row-gap-8'>
        <div className='col-sm-12 col-md-4'>
          <RaffleResultCard state='no-played' />
        </div>
        <div className='col-sm-12 col-md-4'>
          <RaffleResultCard state='pending-result' />
        </div>
        <div className='col-sm-12 col-md-4'>
          <RaffleResultCard state='pending-approval' />
        </div>
        <div className='col-sm-12 col-md-4'>
          <RaffleResultCard state='approved' />
        </div>
        <div className='col-sm-12 col-md-4'>
          <RaffleResultCard state='pending-approval' />
        </div>
      </div>
    </div>
  )
}

export default RaffleResultsAnimalitos
