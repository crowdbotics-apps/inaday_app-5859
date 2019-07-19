export const formatDuration = duration => {
  const totalSecs = Math.round(duration);
  const mins = Math.floor(totalSecs / 60);
  const secs = totalSecs - mins * 60;
  return `${mins}:${secs}`;
}
