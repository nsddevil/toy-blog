import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from '../components/auth/authSlice';
import write from '../components/write/writeSlice';

const rootReducer = combineReducers({
  auth,
  write,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
