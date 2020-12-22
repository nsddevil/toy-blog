import { createSlice } from '@reduxjs/toolkit';
import { getPostApi, deletePostApi } from '../../api/postApi';

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
    deletePostStart: (state, action) => {
      state.isLoading = true;
    },
    deletePostSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
    },
    deletePostFailure: (state, action) => {
      const { error } = action.payload;
      state.isLoading = true;
      state.error = error;
    },
    resetPost: (state, action) => {
      state.post = null;
      state.prevPostId = '';
    },
  },
});

const {
  getPostFailure,
  getPostStart,
  getPostSuccess,
  deletePostFailure,
  deletePostStart,
  deletePostSuccess,
} = detailSlice.actions;

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

export const deletePost = (postId) => async (dispatch) => {
  try {
    dispatch(deletePostStart());
    const res = await deletePostApi(postId);
    dispatch(deletePostSuccess(res.data));
    return res;
  } catch (error) {
    dispatch(deletePostFailure(error.response.data));
  }
};

export default detailSlice.reducer;
