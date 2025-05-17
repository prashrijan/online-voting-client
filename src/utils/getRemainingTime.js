import { to24HourFormat } from './time.js';

export const getTimeRemaining = (startDate, startTime, endDate, endTime) => {
  if (!startDate || !startTime || !endDate || !endTime) return 'Invalid date';

  // Extract YYYY-MM-DD from ISO string
  const startDateOnly = new Date(startDate).toISOString().split('T')[0];
  const endDateOnly = new Date(endDate).toISOString().split('T')[0];

  const start = new Date(`${startDateOnly}T${to24HourFormat(startTime)}:00`);
  const end = new Date(`${endDateOnly}T${to24HourFormat(endTime)}:00`);
  const now = new Date();

  if (now < start) {
    const diff = start - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return days > 0
      ? `Starts in ${days} day${days !== 1 ? 's' : ''}`
      : hours > 0
        ? `Starts in ${hours} hour${hours !== 1 ? 's' : ''}`
        : 'Starting soon';
  }

  if (now < end) {
    const diff = end - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return days > 0
      ? `Ends in ${days} day${days !== 1 ? 's' : ''}`
      : hours > 0
        ? `Ends in ${hours} hour${hours !== 1 ? 's' : ''}`
        : 'Ending soon';
  }

  return 'Ended';
};
