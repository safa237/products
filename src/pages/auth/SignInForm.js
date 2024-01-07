
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { setLanguage , selectLanguage , selectTranslations } from '../../rtk/slices/Translate-slice';
import './sign.css';

const SignInForm = () => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user', // Default role is user
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  }, [language]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };


  const handleInputChange = (field, value) => {
    setErrors({});
    const role = value.includes('admin') ? 'admin' : 'user';
    setFormData({ ...formData, [field]: value, role });
  };

  const handleUserLogin = () => {
    console.log('user Login Payload:', formData); // Log the payload

    // User login logic
    axios.post('https://mostafaben.bsite.net/api/Users/login', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(result => {
        localStorage.setItem('token', result.data.token);
        navigate('/home');
      })
      .catch(err => {
        console.log(err);
        setErrors({ general: 'Invalid email or password' });
      });
  };

  const handleAdminLogin = () => {
    console.log('Admin Login Payload:', formData); // Log the payload
    
    axios.post('https://mostafaben.bsite.net/api/Admins/login', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(result => {
        localStorage.setItem('token', result.data.token);
        navigate('/dashboard');
      })
      .catch(err => {
        console.log(err.response); 
        console.log(err);
        setErrors({ general: 'Invalid email or password for admin' });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    if (formData.email === '' || formData.email === null) {
      isValid = false;
      validationErrors.email = 'Email required; ';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      validationErrors.email = 'Email is not valid; ';
    }

    if (formData.password === '' || formData.password === null) {
      isValid = false;
      validationErrors.password = 'Password required; ';
    }

    setErrors(validationErrors);
    setValid(isValid);

    if (isValid) {
      formData.role === 'user' ? handleUserLogin() : handleAdminLogin();
    }
  };

  return (
    <>
      <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-md-12">
            <label>
              Email<span className="text-danger">*</span>
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(event) => handleInputChange('email', event.target.value)}
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3 col-md-12">
            <label>
              Password<span className="text-danger">*</span>
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={(event) => handleInputChange('password', event.target.value)}
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
        </div>
        {errors.general && <div className="text-danger">{errors.general}</div>}
        <Link to="/forget-password">Forgot Password</Link>
        <input type="submit" className="signbtn" value={translations[language]?.login} />
      </form>
    </>
  );
};

export default SignInForm;




