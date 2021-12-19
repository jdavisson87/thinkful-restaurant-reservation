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

  const whileLoading = (
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      getTime();
    }, 6000);
    return () => clearInterval(interval);
  });

  return (
    <div>
      <h4>{loading ? whileLoading : time}</h4>
    </div>
  );
};

export default Clock;
