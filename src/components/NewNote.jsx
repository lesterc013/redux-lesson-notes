import { createNote } from '../reducers/noteReducer'
import { useDispatch } from 'react-redux'
import noteService from '../../services/notes'

const NewNote = () => {
  const dispatch = useDispatch()

  // addNote event handler
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    // Reset the input field to empty string
    event.target.note.value = ''
    // store.dispatch(type and payload (newNote))
    // const newNote = await noteService.createNew(content)
    dispatch(createNote(content))
  }

  return (
    <form onSubmit={addNote}>
      <input name='note' type='text' />
      <button type='submit'>add</button>
    </form>
  )
}

export default NewNote
