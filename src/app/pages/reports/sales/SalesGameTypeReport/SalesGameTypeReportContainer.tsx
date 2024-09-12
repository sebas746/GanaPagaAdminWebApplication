const SalesGameTypeReportContainer = () => {
  return (
    <div className='row'>
      <div className='col-xl-12'>
        <BarSalesSalePointReportWrapper
          className='card-xl-stretch mb-5 mb-xl-8'
          setTempFilters={setSalesSalePointTempFilters}
          tempFilters={saleSalesPointTempFilters}
          currenciesData={[
            {currencyCode: 'USD', data: usdSalePointData},
            {currencyCode: 'VES', data: vesSalePointData},
          ]}
        />
      </div>
    </div>
  )
}
