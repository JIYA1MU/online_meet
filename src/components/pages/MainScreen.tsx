import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { JaaSMeeting } from '@jitsi/react-sdk';
import io, { Socket } from 'socket.io-client';
import RecordRTC from 'recordrtc';

const socket: Socket = io('http://localhost:5000');

interface RequestData {
  id: string;
}

interface Api {
  addListener: (event: string, handler: () => void) => void;
  executeCommand: (command: string, value?: string) => void;
}

const MainScreen = () => {
  const navigate = useNavigate();
  const [isMeetingJoined, setIsMeetingJoined] = useState<boolean>(false);
  const [showRecordingOptions, setShowRecordingOptions] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminSecret, setAdminSecret] = useState<string>('');
  const [isParticipantApproved, setIsParticipantApproved] = useState<boolean>(false);
  const [pendingRequests, setPendingRequests] = useState<RequestData[]>([]);
  const [jwtToken, setJwtToken] = useState<string>('');
  const [tokenExpiry, setTokenExpiry] = useState<number>(0);
  const [recordingStatus, setRecordingStatus] = useState<'idle' | 'recording' | 'stopped'>('idle');
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<RecordRTC | null>(null);

  const fetchNewToken = async () => {
    try {
      const response = await fetch('/api/get-new-token');
      const data = await response.json();
      console.log('Fetched token:', data.token);
      console.log('Token expiry:', data.expiry);
      setJwtToken(data.token);
      setTokenExpiry(data.expiry); 
    } catch (error) {
      console.error('Failed to refresh token', error);
    }
  };

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      if (tokenExpiry - now <= 300) { 
        fetchNewToken();
      }
    }, 60000); 

    return () => clearInterval(refreshInterval);
  }, [tokenExpiry]);

  const handleCutClick = () => {
    navigate('/meetingLeft');
  };

  const addLeaveMeetListener = (api: Api) => {
    api.addListener('readyToClose', handleCutClick);
    api.addListener('videoConferenceJoined', () => {
      setIsMeetingJoined(true);
      if (isAdmin) {
        api.executeCommand('password', '1234');
        api.executeCommand('subject', 'Meeting started');
      }
    });
  };

  const startRecording = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const webcamStream = await navigator.mediaDevices.getUserMedia({ video: true });

      const combinedStream = new MediaStream([
        ...screenStream.getVideoTracks(),
        ...webcamStream.getVideoTracks(),
      ]);

      mediaStreamRef.current = combinedStream;
      screenStreamRef.current = screenStream;

      recorderRef.current = new RecordRTC(combinedStream, {
        type: 'video',
        mimeType: 'video/webm',
      });

      recorderRef.current.startRecording();
      setRecordingStatus('recording');
      alert('Recording started');
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        const blob = recorderRef.current?.getBlob();
        if (blob) {
          setRecordingStatus('stopped');
          alert('Recording stopped and saved');
          // Trigger download
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'recording.webm';
          a.click();
        }
      });
    }
  };

  const handleAdminLogin = () => {
    if (adminSecret === '1234') {
      setIsAdmin(true);
      setIsParticipantApproved(true); 
      fetchNewToken(); 
    } else {
      alert('Invalid admin secret');
    }
  };

  const handleRequestJoin = () => {
    socket.emit('requestJoin', { id: socket.id });
  };

  useEffect(() => {
    socket.on('requestJoin', (data: RequestData) => {
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

  const handleApproveRequest = (id: string) => {
    socket.emit('approveJoin', { id });
    setPendingRequests((prevRequests) => prevRequests.filter((req) => req.id !== id));
  };

  return (
    <FullScreen>
      {isParticipantApproved ? (
        <>
          <JaaSMeeting
            appId={'vpaas-magic-cookie-f10619627d234c6aa68753377fea7985'}
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
              PROVIDER_NAME: 'My App'
            }}
            getIFrameRef={(iframeRef) => {
              iframeRef.style.height = '100%';
              iframeRef.style.width = '100%';
            }}
            onApiReady={addLeaveMeetListener}
          />

          {isMeetingJoined && (
            <RecordingButtonContainer>
              <RecordingButton onClick={() => setShowRecordingOptions(!showRecordingOptions)}>
                {showRecordingOptions ? 'Close Options' : 'Recording Options'}
              </RecordingButton>
              {showRecordingOptions && (
                <RecordingOptions>
                  <Button
                    onClick={startRecording}
                    disabled={recordingStatus === 'recording'}
                  >
                    Start Recording
                  </Button>
                  <Button
                    onClick={stopRecording}
                    disabled={recordingStatus !== 'recording'}
                  >
                     Save Recording
                  </Button>
                </RecordingOptions>
              )}
            </RecordingButtonContainer>
          )}
        </>
      ) : (
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
      )}
      <PendingRequests>
        {pendingRequests.map((req) => (
          <RequestItem key={req.id}>
            <span>Request from {req.id}</span>
            <Button onClick={() => handleApproveRequest(req.id)}>Approve</Button>
          </RequestItem>
        ))}
      </PendingRequests>
    </FullScreen>
  );
};

const FullScreen = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #9ACEEB;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`

const AdminLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const RecordingButtonContainer = styled.div`
  position: absolute;
  top: 20px;       // Distance from the top of the viewport
  right: 20px;     // Distance from the right edge of the viewport
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const RecordingButton = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`

const RecordingOptions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`

const Button = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`

const PendingRequests = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
`

const RequestItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  span {
    margin-right: 10px;
  }
`

export default MainScreen;
