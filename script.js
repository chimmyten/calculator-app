const expressionNum = document.querySelector(".expression-tracker-number");
const inputOperation = document.querySelector(".input-operation");
const inputNum = document.querySelector(".input-number");
const errorMessage = document.querySelector(".error-message");
// to know whether to replace the displayed number when inputting new numbers
let expressionDone = false;
// to ensure decimal point is only inputted once
let decimalUsed = false;

function displayInputNumber(e) {
  if (errorMessage.textContent) {
    errorMessage.textContent = "";
  }
  if (expressionDone === true) {
    inputNum.textContent = "";
    expressionDone = false;
  }
  if (typeof e === "string") {
    inputNum.textContent += e;
  } else {
    inputNum.textContent += e.target.textContent;
  }
}

function displayExpressionNumber(num) {
  decimalUsed = false;
  expressionNum.textContent = num;
}

function displayOperation(e) {
  let result;
  let operationDisplay;

  // for keyboard inputs and clicks
  if (typeof e === "object") {
    operationDisplay = e.target.textContent;
  } else {
    operationDisplay = e;
  }

  if (errorMessage.textContent) {
    errorMessage.textContent = "";
  }
  // for being able to input negative numbers
  if (inputOperation.textContent && !inputNum.textContent && operationDisplay === "-") {
    displayInputNumber("-");
    return;
  }

  if (inputOperation.textContent && inputNum.textContent) {
    if (!expressionNum.textContent) {
      result = operation(0, +inputNum.textContent, inputOperation.textContent);
    } else {
      result = operation(+expressionNum.textContent, +inputNum.textContent, inputOperation.textContent);
    }
    if (result.toString().includes(".")) {
      result = roundNum(result);
    }

    displayExpressionNumber(result);
    inputNum.textContent = "";
  } else if (inputNum.textContent) {
    displayExpressionNumber(inputNum.textContent);
    inputNum.textContent = "";
  }
  inputOperation.textContent = operationDisplay;
}

function displayDecimal() {
  if (decimalUsed === false) {
    expressionDone = false;
    inputNum.textContent += ".";
    decimalUsed = true;
  }
}

function operation(num1, num2, operation) {
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
  if (num2 === 0) {
    clearAll();
    errorMessage.textContent = "err: divide by 0";
    return;
  }
  return num1 / num2;
}

function equals() {
  let result;
  if (!expressionNum.textContent && !inputNum.textContent) {
    errorMessage.textContent = "err: please enter a number";
  } else if (!expressionNum.textContent) {
    result = operation(0, +inputNum.textContent, inputOperation.textContent);
  } else {
    result = operation(+expressionNum.textContent, +inputNum.textContent, inputOperation.textContent);
  }

  if (result.toString().includes(".")) {
    result = roundNum(result);
  }
  expressionNum.textContent = "";
  inputOperation.textContent = "";
  inputNum.textContent = result.toString();
  expressionDone = true;
  decimalUsed = false;
}

function roundNum(result) {
  console.log(result.toString().split(".")[1]);
  if (result.toString().split(".")[1].length > 6) {
    result = result.toFixed(6);
  }
  return result;
}

function clearAll() {
  expressionNum.textContent = "";
  inputNum.textContent = "";
  inputOperation.textContent = "";
  errorMessage.textContent = "";
  decimalUsed = false;
}

function deleteChar() {
  if (inputNum.textContent) {
    if (inputNum.textContent.charAt(inputNum.textContent.length - 1) === ".") {
      decimalUsed = false;
    }
    inputNum.textContent = inputNum.textContent.slice(0, -1);
  } else if (inputOperation.textContent) {
    inputOperation.textContent = "";
  }
}

function keyPress(e) {
  // 0-9
  if (!isNaN(e.key)) {
    document.getElementById(`${e.key}`).classList.add("number-active");
    displayInputNumber(e.key);
    deactivate(e.key, "number-active");
    // +, -, *, /
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
    document.getElementById(`${e.key}`).classList.add("operation-active");
    if (e.key === "*") {
      displayOperation("x");
    } else {
      displayOperation(e.key);
    }
    deactivate(e.key, "operation-active");
    // "Enter" key
  } else if (e.key === "Enter") {
    document.getElementById("=").classList.add("equals-active");
    equals();
    deactivate("=", "equals-active");
    // "delete" key
  } else if (e.key === "Backspace") {
    document.getElementById(`${e.key}`).classList.add("number-active");
    deleteChar();
    deactivate(`${e.key}`, "number-active");
    // decimal point key
  } else if (e.key === ".") {
    document.getElementById(`${e.key}`).classList.add("decimal-active");
    displayDecimal();
    deactivate(`${e.key}`, "decimal-active");
  }
}

// make key effect on buttons noticeable when using keyboard
function deactivate(id, className) {
  setTimeout(() => {
    document.getElementById(`${id}`).classList.remove(`${className}`);
  }, 100);
}

function init() {
  const numberBtns = document.querySelectorAll(".number-btn");
  const operationBtns = document.querySelectorAll(".operation-btn");
  const equalsBtn = document.querySelector(".equals-btn");
  const clearBtn = document.querySelector(".clear-btn");
  const deleteBtn = document.querySelector(".delete-btn");
  const decimalBtn = document.querySelector(".decimal-btn");
  const allBtns = document.querySelectorAll("button");

  numberBtns.forEach((btn) => {
    btn.addEventListener("click", displayInputNumber);
  });

  operationBtns.forEach((btn) => {
    btn.addEventListener("click", displayOperation);
  });

  equalsBtn.addEventListener("click", equals);
  clearBtn.addEventListener("click", clearAll);
  deleteBtn.addEventListener("click", deleteChar);
  decimalBtn.addEventListener("click", displayDecimal);
  window.addEventListener("keydown", keyPress);

  // to prevent keyboard inputs from focusing the last clicked button
  allBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.blur();
    })
  })
}

init();
