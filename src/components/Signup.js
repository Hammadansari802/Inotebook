import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup(props) {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  // Onchange function to update state
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = credentials;

    // Password Match Validation
    if (password !== confirmPassword) {
      props.showAlert("Passwords do not match!", "danger");
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json();
    console.log(json);

    const token = json.authtoken || json.jwttoken;

    if (token || json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', token);
      navigate("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert(json.error || "Invalid Credentials", "danger");
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center my-4" style={{ minHeight: "85vh" }}>
      <div 
        className="card p-4 p-md-5 shadow-lg border-0 rounded-4" 
        style={{ 
          width: "100%", 
          maxWidth: "450px", 
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
            🚀
          </div>
          <h3 className="fw-bold text-dark mb-1">Create Account</h3>
          <p className="text-muted small">Sign up to start saving your notes securely</p>
        </div>

        {/* Form Section */}
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold text-secondary small">
              FULL NAME
            </label>
            <input 
              type="text" 
              className="form-control form-control-lg fs-6 rounded-3 bg-light border-0 px-3 py-2" 
              id="name" 
              name="name" 
              
              placeholder="Hammad Ali"
              onChange={onchange} 
              required
              minLength={3}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold text-secondary small">
              EMAIL ADDRESS
            </label>
            <input 
              type="email" 
              className="form-control form-control-lg fs-6 rounded-3 bg-light border-0 px-3 py-2" 
              id="email" 
              name="email" 
              autoComplete="username" 
              
              placeholder="name@example.com"
              onChange={onchange} 
              required 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold text-secondary small">
              PASSWORD
            </label>
            <input 
              type="password" 
              className="form-control form-control-lg fs-6 rounded-3 bg-light border-0 px-3 py-2" 
              id="password" 
              name="password" 
              placeholder="At least 5 characters"
              autoComplete="new-password"
              onChange={onchange} 
              minLength={5} 
              required 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label fw-semibold text-secondary small">
              CONFIRM PASSWORD
            </label>
            <input 
              type="password" 
              className="form-control form-control-lg fs-6 rounded-3 bg-light border-0 px-3 py-2" 
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Re-enter password"
              autoComplete="new-password"
              onChange={onchange} 
              minLength={5} 
              required 
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-lg w-100 rounded-3 fw-bold fs-6 py-2.5 shadow-sm"
          >
            Create Account
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-4">
          <p className="text-muted small mb-0">
            Already have an account? {' '}
            <Link to="/login" className="text-primary fw-bold text-decoration-none">
              Log In
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Signup;