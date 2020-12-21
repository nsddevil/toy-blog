import { createSlice } from '@reduxjs/toolkit';
import { getPostApi } from '../../api/postApi';

const initialState = {
  isLoading: false,
  error: null,
  post: null,
  prevPostId: '',
};

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    getPostStart: (state, action) => {
      state.isLoading = true;
    },
    getPostSuccess: (state, action) => {
      const { post } = action.payload;
      state.isLoading = false;
      state.error = null;
      state.post = post;
      state.prevPostId = post._id;
    },
    getPostFailure: (state, action) => {
      const { error } = action.payload;
      state.isLoading = true;
      state.error = error;
    },
    resetPost: (state, action) => {
      state.post = null;
    },
  },
});

const { getPostFailure, getPostStart, getPostSuccess } = detailSlice.actions;

export const { resetPost } = detailSlice.actions;

export const getPost = (postId) => async (dispatch) => {
  try {
    dispatch(getPostStart());
    const res = await getPostApi(postId);
    dispatch(getPostSuccess(res.data));
    return res.data;
  } catch (error) {
    dispatch(getPostFailure(error.response.data));
  }
};

export default detailSlice.reducer;
