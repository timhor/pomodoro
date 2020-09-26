const timer = document.querySelector('#timer');
let interval;

const duration = 25 * 60;
let remainingSeconds;

resetTimer();

// format duration in seconds as MM:SS
function formatSeconds(seconds) {
  return new Date(seconds * 1000).toISOString().substring(14, 19);
}

function toggleTimer() {
  if (interval) {
    document.querySelector('#startStop').innerText = 'Start';
    resetInterval(interval);
  } else {
    document.querySelector('#startStop').innerText = 'Stop';
    interval = setInterval(() => {
      remainingSeconds -= 1;
      timer.innerText = formatSeconds(remainingSeconds);
      if (remainingSeconds === 0) {
        resetInterval(interval);
      }
    }, 1000);
  }
}

function resetTimer() {
  timer.innerText = formatSeconds(duration);
  remainingSeconds = duration;
  if (interval) {
    toggleTimer();
  }
}

function resetInterval() {
  clearInterval(interval);
  interval = undefined;
}
