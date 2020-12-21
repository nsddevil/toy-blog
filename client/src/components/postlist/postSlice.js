import { createSlice } from '@reduxjs/toolkit';
import { getPostsApi } from '../../api/postApi';

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
      const { posts, lastPage } = action.payload;
      state.isLoading = false;
      state.error = null;
      state.posts = state.posts.concat(posts);
      state.currentPage += 1;
      state.lastPage = lastPage;
    },
    getPostsFailure: (state, action) => {
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

const { getPostsFailure, getPostsStart, getPostsSuccess } = postSlice.actions;

export const { resetPosts } = postSlice.actions;

export const getPostsAll = (query = {}) => async (dispatch) => {
  try {
    dispatch(getPostsStart());
    const res = await getPostsApi(query);
    dispatch(getPostsSuccess(res.data));
  } catch (error) {
    dispatch(getPostsFailure(error.response.data));
  }
};

export default postSlice.reducer;
