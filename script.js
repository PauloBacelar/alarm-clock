// Global variables
const hoursInput = document.querySelector("input#hours");
const minutesInput = document.querySelector("input#minutes");
const button = document.querySelector("button#set-alarm");
const result = document.querySelector("p#result");
let alarmIsSet = false;

// Functions
function getInputs() {
    return [Number(hoursInput.value), Number(minutesInput.value)];
}

function checkInputs(hours, minutes) {
    function areNumbers() {
        return !isNaN(hours) && !isNaN(minutes);
    }

    function areInRange() {
        return hours <= 23 && hours >= 0 && minutes >= 0 && minutes <= 59;
    }

    return areNumbers() && areInRange();
}

function showErrorMessage() {
    result.innerHTML = "You're trying to set an alarm with invalid inputs, or alarm is already set.<br/> Refresh the page and try again";
}

function toMilliseconds(hours, minutes, isExactTime) {
    if(isExactTime) {
        let [currentHour, currentMinutes] = [...getCurrentTime()];

        if(currentHour > hours) {
            return (hours * 3600000 + minutes * 60000) + ((23 - currentHour) * 3600000 + (59 - currentMinutes) * 60000);
        } else if(hours > currentHour) {
            if(currentMinutes > minutes) {
                hours--;
                minutes += 60;
            }

            return (hours - currentHour) * 3600000 + (minutes - currentMinutes) * 60000;
        } else {
            if(currentMinutes > minutes) {
                return 23 * 3600000 + (60 - (currentMinutes - minutes)) * 60000;
            } else {
                return (minutes - currentMinutes) * 60000;
            }
        }
    } else {
        return hours * 3600000 + minutes * 60000;
    }
}

function getCurrentTime() {
    // Returns current time in [hours, minutes] format
    let date = new Date();
    return [date.getHours(), date.getMinutes()];
}

function showWhenWillPlay(time) {
    result.textContent = `Alarm will play at ${time}`;
}

function calcWhenWillPlay(hours, minutes, isExactTime) {
    if(isExactTime) {
        return [hours, minutes];
    } else {
        let [currentHour, currentMinutes] = [...getCurrentTime()];
        let actualHour = currentHour + hours;
        let actualMinutes = currentMinutes + minutes;

        if(actualHour >= 24) {
            actualHour -= 24;
        } 

        if(actualMinutes >= 60) {
            actualMinutes -= 60;
            actualHour++;
        }

        console.log([actualHour, actualMinutes]);
        return [actualHour, actualMinutes];
    }
}

function formatTime(hours, minutes) {
    hours = String(hours);
    minutes = String(minutes);
    let timeString = "";

    if(Number(hours) < 10) {
        timeString += "0";
    }
    timeString += hours + ":";

    if(Number(minutes) < 10) {
        timeString += "0";
    }
    timeString += minutes;

    return timeString;
}

// Main function
button.addEventListener("click", function() {
    let [hours, minutes] = [...getInputs()];
    
    if(!checkInputs(hours, minutes) || alarmIsSet) {
        showErrorMessage();
        return;
    }

    alarmIsSet = true;

    let millisecondsToPlay = toMilliseconds(hours, minutes, exactTime.checked);
    let [hoursItWillPlay, minutesItWillPlay] = calcWhenWillPlay(hours, minutes, exactTime.checked);

    let timeItWillPlay = formatTime(hoursItWillPlay, minutesItWillPlay);
    showWhenWillPlay(timeItWillPlay);
})