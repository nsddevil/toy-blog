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
      const { posts, lastPage, nickname } = action.payload;
      state.isLoading = false;
      state.error = null;
      state.posts = posts;
      state.lastPage = lastPage;
      state.currentPage = 1;
      state.prevNickname = nickname;
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
} = userPostSlice.actions;

export const { resetPosts } = userPostSlice.actions;

export const getPostsAll = (query = {}, option = false) => async (dispatch) => {
  try {
    dispatch(getPostsStart());
    const res = await getPostsApi(query);
    if (option) {
      dispatch(getNewPostsSuccess({ ...res.data, nickname: query.nickname }));
    } else {
      dispatch(getPostsSuccess(res.data));
    }
  } catch (error) {
    dispatch(getPostsFailure(error.response.data));
  }
};

export default userPostSlice.reducer;
