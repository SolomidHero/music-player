import configureStore from './store/store'
import { LogoutState } from './store/reducers/UserUpdater'

const store = configureStore(LogoutState)

export default store;