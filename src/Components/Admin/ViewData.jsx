import React, { useEffect, useState } from 'react';
import './ViewData.css'; // Make sure you have a corresponding CSS file for styling
import axios from 'axios'; // Assuming you're using Axios for API requests
import { Link } from 'react-router-dom';

const ViewData = () => {
  const [studentData, setStudentData] = useState([]);

  // Fetch student data from backend (API)
  useEffect(() => {
    axios.get('/api/student-data')  // Update this API endpoint as per your backend
      .then(response => {
        setStudentData(response.data); // Assuming response.data contains the array of student data
      })
      .catch(error => {
        console.error("There was an error fetching the student data!", error);
      });
  }, []);

  return (
    <div className="viewdata-container">
      <header>
        <div className="site-name">BIT Placement Record Admin</div>
        <div className="user-info">
          <span className="username">Admin</span>
          <span className="notification">🔔</span>
        </div>
      </header>
      <aside>
        <nav className="nav-menu">
          <ul>
            <li><Link to="/homepage/adminhome">Home</Link></li>
            <li><Link to="/admin/approve">Approval</Link></li>
            <li><Link to="/admin/viewdata">View Data</Link></li>
          </ul>
        </nav>
      </aside>
      <div className="data-table-container">
        <div className="table-actions">
          <select>
            <option value="all">Choose Category</option>
            <option value="IT">IT</option>
            <option value="Core">Core</option>
            {/* Add more categories */}
          </select>
          <button className="view-pdf">View as PDF</button>
          <button className="view-excel">View as Excel</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Gender</th>
              <th>Degree</th>
              <th>Batch</th>
              <th>Phone No</th>
              <th>Year of Passing</th>
              <th>Company Name</th>
              <th>Category</th>
              <th>Organization</th>
              <th>City</th>
              <th>Currently Working</th>
            </tr>
          </thead>
          <tbody>
            {studentData.length > 0 ? (
              studentData.map((student, index) => (
                <tr key={index}>
                  <td>{student.rollNo}</td>
                  <td>{student.studentName}</td>
                  <td>{student.gender}</td>
                  <td>{student.degree}</td>
                  <td>{student.batch}</td>
                  <td>{student.phone}</td>
                  <td>{student.yearOfPassing}</td>
                  <td>{student.companyName}</td>
                  <td>{student.category}</td>
                  <td>{student.organization}</td>
                  <td>{student.city}</td>
                  <td>{student.currentlyWorking ? 'Yes' : 'No'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12">No student data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewData;
