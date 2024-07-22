import styled from "styled-components"
import { useState } from "react"
import { IoMdMic , IoMdMicOff } from "react-icons/io"
import { FaVideo , FaVideoSlash } from "react-icons/fa"
import { BsFillRecordCircleFill } from "react-icons/bs"
import { MdCallEnd } from "react-icons/md"

const participants = [
    { image: "src/assets/12.webp" },
    { image: "src/assets/12.webp" },
    { image: "src/assets/12.webp" },
     ];

const MainScreen = () => {

    const [isMicOpen , setIsMicOpen ] = useState(true);
    const[isVideoOpen , setIsVideoOpen] = useState(true);

    const handleClick = (): void => {
        setIsMicOpen(!isMicOpen);
    };

    const Toggle = () : void => {
        setIsVideoOpen(!isVideoOpen);
    }


  return (
    <Screen>
        <div className="presenter">
            <img src = "src/assets/12.webp"  alt="Meeting"/>
                <div className = "options">            
                    <Mic onClick = {handleClick} isMicOpen = {isMicOpen}/>
                    <Video onClick = {Toggle} isVideoOpen = {isVideoOpen}/>
                    <Record />
                    <Call />
                </div>
        </div>
        <div className="participants">
            {participants.map((participant, index) => (
            <img
                key={index}
                src={participant.image}
            />
            ))} 
        </div>
    </Screen>
  )
}

const Screen = styled.div`
    .presenter{
        img{
            width : 70%;
            height : 500px;
            margin : 30px 20px; 
            border-radius : 40px;
        }
        .options{
            position : relative;
            bottom : 7rem;
            left : 28%;
        }
    }
    .participants{
        img{
            position: relative;
            bottom : 70px;
            left : 20px;
            border-radius: 40px;
            width : 22%;
            height : 10rem;
            margin-right : 30px;
        }
    }    
`

const Mic = styled(({ isMicOpen, ...props } : any) =>
    isMicOpen ? <IoMdMic {...props} /> : <IoMdMicOff {...props} />
  )`
    background-color: white;
    border-radius: 50%;
    font-size: 30px;
    padding: 10px;
  `

const Video = styled(({isVideoOpen, ...props} : any) =>
    isVideoOpen ? <FaVideo {...props}/> : <FaVideoSlash {...props}/>
)`
    background-color: white;
    border-radius: 50%;
    font-size: 30px;
    padding: 10px;
    margin-left : 10px;
`

const Record = styled(BsFillRecordCircleFill)`
    background-color: white;
    border-radius: 50%;
    font-size: 30px;
    padding: 10px;
    margin-left : 10px;  
`

const Call = styled(MdCallEnd)`
    background-color: #d62d2d;
    color : white;
    border-radius: 50%;
    font-size: 30px;
    padding: 10px;
    margin-left : 10px;  
`

export default MainScreen;