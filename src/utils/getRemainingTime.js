import { formatDate } from './date';

export const getTimeRemaining = (date) => {
  const endDate = formatDate(date);

  const end = new Date(endDate.split('/').reverse().join('-'));
  const now = new Date();
  const diff = end - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) return `Ends in ${days} day${days !== 1 ? 's' : ''}`;
  if (hours > 0) return `Ends in ${hours} hour${hours !== 1 ? 's' : ''}`;
  return 'Ending soon';
};
