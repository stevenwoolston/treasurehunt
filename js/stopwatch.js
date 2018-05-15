var h1 = $('.stopwatch-modal h1')[0],
    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    h1.textContent = 
        (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + 
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + 
        (seconds > 9 ? seconds : "0" + seconds);

    startTimer();
}

function startTimer() {
    t = setTimeout(add, 1000);
}

function stopTimer() {
    clearTimeout(t);
    h1.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}