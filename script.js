const expressionNum = document.querySelector(".expression-tracker-number");
const inputOperation = document.querySelector(".input-operation");
const inputNum = document.querySelector(".input-number");
// to know whether to replace the displayed number when inputting new numbers
let expressionDone = false;

function displayInputNumber(e) {
  if (expressionDone === true) {
    inputNum.textContent = "";
    expressionDone = false;
  }
  inputNum.textContent += e.target.textContent;
}

function displayExpressionNumber(num) {
  expressionNum.textContent = num;
}

function displayOperation(e) {
  let result;

  if (inputOperation.textContent && inputNum.textContent) {
    if (!expressionNum.textContent) {
      result = operation(0, +inputNum.textContent, inputOperation.textContent);
    } else {
      result = operation(+expressionNum.textContent, +inputNum.textContent, inputOperation.textContent);
    }
    expressionNum.textContent = result;
    inputNum.textContent = "";
  } else if (inputNum.textContent) {
    expressionNum.textContent = inputNum.textContent;
    inputNum.textContent = "";
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

function equals() {
  let result;
  if (!expressionNum.textContent) {
    result = operation(0, +inputNum.textContent, inputOperation.textContent);
  } else {
    result = operation(+expressionNum.textContent, +inputNum.textContent, inputOperation.textContent);
  }

  expressionNum.textContent = "";
  inputOperation.textContent = "";
  inputNum.textContent = result;
  expressionDone = true;
}

function clearAll() {
  expressionNum.textContent = "";
  inputNum.textContent = "";
  inputOperation.textContent = "";
}

function deleteChar() {
  if (inputNum.textContent) {
    inputNum.textContent = inputNum.textContent.slice(0, -1);
  } else if (inputOperation.textContent){
    inputOperation.textContent = "";
  }
}

function init() {
  const numberBtns = document.querySelectorAll(".number-btn");
  const operationBtns = document.querySelectorAll(".operation-btn");
  const equalsBtn = document.querySelector(".equals-btn");
  const clearBtn = document.querySelector(".clear-btn");
  const deleteBtn = document.querySelector(".delete-btn");

  numberBtns.forEach((btn) => {
    btn.addEventListener("click", displayInputNumber);
  });

  operationBtns.forEach((btn) => {
    btn.addEventListener("click", displayOperation);
  });

  equalsBtn.addEventListener("click", equals)
  clearBtn.addEventListener("click", clearAll);
  deleteBtn.addEventListener("click", deleteChar)
}

init();
