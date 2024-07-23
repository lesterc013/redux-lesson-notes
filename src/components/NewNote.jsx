import { createNoteAction } from '../reducers/noteReducer'
import { useDispatch } from 'react-redux'

const NewNote = () => {
  const dispatch = useDispatch()

  // addNote event handler
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    // Reset the input field to empty string
    event.target.note.value = ''
    // store.dispatch(type and payload (newNote))
    dispatch(createNoteAction(content))
  }

  return (
    <form onSubmit={addNote}>
      <input name='note' type='text' />
      <button type='submit'>add</button>
    </form>
  )
}

export default NewNote
