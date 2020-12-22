import { configureStore, combineReducers } from '@reduxjs/toolkit';
import auth from '../components/auth/authSlice';
import write from '../components/write/writeSlice';
import detail from '../components/detail/detailSlice';
import postList from '../components/postlist/postSlice';
import tagPost from '../components/postlist/tagPostSlice';
import userPost from '../components/postlist/userPostSlice';
import commentList from '../components/comment/commentSlice';

const rootReducer = combineReducers({
  auth,
  write,
  detail,
  postList,
  tagPost,
  userPost,
  commentList,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
