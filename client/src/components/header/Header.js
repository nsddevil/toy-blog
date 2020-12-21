import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';

function Header({ onLogout, user, onFindTag }) {
  const [tagSearch, setTagSearch] = useState('');

  const onChange = (e) => {
    const { value } = e.target;
    setTagSearch(value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    onFindTag(tagSearch);
    setTagSearch('');
  };
  return (
    <header className="bg-blue-600">
      <div className="container mx-auto">
        <nav className="h-16 flex justify-between items-center text-white font-bold">
          <div>
            <Link to="/">
              <h1 className="text-2xl">Logo</h1>
            </Link>
          </div>
          <form className="flex items-center relative" onSubmit={onSubmit}>
            <div>
              <input
                className="p-2 focus:outline-none rounded text-black text-sm"
                placeholder="태그검색"
                value={tagSearch}
                onChange={onChange}
              />
            </div>
            <div
              className="ml-2 text-2xl cursor-pointer absolute right-0 text-blue-600"
              onClick={onSubmit}
            >
              <MdSearch />
            </div>
          </form>
          {user ? (
            <UserInfo user={user} onLogout={onLogout} />
          ) : (
            <div>
              <Link to="/signin">
                <span>Signin</span>
              </Link>
              <Link to="/signup" className="ml-2">
                <span>Signup</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
