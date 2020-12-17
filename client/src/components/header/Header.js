import React from 'react';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';

function Header({ onLogout, user }) {
  return (
    <header className="bg-blue-600">
      <div className="container mx-auto">
        <nav className="h-16 flex justify-between items-center text-white font-bold">
          <div>
            <Link to="/">
              <h1 className="text-2xl">Logo</h1>
            </Link>
          </div>
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
