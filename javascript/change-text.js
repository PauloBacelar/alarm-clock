// Global variables
const exactTime = document.querySelector("input#exact-time");
const afterSomeTime = document.querySelector("input#after-some-time");
const textToChange = document.querySelector("h2#play-at");

// Functions
exactTime.addEventListener("click", function () {
  textToChange.textContent = "Play at";
});

afterSomeTime.addEventListener("click", function () {
  textToChange.textContent = "Play in";
});
