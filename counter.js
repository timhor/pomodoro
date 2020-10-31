const timer = document.querySelector('#timer');
let interval;

const workDuration = 25 * 60;
const breakDuration = 5 * 60;
let remainingSeconds;

let afterBreak = false;

if ('Notification' in window && Notification.permission !== 'granted') {
  Notification.requestPermission();
}
resetTimer();

// format duration in seconds as MM:SS
function formatSeconds(seconds) {
  return new Date(seconds * 1000).toISOString().substring(14, 19);
}

function startTimer() {
  hideButton('#start');
  showButton('#stop');
  if (afterBreak) {
    afterBreak = false;
    resetInterval(interval);
    remainingSeconds = workDuration;
    timer.innerText = formatSeconds(remainingSeconds);
  }
  interval = setInterval(() => {
    remainingSeconds -= 1;
    timer.innerText = formatSeconds(remainingSeconds);
    if (remainingSeconds <= 0) {
      hideButton('#stop');
      showButton('#break');
      resetInterval(interval);
      sendNotification('Time for a break!');
    }
  }, 1000);
}

function stopTimer() {
  hideButton('#stop');
  showButton('#start');
  resetInterval(interval);
}

function startBreak() {
  hideButton('#break');
  showButton('#start');
  afterBreak = true;
  timer.innerText = formatSeconds(breakDuration);
  remainingSeconds = breakDuration;
  interval = setInterval(() => {
    remainingSeconds -= 1;
    timer.innerText = formatSeconds(remainingSeconds);
    if (remainingSeconds <= 0) {
      resetInterval(interval);
      sendNotification('Back to work!');
    }
  }, 1000);
}

function resetTimer() {
  timer.innerText = formatSeconds(workDuration);
  remainingSeconds = workDuration;
  if (interval) {
    stopTimer();
  }
}

function resetInterval() {
  clearInterval(interval);
  interval = undefined;
}

function showButton(id) {
  const element = document.querySelector(id);
  if (element) {
    element.removeAttribute('hidden');
  }
}

function hideButton(id) {
  const element = document.querySelector(id);
  if (element) {
    element.setAttribute('hidden', '');
  }
}

function sendNotification(message) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(message);
  }
}
