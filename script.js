function displayInputNumber(e) {
  const inputText = document.querySelector(".input-text");
  const expressionTracker = document.querySelector(".expression-tracker");
  inputText.textContent = inputText.textContent + (e.target.textContent);
  expressionTracker.textContent = (e.target.textContent);
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1/num2;
}

function init() {
  const inputBtns = document.querySelectorAll(".input-btn");

  inputBtns.forEach((btn) => {
    btn.addEventListener("click", displayInputNumber)
  })
}

init();