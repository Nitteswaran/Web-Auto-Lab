document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("timerDisplay");
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resetBtn = document.getElementById("resetBtn");
  const setBtn = document.getElementById("setBtn");
  const minutesInput = document.getElementById("minutes");

  let timer;
  let totalSeconds = 300; // default 5 minutes
  let remainingSeconds = totalSeconds;
  let isRunning = false;

  // Load last custom time from localStorage
  const savedTime = localStorage.getItem("breakTimerMinutes");
  if (savedTime) {
    totalSeconds = parseInt(savedTime) * 60;
    remainingSeconds = totalSeconds;
    updateDisplay();
  }

  // --- Functions ---
  function updateDisplay() {
    const mins = Math.floor(remainingSeconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (remainingSeconds % 60).toString().padStart(2, "0");
    display.textContent = `${mins}:${secs}`;
  }

  function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;

    timer = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        playSound();
        alert("⏰ Break time is over! Get back to work!");
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }

  function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    remainingSeconds = totalSeconds;
    updateDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }

  function setCustomTime() {
    const mins = parseInt(minutesInput.value);
    if (isNaN(mins) || mins <= 0) return;
    totalSeconds = mins * 60;
    remainingSeconds = totalSeconds;
    localStorage.setItem("breakTimerMinutes", mins);
    updateDisplay();
    resetTimer();
  }

  function playSound() {
    const audio = new Audio(
      "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
    );
    audio.play();
  }

  // --- Event Listeners ---
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
  setBtn.addEventListener("click", setCustomTime);

  // Initial update
  updateDisplay();
});
