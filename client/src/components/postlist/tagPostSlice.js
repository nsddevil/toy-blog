import { createSlice } from '@reduxjs/toolkit';
import { getPostsApi } from '../../api/postApi';

const initialState = {
  isLoading: false,
  error: null,
  posts: [],
  lastPage: 1,
  currentPage: 1,
  prevTag: '',
};

const tagPostSlice = createSlice({
  name: 'tagPost',
  initialState,
  reducers: {
    getPostsStart: (state, action) => {
      state.isLoading = true;
    },
    getPostsSuccess: (state, action) => {
      const { posts, lastPage, keepData, tag } = action.payload;
      state.isLoading = false;
      state.error = null;
      state.posts = keepData ? state.posts.concat(posts) : posts;
      state.currentPage = keepData ? state.currentPage + 1 : 1;
      state.lastPage = lastPage;
      state.prevTag = tag;
    },
    getPostsFailure: (state, action) => {
      const { error } = action.payload;
      state.isLoading = true;
      state.error = error;
    },

    resetPosts: (state, action) => {
      state.posts = [];
      state.currentPage = 1;
      state.prevTag = '';
    },
  },
});

const { getPostsFailure, getPostsStart, getPostsSuccess } = tagPostSlice.actions;

export const { resetPosts } = tagPostSlice.actions;

export const getPostsAll = (query = {}, keepData = false) => async (dispatch) => {
  try {
    dispatch(getPostsStart());
    const res = await getPostsApi(query);
    dispatch(getPostsSuccess({ ...res.data, keepData, tag: query.tag }));
  } catch (error) {
    dispatch(getPostsFailure(error.response.data));
  }
};

export default tagPostSlice.reducer;
