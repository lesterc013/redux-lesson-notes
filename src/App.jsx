import { useEffect } from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

import noteService from '../services/notes'
import { initializeNotes, setNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  // After component renders, getAll notes from the db based on the service, then dispatch the notes to update the Redux state
  useEffect(() => {
    // noteService.getAll().then((notes) => dispatch(setNotes(notes)))
    dispatch(initializeNotes())
  }, [])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
