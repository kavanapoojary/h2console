// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PersonTable from './PersonTable';
import PersonForm from './PersonForm';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<PersonTable />} />
                    <Route path="/login" element={<PersonForm />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
