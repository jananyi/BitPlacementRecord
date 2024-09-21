import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import AdminHomePage from './Components/HomePage/AdminHome';
import AdministratorHomePage from './Components/HomePage/AdministratorHome';
import StudentHomePage from './Components/HomePage/StudentHome';
import ReportPage from './Components/Student/ReportPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'adminpass') {
      setRole('admin');
      setIsLoggedIn(true);
    } else if (username === 'adminis' && password === 'adpass') {
      setRole('administrator');
      setIsLoggedIn(true);
    } else if (username === 'student' && password === 'studentpass') {
      setRole('student');
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Router>
      <Routes>
        {/* Default route for login */}
        <Route path="/" element={!isLoggedIn ? <LoginForm onLogin={handleLogin} /> : <Navigate to={`/${role}/home`} />} />

        {/* Admin routes */}
        <Route path="/admin/home" element={isLoggedIn && role === 'admin' ? <AdminHomePage /> : <Navigate to="/" />} />

        {/* Administrator routes */}
        <Route path="/administrator/home" element={isLoggedIn && role === 'administrator' ? <AdministratorHomePage /> : <Navigate to="/" />} />

        {/* Student routes */}
        <Route path="/student/home" element={isLoggedIn && role === 'student' ? <StudentHomePage /> : <Navigate to="/" />} />
        <Route path="/student/report" element={isLoggedIn && role === 'student' ? <ReportPage /> : <Navigate to="/" />} />

        {/* Redirect if no match */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
