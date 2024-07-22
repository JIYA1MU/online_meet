import React from 'react';

interface ParticipantProps {
  name: string;
}

const Participant: React.FC<ParticipantProps> = ({ name }) => {
  return (
    <div className="participant">
      <img src="https://via.placeholder.com/100" alt={name} />
      <span>{name}</span>
    </div>
  );
}

export default Participant;
