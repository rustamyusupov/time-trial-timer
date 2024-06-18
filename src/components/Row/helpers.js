import {
  millisecondsInHour,
  millisecondsInMinute,
  millisecondsInSecond,
  tenthOfMilliseconds,
} from '@/constants';

export const formatTime = ms => {
  const hours = Math.floor(ms / millisecondsInHour);
  const minutes = Math.floor((ms % millisecondsInHour) / millisecondsInMinute);
  const seconds = Math.floor((ms % millisecondsInMinute) / millisecondsInSecond);
  const milliseconds = Math.floor((ms % millisecondsInSecond) / tenthOfMilliseconds);

  return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}.${milliseconds}`;
};

export const getSpeed = (distance, time) =>
  parseFloat(((distance / (time / millisecondsInSecond)) * 3.6).toFixed(1));
