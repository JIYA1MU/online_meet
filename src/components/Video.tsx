import React from 'react';
import { FaMicrophone, FaVideo, FaPhoneSlash } from 'react-icons/fa';
import './Video.css';

const Video: React.FC = () => {
  return (
    <div className="video-container">
      <div className="main-video">
        <img src="src/assets/12.webp" alt="Main Video" />
        <div className="icons">
        <button className="icon-button"><FaMicrophone /></button>
        <button className="icon-button"><FaVideo /></button>
        <button className="icon-button"><FaPhoneSlash /></button>
        <button className="icon-button"><FaPhoneSlash /></button>
      </div>
      </div>
      <div className="video-list">
      <div className="video-item">
        <img src="src/assets/12.webp" alt="Video 1" />
        <button className="audio-icon"><FaMicrophone /></button>
      </div>
      <div className="video-item">
        <img src="src/assets/12.webp" alt="Video 2" />
        <button className="audio-icon"><FaMicrophone /></button>
      </div>
      <div className="video-item">
        <img src="src/assets/12.webp" alt="Video 3" />
        <button className="audio-icon"><FaMicrophone /></button>
      </div>
      <div className="video-item">
        <img src="src/assets/12.webp" alt="Video 4" />
        <button className="audio-icon"><FaMicrophone /></button>
      </div>
    </div>
    <button className="greater-sign">&gt;</button>
    </div>
  );
}

export default Video;
