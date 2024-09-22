'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';


interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

const UserAccount: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error('Token not found');
          }
      
          const response = await axios.get<User>('http://localhost:8080/auth/me', {
            headers: {
              Authorization: `${token}`,
            },
          });
      
          setUser(response.data);
          setLoading(false);
        } catch (err: any) {
          setError(err.message || 'Failed to fetch user data');
          setLoading(false);
        }
      };
      

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="user-account">
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
        </div>
      ) : (
        <div>No user data found</div>
      )}
    </div>
  );
};

export default UserAccount;
