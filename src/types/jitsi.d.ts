declare module 'jitsi-meet' {
    interface JitsiMeetExternalAPIOptions {
      roomName: string;
      width?: string | number;
      height?: string | number;
      parentNode: HTMLElement | null;
      configOverwrite?: Record<string, any>;
      interfaceConfigOverwrite?: Record<string, any>;
    }
  
    export class JitsiMeetExternalAPI {
      constructor(domain: string, options: JitsiMeetExternalAPIOptions);
      dispose(): void;
    }
  }
  
  interface Window {
    JitsiMeetExternalAPI: typeof import('jitsi-meet').JitsiMeetExternalAPI;
  }
  