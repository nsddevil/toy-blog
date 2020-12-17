import React from 'react';
import Signup from './Signup';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from './authSlice';
import { useHistory } from 'react-router-dom';

function SignupPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { error } = useSelector((state) => state.auth);

  const onSignup = (form) => {
    dispatch(signup(form)).then((res) => {
      if (res && res.success) {
        alert(res.message);
        history.push('/signin');
      }
    });
  };

  return <Signup onSignup={onSignup} error={error} />;
}

export default SignupPage;
