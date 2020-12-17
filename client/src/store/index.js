import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from '../components/auth/authSlice';

const rootReducer = combineReducers({
  auth,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
