import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SigninPage from './components/auth/SigninPage';
import SignupPage from './components/auth/SignupPage';
import HeaderPage from './components/header/HeaderPage';
import HocAuth from './components/hoc/HocAuth';
import WritePage from './components/write/WritePage';
import DetailPage from './components/detail/DetailPage';
import PostListPage from './components/postlist/PostListPage';
import TagPostPage from './components/postlist/TagPostPage';
import UserPostPage from './components/postlist/UserPostPage';

function App() {
  return (
    <BrowserRouter>
      <HeaderPage />
      <Switch>
        <Route exact path="/" component={HocAuth(PostListPage, null)} />
        <Route path="/signin" component={HocAuth(SigninPage, false)} />
        <Route path="/signup" component={HocAuth(SignupPage, false)} />
        <Route path="/write" component={HocAuth(WritePage, true)} />
        <Route path="/tag/:tagName" component={HocAuth(TagPostPage, null)} />
        <Route
          exact
          path="/@:nickname"
          component={HocAuth(UserPostPage, null)}
        />
        <Route
          path="/@:nickname/:postId"
          component={HocAuth(DetailPage, null)}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
