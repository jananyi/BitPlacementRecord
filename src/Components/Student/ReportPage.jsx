import React, { useState } from 'react';
import './StudentReportForm.css';

const StudentReportForm = () => {
  // State for managing form values
  const [formData, setFormData] = useState({
    regNo: '',
    name: '',
    gender: '',
    dob: '',
    degree: '',
    batch: '',
    yearOfPassing: '',
    phone: '',
    email: '',
    companyName: '',
    category: '',
    organization: '',
    address: '',
    city: '',
    contact: '',
    websiteLink: '',
    mailConfirmation: '',
    mailConfirmationProof: null,
    internshipOfferLetter: '',
    internshipOfferLetterProof: null,
    internshipJoiningDate: '',
    stipendAmount: '',
    letterOfIntent: '',
    letterOfIntentProof: null,
    offerLetter: '',
    offerLetterProof: null,
    currentJob: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  // Submit form (to be integrated with backend)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Call an API to submit the data or save to the database
    console.log('Form Data Submitted:', formData);
  };

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
            <li>Home</li>
            <li>Report</li>
            <li>Track</li>
          </ul>
        </nav>
      </aside>
      <form onSubmit={handleSubmit}>
        <div className='form-container'>
        <div className="form-section">
          <label>REG NO:</label>
          <input type="text" name="regNo" onChange={handleChange} />
        </div>
        <div className="form-section">
          <label>NAME:</label>
          <input type="text" name="name" onChange={handleChange} />
        </div>
        <div className="form-section">
          <label>GENDER:</label>
          <select name="gender" onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-section">
          <label>DOB:</label>
          <input type="date" name="dob" onChange={handleChange} />
        </div>
        <div className="form-section">
          <label>DEGREE:</label>
          <select name="degree" onChange={handleChange}>
            <option value="BE/BTech">BE/BTech/MBA</option>
            <option value="BE/BTech">BE</option>
            <option value="BE/BTech">BTech</option>
            <option value="BE/BTech">MBA</option>
          </select>
        </div>
        <div className="form-section">
          <label>BATCH:</label>
          <input type="text" name="batch" onChange={handleChange} />
        </div>
        <div className="form-section">
          <label>YEAR OF PASSING:</label>
          <input type="text" name="yearOfPassing" onChange={handleChange} />
        </div>
        <div className="form-section">
          <label>PHONE NO:</label>
          <input type="text" name="phone" onChange={handleChange} />
        </div>
        <div className="form-section">
          <label>EMAIL ID:</label>
          <input type="email" name="email" onChange={handleChange} />
        </div>
        <div className="form-section">
          <label>COMPANY NAME:</label>
          <input type="text" name="companyName" onChange={handleChange} />
        </div>
        <div className="form-section">
          <label>CATEGORY:</label>
          <input type="text" name="category" onChange={handleChange} />
        </div>
        <div className="form-section">
          <label>ORGANIZATION:</label>
          <input type="text" name="organization" onChange={handleChange} />
        </div>
        <div className="form-section">
          <label>ADDRESS:</label>
          <input type="text" name="address" onChange={handleChange} />
        </div>
        <div className="form-section">
          <label>CITY:</label>
          <input type="text" name="city" onChange={handleChange} />
        </div>
        <div className="form-section">
          <label>CONTACT:</label>
          <input type="text" name="contact" onChange={handleChange} />
        </div>
        <div className="form-section">
          <label>WEBSITE LINK:</label>
          <input type="url" name="websiteLink" onChange={handleChange} />
        </div>
        <div className="form-section">
          <label>MAIL CONFIRMATION RECEIVED?</label>
          <select name="mailConfirmation" onChange={handleChange}>
            <option value="No">Yes/No</option>
            <option value="No">Yes</option>
            <option value="Yes">No</option>
          </select>
        </div>
        <div className="form-section">
          <label>MAIL CONFIRMATION PROOF:</label>
          <input type="file" name="mailConfirmationProof" onChange={handleFileChange} />
        </div>
        <div className="form-section">
          <label>INTERNSHIP OFFER LETTER RECEIVED?</label>
          <select name="internshipOfferLetter" onChange={handleChange}>
            <option value="No">Yes/No</option>
            <option value="No">Yes</option>
            <option value="Yes">No</option>
          </select>
        </div>
        <div className="form-section">
          <label>INTERNSHIP OFFER LETTER PROOF:</label>
          <input type="file" name="internshipOfferLetterProof" onChange={handleFileChange} />
        </div>
        <div className="form-section">
          <label>INTERNSHIP JOINING DATE:</label>
          <input type="date" name="internshipJoiningDate" onChange={handleChange} />
        </div>
        <div className="form-section">
          <label>STIPEND AMOUNT:</label>
          <input type="text" name="stipendAmount" onChange={handleChange} />
        </div>
        <div className="form-section">
          <label>LETTER OF INTENT RECEIVED?</label>
          <select name="letterOfIntent" onChange={handleChange}>
            <option value="No">Yes/No</option>
            <option value="No">Yes</option>
            <option value="Yes">No</option>
          </select>
        </div>
        <div className="form-section">
          <label>LETTER OF INTENT PROOF:</label>
          <input type="file" name="letterOfIntentProof" onChange={handleFileChange} />
        </div>
        <div className="form-section">
          <label>OFFER LETTER RECEIVED?</label>
          <select name="offerLetter" onChange={handleChange}>
            <option value="No">Yes/No</option>
            <option value="No">Yes</option>
            <option value="Yes">No</option>
          </select>
        </div>
        <div className="form-section">
          <label>OFFER LETTER PROOF:</label>
          <input type="file" name="offerLetterProof" onChange={handleFileChange} />
        </div>
        <div className="form-section">
          <label>IS THIS YOUR CURRENTLY WORKING JOB?</label>
          <select name="currentJob" onChange={handleChange}>
          <option value="No">Yes/No</option>
            <option value="No">Yes</option>
            <option value="Yes">No</option>
          </select>
        </div>
        </div>
        <div className="form-buttons">
          <button type="button">CANCEL</button>
          <button type="submit">UPDATE & SAVE</button>
          <button type="button">CREATE OFFER REPORT</button>
        </div>
      </form>
    </div>
  );
};

export default StudentReportForm;
