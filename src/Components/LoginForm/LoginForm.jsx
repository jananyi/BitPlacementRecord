import React from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin, setDesignation, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value; 
    const password = e.target[1].value;

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();

      if (response.ok) {
        const { designation } = data;
        console.log('User designation:', designation);
        setDesignation(designation);
        setIsLoggedIn(true);

        if (designation === 'student') {
          console.log('Navigating to student home');
          navigate('/homepage/studenthome');
        } else if (designation === 'admin') {
          console.log('Navigating to admin home');
          navigate('/homepage/adminhome');
        } else if (designation === 'administrator') {
          console.log('Navigating to administrator home');
          navigate('/homepage/administratorhome');
        } else {
          alert('Unknown designation, unable to navigate');
        }
      } else {
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      alert('Network Error: ' + error.message);
    }
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className='input-box'>
          <input type='email' placeholder='Gmail' required />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input type='password' placeholder='Password' required />
          <FaLock className='icon' />
        </div>
        <div className='remember-forgot'>
          <label><input type='checkbox' />Remember me</label>
          <a href='#'>Forgot password?</a>
        </div>
        <button type='submit'>SIGN IN</button>
        <div className="register-link">
          <p>Don't have an account?
            <Link to="/register"> Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
