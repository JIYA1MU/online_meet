import React from 'react';
import Header from './Header';
import Video from './Video';
import Chat from './Chat';
import './MeetingMain.css';

const VideoConference: React.FC = () => {
  return (
    <div className="video-conference">
      <Header />
      <div className="main-content">
        <div className="video-section">
          <Video />
        </div>
        <div className="chat-section">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default VideoConference;
