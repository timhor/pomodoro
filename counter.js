const timer = document.querySelector('#timer');

const duration = 25 * 60;

timer.innerText = formatSeconds(duration);

let remainingSeconds = duration;
const interval = setInterval(() => {
  remainingSeconds -= 1;
  timer.innerText = formatSeconds(remainingSeconds);
  if (remainingSeconds === 0) {
    clearInterval(interval);
  }
}, 1000);

// format duration in seconds as MM:SS
function formatSeconds(seconds) {
  return new Date(seconds * 1000).toISOString().substring(14, 19);
}
