import React, { useState, useEffect } from 'react';
import { formatAsTime } from '../../utils/date-time';

const Clock = () => {
  const [time, setTime] = useState(new Date().toTimeString());
  const timeFormatted = formatAsTime(time);

  const getTime = () => {
    const timeStr = new Date().toTimeString();
    setTime(timeStr);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getTime();
    }, 6000);
    return () => clearInterval(interval);
  });

  return (
    <div>
      <h5>{timeFormatted}</h5>
    </div>
  );
};

export default Clock;
