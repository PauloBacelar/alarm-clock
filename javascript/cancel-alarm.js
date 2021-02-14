const cancelAlarmButton = document.querySelector("button#cancel-alarm");

function changeResult() {
  result.textContent = `Alarm was unset!`;
}

cancelAlarmButton.addEventListener("click", function () {
  alarmIsSet = false;
  changeResult();
});
