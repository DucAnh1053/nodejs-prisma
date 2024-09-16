import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './style/Home.css';

const Home = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('/auth/user');
        setRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Lab Information System</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/useraccount">User Account</Link></li>
            {role === 'admin' && <li><Link to="/crud">Manage Data</Link></li>}
            <li><Link to="/signup">Sign Up</Link></li> 
            <li><Link to="/login">Login</Link></li> 
          </ul>
        </nav>
      </header>

      <main className="home-content">
        <section>
          <h2>Welcome to the Lab Information System</h2>
          <p>
            This system provides comprehensive tools for managing laboratory
            information. You can view user accounts, manage data, and more.
          </p>
        </section>
        <section>
          <h3>Features:</h3>
          <ul>
            <li>Manage user accounts</li>
            <li>CRUD operations on lab data</li>
            <li>Generate reports</li>
          </ul>
        </section>
      </main>

      <footer className="home-footer">
        <p>&copy; 2024 Lab Information System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;