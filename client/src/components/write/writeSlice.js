import { createSlice } from '@reduxjs/toolkit';
import { uploadImgApi, addPostApi, deleteImgApi } from '../../api/postApi';

const initialState = {
  isLoading: false,
  error: null,
  imgs: [],
};

const writeSlice = createSlice({
  name: 'write',
  initialState,
  reducers: {
    uploadImgStart: (state, action) => {
      state.isLoading = true;
    },
    uploadImgSuccess: (state, action) => {
      const { imgs } = action.payload;
      state.isLoading = false;
      state.error = null;
      state.imgs = state.imgs.concat(imgs);
    },
    uploadImgFailure: (state, action) => {
      const { error } = action.payload;
      state.isLoading = false;
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
    deleteImgStart: (state, action) => {
      state.isLoading = true;
    },
    deleteImgSuccess: (state, action) => {
      const { imgName } = action.payload;
      const index = state.imgs.findIndex((value) => value === imgName);
      state.isLoading = false;
      state.error = null;
      state.imgs.splice(index, 1);
    },
    deleteImgFailure: (state, action) => {
      const { error } = action.payload;
      state.isLoading = false;
      state.error = error;
    },
    resetImgs: (state, action) => {
      state.imgs = [];
    },
  },
});

const {
  uploadImgFailure,
  uploadImgStart,
  uploadImgSuccess,
  addPostFailure,
  addPostStart,
  addPostSuccess,
  deleteImgFailure,
  deleteImgStart,
  deleteImgSuccess,
} = writeSlice.actions;

export const { resetImgs } = writeSlice.actions;

export const uploadImg = (form) => async (dispatch) => {
  try {
    dispatch(uploadImgStart());
    const res = await uploadImgApi(form);
    dispatch(uploadImgSuccess(res.data));
  } catch (error) {
    dispatch(uploadImgFailure(error.response.data));
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

export const deleteImg = (imgName) => async (dispatch) => {
  try {
    dispatch(deleteImgStart());
    const imgPath = imgName.split('/')[2];
    const res = await deleteImgApi(imgPath);
    dispatch(deleteImgSuccess({ ...res.data, imgName }));
  } catch (error) {
    dispatch(deleteImgFailure(error.response.data));
  }
};
export default writeSlice.reducer;
