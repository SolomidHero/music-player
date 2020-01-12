import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  || compose


const configureStore = (initialState = {}) => {
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  )
}
export default configureStore