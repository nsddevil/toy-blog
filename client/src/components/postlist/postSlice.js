import { createSlice } from '@reduxjs/toolkit';
import { getPostsApi, addPostApi } from '../../api/postApi';

const initialState = {
  isLoading: false,
  error: null,
  posts: [],
  lastPage: 1,
  currentPage: 0,
};

const postSlice = createSlice({
  name: 'postList',
  initialState,
  reducers: {
    getPostsStart: (state, action) => {
      state.isLoading = true;
    },
    getPostsSuccess: (state, action) => {
      const { posts, lastPage, keepData } = action.payload;
      state.isLoading = false;
      state.error = null;
      state.posts = keepData ? state.posts.concat(posts) : posts;
      state.currentPage = keepData ? state.currentPage + 1 : 1;
      state.lastPage = lastPage;
    },
    getPostsFailure: (state, action) => {
      const { error } = action.payload;
      state.isLoading = true;
      state.error = error;
    },
    addPostStart: (state, action) => {
      state.isLoading = true;
    },
    addPostSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
    },
    addPostFailure: (state, action) => {
      const { error } = action.payload;
      state.isLoading = true;
      state.error = error;
    },
    resetPosts: (state, action) => {
      state.posts = [];
      state.currentPage = 0;
    },
  },
});

const {
  getPostsFailure,
  getPostsStart,
  getPostsSuccess,
  addPostFailure,
  addPostStart,
  addPostSuccess,
} = postSlice.actions;

export const { resetPosts } = postSlice.actions;

export const getPostsAll = (query = {}, keepData = false) => async (dispatch) => {
  try {
    dispatch(getPostsStart());
    const res = await getPostsApi(query);
    dispatch(getPostsSuccess({ ...res.data, keepData }));
  } catch (error) {
    dispatch(getPostsFailure(error.response.data));
  }
};

export const addPost = (form) => async (dispatch) => {
  try {
    dispatch(addPostStart());
    const res = await addPostApi(form);
    dispatch(addPostSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(addPostFailure(error.response.data));
  }
};

export default postSlice.reducer;
