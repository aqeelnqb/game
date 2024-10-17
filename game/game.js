let score = 0;
let timeLeft = 30;
let gameInterval;
let bombInterval;
let box = document.getElementById('box');
let bomb = document.getElementById('bomb');
let scoreDisplay = document.getElementById('score');
let timeLeftDisplay = document.getElementById('timeLeft');
let gameOverScreen = document.getElementById('gameOver');
let finalScoreDisplay = document.getElementById('finalScore');

// Random position generator for the box and bomb
function moveElement(element) {
    const gameArea = document.getElementById('gameArea');
    const areaWidth = gameArea.clientWidth;
    const areaHeight = gameArea.clientHeight;

    // Ensure the element doesn't go off the edges
    const randomX = Math.floor(Math.random() * (areaWidth - element.offsetWidth));
    const randomY = Math.floor(Math.random() * (areaHeight - element.offsetHeight));

    // Instantly set the new position (no transition)
    element.style.left = `${randomX}px`;
    element.style.top = `${randomY}px`;
}

// Handle box click
box.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;

    // Increase difficulty: smaller box as score increases
    if (score % 5 === 0 && box.offsetWidth > 10) {
        box.style.width = (box.offsetWidth - 5) + 'px';
        box.style.height = (box.offsetHeight - 5) + 'px';
        bomb.style.width = box.style.width;
        bomb.style.height = box.style.height; // Make bomb same size
    }

    moveElement(box); // Move the box instantly to a new random position
});

// Handle bomb click (Game Over)
bomb.addEventListener('click', () => {
    clearInterval(gameInterval);
    clearInterval(bombInterval);
    endGame('You clicked the bomb!');
});

// Countdown timer
function startTimer() {
    gameInterval = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(gameInterval);
            clearInterval(bombInterval);
            endGame('Time is up!');
        }
    }, 1000); // Update every second
}

// Randomly show and move the bomb
function startBombMovement() {
    bombInterval = setInterval(() => {
        bomb.style.display = 'block';
        moveElement(bomb);

        // Randomly hide the bomb after a while
        setTimeout(() => {
            bomb.style.display = 'none';
        }, Math.random() * 2000 + 1000); // Bomb stays visible between 1 and 3 seconds
    }, Math.random() * 5000 + 2000); // Bomb appears every 2 to 7 seconds
}

// Game over logic
function endGame(message) {
    box.style.display = 'none';
    bomb.style.display = 'none';
    gameOverScreen.style.display = 'block';
    finalScoreDisplay.textContent = `${message} Your final score is ${score}`;
}

// Restart game logic
function restartGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = timeLeft;

    box.style.display = 'block';
    bomb.style.display = 'none';
    gameOverScreen.style.display = 'none';
    box.style.width = '50px';
    box.style.height = '50px';
    bomb.style.width = '50px';
    bomb.style.height = '50px'; // Reset bomb size to match box

    moveElement(box);
    startTimer();
    startBombMovement();
}

// Start the game by moving the box and starting the timer and bomb movement
moveElement(box);
startTimer();
startBombMovement();
