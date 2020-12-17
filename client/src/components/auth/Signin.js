import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signin({ onSignin, error }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSignin(form);
  };

  return (
    <div
      style={{ minHeight: 'calc(100vh - 4rem)' }}
      className="flex justify-center items-center"
    >
      <div style={{ width: '300px' }}>
        <div className="mb-12 flex justify-center">
          <h1 className="font-bold text-pink-500 text-3xl">Signin</h1>
        </div>
        <form>
          <div className="my-4">
            <input
              type="email"
              placeholder="email"
              className="p-2 w-full focus:outline-none focus:ring-2 rounded border"
              name="email"
              onChange={onChange}
              value={form.email}
            />
          </div>
          <div className="my-4">
            <input
              type="password"
              placeholder="password"
              className="p-2 w-full focus:outline-none focus:ring-2 rounded border"
              name="password"
              onChange={onChange}
              value={form.password}
            />
          </div>
          {error && (
            <div className="my-4">
              <span className="text-red-500">{error}</span>
            </div>
          )}
          <div className="my-4">
            <button
              type="submit"
              className="w-full p-2 bg-pink-500 text-white focus:outline-none rounded hover:bg-pink-600"
              onClick={onSubmit}
            >
              로그인
            </button>
          </div>
          <div className="flex justify-end">
            <Link to="/signup" className="text-sm text-blue-400">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
