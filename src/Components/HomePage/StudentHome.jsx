// HomePage.jsx
import React from 'react';
import './HomePage.css';

const HomePage = ({ username }) => {
  return (
    <div className="container">
      <header>
        <div className="site-name">BIT-PlacementRecord</div>
        <div className="user-info">
          <span className="username">Student</span>
          <span className="notification">🔔</span>
        </div>
      </header>
      <aside>
        <nav className="nav-menu">
          <ul>
            <li>Home</li>
            <li>Report</li>
            <li>Track</li>
          </ul>
        </nav>
      </aside>
      <main>
      <h1 className='initial-address'>Hello,Student!</h1>
        <div className="student-dashboard-nav-box">
          <div>
            <h3>STUDENT DASHBOARD</h3>
            <h5>Login <a href='#'>Student Dashboard</a> to view student profile</h5>
          </div>
        </div>
        <div className="student-box">
            <div className="content-box">
              <h3>Completed</h3>
              <h1>3</h1>
            </div>
            <div className="content-box">
            <h3>On Progress</h3>
            <h1>2</h1>
            </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage; // Use default export
