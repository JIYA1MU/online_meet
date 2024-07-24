import styled from 'styled-components'
import Layout from '../Layout'
import { useEffect, useState } from 'react'
import { FaVideo } from 'react-icons/fa'
import { IoAddCircleSharp} from 'react-icons/io5'
import { BsFillCalendar2DateFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { MdWatchLater } from "react-icons/md"
import { MdOutlineOndemandVideo } from "react-icons/md"

interface SubItem {
  id: number;
  icon: JSX.Element;
  name: string;
}

// Define the type for each item
interface Item {
  id: number;
  icon: JSX.Element;
  name: string;
  bgColor: string;
  subItems ?: SubItem[];
}

// Define the value array with the correct type
const value: Item[] = [
  {
    id: 1,
    icon: <FaVideo />,
    name: 'New Meeting',
    bgColor: 'orange',
    subItems : [
      {
        id : 4,
        icon : <MdWatchLater />,
        name : 'Create a Meeting for Later'
      },
      {
        id : 4,
        icon : <IoAddCircleSharp />,
        name : 'Create an Instant Meeting'
      }
    ]
  },
  {
    id: 2,
    icon: <MdOutlineOndemandVideo />,
    name: 'Join',
    bgColor: '#035C7A'
  },
  {
    id: 3,
    icon: <BsFillCalendar2DateFill />,
    name: 'Schedule',
    bgColor: '#035C7A'
  },
];

export const MeetingLink = () => {

  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [showSubItems, setShowSubItems] = useState(false);
  const navigate = useNavigate();
  const [isMeetingLaterOpen , setIsMeetingOpen ] = useState(false);
  const [meetingLink, setMeetingLink] = useState<string>('');
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const handleMeetingLaterClose = () =>{
    setIsMeetingOpen(false);
    setIsLinkCopied(false);
  }

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Use Item type for parameter
  const handleItemClick = async (item: Item) => {
    switch (item.name) {
      case 'Join':
        navigate('/meetingjoin'); 
        break;
      case 'Schedule':
        navigate('/schedule');
        break;
      case 'New Meeting':
        setShowSubItems(!showSubItems);
      break;
      default:
        break;
    }
  };

  const handleSubItemClick = async (subItem: SubItem) => {
    switch (subItem.name) {
      case 'Create a Meeting for Later':
        setIsMeetingOpen(true);
        const randomMeetingLink = generateRandomMeetingLink();
        console.log('Random Meeting Link:', randomMeetingLink);
        setMeetingLink(randomMeetingLink);
        break;
      case 'Create an Instant Meeting':
        // instant meeting logic
        break;
      default:
        break;
    }
  };

  const generateRandomMeetingLink = (): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const length = 10;
  let companyLink = "dfreenovelish.com"
  let randomString = '';
  randomString += companyLink + '/'
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
    if (i < length - 1 && (i + 1) % 3 === 0) {
      randomString += '-';
    }
  }
  return randomString;
};

const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    setIsLinkCopied(true);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <MeetLink>
        <h1>{currentTime.toLocaleTimeString()}</h1>
        <br />
        <div className="date">{formatDate(currentTime)}</div>
        <div className="icon-container">
          {value.map(item => (
            <div
              key={item.id}
              className="box"
              onClick={() => handleItemClick(item)}
            >
            <div className="icon" style={{ backgroundColor: item.bgColor }}>
              {item.icon}
            </div>
            <div className="name">{item.name}</div>
            {item.name === 'New Meeting' && showSubItems && (
                <div className="dropdown">
                  {item.subItems?.map((subItem) => (
                    <div
                      key={subItem.id}
                      className="sub-item"
                      onClick={() => handleSubItemClick(subItem)}
                    >
                      <div className="sub-icon">{subItem.icon}</div>
                      <div className="sub-name">{subItem.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {isMeetingLaterOpen && (
          <Overlay onClick = {handleMeetingLaterClose}>
            <Modal onClick = {(e) => e.stopPropagation()}>
              <CloseButton onClick = {handleMeetingLaterClose}>×</CloseButton>
              <h2>Here's your Meeting Info</h2>
              <p>Send this to the people you want to meet with. Be sure to save it so you can use it later, too.</p>
              <div className="link">
                {meetingLink}
                <CopyButton onClick={copyToClipboard}>
                  {isLinkCopied ? 'Copied!' : 'Copy Link'}
                </CopyButton>
              </div>
            </Modal>
          </Overlay>
        )}
      </MeetLink>
    </Layout>
  );
};

const MeetLink = styled.div`
  .icon-container{
    display : flex;
    margin-top : 6rem;
    gap : 5rem;
    position: relative;
  }
  .box{
    position: relative;
    cursor: pointer;
  }
  .icon{
    width : 100px;
    height : 100px;
    border-radius: 20px;
    display : flex;
    justify-content: center;
    gap : 10px;
    align-items: center;
    color : #ffffff;
    font-size : 50px;
  }
  .name{
    padding-top : 15px;
    text-align : center;
    font-family: "Noto Sans", sans-serif;
    font-weight: 600;
  }
  .date{
    font-family: "Noto Sans", sans-serif;
    font-weight: 400;
    font-size: 24px;
  }
  h1 {
  font-family: "Noto Sans", sans-serif;
  font-weight: 600;
  font-size: 60px;
  margin-bottom: 0;
  text-align: left; 
  }
  .dropdown{
    position: absolute;
    width : 16rem;
    background-color: white;
    border-radius: 5px;
    padding: 10px;
    z-index: 1;
    .dropdown:hover{
      background-color: red;
    }
    
  }
  .sub-item{
    display : flex;
    align-items: center;
    padding: 10px;
    transition: background-color 0.3s ease; 
  }
  .sub-item:hover {
    background-color: #f0f0f0; 
  }
    .sub-icon {
      font-size : 25px;
      margin-right : 10px;
  }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  font-family: "Noto Sans", sans-serif;
`

const Modal = styled.div`
  background-color: white;
  border-radius: 30px;
  padding: 20px;
  width: 21%;
  max-width: 600px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  .link{
    background-color: #c9c8c8;
    padding: 5px;
    text-align : center;
  }
`

const CloseButton = styled.button`
  position: absolute;
  left : 58%;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 35px;
`

const CopyButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 5px 10px;
  margin-top: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-left : 15px;
  &:hover {
    background-color: #d0d0d0;
  }
`

export default MeetingLink;