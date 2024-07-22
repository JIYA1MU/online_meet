import React from 'react';
import { FaMicrophone, FaVideo } from 'react-icons/fa';
import Navbar from "../Navbar"
import Sidebar from "../Sidebar"

export const MeetingJoin = () => {
  return (
    <div style={styles.container}>
      <Sidebar />
      <main style={styles.main}>
        <Navbar />
        <section style={styles.meetingSection}>
          <div style={styles.leftPanel}>
            <div style={styles.videoContainer}>
              <img
                src="src/assets/12.webp" 
                alt="Meeting"
                style={styles.video}
              />
            </div>
            <div style={styles.controls}>
              <button style={styles.controlButton}>
                <FaMicrophone />
              </button>
              <button style={styles.controlButton}>
                <FaVideo />
              </button>
            </div>
          </div>
          <div style={styles.meetingInfo}>
            <h2>ujk-thk-luwg</h2>
            <p>No one else in the meeting</p>
            <button style={styles.joinButton}>Join now</button>
            <button style={styles.presentButton}>Present</button>
          </div>
        </section>
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#d2e9f7',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  meetingSection: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '20px',
  },
  videoContainer: {
    width: '400px', // Increased width for better visibility
    marginBottom: '20px',
  },
  video: {
    width: '100%',
    borderRadius: '10px',
  },
  meetingInfo: {
    textAlign: 'center',
    marginLeft: '100px', // Add margin to separate text from the image
    marginBottom: '50px'
  },
  meetingTitle: {
    fontSize: '2em', // Increased font size
    marginBottom: '10px', // Add margin for spacing
  },
  meetingText: {
    fontSize: '1.2em', // Increased font size
    marginBottom: '20px', // Add margin for spacing
  },
  joinButton: {
    backgroundColor: '#5a9',
    color: 'white',
    padding: '12px 24px', // Increased padding
    margin: '10px 0', // Adjusted margin
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em', // Adjusted font size
  },
  presentButton: {
    backgroundColor: '#a95',
    color: 'white',
    padding: '12px 24px', // Increased padding
    margin: '10px 15px', // Adjusted margin
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em', // Adjusted font size
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  controlButton: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '50%',
    padding: '12px', // Increased padding
    margin: '0 10px',
    cursor: 'pointer',
  },
};

export default MeetingJoin