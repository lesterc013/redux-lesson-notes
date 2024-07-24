import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

import noteReducer, { createNoteAction } from './reducers/noteReducer'
import filterReducer, { filterChange } from './reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
})

const store = createStore(reducer)

console.log(store.getState())
store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(
  createNoteAction(
    'combineReducers forms one reducer from many simple reducers'
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(
    // Provide component makes store available to all child components
    <Provider store={store}>
      <App />
    </Provider>
  )
}

// We create a renderApp function so that we can pass this to subscribe -- if needed
renderApp()

// If there are any dispatches to the store, we will then call renderApp -- This allows us to re-render everytime an action is dispatched to the store
// But now with react-redux - useSelector in particular, useSelector subscribes to the store and sets up a listener that triggers a re-render when the selected state changes
// store.subscribe(renderApp)
