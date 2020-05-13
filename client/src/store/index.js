import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { userReducer, dataSahamReducer } from './reducer/index';

const reducers = combineReducers({
  userReducer,
  dataSahamReducer
})

export default createStore(reducers, applyMiddleware(thunk));
