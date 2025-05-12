import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/RegisterPage.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); 
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length === 0) {
      setPasswordStrength("");
      return;
    }
    
    if (password.length < 6) {
      setPasswordStrength("weak");
    } else if (password.length < 10 || !/[!@#$%^&*(),.?":{}|<>]/.test(password) || !/\d/.test(password)) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("strong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      window.alert(res.data.message);
      if (res.status === 201) {
        navigate('/login'); 
      }
    } catch (err) {
      console.log("Error:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create an Account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />
          {formData.password && (
            <div className="password-strength">
              <div className={`password-strength-bar strength-${passwordStrength}`}></div>
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="button-group">
          <button type="submit" className="register-btn">Create Account</button>
          <button type="button" className="login-redirect-btn" onClick={handleLoginRedirect}>
            Back to Login
          </button>
        </div>
      </form>
      
      <div className="register-footer">
        Already have an account? <a href="/login">Sign in</a>
      </div>
    </div>
  );
}

export default RegisterPage;