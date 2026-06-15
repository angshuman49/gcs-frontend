import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>S.F.X. Greenherald CSC</h3>
          <p>Student-led service since 2021</p>
        </div>
        <div className="footer-links">
          <h4>Quick links</h4>
          <ul>
            <li><a href="/s/home">Home</a></li>
            <li><a href="/s/schedule">Schedule</a></li>
            <li><a href="/s/notice">Notices</a></li>
            <li><a href="/dashboard">Dashboard (Exec)</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <h4>Connect</h4>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer"><span className="glyph"> </span></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><span className="glyph"> </span></a>
         
            <a href="mailto:club@sfxgreenherald.org"><span className="glyph">  </span></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 S.F.X. Greenherald – Altruism in action</p>
      </div>
    </footer>
  );
}

export default Footer;
