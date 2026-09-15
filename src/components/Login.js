import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();

    if (json.authtoken || json.success) {
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Logged in Successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div 
        className="card p-4 p-md-5 shadow-lg border-0 rounded-4" 
        style={{ 
          width: "100%", 
          maxWidth: "420px", 
          background: "#ffffff",
          boxShadow: "0 15px 35px rgba(0,0,0,0.1)" 
        }}
      >
        {/* Header Section */}
        <div className="text-center mb-4">
          <div 
            className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 text-primary rounded-circle mb-3" 
            style={{ width: "65px", height: "65px", fontSize: "1.8rem" }}
          >
            🔐
          </div>
          <h3 className="fw-bold text-dark mb-1">Welcome Back</h3>
          <p className="text-muted small">Please enter your details to access iNotebook</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold text-secondary small">
              EMAIL ADDRESS
            </label>
            <input 
              type="email" 
              className="form-control form-control-lg fs-6 rounded-3 bg-light border-0 px-3 py-2" 
              value={credentials.email} 
              onChange={onChange} 
              autoComplete="username"
              id="email" 
              name="email" 
              autoComplete='current password'
              placeholder="name@example.com"
              required 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold text-secondary small">
              PASSWORD
            </label>
            <input 
              type="password" 
              className="form-control form-control-lg fs-6 rounded-3 bg-light border-0 px-3 py-2" 
              value={credentials.password} 
              onChange={onChange} 
              autoComplete="current-password"
              name="password" 
              id="password" 
              placeholder="••••••••"
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg w-100 rounded-3 fw-bold fs-6 py-2.5 shadow-sm"
          >
            Sign In
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-4">
          <p className="text-muted small mb-0">
            Don't have an account? {' '}
            <Link to="/signup" className="text-primary fw-bold text-decoration-none">
              Sign Up
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Login;