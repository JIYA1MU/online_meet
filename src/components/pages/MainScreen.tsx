// import React, { useEffect, useRef } from 'react';
// import styled from 'styled-components';
// import { v4 as uuidv4 } from 'uuid';
// import { JaaSMeeting } from '@jitsi/react-sdk';

// const MainScreen: React.FC = () => {
  // const jitsiContainerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (jitsiContainerRef.current && window.JitsiMeetExternalAPI) {
  //     const domain = 'meet.jit.si';
  //     const roomName = uuidv4(); // Generate a unique room name
  //     const apiKey = process.env.REACT_APP_JITSI_API_KEY;

  //     const options = {
  //       roomName,
  //       width: '100%',
  //       height: '100%',
  //       parentNode: jitsiContainerRef.current,
  //       configOverwrite: {
  //         startWithAudioMuted: false,
  //         startWithVideoMuted: false,
  //       },
  //       interfaceConfigOverwrite: {
  //         filmStripOnly: false,
  //         SHOW_JITSI_WATERMARK: false,
  //         SHOW_BRAND_WATERMARK: false,
  //         SHOW_POWERED_BY: false,
  //         DEFAULT_REMOTE_DISPLAY_NAME: 'Fellow Jitster',
  //         TOOLBAR_BUTTONS: [
  //           'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting', 'fullscreen',
  //           'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
  //           'etherpad', 'sharedvideo', 'settings', 'raisehand', 'videoquality', 'filmstrip',
  //           'invite', 'feedback', 'stats', 'shortcuts', 'tileview', 'videobackgroundblur',
  //           'download', 'help', 'mute-everyone', 'e2ee', 'security'
  //         ],
  //       },
  //       jwt: apiKey
  //     };

  // const api = new window.JitsiMeetExternalAPI(domain, options);

  // Clean up on component unmount
  //     return () => api.dispose();
  //   }
  // }, []);


  import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { JaaSMeeting } from '@jitsi/react-sdk';
import { useReactMediaRecorder } from 'react-media-recorder';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Adjust the URL to your server's address

const MainScreen = () => {
  const navigate = useNavigate();
  const [isMeetingJoined, setIsMeetingJoined] = useState(false);
  const [showRecordingOptions, setShowRecordingOptions] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSecret, setAdminSecret] = useState('');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isParticipantApproved, setIsParticipantApproved] = useState(false);
  const [jwtToken, setJwtToken] = useState('eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtZjU2YTBiMWY5ZmE5NGVlYzkxMTA3ZTNkNjc0MzgzYmUvZDJlNjg2LVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3MjIyNDM2MzUsImV4cCI6MTcyMjI1MDgzNSwibmJmIjoxNzIyMjQzNjMwLCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtZjU2YTBiMWY5ZmE5NGVlYzkxMTA3ZTNkNjc0MzgzYmUiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6InByaXlhbnNodWFnYXJ3YWwxMDA4IiwiaWQiOiJnb29nbGUtb2F1dGgyfDExNDIxOTI2OTU1MTcyMjMzNTc0MSIsImF2YXRhciI6IiIsImVtYWlsIjoicHJpeWFuc2h1YWdhcndhbDEwMDhAZ21haWwuY29tIn19LCJyb29tIjoiKiJ9.DG5cwlKkG3jBrrlVE7fH9JxrbJ1AWQiRp9pZuilaKrTGi7_V7Yxq5cRQefRO22wr7NwpumPk_F2e02Yv7KvfZ77mBh5nKx9N3yZsP4fXQ4Ygn1gam0GN_EIsLJIxB6t7jmowJM-rtUnsJ8SQzDCSohTikda9Kr2rYgYgKqU5x_d3CmezqKP1flhyJKw0gsDrg0Z56CXwo67K0s09E73NRd4emVhuqC6MSOosxJ5IBB0j_Cl4PJ05j_B68nvoHLL_7S-TpOnao1F1NHJ9hkVqRnqdcPkbkrH28ZvKYalF9JHD15Np3P0bo0jz6pjqyj1ZgNkEqPabdbvoS2Z4HEnMUQ'); // Placeholder JWT token

  const adminPassword = 'priyansh'; 

  // MediaRecorder hook
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ video: true, audio: true });

  const handleCutClick = () => {
    navigate('/meetingjoin');
  };

  const addLeaveMeetListener = (api) => {
    api.addListener('readyToClose', handleCutClick);
    api.addListener('videoConferenceJoined', () => {
      setIsMeetingJoined(true);
      if (isAdmin) {
        api.executeCommand('password', adminPassword); // Lock the room with a password if admin
        api.executeCommand('subject', 'Meeting started'); // You can add a custom command if needed
      }
    });
  };

  const handleStartRecording = () => {
    startRecording();
  };

  const handleStopRecording = () => {
    stopRecording();
  };

  const handleSaveRecording = () => {
    const a = document.createElement('a');
    a.href = mediaBlobUrl;
    a.download = 'recording.mp4';
    a.click();
  };

  const handleAdminLogin = () => {
    if (adminSecret === adminPassword) {
      setIsAdmin(true);
      setIsParticipantApproved(true); // Automatically approve admin
    } else {
      alert('Invalid admin secret');
    }
  };

  const handleRequestJoin = () => {
    socket.emit('requestJoin', { id: socket.id });
  };

  useEffect(() => {
    socket.on('requestJoin', (data) => {
      setPendingRequests((prevRequests) => [...prevRequests, data]);
    });

    socket.on('approval', () => {
      setIsParticipantApproved(true);
    });

    return () => {
      socket.off('requestJoin');
      socket.off('approval');
    };
  }, []);

  const handleApproveRequest = (id) => {
    socket.emit('approveJoin', { id });
    setPendingRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
  };

  return (
    <MeetScreen>
      {!isAdmin ? (
        <AdminLogin>
          <input
            type="password"
            placeholder="Enter admin secret"
            value={adminSecret}
            onChange={(e) => setAdminSecret(e.target.value)}
          />
          <Button onClick={handleAdminLogin}>Login as Admin</Button>
          <Button onClick={handleRequestJoin}>Request to Join</Button>
        </AdminLogin>
      ) : (
        <>
          {pendingRequests.length > 0 && (
            <PendingRequests>
              <h3>Pending Requests:</h3>
              {pendingRequests.map((req) => (
                <RequestItem key={req.id}>
                  <span>{req.id}</span>
                  <Button onClick={() => handleApproveRequest(req.id)}>Approve</Button>
                </RequestItem>
              ))}
            </PendingRequests>
          )}
          {isParticipantApproved ? (
            <JaaSMeeting
            // appId={'vpaas-magic-cookie-f10619627d234c6aa68753377fea7985'}
              appId={'vpaas-magic-cookie-f56a0b1f9fa94eec91107e3d674383be'}
              roomName="PleaseUseAGoodRoomName"
              jwt={jwtToken}
              configOverwrite={{
                disableThirdPartyRequests: true,
                disableLocalVideoFlip: true,
                backgroundAlpha: 0.0,
                defaultBackground: 'black'
              }}
              interfaceConfigOverwrite={{
                VIDEO_LAYOUT_FIT: 'nocrop',
                MOBILE_APP_PROMO: false,
                TILE_VIEW_MAX_COLUMNS: 4,
                DEFAULT_REMOTE_DISPLAY_NAME: 'Fellow Jitster',
                DEFAULT_LOCAL_DISPLAY_NAME: 'Me',
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                SHOW_BRAND_WATERMARK: false,
                SHOW_POWERED_BY: false,
                HIDE_DEEP_LINKING_LOGO: true,
                GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
                LANG_DETECTION: true,
                CONNECTION_INDICATOR_DISABLED: false,
                VIDEO_QUALITY_LABEL_DISABLED: false,
                SETTINGS_SECTIONS: ['devices', 'language', 'moderator', 'profile', 'calendar'],
                ENFORCE_NOTIFICATION_AUTO_DISMISS_TIMEOUT: 15000,
                INITIAL_TOOLBAR_TIMEOUT: 20000,
                TOOLBAR_TIMEOUT: 4000,
                SHOW_CONTACTLIST_AVATARS: false,
                TOOLBAR_ALWAYS_VISIBLE: false,
                TOOLBAR_BUTTONS: [
                  'microphone', 'camera', 'closedcaptions', 'desktop', 'embedmeeting', 'fullscreen',
                  'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                  'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                  'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
                  'tileview', 'download', 'help', 'mute-everyone', 'e2ee'
                ],
              }}
              onApiReady={addLeaveMeetListener}
            />
          ) : (
            <p>Waiting for admin approval...</p>
          )}
          {isMeetingJoined && (
            <Controls>
              <Button onClick={() => setShowRecordingOptions(!showRecordingOptions)}>
                Recording
              </Button>
              {showRecordingOptions && (
                <RecordingOptions>
                  <Button onClick={handleStartRecording} disabled={status === 'recording'}>Start Recording</Button>
                  <Button onClick={handleStopRecording} disabled={status !== 'recording'}>Stop Recording</Button>
                  <Button onClick={handleSaveRecording} disabled={!mediaBlobUrl}>Save Recording</Button>
                </RecordingOptions>
              )}
            </Controls>
          )}
        </>
      )}
    </MeetScreen>
  );
};

// Styled-components
const MeetScreen = styled.div`
  width: 100vw;
  height: 100vh !important;
  position: relative;

  #jitsiMeeting-1 {
    height: 100%;
  }
`;

const AdminLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 10px;
`;

const PendingRequests = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 10;
`;

const RequestItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Controls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  background: #007bff;
  border: none;
  border-radius: 5px;
  box-shadow: 0 5px #0056b3, 0 10px 15px rgba(0, 0, 0, 0.2);
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 20px;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: #0056b3;
    box-shadow: 0 2px #004085, 0 5px 10px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
  }
  &:active {
    box-shadow: 0 2px #004085, 0 3px 5px rgba(0, 0, 0, 0.3);
    transform: translateY(2px);
  }
  &:disabled {
    background: #cccccc;
    box-shadow: none;
    cursor: not-allowed;
  }
`;

const RecordingOptions = styled.div`
  display: flex;
  flex-direction: column;
`;

export default MainScreen;
