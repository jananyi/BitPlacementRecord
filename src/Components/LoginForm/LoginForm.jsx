import React from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';

const LoginForm = ({ onLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target[0].value; // Get username from input
    const password = e.target[1].value; // Get password from input
    onLogin(username, password); // Call the onLogin function passed as prop
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login To Access Your Account</h1>
        <div className='input-box'>
          <input type='text' placeholder='Username' required />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input type='password' placeholder='Password' required />
          <FaLock className='icon' />
        </div>
        <div className='remember-forgot'>
          <label><input type='checkbox' />Remember me</label>
          <a href='#'>Forget password?</a>
        </div>
        <button type='submit'>LOGIN</button>
        <div className="register-link">
          <p>Don't have an account?
            <a href='#'> Register</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
