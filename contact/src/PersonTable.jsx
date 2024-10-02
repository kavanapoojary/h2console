import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook
import './PersonTable.css';  // Import the CSS file

const PersonTable = () => {
  const [persons, setPersons] = useState([]);
  const navigate = useNavigate();  // Create a navigate instance

  // Fetch persons from the backend
  const fetchPersons = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/persons");
      if (Array.isArray(response.data)) {
        setPersons(response.data);  // Ensure the response is an array
      }
    } catch (error) {
      console.error("Error fetching persons:", error);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  // Handle login button click
  const handleLogin = () => {
    navigate("/login");  // Navigate to the /login page
  };

  return (
    <div className="container">
      <h1>Contact List</h1>
      {persons.length === 0 ? (
        <p>No Contacts Found</p>
      ) : (
        <table className="person-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person) => (
              <tr key={person.id}>
                <td>{person.name}</td>
                <td>{person.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default PersonTable;
