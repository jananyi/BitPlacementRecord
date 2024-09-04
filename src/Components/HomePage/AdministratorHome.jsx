import React from 'react';
import './HomePage.css';

const AdministratorPage = ({ username }) => {
  return (
    <div className="container">
      <header>
        <div className="site-name">BIT-PlacementRecord</div>
        <div className="user-info">
          <span className="username">Administrator</span>
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
      <h1 className='initial-address'>Hello,Administrator!</h1>
        <div className="content-box">C1</div>
        <div className="content-box">C2</div>
        <div className="content-box">C3</div>
        <div className="content-box">C4</div>
      </main>
    </div>
  );
};

export default AdministratorPage; // Use default export
