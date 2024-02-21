import {Form} from 'react-bootstrap'
import {usePromoterList} from '../../hooks/promoterList.hook'
import {IPromoter} from '../../../types/Promoter.types'
import RenderLoader from '../RenderLoader/RenderLoader'

const PromoterSelector = () => {
  const {promoters, isLoading, setPromoterId, promoterId} = usePromoterList()
  const isDataLoaded = !isLoading && promoters && promoters.length > 0
  return (
    <div className='menu-item px-5 mb-4'>
      {isDataLoaded && (
        <Form.Select
          defaultValue={promoterId ?? ''}
          onChange={(e) => setPromoterId(e.target.value)}
          className='form-select form-select-solid'
        >
          {promoters.map((promoter: IPromoter) => (
            <option key={promoter.promoterId} value={promoter.promoterId}>
              {promoter.promoterName}
            </option>
          ))}
        </Form.Select>
      )}
      <RenderLoader show={isLoading} />
    </div>
  )
}

export default PromoterSelector
