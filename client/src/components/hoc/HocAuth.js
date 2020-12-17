import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function HocAuth(Component, option) {
  function AuthCheck(props) {
    const history = useHistory();
    const { user } = useSelector((state) => state.auth);

    //null 아무나 입장가능
    //true 로그인 한사람은 입장 가능
    //false 로그인 한사람은 입장 불가

    useEffect(() => {
      //로그인 안한 사람
      if (!user) {
        if (option === true) {
          history.push('/signin');
        }
      } else {
        //로그인 한사람
        if (option === false) {
          history.push('/');
        }
      }
    });
    return <Component {...props} />;
  }
  return AuthCheck;
}

export default HocAuth;
