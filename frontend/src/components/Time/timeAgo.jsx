import React, { useEffect, useState } from 'react';

const TimeAgo = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState('');
   
  useEffect(() => {
    const calculateTimeAgo = () => {
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - timestamp;

      const minute = 60 * 1000;
      const hour = 60 * minute;
      const day = 24 * hour;
      const week = 7 * day;
      const month = 30 * day;
      const year = 365 * day;

      if (timeDifference < minute) {
        setTimeAgo('Just now');
      } else if (timeDifference < hour) {
        const minutes = Math.floor(timeDifference / minute);
        setTimeAgo(`${minutes} minute${minutes > 1 ? 's' : ''} ago`);
      } else if (timeDifference < day) {
        const hours = Math.floor(timeDifference / hour);
        setTimeAgo(`${hours} hour${hours > 1 ? 's' : ''} ago`);
      } else if (timeDifference < week) {
        const days = Math.floor(timeDifference / day);
        setTimeAgo(`${days} day${days > 1 ? 's' : ''} ago`);
      } else if (timeDifference < month) {
        const weeks = Math.floor(timeDifference / week);
        setTimeAgo(`${weeks} week${weeks > 1 ? 's' : ''} ago`);
      } else if (timeDifference < year) {
        const months = Math.floor(timeDifference / month);
        setTimeAgo(`${months} month${months > 1 ? 's' : ''} ago`);
      } else {
        const years = Math.floor(timeDifference / year);
        setTimeAgo(`${years} year${years > 1 ? 's' : ''} ago`);
      }
    };

    calculateTimeAgo();
  }, [timestamp]);

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
