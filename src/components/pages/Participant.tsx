// import React from 'react';

// interface ParticipantProps {
//   name: string;
// }

// const Participant: React.FC<ParticipantProps> = ({ name }) => {
//   return (
//     <div className="participant">
//       <img src="https://via.placeholder.com/100" alt={name} />
//       <span>{name}</span>
//     </div>
//   );
// }

// export default Participant;

import { useState } from "react";
import { IoMdMic , IoMdMicOff } from "react-icons/io"
import styled from "styled-components";

    const [isMicOpen , setIsMicOpen ] = useState(true);

    const handleClick = (): void => {
        setIsMicOpen(!isMicOpen);
    };

export const Participant = () => {
  return (
    <Mic onClick = {handleClick} isMicOpen = {isMicOpen}/>
  )
}

const Mic = styled(({ isMicOpen, ...props } : any) =>
  isMicOpen ? <IoMdMic {...props} /> : <IoMdMicOff {...props} />
)`
  background-color: white;
  border-radius: 50%;
  font-size: 30px;
  padding: 10px;
`