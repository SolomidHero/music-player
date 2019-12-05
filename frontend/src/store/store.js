import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import thunk from 'redux-thunk'
import UserUpdater from './reducers/UserUpdater'

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  || compose


const configureStore = (initialState = {}) => {
  return createStore(
    UserUpdater,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && 
    composeEnhancers(
      applyMiddleware(thunk)
    )
  )
}
export default configureStore