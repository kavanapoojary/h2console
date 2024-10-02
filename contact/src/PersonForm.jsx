import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Import useNavigate for navigation
import './PersonForm.css';

const PersonForm = () => {
  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", phoneNumber: "" });
  const [editingId, setEditingId] = useState(null);
  const [editPerson, setEditPerson] = useState({ name: "", phoneNumber: "" });

  const navigate = useNavigate();  // Initialize the navigate hook

  // Fetch persons from the backend
  const fetchPersons = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/persons");
      if (Array.isArray(response.data)) {
        setPersons(response.data);  // Ensure the response is an array
      } else {
        setPersons([]);  // Handle cases where the response isn't an array
      }
    } catch (error) {
      console.error("Error fetching persons:", error);
      setPersons([]);  // Set an empty array on error to avoid crashing
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  // Handle input change for adding a new person
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerson({ ...newPerson, [name]: value });
  };

  // Add new person
  const addPerson = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/persons", newPerson);
      setPersons([...persons, response.data]);
      setNewPerson({ name: "", phoneNumber: "" });
    } catch (error) {
      console.error("Error adding person:", error);
    }
  };

  // Delete person
  const deletePerson = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/persons/${id}`);
      setPersons(persons.filter((person) => person.id !== id));
    } catch (error) {
      console.error("Error deleting person:", error);
    }
  };

  // Handle edit
  const startEdit = (person) => {
    setEditingId(person.id);
    setEditPerson({ name: person.name, phoneNumber: person.phoneNumber });
  };

  // Save edited person
  const saveEdit = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/persons/${id}`, editPerson);
      setPersons(
        persons.map((person) =>
          person.id === id ? response.data : person
        )
      );
      setEditingId(null);
      setEditPerson({ name: "", phoneNumber: "" });
    } catch (error) {
      console.error("Error updating person:", error);
    }
  };

  // Handle logout button click
  const handleLogout = () => {
    navigate("/");  // Navigate to the home page ("/")
  };

  return (
    <div className="container">
      <h1>Person Management</h1>
      <div>
        <h2>Add Person</h2>
        <input
          type="text"
          name="name"
          value={newPerson.name}
          placeholder="Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phoneNumber"
          value={newPerson.phoneNumber}
          placeholder="Phone Number"
          onChange={handleInputChange}
        />
        <button onClick={addPerson}>Add</button>
      </div>

      <h2>Contact List</h2>
      {persons.length === 0 ? (
        <p>No Contact found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person) => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>
                  {editingId === person.id ? (
                    <input
                      type="text"
                      value={editPerson.name}
                      onChange={(e) =>
                        setEditPerson({ ...editPerson, name: e.target.value })
                      }
                    />
                  ) : (
                    person.name
                  )}
                </td>
                <td>
                  {editingId === person.id ? (
                    <input
                      type="text"
                      value={editPerson.phoneNumber}
                      onChange={(e) =>
                        setEditPerson({
                          ...editPerson,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  ) : (
                    person.phoneNumber
                  )}
                </td>
                <td>
                  {editingId === person.id ? (
                    <button onClick={() => saveEdit(person.id)}>Save</button>
                  ) : (
                    <button onClick={() => startEdit(person)}>Edit</button>
                  )}
                  <button onClick={() => deletePerson(person.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default PersonForm;
