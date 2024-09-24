import React, { useState, useEffect } from 'react';
import axios from 'axios';  // For fetching the data
import './Retrieve.css';  // Create corresponding CSS for styling

const Retrieve = () => {
  const [studentData, setStudentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    degree: '',
    batch: '',
    city: '',
    gender: '',
    currentlyWorking: '',
    // Add more filters as needed
  });

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/students');  // API route to get student data
        setStudentData(response.data);
        setFilteredData(response.data);  // Initially, all data is displayed
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    fetchData();
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Apply filters to the data
  useEffect(() => {
    let filtered = studentData;

    if (filters.degree) {
      filtered = filtered.filter(student => student.degree.includes(filters.degree));
    }
    if (filters.batch) {
      filtered = filtered.filter(student => student.batch.includes(filters.batch));
    }
    if (filters.city) {
      filtered = filtered.filter(student => student.city.includes(filters.city));
    }
    if (filters.gender) {
      filtered = filtered.filter(student => student.gender === filters.gender);
    }
    if (filters.currentlyWorking) {
      filtered = filtered.filter(student => student.currentlyWorking === filters.currentlyWorking);
    }

    setFilteredData(filtered);
  }, [filters, studentData]);

  return (
    <div className="retrieve-page">
      <h2>Retrieve Student Data</h2>

      <div className="filters">
        {/* Filters for Degree, Batch, City, etc. */}
        <select name="degree" value={filters.degree} onChange={handleFilterChange}>
          <option value="">Select Degree</option>
          <option value="BE">BE</option>
          <option value="BTech">BTech</option>
          {/* Add more options as needed */}
        </select>

        <select name="batch" value={filters.batch} onChange={handleFilterChange}>
          <option value="">Select Batch</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          {/* Add more options as needed */}
        </select>

        <select name="city" value={filters.city} onChange={handleFilterChange}>
          <option value="">Select City</option>
          <option value="Chennai">Chennai</option>
          <option value="Bangalore">Bangalore</option>
          {/* Add more options as needed */}
        </select>

        <select name="gender" value={filters.gender} onChange={handleFilterChange}>
          <option value="">Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>

        <select name="currentlyWorking" value={filters.currentlyWorking} onChange={handleFilterChange}>
          <option value="">Currently Working?</option>
          <option value="YES">Yes</option>
          <option value="NO">No</option>
        </select>
      </div>

      <table className="student-table">
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
          {filteredData.map((student) => (
            <tr key={student.rollNo}>
              <td>{student.rollNo}</td>
              <td>{student.studentName}</td>
              <td>{student.gender}</td>
              <td>{student.degree}</td>
              <td>{student.batch}</td>
              <td>{student.phoneNo}</td>
              <td>{student.yearOfPassing}</td>
              <td>{student.companyName}</td>
              <td>{student.category}</td>
              <td>{student.organization}</td>
              <td>{student.city}</td>
              <td>{student.currentlyWorking}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Retrieve;
