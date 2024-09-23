import React, { useState } from 'react';
import './StudentReportForm.css';
import { Link } from 'react-router-dom';

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

  const [errors, setErrors] = useState({}); // State to handle validation errors

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' }); // Reset the error message once the field is changed
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (
        field !== 'mailConfirmationProof' &&
        field !== 'internshipOfferLetterProof' &&
        field !== 'letterOfIntentProof' &&
        field !== 'offerLetterProof'
      ) {
        if (!formData[field]) {
          newErrors[field] = 'This field is required';
        }
      }
    });
    return newErrors;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSubmit = new FormData();
    
    Object.keys(formData).forEach(key => {
      formDataToSubmit.append(key, formData[key]);
    });
  
    try {
      const response = await fetch('http://localhost:5000/api/student-report', {
        method: 'POST',
        body: formDataToSubmit
      });
  
      if (response.ok) {
        alert('Form and files submitted successfully!');
        // Optionally, reset form here
      } else {
        const errorData = await response.json();
        alert(`Failed to submit form: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form');
    }
  };
  
  const handleCreateOfferReport = async () => {
    const formDataToSubmit = new FormData();
  
    Object.keys(formData).forEach(key => {
      formDataToSubmit.append(key, formData[key]);
    });
  
    try {
      const response = await fetch('http://localhost:5000/api/student-report', {
        method: 'POST',
        body: formDataToSubmit,
      });
  
      if (response.ok) {
        alert('Offer report created successfully!');
        setFormData({
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
          currentJob: ''
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to create offer report: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error creating offer report:', error);
      alert('An error occurred while creating the offer report');
    }
  };  

  const isFormValid = Object.keys(errors).length === 0 && Object.values(formData).every((value) => value !== ''); // Check if the form is valid

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
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="form-section">
            <label>REG NO: <span className="mandatory">*</span></label>
            <input type="text" name="regNo" onChange={handleChange} />
            {errors.regNo && <p className="error">{errors.regNo}</p>}
          </div>
          <div className="form-section">
            <label>NAME: <span className="mandatory">*</span></label>
            <input type="text" name="name" onChange={handleChange} />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="form-section">
            <label>GENDER: <span className="mandatory">*</span></label>
            <select name="gender" onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <p className="error">{errors.gender}</p>}
          </div>
          <div className="form-section">
            <label>DOB: <span className="mandatory">*</span></label>
            <input type="date" name="dob" onChange={handleChange} />
            {errors.dob && <p className="error">{errors.dob}</p>}
          </div>
          <div className="form-section">
            <label>DEGREE: <span className="mandatory">*</span></label>
            <select name="degree" onChange={handleChange}>
              <option value="">Select Degree</option>
              <option value="BE/BTech">BE/BTech</option>
              <option value="MBA">MBA</option>
            </select>
            {errors.degree && <p className="error">{errors.degree}</p>}
          </div>
          <div className="form-section">
            <label>BATCH: <span className="mandatory">*</span></label>
            <input type="text" name="batch" onChange={handleChange} />
            {errors.batch && <p className="error">{errors.batch}</p>}
          </div>
          <div className="form-section">
            <label>YEAR OF PASSING: <span className="mandatory">*</span></label>
            <input type="text" name="yearOfPassing" onChange={handleChange} />
            {errors.yearOfPassing && <p className="error">{errors.yearOfPassing}</p>}
          </div>
          <div className="form-section">
            <label>PHONE NO: <span className="mandatory">*</span></label>
            <input type="text" name="phone" onChange={handleChange} />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>
          <div className="form-section">
            <label>EMAIL ID: <span className="mandatory">*</span></label>
            <input type="email" name="email" onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-section">
            <label>COMPANY NAME: <span className="mandatory">*</span></label>
            <input type="text" name="companyName" onChange={handleChange} />
            {errors.companyName && <p className="error">{errors.companyName}</p>}
          </div>
          <div className="form-section">
            <label>CATEGORY: <span className="mandatory">*</span></label>
            <input type="text" name="category" onChange={handleChange} />
            {errors.category && <p className="error">{errors.category}</p>}
          </div>
          <div className="form-section">
            <label>ORGANIZATION: <span className="mandatory">*</span></label>
            <input type="text" name="organization" onChange={handleChange} />
            {errors.organization && <p className="error">{errors.organization}</p>}
          </div>
          <div className="form-section">
            <label>ADDRESS: <span className="mandatory">*</span></label>
            <input type="text" name="address" onChange={handleChange} />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>
          <div className="form-section">
            <label>CITY: <span className="mandatory">*</span></label>
            <input type="text" name="city" onChange={handleChange} />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>
          <div className="form-section">
            <label>CONTACT: <span className="mandatory">*</span></label>
            <input type="text" name="contact" onChange={handleChange} />
            {errors.contact && <p className="error">{errors.contact}</p>}
          </div>
          <div className="form-section">
            <label>WEBSITE LINK: <span className="mandatory">*</span></label>
            <input type="text" name="websiteLink" onChange={handleChange} />
            {errors.websiteLink && <p className="error">{errors.websiteLink}</p>}
          </div>
          <div className="form-section">
            <label>MAIL CONFIRMATION RECEIVED: <span className="mandatory">*</span></label>
            <select name="mailConfirmation" onChange={handleChange}>
              <option value="No">Yes/No</option>
              <option value="No">Yes</option>
              <option value="Yes">No</option>
            </select>
            {errors.mailConfirmation && <p className="error">{errors.mailConfirmation}</p>}
          </div>
          <div className="form-section">
            <label>MAIL CONFIRMATION PROOF: </label>
            <input type="file" name="mailConfirmationProof" onChange={handleFileChange} />
          </div>
          <div className="form-section">
            <label>INTERNSHIP OFFER LETTER RECEIVED: <span className="mandatory">*</span></label>
            <select name="internshipOfferLetter" onChange={handleChange}>
              <option value="No">Yes/No</option>
              <option value="No">Yes</option>
              <option value="Yes">No</option>
            </select>
            {errors.internshipOfferLetter && <p className="error">{errors.internshipOfferLetter}</p>}
          </div>
          <div className="form-section">
            <label>INTERNSHIP OFFER LETTER PROOF: </label>
            <input type="file" name="internshipOfferLetterProof" onChange={handleFileChange} />
          </div>
          <div className="form-section">
            <label>INTERNSHIP JOINING DATE: <span className="mandatory">*</span></label>
            <input type="date" name="internshipJoiningDate" onChange={handleChange} />
            {errors.internshipJoiningDate && <p className="error">{errors.internshipJoiningDate}</p>}
          </div>
          <div className="form-section">
            <label>STIPEND AMOUNT: </label>
            <input type="text" name="stipendAmount" onChange={handleChange} />
          </div>
          <div className="form-section">
            <label>LETTER OF INTENT RECEIVED: <span className="mandatory">*</span></label>
            <select name="letterOfIntent" onChange={handleChange}>
              <option value="No">Yes/No</option>
              <option value="No">Yes</option>
              <option value="Yes">No</option>
            </select>
            {errors.letterOfIntent && <p className="error">{errors.letterOfIntent}</p>}
          </div>
          <div className="form-section">
            <label>LETTER OF INTENT PROOF: </label>
            <input type="file" name="letterOfIntentProof" onChange={handleFileChange} />
          </div>
          <div className="form-section">
            <label>OFFER LETTER RECEIVED: <span className="mandatory">*</span></label>
            <select name="offerLetter" onChange={handleChange}>
              <option value="No">Yes/No</option>
              <option value="No">Yes</option>
              <option value="Yes">No</option>
            </select>
            {errors.offerLetter && <p className="error">{errors.offerLetter}</p>}
          </div>
          <div className="form-section">
            <label>OFFER LETTER PROOF: </label>
            <input type="file" name="offerLetterProof" onChange={handleFileChange} />
          </div>
          <div className="form-section">
            <label>CURRENT JOB: <span className="mandatory">*</span></label>
            <input type="text" name="currentJob" onChange={handleChange} />
            {errors.currentJob && <p className="error">{errors.currentJob}</p>}
          </div>
          </div>
        <div className="form-buttons">
          <button type="button">CANCEL</button>
          <button type="submit" disabled={!isFormValid}>UPDATE & SAVE</button>
          <button type="button" onClick={handleCreateOfferReport} disabled={!isFormValid}>CREATE OFFER REPORT</button>
        </div>
      </form>
    </div>
  );
};

export default StudentReportForm;