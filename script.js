let timer;
let running = false;
let elapsed = 0;
let lapCount = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
    let milliseconds = ms % 1000;
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    return (
        (hours < 10 ? '0' : '') + hours + ':' +
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + '.' +
        (milliseconds < 100 ? '0' : '') + (milliseconds < 10 ? '0' : '') + milliseconds
    );
}

function startStop() {
    if (!running) {
        timer = setInterval(() => {
            elapsed += 10;
            display.textContent = formatTime(elapsed);
        }, 10);
        startStopButton.textContent = 'Stop';
        running = true;
    } else {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(timer);
    elapsed = 0;
    display.textContent = '00:00:00.00';
    startStopButton.textContent = 'Start';
    running = false;
    lapCount = 0;
    lapsList.innerHTML = '';
}

function lap() {
    if (running) {
        lapCount++;
        const lapTime = formatTime(elapsed);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);