import React from 'react';
import './Intro.css';

function Intro() {
  return (
    <div className="intro-wrapper">
      <div className="intro-container">
        <div className="intro-badge">* EST. 2021</div>
        <h1 className="intro-title">
          S.F.X. Greenherald<br />
          <span className="intro-highlight">Community Service Club</span>
        </h1>
        <p className="intro-text">
          Student‑led action for environmental care, educational equity, and local outreach.  
          Join us to earn service hours, badges, and real impact.
        </p>
        
      </div>
      <div className="intro-stats">
        <div className="stat">
          <span className="stat-number">120+</span>
          <span className="stat-label">Active Members</span>
        </div>
        <div className="stat">
          <span className="stat-number">1.2k+</span>
          <span className="stat-label">Hours Pledged</span>
        </div>
        <div className="stat">
          <span className="stat-number">15+</span>
          <span className="stat-label">Yearly Drives</span>
        </div>
      </div>
    </div>
  );
}

export default Intro;
