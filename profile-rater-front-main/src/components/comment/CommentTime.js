import React, { useState, useEffect } from 'react';

const TimeAgo = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState('');

  const getTimeAgo = (date) => {
    const now = new Date();
    const secondsPast = Math.floor((now - new Date(date)) / 1000);

    if (secondsPast < 60) {
      return `${secondsPast} seconds ago`;
    }
    if (secondsPast < 3600) {
      const minutes = Math.floor(secondsPast / 60);
      return `${minutes} minutes ago`;
    }
    if (secondsPast <= 86400) {
      const hours = Math.floor(secondsPast / 3600);
      return `${hours} hours ago`;
    }
    if (secondsPast < 31536000) { // less than a year
        const days = Math.floor(secondsPast / 86400);
        return `${days} days ago`;
      }
      const years = Math.floor(secondsPast / 31536000);
      return `${years} years ago`;
  };

  useEffect(() => {
    const updateAgo = () => {
      setTimeAgo(getTimeAgo(timestamp));
    };

    updateAgo();
    const interval = setInterval(updateAgo, 60000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
