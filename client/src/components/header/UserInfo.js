import React from 'react';

function UserInfo({ user, onLogout }) {
  return (
    <div>
      <span className="text-sm">{user.email}</span>
      <button className="ml-2 font-bold" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}

export default UserInfo;
