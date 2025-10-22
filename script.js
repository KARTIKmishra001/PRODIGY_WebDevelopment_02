let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCounter = 0;

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        isRunning = true;

        document.getElementById('startBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = false;
        document.getElementById('lapBtn').disabled = false;
    }
}

function pause() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;

        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        document.getElementById('lapBtn').disabled = true;
    }
}

function reset() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    lapCounter = 0;

    document.getElementById('display').textContent = '00:00:00';
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('lapBtn').disabled = true;

    document.getElementById('lapsList').innerHTML = '<div class="no-laps">No laps recorded yet</div>';
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    document.getElementById('display').textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function recordLap() {
    if (isRunning) {
        lapCounter++;
        const lapTime = document.getElementById('display').textContent;
        const lapsList = document.getElementById('lapsList');

        if (lapsList.querySelector('.no-laps')) {
            lapsList.innerHTML = '';
        }

        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.innerHTML = `
                        <span class="lap-number">Lap ${lapCounter}</span>
                        <span class="lap-time">${lapTime}</span>
                        `;

        lapsList.insertBefore(lapItem, lapsList.firstChild);
    }
}