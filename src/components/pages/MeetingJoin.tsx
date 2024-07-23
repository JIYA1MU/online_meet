import Layout from '../Layout';
import styled from 'styled-components';
import { useState } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MdPresentToAll } from 'react-icons/md';



// MeetingJoin component
const MeetingJoin = () => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const navigate = useNavigate();

  // Function to handle microphone toggle
  const handleMicToggle = () => {
    setIsMicOn(!isMicOn);
    console.log(isMicOn ? 'Microphone turned off' : 'Microphone turned on');
  };

  // Function to handle video toggle
  const handleVideoToggle = () => {
    setIsVideoOn(!isVideoOn);
    console.log(isVideoOn ? 'Video turned off' : 'Video turned on');
  };

  // Function to handle "Join now" button click
  const handleJoinNowClick = () => {
    console.log('Join now button clicked');
    navigate('/meetingmain');
  };

  // Function to start screen sharing
  const handlePresentClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false 
      });

      
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      videoElement.autoplay = true;
      document.body.appendChild(videoElement); 

      console.log('Screen sharing started');
    } catch (error) {
      console.error('Error sharing screen:', error);
    }
  };

  return (
    <Layout>
      <Container>
        <section className="meetingSection">
          <div className="leftPanel">
            <div className="videoContainer">
              <img
                src="src/assets/12.webp"
                alt="Meeting"
                className='video'
              />
            </div>
            <div className='controls'>
              <button className='controlButton' onClick={handleMicToggle}>
                {isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
              </button>
              <button className='controlButton' onClick={handleVideoToggle}>
                {isVideoOn ? <FaVideo /> : <FaVideoSlash />}
              </button>
            </div>
          </div>
          <div className='meetingInfo'>
            <h2>ujk-thk-luwg</h2>
            <p>No one else in the meeting</p>
            <button className="joinButton" onClick={handleJoinNowClick}>Join now</button>
            <button className="presentButton" onClick={handlePresentClick}>
              <Present />
              <span>Present</span>
            </button>
          </div>
        </section>
      </Container>
    </Layout>
  );
};



const Container = styled.div`
  .meetingSection{
    display: flex;
    align-items: center;    
    padding : 20px;
  }
  .leftPanel{
    margin-right : 6rem;
  }
  .videoContainer{
    width : 550px;
  }
  .video{
    width : 100%;
    border-radius: 50px;
  }
  .controls{
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 10px;
  }
  .controlButton{
    background-color : #fff;
    border : 1px solid #ccc ;
    border-radius: 50%;
    padding : 12px; // Increased padding
    margin : 0 10px;
    cursor: pointer;
  } 
  .meetingInfo{
    text-align: center;
    margin-left: 100px; // Add margin to separate text from the image
    margin-bottom: 50px;
  }
  .joinButton{
    background-color : #013D51;
    color: white;
    padding: 16px 24px;  // Increased padding
    margin: 10px 0; // Adjusted margin
    border : none;
    border-radius: 50px;
    cursor : pointer;
    font-size: 1em; // Adjusted font size
    gap:10px;
  }
  .presentButton{
    background-color : #ffffff;
    color : #013D51; 
    padding : 12px 24px; // Increased padding
    margin : 10px 15px; // Adjusted margin
    border : none;
    border-radius : 50px;
    cursor : pointer;
    font-size: 1em;
  }
  h2{
    font-family: "Noto Sans", sans-serif;
    font-weight: 600;
    font-size : 40px;
  }
  p{
    font-family: "Noto Sans", sans-serif;
    font-size : 15px;
  }
  span{
    margin-left : 10px;
  }
`

const Present = styled(MdPresentToAll)`
  font-size : 20px;
  vertical-align : bottom;
`


export default MeetingJoin