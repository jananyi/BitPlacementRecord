import React, { useState } from 'react';
import LoginForm from './Components/LoginForm/LoginForm';
import AdminHomePage from './Components/HomePage/AdminHome';
import AdministratorHomePage from './Components/HomePage/AdministratorHome';
import StudentHomePage from './Components/HomePage/StudentHome';

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
    <div>
      {!isLoggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          {role === 'admin' && <AdminHomePage />}
          {role === 'administrator' && <AdministratorHomePage />}
          {role === 'student' && <StudentHomePage />}
        </>
      )}
    </div>
  );
}

export default App;
