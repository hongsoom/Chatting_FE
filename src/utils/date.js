import dayjs from 'dayjs';

export const getDay = date => {
  if (!date) {
    return '';
  }

  const today = dayjs();
  const postingDate = dayjs(date);
  const dayDiff = postingDate.diff(today, 'days');
  const hourDiff = postingDate.diff(today, 'hours');
  const minutesDiff = postingDate.diff(today, 'minutes');

  if (dayDiff === 0 && hourDiff === 0) {
    const minutes = Math.ceil(-minutesDiff);
    return minutes + '분 전';
  }

  if (dayDiff === 0 && hourDiff <= 24) {
    const hour = Math.ceil(-hourDiff);
    return hour + '시간 전';
  }

  return postingDate.format('YYYY-MM-DD');
};
