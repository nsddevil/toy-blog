import { createSlice } from '@reduxjs/toolkit';
import { singupApi, singinApi } from '../../api/authApi';

const initialState = {
  isLoading: false,
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupStart: (state, action) => {
      state.isLoading = true;
    },
    signupSuccess: (state, action) => {
      state.isLoading = false;
      state.error = null;
    },
    signupFailure: (state, action) => {
      const { error } = action.payload;
      state.isLoading = false;
      state.error = error;
    },
    signinStart: (state, action) => {
      state.isLoading = true;
    },
    signinSuccess: (state, action) => {
      const { user } = action.payload;
      state.isLoading = false;
      state.error = null;
      state.user = user;
    },
    signinFailure: (state, action) => {
      const { error } = action.payload;
      state.isLoading = false;
      state.error = error;
    },
    logoutSuccess: (state, action) => {
      state.user = null;
    },
  },
});
const {
  signupFailure,
  signupStart,
  signupSuccess,
  signinFailure,
  signinStart,
  logoutSuccess,
} = authSlice.actions;

export const { signinSuccess } = authSlice.actions;

export const signup = (form) => async (dispatch) => {
  try {
    dispatch(signupStart());
    const res = await singupApi(form);
    dispatch(signupSuccess());
    return res.data;
  } catch (error) {
    dispatch(signupFailure(error.response.data));
  }
};

export const signin = (form) => async (dispatch) => {
  try {
    dispatch(signinStart());
    const res = await singinApi(form);
    dispatch(signinSuccess(res.data));
    localStorage.setItem('toy-blog', JSON.stringify(res.data));
    return res.data;
  } catch (error) {
    dispatch(signinFailure(error.response.data));
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('toy-blog');
  dispatch(logoutSuccess());
};

export default authSlice.reducer;
