import React, { useState } from 'react';
import axios from 'axios';
import './style/Login.css';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Email:', email);
      console.log('Password:', password);
      const response = await axios.post('http://localhost:8080/auth/login', {
        email,
        password,
      });
  
      console.log('Response:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError('Đăng nhập thất bại, vui lòng kiểm tra lại thông tin.');
    }
  };
  
  return (
    <div className="login-form">
      <h1>Đăng nhập</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
