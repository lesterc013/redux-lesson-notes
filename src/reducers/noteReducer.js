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

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTE':
      // Below is bad because we are mutating the state and not allowed
      // state.push(action.payload)
      // return state
      return [...state, action.payload]
    case 'TOGGLE_IMPORTANCE':
      const id = action.payload.id
      const noteToChange = state.find((note) => note.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      }
      return state.map((note) => (note.id === id ? changedNote : note))
  }
  return state
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

// Action Creators -- responsible to create the actions which is then called in dispatch
export const createNoteAction = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId(),
    },
  }
}

export const createToggleImportanceAction = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: {
      id,
    },
  }
}

export default noteReducer
