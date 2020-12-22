import { createSlice } from '@reduxjs/toolkit';
import {
  writeCommentApi,
  getCommentsApi,
  deleteCommentApi,
} from '../../api/commentApi';

const initialState = {
  isLoading: false,
  error: null,
  comments: [],
};

const commentSlice = createSlice({
  name: 'commentList',
  initialState,
  reducers: {
    getCommentsStart: (state, action) => {
      state.isLoading = true;
    },
    getCommentsSuccess: (state, action) => {
      const { comments } = action.payload;
      state.isLoading = false;
      state.error = null;
      state.comments = comments;
    },
    getCommentsFailure: (state, action) => {
      const { error } = action.payload;
      state.isLoading = true;
      state.error = error;
    },
    writeCommentStart: (state, action) => {
      state.isLoading = true;
    },
    writeCommentSuccess: (state, action) => {
      const { comment } = action.payload;
      state.isLoading = false;
      state.error = null;
      state.comments.unshift(comment);
    },
    writeCommentFailure: (state, action) => {
      const { error } = action.payload;
      state.isLoading = false;
      state.error = error;
    },
    deleteCommentStart: (state, action) => {
      state.isLoading = true;
    },
    deleteCommentSuccess: (state, action) => {
      const { commentId } = action.payload;
      const index = state.comments.findIndex(
        (comment) => comment._id === commentId
      );
      state.isLoading = false;
      state.error = null;
      state.comments.splice(index, 1);
    },
    deleteCommentFailure: (state, action) => {
      const { error } = action.payload;
      state.isLoading = true;
      state.error = error;
    },
  },
});

const {
  getCommentsFailure,
  getCommentsStart,
  getCommentsSuccess,
  writeCommentFailure,
  writeCommentStart,
  writeCommentSuccess,
  deleteCommentFailure,
  deleteCommentStart,
  deleteCommentSuccess,
} = commentSlice.actions;

export const writeComment = (form) => async (dispatch) => {
  try {
    dispatch(writeCommentStart());
    const res = await writeCommentApi(form);
    dispatch(writeCommentSuccess(res.data));
  } catch (error) {
    dispatch(writeCommentFailure(error.response.data));
  }
};

export const getComments = (postId) => async (dispatch) => {
  try {
    dispatch(getCommentsStart());
    const res = await getCommentsApi(postId);
    dispatch(getCommentsSuccess(res.data));
  } catch (error) {
    dispatch(getCommentsFailure(error.response.data));
  }
};

export const deleteComment = (commentId) => async (dispatch) => {
  try {
    dispatch(deleteCommentStart());
    const res = await deleteCommentApi(commentId);
    dispatch(deleteCommentSuccess({ ...res.data, commentId }));
  } catch (error) {
    dispatch(deleteCommentFailure(error.response.data));
  }
};

export default commentSlice.reducer;
