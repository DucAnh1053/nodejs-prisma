import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Crud from './components/Crud';
import Login from './components/Login';
import Signup from './components/Signup';
import UserAccount from './components/UserAccount';

function App() {
const role = 'admin';
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/useraccount" element={<UserAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {role === 'admin' && <Route path="/crud" element={<Crud />} />}

        {/* Redirect all unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
