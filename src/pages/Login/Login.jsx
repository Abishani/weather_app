import React, { useEffect, useState } from 'react'
import './Login.css'
import { emailValidator, passwordValidator } from '../../Components/regexValidator'
import { useNavigate } from 'react-router-dom';


import user_icon from '../../Components/Assets/person.png'
import password_icon from '../../Components/Assets/password.png'

const Login = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({ email: "", password: "" });

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setsuccessMessage] = useState("");

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) navigate("/");
  }, []);

  const formSubmit = (e) => {
    e.preventDefault();
    setsuccessMessage("");
    if (!emailValidator(input.email))
      return setErrorMessage("Please enter valid email id");

    if (!passwordValidator(input.password))
      return setErrorMessage(
        "Password should have minimum 8 character with the combination of letters, numbers ans special characters"
      );

    navigate("/");
    localStorage.setItem("auth", true);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      {errorMessage.length > 0 && (
        <div className="errorMsg">{errorMessage}</div>
      )}
      {successMessage.length > 0 && (
        <div className="successMsg">{successMessage}</div>
      )}
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input
            type="text"
            placeholder="Name"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="forgot-password">Forgot Password? </div>
      <div className="submit-container">
        <div className="submit" onClick={formSubmit}>
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;