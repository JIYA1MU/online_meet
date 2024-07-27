// import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
// import { v4 as uuidv4 } from 'uuid';
import { JaaSMeeting } from '@jitsi/react-sdk';

const MainScreen: React.FC = () => {
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


  return (
    <MeetScreen>
      <JaaSMeeting 
    appId = { 'vpaas-magic-cookie-f10619627d234c6aa68753377fea7985' }
    roomName = "PleaseUseAGoodRoomName"
    jwt = { 'eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtZjEwNjE5NjI3ZDIzNGM2YWE2ODc1MzM3N2ZlYTc5ODUvZmNiZmVhLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3MjIwNTE3MjMsImV4cCI6MTcyMjA1ODkyMywibmJmIjoxNzIyMDUxNzE4LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtZjEwNjE5NjI3ZDIzNGM2YWE2ODc1MzM3N2ZlYTc5ODUiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6Im11Z2RoYTYxMjMiLCJpZCI6Imdvb2dsZS1vYXV0aDJ8MTA0MTk3NzM1ODcxODIxNzU2NDY3IiwiYXZhdGFyIjoiIiwiZW1haWwiOiJtdWdkaGE2MTIzQGdtYWlsLmNvbSJ9fSwicm9vbSI6IioifQ.LC_Mw9AdXJqV8oHZPBQBfMPkwcp-yfhI5lDBWPuqG3tfZDYnkNoAv7_6eEbjOepK_BJk3yvsrE9JP0EcSH3yclIMfw9eShSbWw--GjvJE-oFFWM1u4vnEngO-UCf22LqK73ARE8Wojqdz0slZyefdax_yccxRS7FsXGr_XsRo0f-BMfT7AY4fFNg69AiX3tnENc_TbZVlK3XPckwBu7mEPzNBJ2DBLPxYdUUZQstRpyADiy6B9kiq4OvD4FzA32He-R85kquiiNagt2lSxSzGbqm7yXYevMNiUjUSNUrvRfC79TwGb9obsjo-rGncJXZFxz4fDXdGxLL2YJ1irg_LQ' }
    configOverwrite = {{
        disableThirdPartyRequests: true,
        disableLocalVideoFlip: true,
        backgroundAlpha: 0.5
    }}
    interfaceConfigOverwrite = {{
        VIDEO_LAYOUT_FIT: 'nocrop',
        MOBILE_APP_PROMO: false,
        TILE_VIEW_MAX_COLUMNS: 4
    }}
    // spinner = { SpinnerView }
    // onApiReady = { (externalApi) => { ... } }
/>
    </MeetScreen>
  );
};

// Styled-components
const MeetScreen = styled.div`
  width : 100vw;
  height: 100vh !important;
  #jitsiMeeting-1{
    height : 100%;
  }

`;

export default MainScreen;
