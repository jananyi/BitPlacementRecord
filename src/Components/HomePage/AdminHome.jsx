import React from 'react';
import './HomePage.css';

const AdminPage = ({ username }) => {
  return (
    <div className="container">
      <header>
        <div className="site-name">BIT-PlacementRecord</div>
        <div className="user-info">
          <span className="username">Admin</span>
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
      <h1 className='initial-address'>Hello,Admin!</h1>
      <div className='container-img'>
      
      </div>
      </main>
    </div>
  );
};

export default AdminPage; // Use default export
