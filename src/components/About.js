import React from 'react';

const About = () => {
  return (
    <div className="container my-5">
      
      {/* 1. HERO SECTION WITH FLOATING TERMINAL MOCKUP */}
      <div 
        className="row align-items-center p-4 p-md-5 mb-5 rounded-5 shadow-lg position-relative overflow-hidden" 
        style={{ 
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}
      >
        {/* Glow effect background */}
        <div style={{ position: "absolute", width: "250px", height: "250px", background: "rgba(99, 102, 241, 0.3)", filter: "blur(90px)", borderRadius: "50%", top: "-50px", right: "-50px" }}></div>

        {/* Hero Text */}
        <div className="col-lg-7 mb-4 mb-lg-0 position-relative" style={{ zIndex: 2 }}>
          <span className="badge bg-indigo px-3 py-2 rounded-pill mb-3 text-uppercase" style={{ background: "#4f46e5", letterSpacing: "1px", fontSize: "0.75rem" }}>
            ✨ iNotebook v2.0 • Cloud Storage
          </span>
          <h1 className="display-4 fw-black mb-3 text-white" style={{ fontWeight: 800 }}>
            Redefining How You <br />
            <span style={{ background: "linear-gradient(90deg, #818cf8 0%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Capture & Secure
            </span> Thoughts.
          </h1>
          <p className="lead text-light opacity-75 mb-4" style={{ fontSize: "1.1rem" }}>
            Say goodbye to physical sticky notes. iNotebook offers a fast, encrypted, and accessible platform to manage your personal notes anytime, anywhere.
          </p>
          <div className="d-flex gap-3 align-items-center">
            <a href="/" className="btn btn-primary btn-lg rounded-pill px-4 py-2 shadow-sm fs-6" style={{ background: "#6366f1", border: "none" }}>
              <i className="fas fa-sticky-note me-2"></i>View My Notes
            </a>
          </div>
        </div>

        {/* Developer Terminal Mockup */}
        <div className="col-lg-5 position-relative" style={{ zIndex: 2 }}>
          <div className="card border-0 rounded-4 shadow-lg overflow-hidden" style={{ background: "#090d16", border: "1px solid #1e293b" }}>
            <div className="card-header border-0 d-flex align-items-center gap-2 px-3 py-2" style={{ background: "#111827" }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }}></div>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }}></div>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981" }}></div>
              <span className="ms-auto text-muted font-monospace" style={{ fontSize: "0.75rem" }}>iNotebook.js</span>
            </div>
            {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
            <div className="card-body p-3 font-monospace" style={{ fontSize: "0.85rem", color: "#38bdf8" }}>
              <p className="mb-1 text-secondary">// Fetching user notes securely</p>
              <p className="mb-1"><span style={{ color: "#f472b6" }}>const</span> fetchNotes = <span style={{ color: "#f472b6" }}>async</span> () =&gt; &#123;</p>
              <p className="mb-1 ms-3 text-white"><span style={{ color: "#f472b6" }}>const</span> token = localStorage.getItem(<span style={{ color: "#a3e635" }}>'token'</span>);</p>
              <p className="mb-1 ms-3 text-white"><span style={{ color: "#f472b6" }}>const</span> res = <span style={{ color: "#f472b6" }}>await</span> fetch(<span style={{ color: "#a3e635" }}>'/api/notes'</span>);</p>
              {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
              <p className="mb-1 ms-3 text-emerald-400" style={{ color: "#4ade80" }}>// Status: 200 OK (JWT Verified)</p>
              <p className="mb-0">&#125;;</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CORE FEATURES GRID */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">Built for Speed & Privacy</h2>
        <p className="text-muted">Everything you need to manage your personal notes without friction.</p>
      </div>

      <div className="row g-4 mb-5">
        {/* Feature 1 */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm p-3 rounded-4 text-center" style={{ background: "#ffffff", transition: "all 0.3s" }}>
            <div className="mx-auto mb-3 p-3 rounded-circle" style={{ width: 60, height: 60, background: "#e0e7ff", color: "#4f46e5" }}>
              <i className="fas fa-shield-alt fa-lg"></i>
            </div>
            <h5 className="fw-bold mb-2">JWT Security</h5>
            <p className="text-muted fs-6 mb-0">Encrypted token-based authentication keeps your notes completely private.</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm p-3 rounded-4 text-center" style={{ background: "#ffffff" }}>
            <div className="mx-auto mb-3 p-3 rounded-circle" style={{ width: 60, height: 60, background: "#dcfce7", color: "#16a34a" }}>
              <i className="fas fa-sync-alt fa-lg"></i>
            </div>
            <h5 className="fw-bold mb-2">Real-time CRUD</h5>
            <p className="text-muted fs-6 mb-0">Instantly Add, Edit, and Delete notes using React Context API state.</p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm p-3 rounded-4 text-center" style={{ background: "#ffffff" }}>
            <div className="mx-auto mb-3 p-3 rounded-circle" style={{ width: 60, height: 60, background: "#fef3c7", color: "#d97706" }}>
              <i className="fas fa-cloud fa-lg"></i>
            </div>
            <h5 className="fw-bold mb-2">MongoDB Cloud</h5>
            <p className="text-muted fs-6 mb-0">Your data is stored safely on MongoDB Atlas cloud infrastructure.</p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm p-3 rounded-4 text-center" style={{ background: "#ffffff" }}>
            <div className="mx-auto mb-3 p-3 rounded-circle" style={{ width: 60, height: 60, background: "#f3e8ff", color: "#9333ea" }}>
              <i className="fas fa-mobile-alt fa-lg"></i>
            </div>
            <h5 className="fw-bold mb-2">100% Responsive</h5>
            <p className="text-muted fs-6 mb-0">Bootstrap 5 grid ensures clean view on mobile, tablet, and PC.</p>
          </div>
        </div>
      </div>

      {/* 3. TECH STACK BADGES */}
      <div className="p-4 rounded-4 text-center bg-light border shadow-sm mb-5">
        <h6 className="text-uppercase fw-bold text-muted mb-3" style={{ letterSpacing: "1px", fontSize: "0.8rem" }}>
          Full-Stack Technology Architecture
        </h6>
        <div className="d-flex justify-content-center flex-wrap gap-3">
          <span className="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm fs-6">
            <i className="fab fa-react text-info me-2"></i>React.js
          </span>
          <span className="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm fs-6">
            <i className="fab fa-node-js text-success me-2"></i>Node.js
          </span>
          <span className="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm fs-6">
            {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
            <i className="fas fa-server text-secondary me-2"></i>Express.js
          </span>
          <span className="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm fs-6">
            <i className="fas fa-database text-success me-2"></i>MongoDB Atlas
          </span>
          <span className="badge bg-white text-dark border px-3 py-2 rounded-pill shadow-sm fs-6">
            <i className="fab fa-bootstrap text-primary me-2"></i>Bootstrap 5
          </span>
        </div>
      </div>

      {/* 4. DEVELOPER CARD */}
      <div 
        className="card border-0 rounded-4 text-white shadow-lg p-4 text-center text-md-start"
        style={{ background: "linear-gradient(90deg, #1e293b 0%, #0f172a 100%)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <div className="row align-items-center">
          <div className="col-md-8 mb-3 mb-md-0">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-3 mb-2">
              <div className="rounded-circle bg-primary bg-opacity-20 p-2 text-primary d-flex align-items-center justify-content-center" style={{ width: 45, height: 45 }}>
                <i className="fas fa-code-branch fa-lg"></i>
              </div>
              <div>
                <h4 className="fw-bold mb-0 text-white">Designed & Engineered by Hammad</h4>
                <p className="text-light opacity-75 mb-0 fs-6">MERN Stack Developer</p>
              </div>
            </div>
            <p className="text-light opacity-50 mb-0 ms-md-5 ps-md-2" style={{ fontSize: "0.9rem" }}>
              Built as a modern, production-ready web application showcasing REST API integrations, state management, and secure web authentication.
            </p>
          </div>
          <div className="col-md-4 text-center text-md-end">
            <span className="btn btn-outline-light rounded-pill px-4 py-2 disabled opacity-75">
              <i className="fas fa-check-circle me-2 text-success"></i>Project Completed
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;