import styled from "styled-components"
import Layout from "../Layout"
import { useEffect, useState } from "react";
import { FaVideo } from "react-icons/fa";
import { IoAddCircleSharp, IoShareSharp } from "react-icons/io5";
import { BsFillCalendar2DateFill } from "react-icons/bs";

const value = [
  {
    id : 1,
    icon : <FaVideo />,
    name : 'New Meeting',
    bgColor : 'orange'
  },
  {
    id : 2,
    icon : <IoAddCircleSharp />,
    name : 'Join',
    bgColor : '#035C7A'
  },
  {
    id : 3,
    icon : <BsFillCalendar2DateFill />,
    name : 'Schedule',
    bgColor : '#035C7A'
  },
  {
    id : 4,
    icon : <IoShareSharp />,
    name : 'Share screen',
    bgColor : '#035C7A'
  }
]

export const MeetingLink = () => {
  
  const [currentTime , setCurrentTime] = useState(new Date());
 
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  const formatDate = (date : any) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <Layout>
      <MeetLink>
        <h1>{currentTime.toLocaleTimeString()}</h1>
        <div className = "date">{formatDate(currentTime)}</div>
        <div className="icon-container">
          {value.map(item => (
            <div className = "box">
              <div key={item.id} className="icon" style={{ backgroundColor: item.bgColor }}>
                {item.icon}
              </div>
              <div className = "name">{item.name}</div>         
            </div>
          ))}
        </div>
      </MeetLink>
    </Layout>

  )
}

const MeetLink = styled.div`
  .icon-container{
    display : flex;
    margin-top : 6rem;
    gap : 3rem;
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
  h1{
    font-family: "Noto Sans", sans-serif;
    font-weight: 600;
    font-size : 60px;
    margin-bottom : 0;
  }
`

export default MeetingLink;