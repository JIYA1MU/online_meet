import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <button className="back-button">←</button>
      <h1>Daily Meeting - 09:00 a.m</h1>
      <div className="join-request">
        <span>Mugdha wants to join</span>
        <button className="accept-button">✓</button>
        <button className="decline-button">✗</button>
      </div>
    </header>
  );
}

export default Header;
