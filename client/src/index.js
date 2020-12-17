import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';
import { signinSuccess } from './components/auth/authSlice';

function loadUser() {
  const storage = JSON.parse(localStorage.getItem('toy-blog'));
  if (storage) {
    store.dispatch(signinSuccess(storage));
  }
  return null;
}

loadUser();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
