// ----- timer -----
let duration = 15 * 60; 
let remaining = duration;
let timerDisplay = document.getElementById("timer");
let resetBtn = document.getElementById("resetBtn");
let interval;
let baseTitle = document.title;
let debug = document.getElementById("debug")

function startTimer() {
  clearInterval(interval);
  interval = setInterval(() => {
    if (remaining <= 0) {
      clearInterval(interval);
      timerDisplay.textContent = "00:00";
      document.title = "00:00 | " + baseTitle;

      document.getElementById("resetBtn").style.display = "inline-block";
      document.getElementById("playBtn").style.display = "inline-block";
      return;
    }

    remaining--;
    updateDisplay();
  }, 1000);


  debug.addEventListener("click", () => {
    remaining = 0
  })
}

function updateDisplay() {
  let minutes = Math.floor(remaining / 60);
  let seconds = remaining % 60;
  let formatted =
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
  timerDisplay.textContent = formatted;
  document.title = formatted + " | " + baseTitle;

}

resetBtn.addEventListener("click", () => {
  remaining = duration;
  updateDisplay();
  startTimer();

  document.getElementById("resetBtn").style.display = "none";
  document.getElementById("playBtn").style.display = "none";
});

updateDisplay();
startTimer();

// ----- snake -----
let canvas = document.getElementById("snakeCanvas");
let ctx = canvas.getContext("2d");
let grid = 20;
let snake, dx, dy, food, snakeInterval;

function game() {
  document.getElementById("timerContainer").style.display = "none";
  canvas.style.display = "block";
  initSnake();
  snakeInterval = setInterval(drawSnake, 200);
}

function initSnake() {
  snake = [{ x: 200, y: 200 }];
  dx = grid;
  dy = 0;
  placeFood();
  document.addEventListener("keydown", changeDir);
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / grid)) * grid,
    y: Math.floor(Math.random() * (canvas.height / grid)) * grid,
  };
}

function changeDir(e) {
  if (e.key === "ArrowLeft" && dx === 0) {
    dx = -grid; dy = 0;
  } else if (e.key === "ArrowUp" && dy === 0) {
    dx = 0; dy = -grid;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = grid; dy = 0;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0; dy = grid;
  }
}

function drawSnake() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let head = { x: snake[0].x + dx, y: snake[0].y + dy };

  // collision check
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    gameOver();
    return;
  }

  snake.unshift(head);

  // food check
  if (head.x === food.x && head.y === food.y) {
    placeFood();
  } else {
    snake.pop();
  }

  // draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, grid, grid);

  // draw snake
  ctx.fillStyle = "lime";
  snake.forEach(seg => ctx.fillRect(seg.x, seg.y, grid - 2, grid - 2));
}

function gameOver() {
  clearInterval(snakeInterval);
  document.removeEventListener("keydown", changeDir);
  canvas.style.display = "none";
  document.getElementById("timerContainer").style.display = "block";
}
