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
    getNewPostsSuccess: (state, action) => {
      const { posts, lastPage, tag } = action.payload;
      state.isLoading = false;
      state.error = null;
      state.posts = posts;
      state.currentPage = 1;
      state.prevTag = tag;
      state.lastPage = lastPage;
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
  getNewPostsSuccess,
} = tagPostSlice.actions;

export const { resetPosts } = tagPostSlice.actions;

export const getPostsAll = (query = {}, option = false) => async (dispatch) => {
  try {
    dispatch(getPostsStart());
    const res = await getPostsApi(query);
    if (option) {
      dispatch(getNewPostsSuccess({ ...res.data, tag: query.tag }));
    } else {
      dispatch(getPostsSuccess(res.data));
    }
  } catch (error) {
    dispatch(getPostsFailure(error.response.data));
  }
};

export default tagPostSlice.reducer;
