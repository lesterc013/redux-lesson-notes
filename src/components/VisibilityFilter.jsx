import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  return (
    <>
      all
      <input
        type='radio'
        name='filter'
        onChange={() => dispatch(filterChange('ALL'))}
      />
      important
      <input
        type='radio'
        name='filter'
        onChange={() => dispatch(filterChange('IMPORTANT'))}
      />
      nonImportant
      <input
        type='radio'
        name='filter'
        onChange={() => dispatch(filterChange('NONIMPORTANT'))}
      />
    </>
  )
}

export default VisibilityFilter
