import React, { useEffect, useState } from 'react';
import './StudentTrack.css'; // Import the corresponding CSS file
import axios from 'axios'; // Assuming you're using Axios for API requests
import { Link } from 'react-router-dom';

const Track = () => {
  const [trackerData, setTrackerData] = useState([]);

  // Fetch the tracker data from the database on component mount
  useEffect(() => {
    axios.get('/api/track-data') // Update this with the correct API endpoint
      .then(response => {
        setTrackerData(response.data); // Assuming the response contains the data array
      })
      .catch(error => {
        console.error("There was an error fetching the tracker data!", error);
      });
  }, []);

  return (
    <div className="report-container">
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
            <li><Link to="/homepage/studenthome">Home</Link></li>
            <li><Link to="/student/report">Report</Link></li>
            <li><Link to="/student/track">Track</Link></li>
          </ul>
        </nav>
      </aside>
      <div className="track-container">
        <table className="tracker-table">
          <thead>
            <tr>
              <th>REG NO</th>
              <th>NAME</th>
              <th>DEGREE</th>
              <th>YEAR OF PASSING</th>
              <th>CONTACT</th>
              <th>MAIL CONFIRMATION PROOF</th>
              <th>INTERNSHIP OFFER LETTER PROOF</th>
              <th>LETTER OF INTENT PROOF</th>
              <th>OFFER LETTER PROOF</th>
              <th>Approved/Rejected</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {trackerData.length > 0 ? (
              trackerData.map((row, index) => (
                <tr key={index}>
                  <td>{row.regNo}</td>
                  <td>{row.name}</td>
                  <td>{row.degree}</td>
                  <td>{row.yearOfPassing}</td>
                  <td>{row.contact}</td>
                  <td>{row.mailProof}</td>
                  <td>{row.internshipOfferLetter}</td>
                  <td>{row.letterOfIntent}</td>
                  <td>{row.offerLetter}</td>
                  <td>{row.approvedRejected}</td>
                  <td>{row.remarks}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No data available. Please submit a report to display here.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Track;
