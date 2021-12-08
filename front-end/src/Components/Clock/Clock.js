import React, { useState, useEffect } from 'react';
import { formatAsTime, printableTime } from '../../utils/date-time';

const Clock = () => {
  const [time, setTime] = useState();
  const [loading, setLoading] = useState(true);

  const getTime = () => {
    const newTime = printableTime(formatAsTime(new Date().toTimeString()));
    setTime(newTime);
    setLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getTime();
    }, 6000);
    return () => clearInterval(interval);
  });

  return (
    <div>
      <h5>{loading ? 'Loading Clock...' : time}</h5>
    </div>
  );
};

export default Clock;
