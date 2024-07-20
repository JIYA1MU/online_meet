import React from 'react';
import './Chat.css';

const Chat: React.FC = () => {
  return (
    <div className="chat">
      <h2>Room Chat</h2>
      <div className="messages">
        <div className="message">
          <span className="participant-name">Alicia</span>
          <span className="message-time">9:12 AM</span>
          <p>Lorem ipsum Lorem ipsum Lorem</p>
        </div>
        <div className="message me">
          <span className="participant-name">You</span>
          <span className="message-time">9:13 AM</span>
          <p>Lorem ipsum Lorem ipsum Lorem</p>
        </div>
      </div>
      <input type="text" placeholder="Type a message..." />
    </div>
  );
}

export default Chat;
