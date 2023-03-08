//RETRIEVING VARIABLES
let display = document.querySelector('.display');
let decrease = document.getElementById('decrease');
let increase = document.getElementById('increase');
let slider = document.querySelector('.slider');
let startButton = document.querySelector('.start-button');


//AUDIO FILES
let primaryBeat = new Audio('../sounds/primary-beat.wav');
let secondaryBeat = new Audio('../sounds/secondary-beat.wav');


//VARIABLES
let bpm = 150;
let timer;
let timerId;
let soundInterval;


//FUNCTIONS

//START METRONOME
let startStopMetronome = startButton.addEventListener('click', () => {
    soundInterval = calculateSoundInterval();

    if (startButton.textContent == 'STOP') {
        clearInterval(timerId);
        startButton.textContent = 'START';
        startButton.classList.remove('animate-button');
    } else {
        startMetronome(soundInterval);
        startButton.textContent = 'STOP';
    }
})

function startMetronome(si) {
    timerId = setInterval(() => {
        primaryBeat.play();
        startButton.classList.add('animate-button');
        primaryBeat.currentTime = 0;
    },si);
    startButton.style.animationDuration = si + "ms";
}

let calculateSoundInterval = () => {
    return (60/bpm)*1000;
}

let updateBpmInDisplay = display.addEventListener('change', ()=> {
    bpm = display.textContent;
    soundInterval = calculateSoundInterval();
})

let minMaxBpm = () => {
    while (display.textContent < 20 || display.textContent > 280) {
        alert ('Out of range!');
        display.textContent = bpm;
        slider.value = bpm;
        soundInterval = calculateSoundInterval();
        }
}


//UPDATE BPM BY TYPING
let typeBpm = display.addEventListener('input', (e) => {
    clearInterval(timer);
    timer = setTimeout( () => {
        if (bpm < 20) {
            alert('out of range!');
            bpm = 20;
            display.textContent = bpm;
            slider.value = bpm;
        }
        if (bpm > 280) {
            alert('out of range!');
            bpm = 280;
            display.textContent = bpm;
            slider.value = bpm;
        }
    },700)
    bpm = display.textContent;
    slider.value = display.textContent;
    soundInterval = calculateSoundInterval();
    clearInterval(timerId);
    if (startButton.textContent == 'STOP') {
        startMetronome(soundInterval);
    }
})


//CHANGE BPM VALUE WITH THE SLIDER
changeBpmSliding = slider.addEventListener('input', () => {
    bpm = slider.value;
    display.textContent = bpm;
    soundInterval = calculateSoundInterval();
    clearInterval(timerId);
    if (startButton.textContent == 'STOP') {
        startMetronome(soundInterval);
    }
});



//BPM UPDATING FUNCTIONS
let updateLowerBpm = () => {
    if (bpm > 20) {
        bpm--;
        soundInterval = calculateSoundInterval();
        display.textContent = bpm;
        slider.value = bpm;
    } 
};

let updateHigherBpm = () => {
    if (bpm < 280) {
        bpm++;
        soundInterval = calculateSoundInterval();
        display.textContent = bpm;
        slider.value = bpm;
    } 
};


//INCREASE OR DECREASE BPM WITH INDIVIDUAL CLICKS 
let buttonDown = decrease.addEventListener('click', () => {
    updateLowerBpm();
    soundInterval = calculateSoundInterval();
    clearInterval(timerId);
    if (startButton.textContent == 'STOP') {
        startMetronome(soundInterval);
    }
})

let buttonUp = increase.addEventListener('click', () => {
    updateHigherBpm(); 
    soundInterval = calculateSoundInterval();
    clearInterval(timerId);
    if (startButton.textContent == 'STOP') {
        startMetronome(soundInterval);
    }
})


//CLICK AND HOLD OR TOUCH AND HOLD
let pressButtonDown = decrease.addEventListener('mousedown', (e) => {
    mouseFingerEvents(e);
})

let releaseButtonDown = decrease.addEventListener('mouseup', () => {
    clearTimeout(pressAndHold);
})

let pressFingerDown = decrease.addEventListener('touchstart', (e) => {
    mouseFingerEvents(e);

})

let releaseFingerDown = decrease.addEventListener('touchend', () => {
    clearTimeout(pressAndHold);
})


let pressButtonUp = increase.addEventListener('mousedown', (e) => {
    mouseFingerEvents(e);

})

let releaseButtonUp = increase.addEventListener('mouseup', () => {
    clearInterval(pressAndHold);
})

let pressFingerUp = increase.addEventListener('touchstart', (e) => {
    mouseFingerEvents(e);
})

let releaseFingerUp = increase.addEventListener('touchend', () => {
    clearTimeout(pressAndHold);
})


//UPDATE ON PRESS AND HOLD, TOUCH OR MOUSE
let mouseFingerEvents = (event) => {
    pressAndHold = setInterval( () => {
        if (event.target.id == 'increase') {
            updateHigherBpm();
        }
        if (event.target.id == 'decrease') {
            updateLowerBpm();
        }
        soundInterval = calculateSoundInterval();
    },100)
    clearInterval(timerId);
    if (startButton.textContent == 'STOP') {
        startMetronome(soundInterval);
    }
}







