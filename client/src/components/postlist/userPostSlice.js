import { createSlice } from '@reduxjs/toolkit';
import { getPostsApi } from '../../api/postApi';

const initialState = {
  isLoading: false,
  error: null,
  posts: [],
  lastPage: 1,
  currentPage: 1,
  prevNickname: '',
};

const userPostSlice = createSlice({
  name: 'userPost',
  initialState,
  reducers: {
    getPostsStart: (state, action) => {
      state.isLoading = true;
    },
    getPostsSuccess: (state, action) => {
      const { posts, lastPage, keepData, nickname } = action.payload;
      state.isLoading = false;
      state.error = null;
      state.posts = keepData ? state.posts.concat(posts) : posts;
      state.currentPage = keepData ? state.currentPage + 1 : 1;
      state.lastPage = lastPage;
      state.prevNickname = nickname;
    },
    getPostsFailure: (state, action) => {
      const { error } = action.payload;
      state.isLoading = true;
      state.error = error;
    },
    resetPosts: (state, action) => {
      state.posts = [];
      state.currentPage = 1;
      state.prevNickname = '';
    },
  },
});

const { getPostsFailure, getPostsStart, getPostsSuccess } = userPostSlice.actions;

export const { resetPosts } = userPostSlice.actions;

export const getPostsAll = (query = {}, keepData = false) => async (dispatch) => {
  try {
    dispatch(getPostsStart());
    const res = await getPostsApi(query);
    dispatch(getPostsSuccess({ ...res.data, keepData, nickname: query.nickname }));
  } catch (error) {
    dispatch(getPostsFailure(error.response.data));
  }
};

export default userPostSlice.reducer;
