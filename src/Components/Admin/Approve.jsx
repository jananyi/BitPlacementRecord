import React, { useState, useEffect } from 'react';
import './AdminApprove.css'; // The correct CSS file

const Approve = () => {
  // State to store student reports fetched from the database
  const [reports, setReports] = useState([]);

  // Fetch reports from the backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/reports'); // API endpoint to fetch reports
        const data = await response.json();
        setReports(data); // Assuming the API returns an array of reports
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  // Approve or Disapprove action
  const handleApprove = async (reportId, status) => {
    try {
      // Send the status update to the backend
      await fetch(`/api/reports/${reportId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }), // Update status to 'approved' or 'disapproved'
      });

      // Update the local state to reflect the approval/disapproval
      setReports(reports.map(report =>
        report._id === reportId ? { ...report, status } : report
      ));
    } catch (error) {
      console.error('Error updating report status:', error);
    }
  };

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
        <table className="admin-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Company Name</th>
              <th>Mail Confirmation Proof</th>
              <th>Internship Offer Proof</th>
              <th>Letter of Intent Proof</th>
              <th>Offer Letter Proof</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report._id}>
                  <td>{report.regNo}</td>
                  <td>{report.name}</td>
                  <td>{report.companyName}</td>
                  <td>
                    {report.mailConfirmationProof ? (
                      <a href={report.mailConfirmationProof} target="_blank" rel="noopener noreferrer">View</a>
                    ) : (
                      'No proof'
                    )}
                  </td>
                  <td>
                    {report.internshipOfferLetterProof ? (
                      <a href={report.internshipOfferLetterProof} target="_blank" rel="noopener noreferrer">View</a>
                    ) : (
                      'No proof'
                    )}
                  </td>
                  <td>
                    {report.letterOfIntentProof ? (
                      <a href={report.letterOfIntentProof} target="_blank" rel="noopener noreferrer">View</a>
                    ) : (
                      'No proof'
                    )}
                  </td>
                  <td>
                    {report.offerLetterProof ? (
                      <a href={report.offerLetterProof} target="_blank" rel="noopener noreferrer">View</a>
                    ) : (
                      'No proof'
                    )}
                  </td>
                  <td className="action-buttons">
                    {report.status !== 'approved' ? (
                      <button
                        className="approve-button"
                        onClick={() => handleApprove(report._id, 'approved')}
                      >
                        ✅
                      </button>
                    ) : (
                      <span className="approved">Approved</span>
                    )}
                    {report.status !== 'disapproved' ? (
                      <button
                        className="disapprove-button"
                        onClick={() => handleApprove(report._id, 'disapproved')}
                      >
                        ❌
                      </button>
                    ) : (
                      <span className="disapproved">Disapproved</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No reports available</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Approve;
