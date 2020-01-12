import { combineReducers } from 'redux';
import UserUpdater from "./reducers/UserUpdater";
import auth from "./reducers/auth";

const combinedReduce = combineReducers({
  player: UserUpdater,
  auth: auth,
})

const rootReducer = (state, action) => {
  if (action.type === 'AUTHENTICATION_ERROR') {
    state = undefined;
  }
  return combinedReduce(state, action);
}

export default rootReducer;