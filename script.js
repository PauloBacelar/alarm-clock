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

// Main function
button.addEventListener("click", function() {
    let [hours, minutes] = [...getInputs()];
    
    if(!checkInputs(hours, minutes) || alarmIsSet) {
        showErrorMessage();
        return;
    }

    alarmIsSet = true;
})