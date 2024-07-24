import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { createToggleImportance } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content} <strong>{note.important && 'important'}</strong>
    </li>
  )
}

const selectNotes = (state) => state.notes
const selectFilter = (state) => state.filter
const selectFilteredNotes = createSelector(
  [selectNotes, selectFilter],
  (notes, filter) => {
    if (filter === 'ALL') {
      return notes
    }
    return filter === 'IMPORTANT'
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important)
  }
)

const Notes = () => {
  const notes = useSelector(selectFilteredNotes)
  const dispatch = useDispatch()

  // Define handleClick here and pass down as props to
  // Maintain Separation of Concerns i.e. Note will just be presentational
  // Single source of truth - Logic and Function is defined only in one place: Notes
  // Avoid unnecessary re-renders - If the handler is defined in Note, a new function will be created everytime Note re-renders. May cause issues

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(createToggleImportance(note.id))}
        />
      ))}
    </ul>
  )
}

export default Notes
