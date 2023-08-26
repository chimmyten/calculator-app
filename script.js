function displayInputNumber(e) {
  const inputNumberBox = document.querySelector(".input-number");
  const expressionNumber = document.querySelector(".expression-tracker-number");
  const inputOperation = document.querySelector(".input-operation");

  inputNumberBox.textContent += e.target.textContent;
}

function displayExpressionNumber(num) {
  const expressionNumber = document.querySelector(".expression-tracker-number");
  expressionNumber.textContent = num;
}

function displayOperation(e) {
  const inputOperation = document.querySelector(".input-operation");
  const inputNumber = document.querySelector(".input-number");
  const expressionNumber = document.querySelector(".expression-tracker-number");
  let result;

  if (inputOperation.textContent && inputNumber.textContent) {
    if (!expressionNumber.textContent) {
      result = operation(0, +inputNumber.textContent, inputOperation.textContent);
    } else {
      result = operation(+expressionNumber.textContent, +inputNumber.textContent, inputOperation.textContent);
    }
    expressionNumber.textContent = result;
    inputNumber.textContent = "";
  } else if (inputNumber.textContent) {
    expressionNumber.textContent = inputNumber.textContent;
    inputNumber.textContent = "";
  }
  inputOperation.textContent = e.target.textContent;
}

function operation(num1, num2, operation) {
  console.log(num1, num2, operation);
  if (operation === "+") {
    return add(num1, num2);
  } else if (operation === "-") {
    return subtract(num1, num2);
  } else if (operation === "x") {
    return multiply(num1, num2);
  } else {
    return divide(num1, num2);
  }
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
  });
}

init();
