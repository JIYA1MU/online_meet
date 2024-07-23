import React, { useState } from 'react';
import styled from 'styled-components';
import Webcam from 'react-webcam';
import { IoMdMic, IoMdMicOff } from 'react-icons/io';
import { FaVideo, FaVideoSlash } from 'react-icons/fa';
import { BsFillRecordCircleFill } from 'react-icons/bs';
import { MdCallEnd } from 'react-icons/md';

// Define types for props
interface IconProps {
  isMicOpen?: boolean;
  isVideoOpen?: boolean;
}

// Define the participants data type
interface Participant {
  image: string;
}

const participants: Participant[] = [
  { image: 'src/assets/12.webp' },
  { image: 'src/assets/12.webp' },
  { image: 'src/assets/12.webp' },
];

const MainScreen: React.FC = () => {
  const [isMicOpen, setIsMicOpen] = useState<boolean>(true);
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(true);
  const [active, setActive] = useState<'chat' | 'people'>('chat');

  const ToggleBox = () => {
    setActive(active === 'chat' ? 'people' : 'chat');
  };

  const handleClick = () => {
    setIsMicOpen(!isMicOpen);
  };

  const Toggle = () => {
    setIsVideoOpen(!isVideoOpen);
  };

  return (
    <MeetScreen>
      <div className="screen">
        <div className="presenter">
          {isVideoOpen ? (
            <Webcam
              audio={isMicOpen}
              width="100%"
              height="100%"
              videoConstraints={{ facingMode: 'user' }}
              style={{ width: '100%', height: '100%', borderRadius: '40px', objectFit: 'cover' }}
            />
          ) : (
            <img src="src/assets/12.webp" alt="Meeting" />
          )}
          <div className="options">
            <Mic onClick={handleClick} isMicOpen={isMicOpen} />
            <Video onClick={Toggle} isVideoOpen={isVideoOpen} />
            <Record />
            <Call />
          </div>
        </div>
        <div className="participants">
          {participants.map((participant, index) => (
            <img
              key={index}
              src={participant.image}
              alt={`Participant ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="side">
        <div className="main">
          <div
            className={active === 'chat' ? 'chat active' : 'chat'}
            onClick={ToggleBox}
          >
            Chat
          </div>
          <div
            className={active === 'people' ? 'people active' : 'people'}
            onClick={ToggleBox}
          >
            Participant
          </div>
        </div>
      </div>
    </MeetScreen>
  );
};

// Styled-components
const MeetScreen = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;

  .screen {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  .presenter {
    flex: 1;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 40px;
    overflow: hidden;
    width: 70%;
    height: 500px;
    margin: 30px 20px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 40px;
    }

    .options {
      position: absolute;
      bottom: 10px; /* Adjusted for better visibility */
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      justify-content: center;
      width: 100%; /* Ensures it takes full width */
    }
  }

  .participants {
    display: flex;
    gap: 10px;
    margin-top: 10px;

    img {
      border-radius: 40px;
      width: 22%;
      height: 10rem;
    }
  }

  .side {
    width: 25%;
    height: 83%;
    background-color: #ffffff;
    position: absolute;
    top: 7.6rem;
    right: 2rem;
    border-radius: 50px;

    .main {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      border-radius: 50px;
      font-family: 'Noto Sans', sans-serif;
      font-size: 17px;

      .chat, .people {
        width: 50%;
        height: 4rem;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      .chat.active, .people.active {
        background-color: black;
        color: white;
      }
    }
  }
`;

// Styled-components for icons with type definitions
const Mic = styled(({ isMicOpen, ...props }: IconProps) =>
  isMicOpen ? <IoMdMic {...props} /> : <IoMdMicOff {...props} />
)`
  background-color: white;
  border-radius: 50%;
  font-size: 30px;
  padding: 10px;
`;

const Video = styled(({ isVideoOpen, ...props }: IconProps) =>
  isVideoOpen ? <FaVideo {...props} /> : <FaVideoSlash {...props} />
)`
  background-color: white;
  border-radius: 50%;
  font-size: 30px;
  padding: 10px;
`;

const Record = styled(BsFillRecordCircleFill)`
  background-color: white;
  border-radius: 50%;
  font-size: 30px;
  padding: 10px;
`;

const Call = styled(MdCallEnd)`
  background-color: #d62d2d;
  color: white;
  border-radius: 50%;
  font-size: 30px;
  padding: 10px;
`;

export default MainScreen;
