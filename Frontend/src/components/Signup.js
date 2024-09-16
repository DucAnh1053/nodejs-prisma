import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './style/Signup.css'; 

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Tên phải có ít nhất 3 ký tự')
      .required('Tên là bắt buộc'),
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Email là bắt buộc'),
    password: Yup.string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .required('Mật khẩu là bắt buộc'),
  });

  const handleSignup = async (values) => {
    try {
      console.log('Đang gửi yêu cầu đăng ký...'); // Log trước khi gửi
      const response = await axios.post('http://localhost:8080/auth/signup/', values);
      console.log('Đăng ký thành công:', response.data);
      
      // Điều hướng sau khi đăng ký thành công
      navigate('/login'); 
    } catch (error) {
      console.error('Đăng ký thất bại:', error.response ? error.response.data : error.message);
      alert('Đăng ký thất bại, vui lòng thử lại.');
    }
  };

  return (
    <div className="signup-form">
      <h1>Đăng ký</h1>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSignup}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="name">Tên</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <Field type="password" id="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>

          <button type="submit">Đăng ký</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
