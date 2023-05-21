import dayjs from 'dayjs';

export const formatTimestamp = (timestamp: number) => {
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
};
