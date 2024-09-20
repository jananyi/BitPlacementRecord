import React, { useState, useEffect } from 'react';
import './HomePage.css'; // Assuming you're styling with a separate CSS file.
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const initialDocumentData = [
  { year: '2022', submissions: 0 },
  { year: '2023', submissions: 0 },
  { year: '2024', submissions: 0 },
  { year: '2025', submissions: 0 },
  { year: '2026', submissions: 0 },
];

const initialSalaryData = [
  { year: '2022', salary: 0 },
  { year: '2023', salary: 0 },
  { year: '2024', salary: 0 },
  { year: '2025', salary: 0 },
  { year: '2026', salary: 0 },
];

const initialPieData = [
  { name: 'Mail Confirmations', value: 0 },
  { name: 'Letter of Intent', value: 0 },
  { name: 'Internship Letters', value: 0 },
  { name: 'Offer Letters', value: 0 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdministratorPage = () => {
  const [documentData, setDocumentData] = useState(initialDocumentData);
  const [salaryData, setSalaryData] = useState(initialSalaryData);
  const [pieData, setPieData] = useState(initialPieData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/get-dashboard-data'); // Adjust API endpoint as needed
        const data = await response.json();
        setDocumentData(data.documentData);
        setSalaryData(data.salaryData);
        setPieData(data.pieData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); 

  return (
    <div className="container">
      <header>
        <div className="site-name">BIT Placement Record Admin</div>
        <div className="user-info">
          <span className="username">Administrator</span>
          <span className="notification">🔔</span>
        </div>
      </header>
      <aside>
        <nav className="nav-menu">
          <ul>
            <li>Home</li>
            <li>Retrieve</li>
          </ul>
        </nav>
      </aside>

      <main>
        <h1 className='initial-address'>Hello, Administrator!</h1>
        
        <div className="dashboard-grid">
          {/* Bar Graph */}
          <div className="graph-box">
          <h2 className="stat-text">Documents Submitted</h2>
            <div className="bar-graph">
            <BarChart width={300} height={200} data={documentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="submissions" fill="#0088FE" />
            </BarChart>
            </div>
          </div>

          {/* Statistics */}
          <div className="statistics-box">
            <div className="stat-item">
              <p className='stat-text'>Total No. of Companies</p>
              <h2>0</h2>
            </div>
            <div className="stat-item">
              <p className='stat-text'>Total No. of Offers</p>
              <h2>0</h2>
            </div>
            <div className="stat-item">
              <p className='stat-text'>Total No. of Students</p>
              <h2>0</h2>
            </div>
          </div>

          {/* Circular Charts */}
          <div className="circular-chart-box">
          <h2 className="stat-text">Mail Confirmations & Offers</h2>
            <div className="circular-chart">
            <PieChart width={200} height={200}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            </div>
          </div>

          {/* Line Chart */}
          <div className="graph-box">
          <h2 className="stat-text">Average Salary Over Years</h2>
            <div className="line-graph"> 
            <LineChart width={300} height={200} data={salaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="salary" stroke="#00C49F" />
            </LineChart>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdministratorPage;
