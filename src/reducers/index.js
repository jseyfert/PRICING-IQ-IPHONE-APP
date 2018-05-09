import { combineReducers } from 'redux';
import  auth from './auth_reducer';
import  app from './app_reducer';

export default combineReducers({
  auth: auth,
  app: app,
})
