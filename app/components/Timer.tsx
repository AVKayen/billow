import React from 'react';

interface TimerProps {
    seconds: number;
}

const Timer: React.FC<TimerProps> = ({ seconds }) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    const formattedTime = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;

    return <div>{formattedTime}</div>;
};

export default Timer;