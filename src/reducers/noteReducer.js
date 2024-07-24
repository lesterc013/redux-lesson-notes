import { createSlice, current } from '@reduxjs/toolkit'

const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
]

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

// createSlice returns an object containing the reducer, as well as the action creators
const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    createNote(state, action) {
      const content = action.payload
      state.push({
        content,
        important: false,
        id: generateId(),
      })
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
  },
})

export const { createNote, createToggleImportance } = noteSlice.actions
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
