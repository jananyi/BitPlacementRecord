import React,{ useState, useEffect} from 'react';
import './HomePage.css';

const AdminPage = () => {
  const [data, setData] = useState({
    approvalRequests: 0,
    totalSubmissions: 0,
    recentLogins: 0,
    approvalPercentage: 0,
    tableData: [],
  });

  useEffect(() => {
    // Simulate API call to fetch data from the database
    fetch('/api/admin/dashboard') // Change this to your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setData({
          approvalRequests: data.approvalRequests,
          totalSubmissions: data.totalSubmissions,
          recentLogins: data.recentLogins,
          approvalPercentage: data.approvalPercentage,
          tableData: data.tableData,
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

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
            <li>Approve</li>
            <li>View Data</li>
          </ul>
        </nav>
      </aside>
      <main>
      <h1 className='initial-address'>Hello,Admin!</h1>
      <div className="stats-container">
          <div className="stat-box">
            <h2 className="stat-text">Approval Request</h2>
            <div className='stat-value'>{data.approvalRequests}</div>
          </div>
          <div className="stat-box">
            <h2 className="stat-text">Total Submission</h2>
            <div className="stat-value">{data.totalSubmissions}</div>
          </div>
          <div className="stat-box">
            <h2 className="stat-text">Recent Logins</h2>
            <div className="stat-value">{data.recentLogins}</div>
          </div>
      </div>
        <div className="chart-container">
          <div className="approval-chart">
            <svg viewBox="0 0 36 36" className="circular-chart blue">
              <path
                className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                strokeDasharray={`${data.approvalPercentage}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="percentage">
                {data.approvalPercentage}%
              </text>
            </svg>
            <div className="approval-text">{data.approvalPercentage}% Approvals</div>
          </div>
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Company Name</th>
                  <th>Mail Confirmation Proof</th>
                  <th>Letter of Intent Proof</th>
                </tr>
              </thead>
              <tbody>
                {data.tableData.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.rollNo}</td>
                    <td>{entry.studentName}</td>
                    <td>{entry.companyName}</td>
                    <td>{entry.mailConfirmation ? '✔️' : '❌'}</td>
                    <td>{entry.letterOfIntent ? '✔️' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
