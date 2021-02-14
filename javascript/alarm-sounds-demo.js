// Global variables
const classicalAlarmInput = document.querySelector("input#classical-alarm");
const rosterAlarmInput = document.querySelector("input#rooster-alarm");
const carAlarmInput = document.querySelector("input#car-alarm");
let audio = new Audio("./sounds/car_alarm.mp3");

// Functions
classicalAlarmInput.addEventListener("click", function () {
  audio.pause();
  audio = new Audio("./sounds/alarm_clock.mp3");
  audio.play();
});

rosterAlarmInput.addEventListener("click", function () {
  audio.pause();
  audio = new Audio("./sounds/roster.mp3");
  audio.play();
});

carAlarmInput.addEventListener("click", function () {
  audio.pause();
  audio = new Audio("./sounds/car_alarm.mp3");
  audio.play();
});
