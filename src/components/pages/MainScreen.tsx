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
  const adminPassword = '1234';

  const [recordingStatus, setRecordingStatus] = useState<'idle' | 'recording' | 'stopped'>('idle');
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<RecordRTC | null>(null);

  const handleCutClick = () => {
    navigate('/meetingLeft');
  };

  const addLeaveMeetListener = (api: Api) => {
    api.addListener('readyToClose', handleCutClick);
    api.addListener('videoConferenceJoined', () => {
      setIsMeetingJoined(true);
      if (isAdmin) {
        api.executeCommand('password', adminPassword); 
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
          setRecordedBlob(blob);
          setRecordingStatus('stopped');
          alert('Recording stopped');
        }
      });
    }
  };

  const saveRecording = () => {
    if (recordedBlob) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(recordedBlob);
      a.download = 'recording.webm';
      a.click();
      alert('Recording saved');
    }
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
            appId={'vpaas-magic-cookie-f10619627d234c6aa68753377fea7985'}
            roomName="PleaseUseAGoodRoomName"
            jwt={'eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtZjEwNjE5NjI3ZDIzNGM2YWE2ODc1MzM3N2ZlYTc5ODUvZmNiZmVhLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3MjI1MDg3MjksImV4cCI6MTcyMjUxNTkyOSwibmJmIjoxNzIyNTA4NzI0LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtZjEwNjE5NjI3ZDIzNGM2YWE2ODc1MzM3N2ZlYTc5ODUiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6Im11Z2RoYTYxMjMiLCJpZCI6Imdvb2dsZS1vYXV0aDJ8MTA0MTk3NzM1ODcxODIxNzU2NDY3IiwiYXZhdGFyIjoiIiwiZW1haWwiOiJtdWdkaGE2MTIzQGdtYWlsLmNvbSJ9fSwicm9vbSI6IioifQ.inb5lYh90PZL2XT0M0DDMPWUIrb0EzNqpbnm8PI7BQb5bF6RJYWjgmctfcv3lhvk3pcZ8tjTm0fMgNcOt2y3KVNyawMNxayYlnNSFGvF-fBtNWhyiNamu7flnXDcDj69VLlpll9EyDL82k9tKdscDJRhKlSBNHOhmLLdthBaTtToT4la5FzFq7u3Y_tRNu4nRrlBkOmKMLzfyGe5Li70oZJHyOyC255rpFYMCOY_lZTfIJ3JQRCFuORwLaDX8ED40tBJaZuprHLjDYY8uZkcRX92Qeda3pW4Wgleg6aFZHYoYqr_DEw5ROmbs7J3i7k1f6h9oGOuxrJshsSSwzPPPA'}
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
                    Stop Recording
                  </Button>
                  <Button
                    onClick={saveRecording}
                    disabled={recordingStatus !== 'stopped'}
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