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


  import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { JaaSMeeting } from '@jitsi/react-sdk';
import { useReactMediaRecorder } from 'react-media-recorder';

const MainScreen = () => {
  const navigate = useNavigate();
  const [isMeetingJoined, setIsMeetingJoined] = useState(false);

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

  return (
    <MeetScreen>
      <JaaSMeeting
      // appId={'vpaas-magic-cookie-f10619627d234c6aa68753377fea7985'}
        appId={'vpaas-magic-cookie-f56a0b1f9fa94eec91107e3d674383be'}
        roomName="PleaseUseAGoodRoomName"
        jwt={'eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtZjU2YTBiMWY5ZmE5NGVlYzkxMTA3ZTNkNjc0MzgzYmUvZDJlNjg2LVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3MjIwODA5MDgsImV4cCI6MTcyMjA4ODEwOCwibmJmIjoxNzIyMDgwOTAzLCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtZjU2YTBiMWY5ZmE5NGVlYzkxMTA3ZTNkNjc0MzgzYmUiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6InByaXlhbnNodWFnYXJ3YWwxMDA4IiwiaWQiOiJnb29nbGUtb2F1dGgyfDExNDIxOTI2OTU1MTcyMjMzNTc0MSIsImF2YXRhciI6IiIsImVtYWlsIjoicHJpeWFuc2h1YWdhcndhbDEwMDhAZ21haWwuY29tIn19LCJyb29tIjoiKiJ9.HW0M7NC0waapW83VwVhVNbR3WyARwFFl1Gv-aB6xC8dp7YQqmWZCHCJ0BBrI6Envs_mmMbVZaF6NEP4bj70zFzfqbjQTMFkO4f-KTK1vxU2wWHPxY8qPncLRltPywGKsVEwmyUuOQy24L70nKx0RecS6XXmS8Iqvr2aDew7qBNDuyBHZIh4cUQgM50WhlWvS90PZn9hDGvZeUO76kpZale71O84LZZjpYZJcH2bCyHRLsaq3ZQMN0FSF6cJQRxBEZztn0H3iiXi8eVwbozgygNp60SxcN4wfRaVbdT-NKla3Y_vNfYUzqn18SkDdoV5YoKLu1X2w0hwbQZWnzsCCxw'}
        configOverwrite={{
          disableThirdPartyRequests: true,
          disableLocalVideoFlip: true,
          backgroundAlpha: 0.0, // Set background transparency to 0
          defaultBackground: 'black' // Set default background color to black
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
      {isMeetingJoined && (
        <Controls>
          <Button onClick={handleStartRecording} disabled={status === 'recording'}>Start Recording</Button>
          <Button onClick={handleStopRecording} disabled={status !== 'recording'}>Stop Recording</Button>
          <Button onClick={handleSaveRecording} disabled={!mediaBlobUrl}>Save Recording</Button>
        </Controls>
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

const Controls = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 10;
  display: flex;
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

export default MainScreen;
