import React from 'react';
import { MdNoteAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

function UserInfo({ user, onLogout }) {
  return (
    <div className="flex items-center">
      <span className="text-4xl">
        <Link to="/write">
          <MdNoteAdd />
        </Link>
      </span>
      <span className="text-sm ml-2">{user.email}</span>
      <button className="ml-2 font-bold" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default UserInfo;
