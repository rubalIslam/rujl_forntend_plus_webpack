// LoginComponent.js

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/authActions';

const LoginComponent = ({ login, isLoggedIn, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login(username, password);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>

      {isLoggedIn && <p>Login successful!</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  error: state.auth.error,
});

export default connect(mapStateToProps, { login })(LoginComponent);
