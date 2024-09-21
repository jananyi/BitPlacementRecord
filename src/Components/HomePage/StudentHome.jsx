import React, { useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = ({ username }) => {
  // Initial values set to 0
  const [completed, setCompleted] = useState(0);
  const [onProgress, setOnProgress] = useState(0);

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
            <li><Link to="/student/report">Report</Link></li>
            <li>Track</li>
          </ul>
        </nav>
      </aside>
      <main>
        <h1 className="initial-address">Hello, {username}!</h1>
        <div className="student-dashboard-nav-box">
          <div>
            <h3>STUDENT DASHBOARD</h3>
            <h5>
              Login <a href="#">Student Dashboard</a> to view student profile
            </h5>
          </div>
        </div>
        <div className="student-box">
          <div className="content-box">
            <h3>Completed</h3>
            <h1>{completed}</h1> {/* Display completed value */}
          </div>
          <div className="content-box">
            <h3>On Progress</h3>
            <h1>{onProgress}</h1> {/* Display onProgress value */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
