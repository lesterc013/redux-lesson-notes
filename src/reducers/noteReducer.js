import { createSlice, current } from '@reduxjs/toolkit'
import noteService from '../../services/notes'

const initialState = []

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

// createSlice returns an object containing the reducer, as well as the action creators
const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      state.push(action.payload)
    },
    createToggleImportance(state, action) {
      const id = action.payload
      const noteToChange = state.find((n) => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      }
      console.log(current(state))
      return state.map((note) => (note.id !== id ? note : changedNote))
    },
    // To use this with the service to GET from db, then append to the Redux store
    appendNote(state, action) {
      state.push(action.payload)
    },
    // Same concept as appendNote but for multiple notes at once - i.e. GET all the notes, and then set state as it
    setNotes(state, action) {
      return action.payload
    },
  },
})

export const initializeNotes = () => {
  // Thunk to return an async function that:
  return async (dispatch) => {
    // Async call to get all notes from db
    const notes = await noteService.getAll()
    // Dispatch setNotes to update Redux store
    dispatch(setNotes(notes))
  }
}

// export const createNote = (content) => {
//   return async (dispatch) => {
//     const newNote = await noteService.createNew(content)
//     dispatch(appendNote(newNote))
//   }
// }

export const { createNote, createToggleImportance, appendNote, setNotes } =
  noteSlice.actions
export default noteSlice.reducer

// const noteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'NEW_NOTE':
//       // Below is bad because we are mutating the state and not allowed
//       // state.push(action.payload)
//       // return state
//       return [...state, action.payload]
//     case 'TOGGLE_IMPORTANCE':
//       const id = action.payload.id
//       const noteToChange = state.find((note) => note.id === id)
//       const changedNote = {
//         ...noteToChange,
//         important: !noteToChange.important,
//       }
//       return state.map((note) => (note.id === id ? changedNote : note))
//   }
//   return state
// }

// Action Creators -- responsible to create the actions which is then called in dispatch
// export const createNoteAction = (content) => {
//   return {
//     type: 'NEW_NOTE',
//     payload: {
//       content,
//       important: false,
//       id: generateId(),
//     },
//   }
// }

// export const createToggleImportanceAction = (id) => {
//   return {
//     type: 'TOGGLE_IMPORTANCE',
//     payload: {
//       id,
//     },
//   }
// }
