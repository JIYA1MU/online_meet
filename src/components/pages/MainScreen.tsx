import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { JaaSMeeting } from '@jitsi/react-sdk';
import { useReactMediaRecorder } from 'react-media-recorder';
import io, { Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:5000'); // Adjust the URL to your server's address

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
  const adminPassword = '1234';

  // MediaRecorder hook
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ video: true, audio: true });

  const handleCutClick = () => {
    navigate('/meetingLeft');
  };

  const addLeaveMeetListener = (api: Api) => {
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
    setShowRecordingOptions(false);
  };

  const handleStopRecording = () => {
    stopRecording();
    setShowRecordingOptions(false);
  };

  const handleSaveRecording = () => {
    const a = document.createElement('a');
    a.href = mediaBlobUrl || '';
    a.download = 'recording.mp4';
    a.click();
    setShowRecordingOptions(false);
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
            appId={'vpaas-magic-cookie-f56a0b1f9fa94eec91107e3d674383be'}
            roomName="PleaseUseAGoodRoomName"
            jwt={'eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtZjU2YTBiMWY5ZmE5NGVlYzkxMTA3ZTNkNjc0MzgzYmUvZDJlNjg2LVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3MjI0MDQ0MDIsImV4cCI6MTcyMjQxMTYwMiwibmJmIjoxNzIyNDA0Mzk3LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtZjU2YTBiMWY5ZmE5NGVlYzkxMTA3ZTNkNjc0MzgzYmUiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6InByaXlhbnNodWFnYXJ3YWwxMDA4IiwiaWQiOiJnb29nbGUtb2F1dGgyfDExNDIxOTI2OTU1MTcyMjMzNTc0MSIsImF2YXRhciI6IiIsImVtYWlsIjoicHJpeWFuc2h1YWdhcndhbDEwMDhAZ21haWwuY29tIn19LCJyb29tIjoiKiJ9.CK4-lQDXtE4cwOxHBp8fqHqg-Nx9t0mstxeSOd7QLxkDm5O54gnnCKlJEP2ebg32Ca9fp_VoDR7rrSIbw0puoRGw8Pa9j-1rTl304oO5vPWOOzhk3IalaGmWp30to7NwRvi5nlh74xagSztM5WHknvDrvxJo6_IYpYq2Lbe70PVgswrE00QTMOuf3K6EzkqjnEPMg6CW_o8hmuHdvQ9VQ2f-65jDxbRpwXU64g_DVz0SfdU46AsPatbgKvYJ70BmKdJX4xLeBDxmICrEmUB_x4GbhvRL6ZI9Og4MAh56OzK8tpsN0qZTmkzZusFHmCDrnVfdmlQ2itLZ05UeeS_6Mw'}
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
                    onClick={handleStartRecording}
                    disabled={status === 'recording'}
                  >
                    Start Recording
                  </Button>
                  <Button
                    onClick={handleStopRecording}
                    disabled={status !== 'recording'}
                  >
                    Stop Recording
                  </Button>
                  <Button
                    onClick={handleSaveRecording}
                    disabled={status !== 'stopped'}
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
`;

const AdminLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const RecordingButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
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
`;

const RecordingOptions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

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
`;

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
`;

const RequestItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  span {
    margin-right: 10px;
  }
`;

export default MainScreen;
