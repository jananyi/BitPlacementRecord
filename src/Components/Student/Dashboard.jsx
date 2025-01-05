import React from "react";
import { FaPhone, FaClock, FaCalendarCheck, FaClipboardList, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./Dashboard.css";

const Dashboard = ({name}) => {
  return (
    <div className="dashboard-container">
      {/* Top Navigation Bar */}
      <header>
        <div className="site-name">BIT-PlacementRecord</div>
        <div className="user-info">
          <span className="username">{name || 'Student'}</span>
          <span className="notification">🔔</span>
        </div>
      </header>

      {/* Side Navigation Bar */}
    <aside>
        <nav className="nav-menu">
          <ul>
            <li><Link to="/homepage/studenthome">Home</Link></li>
            <li><Link to="/student/report">Report</Link></li>
            <li><Link to="/student/track">Track</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Dashboard Content */}
      <main className="dashboard-main">
        {/* Profile Card */}
        <div className="card profile-card">
          <div className="profile-info">
            <img
              src="https://via.placeholder.com/100" // Replace with actual profile image URL
              alt="Profile"
              className="profile-img"
            />
            <h3>JANANY I</h3>
            <p>7376222CT119</p>
            <p>SEMESTER - VI</p>
            <span className="status">CONTINUING</span>
          </div>
          <div className="details">
            <p>B.Tech. - COMPUTER TECHNOLOGY</p>
            <p>
              Mentor: MAHESHKUMAR K <FaPhone />
            </p>
            <p>Special Lab: AI | HARI PRIYA R</p>
            <p>Boarding: Hostel: NARMATHA, Room No: 206</p>
            <p>Warden: Ms. CAROLINE VINNIETA S</p>
          </div>
        </div>

        {/* Attendance Card */}
        <div className="card attendance-card">
          <h4>Attendance Overview</h4>
          <div className="attendance-stats">
            <div className="attendance-item">
              <FaClock /> Total Days: 13
            </div>
            <div className="attendance-item">
              <FaCalendarCheck /> Present Days: 11
            </div>
            <div className="attendance-item">
              <FaClipboardList /> Percentage: 84.6%
            </div>
            <div className="attendance-item">
              <FaHome /> Previous Day: Hostel
            </div>
          </div>
        </div>

        {/* SGPA Chart */}
        <div className="card sgpa-chart">
          <h4>Semester Grade Point Average (SGPA)</h4>
          <Bar
            data={{
              labels: ["I", "II", "III", "IV"],
              datasets: [
                {
                  label: "SGPA",
                  data: [8.81, 8.35, 9.09, 9.75],
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  max: 10,
                },
              },
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
