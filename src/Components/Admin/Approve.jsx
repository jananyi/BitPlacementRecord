import React, { useState } from 'react';
import './AdminApproval.css'; // Ensure this file has the table styles and button styles
import { Link } from 'react-router-dom';

const AdminApproval = () => {
  // Sample data, you can replace this with fetched data later
  const [data, setData] = useState([
    {
      rollNo: "7376222CT119",
      studentName: "JANANY I",
      companyName: "TVS Motor",
      mailConfirmationProof: "Proof1.pdf",
      internshipOfferProof: "Offer1.pdf",
      letterOfIntentProof: "Intent1.pdf",
      offerLetterProof: "OfferLetter1.pdf",
      approved: false,
    }
  ]);

  // Function to handle approve and reject actions
  const handleAction = (index, action) => {
    let updatedData = [...data];
    updatedData[index].approved = action === "approve";
    setData(updatedData);
    alert(`You have ${action === "approve" ? "approved" : "rejected"} the request for ${data[index].studentName}`);
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
            <li><Link to="/homepage/adminhome">Home</Link></li>
            <li><Link to="/admin/approve">Approve</Link></li>
            <li><Link to="/admin/viewdata">ViewData</Link></li>
          </ul>
        </nav>
      </aside>

      <div className="admin-approval-container">
        <table className="approval-table">
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
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  <td>{item.rollNo}</td>
                  <td>{item.studentName}</td>
                  <td>{item.companyName}</td>
                  <td>
                    <button onClick={() => alert(`Viewing ${item.mailConfirmationProof}`)}>👁️</button>
                  </td>
                  <td>
                    <button onClick={() => alert(`Viewing ${item.internshipOfferProof}`)}>👁️</button>
                  </td>
                  <td>
                    <button onClick={() => alert(`Viewing ${item.letterOfIntentProof}`)}>👁️</button>
                  </td>
                  <td>
                    <button onClick={() => alert(`Viewing ${item.offerLetterProof}`)}>👁️</button>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="approve-btn"
                        onClick={() => handleAction(index, "approve")}
                      >
                        ✔️
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleAction(index, "reject")}
                      >
                        ❌
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No data available for approval.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminApproval;
