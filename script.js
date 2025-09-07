let duration = 15 * 60; // 15 minutes in seconds
let remaining = duration;
let timerDisplay = document.getElementById("timer");
let resetBtn = document.getElementById("resetBtn");
let interval;

function startTimer() {
  clearInterval(interval);
  interval = setInterval(() => {
    if (remaining <= 0) {
      clearInterval(interval);
      timerDisplay.textContent = "00:00";
      return;
    }
    remaining--;
    updateDisplay();
  }, 1000);
}

function updateDisplay() {
  let minutes = Math.floor(remaining / 60);
  let seconds = remaining % 60;
  timerDisplay.textContent =
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0");
}

resetBtn.addEventListener("click", () => {
  remaining = duration;
  updateDisplay();
  startTimer();
});

// start immediately
updateDisplay();
startTimer();
