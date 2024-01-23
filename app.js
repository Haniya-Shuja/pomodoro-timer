
    const circularProgressBar = document.querySelector('#circularProgressBar');
    const circularProgressBarNumber = document.querySelector('.progress-value');
    const buttonTypePromodoro = document.querySelector('#buttonTypePromodoro');
    const buttonTypeShortBreak = document.querySelector('#buttonTypeShortBreak');
    
    const audio = new Audio('alarm.mp3');
    
    const pomodoroTimerInSeconds = 1500;
    const shortBreakTimerInSeconds = 300;
    const TIMER_TYPE_POMODORO = 'POMODORO';
    const TIMER_TYPE_SHORT_BREAK = 'SHORT_BREAK';
    
    let progressInterval;
    let timerType = TIMER_TYPE_POMODORO;
    let timerValue = pomodoroTimerInSeconds;
    let multiplierFactor = 360 / timerValue;

    
    
    function formatNumberInStringMinute(number) {
        const minutes = Math.trunc(number / 60)
            .toString()
            .padStart(2, '0');
    
        const seconds = Math.trunc(number % 60)
            .toString()
            .padStart(2, '0');
    
        return `${minutes}:${seconds}`;
    }
    
    const startTimer = () => {
        progressInterval = setInterval(() => {
            timerValue--;
            setInfoCircularProgressBar();
        }, 1000);
    };
    
    const pauseTimer = () => {
        clearInterval(progressInterval);
    };
    
    const resetTimer = () => {
        clearInterval(progressInterval);
    
        timerValue = (timerType === TIMER_TYPE_POMODORO)
            ? pomodoroTimerInSeconds
            : shortBreakTimerInSeconds;
    
        multiplierFactor = 360 / timerValue;
        setInfoCircularProgressBar();
    
        audio.pause();
        audio.currentTime = 0;
    };
    
    function setInfoCircularProgressBar() {
        if (timerValue === 0) {
            pauseTimer(); // Change from stopTimer to pauseTimer
            audio.play();
        }
    
        circularProgressBarNumber.textContent = formatNumberInStringMinute(timerValue);
    
        circularProgressBar.style.background = `conic-gradient(${timerValue * multiplierFactor}deg 360deg, var(--purple) 0deg)`;
    }
    
    const setPomodoroType = (type) => {
        timerType = type;
    
        if (type === TIMER_TYPE_POMODORO) {
            buttonTypeShortBreak.classList.remove("active");
            buttonTypePromodoro.classList.add("active");
            timerValue = pomodoroTimerInSeconds;
        } else {
            buttonTypePromodoro.classList.remove("active");
            buttonTypeShortBreak.classList.add("active");
            timerValue = shortBreakTimerInSeconds;
        }
    
        pauseTimer(); 
        setInfoCircularProgressBar();
    };
    

    