import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { setLanguage , selectLanguage , selectTranslations } from '../../rtk/slices/Translate-slice';
import './sign.css';

const SignUpForm = ({ showPassword, handleTogglePasswordVisibility }) => {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);


  const [formData, setFormData] = useState({
  
    email: '',
    password: '',
    confirmPassword: '',

  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  }, [language]);


  const handleInputChange = (field, value) => {
    setErrors({});
    setFormData({ ...formData, [field]: value });
  };

  const handleRegister = () => {
    axios.post('https://mostafaben.bsite.net/api/Users/register', formData)
      .then(result => {
        localStorage.setItem('token', result.data.token);
        navigate('/home');
      })
      .catch(err => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {};


    
    if (formData.email === "" || formData.email === null) {
      isvalid = false;
      validationErrors.email = "Email required; "
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isvalid = false;
      validationErrors.email = "Email is not valid; "
    }

    if (formData.password === "" || formData.password === null) {
      isvalid = false;
      validationErrors.password = "password required; "
    } else if (formData.password.length < 6) {
      isvalid = false;
      validationErrors.password = "password length at least 6 char; "
    }
    if (formData.confirmPassword !== formData.password) {
      isvalid = false;
      validationErrors.confirmPassword = "c password not match; "
    }

    setErrors(validationErrors);
    setValid(isvalid);

    if (isvalid) {
      handleRegister();
    }
  };

  return (
    <>
      <form action="#" className="sign-up-form" onSubmit={handleSubmit}>

        {/* RegisterForm integrated here */}
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
              onChange={(event) => handleInputChange("email", event.target.value)}
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
              onChange={(event) => handleInputChange("password", event.target.value)}
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          <div className="mb-3 col-md-12">
            <label>
              Confirm Password<span className="text-danger">*</span>
            </label>
            <input
              type="password"
              name="confirmpassword"
              className="form-control"
              placeholder="Confirm Password"
              onChange={(event) => handleInputChange("confirmPassword", event.target.value)}
            />
            {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
          </div>
        </div>
        {/* End of RegisterForm */}

        <input type="submit" className="signbtn" value={translations[language]?.login} />
      </form>
    </>
  );
};

export default SignUpForm;
