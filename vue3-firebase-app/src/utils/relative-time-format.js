export function formatRelativeTime(targetTime = new Date('2024-07-02')) {
  const rtf = new Intl.RelativeTimeFormat('ko', {
    numeric: 'auto',
  });

  const currentTime = new Date();
  const timeDifferenct = Math.abs(targetTime - currentTime);

  const seconds = Math.floor(timeDifferenct / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const years = Math.floor(days / 365);
  // console.log(seconds);
  // console.log(minutes);
  // console.log(hours);
  // console.log(days);
  // console.log(years);

  if (years > 0) {
    return rtf.format(-1 * years, 'year');
  } else if (days > 0) {
    return rtf.format(-1 * days, 'day');
  } else if (hours > 0) {
    return rtf.format(-1 * hours, 'hour');
  } else if (minutes > 0) {
    return rtf.format(-1 * minutes, 'minute');
  } else {
    return rtf.format(-1 * seconds, 'second');
  }

  return timeDifferenct;
}
