function displayInputNumber(e) {
  const inputNumberBox = document.querySelector(".input-number");
  const expressionNumber = document.querySelector(".expression-tracker-number");

  inputNumberBox.textContent += e.target.textContent;
  expressionNumber.textContent += e.target.textContent;
}

function displayOperation(e) {
  const inputOperation = document.querySelector(".input-operation");
  const expressionOperation = document.querySelector(".expression-tracker-operation");
  inputOperation.textContent = e.target.textContent;
  expressionOperation.textContent = e.target.textContent;
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
  return num1 / num2;
}

function init() {
  const numberBtns = document.querySelectorAll(".number-btn");
  const operationBtns = document.querySelectorAll(".operation-btn");

  numberBtns.forEach((btn) => {
    btn.addEventListener("click", displayInputNumber);
  });

  operationBtns.forEach((btn) => {
    btn.addEventListener("click", displayOperation);
  })
}

init();
