import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import SignUpForm from './Components/SignUpForm/SignUpForm'; 
import AdminHomePage from './Components/HomePage/AdminHome';
import AdministratorHomePage from './Components/HomePage/AdministratorHome';
import StudentHomePage from './Components/HomePage/StudentHome';
import ReportPage from './Components/Student/ReportPage';
import Track from './Components/Student/Track'; 
import Approve from './Components/Admin/Approve'; 
import ViewData from './Components/Admin/ViewData'; 
import Retrieve from './Components/Administrator/Retrieve';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [designation, setDesignation] = useState('');

  // Handle login function
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Name:', data.name);
        console.log('Designation:', data.designation); // Log designation
        setDesignation(data.designation);
        setIsLoggedIn(true);
        localStorage.setItem('name', data.name);
      } else {
        const data = await response.json();
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  // Handle sign-up function
  const handleSignUp = async (name, email, password, designation) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, designation }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('User registered successfully!');
        // Redirect to login page after successful registration
        window.location.href = '/login';
      } else {
        alert('Registration failed: ' + data.message);
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  return (
    <Routes>
      {/* Login route */}
      <Route
        path="/login"
        element={!isLoggedIn ? (
          <LoginForm 
            onLogin={handleLogin} 
            setIsLoggedIn={setIsLoggedIn} 
            setDesignation={setDesignation}
          />
        ) : (
          <Navigate to={`/homepage/${designation}home`} />
        )}
      />

      {/* Sign-up route */}
      <Route
        path="/register"
        element={<SignUpForm onSignUp={handleSignUp} />}
      />

      {/* Admin routes */}
      <Route
        path="/homepage/adminhome"
        element={isLoggedIn && designation === 'admin' ? <AdminHomePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/approve"
        element={isLoggedIn && designation === 'admin' ? <Approve /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/viewdata"
        element={isLoggedIn && designation === 'admin' ? <ViewData /> : <Navigate to="/login" />}
      />

      {/* Administrator routes */}
      <Route
        path="/homepage/administratorhome"
        element={isLoggedIn && designation === 'administrator' ? <AdministratorHomePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/administrator/retrieve"
        element={isLoggedIn && designation === 'administrator' ? <Retrieve /> : <Navigate to="/login" />}
      />

      {/* Student routes */}
      <Route
        path="/homepage/studenthome"
        element={isLoggedIn && designation === 'student' ? <StudentHomePage name={localStorage.getItem('name')} /> : <Navigate to="/login" />}
      />
      <Route
        path="/student/report"
        element={isLoggedIn && designation === 'student' ? <ReportPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/student/track"
        element={isLoggedIn && designation === 'student' ? <Track /> : <Navigate to="/login" />}
      />

      {/* Redirect if no match */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
