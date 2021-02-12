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

// Main function
button.addEventListener("click", function() {
    let [hours, minutes] = [...getInputs()];
    
    if(!checkInputs(hours, minutes)){ //|| alarmIsSet) {
        showErrorMessage();
        return;
    }

    alarmIsSet = true;
    let millisecondsToPlay = toMilliseconds(hours, minutes, exactTime.checked);
    console.log(millisecondsToPlay);
})