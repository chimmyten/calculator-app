const expressionNum = document.querySelector(".expression-tracker-number");
const inputOperation = document.querySelector(".input-operation");
const inputNum = document.querySelector(".input-number");
const errorMessage = document.querySelector(".error-message");
// to know whether to replace the displayed number when inputting new numbers
let expressionDone = false;

function displayInputNumber(e) {
  if (errorMessage.textContent) {
    errorMessage.textContent = "";
  }
  if (expressionDone === true) {
    inputNum.textContent = "";
    expressionDone = false;
  }
  if (typeof e === "number") {
    inputNum.textContent += e;
  } else {
    inputNum.textContent += e.target.textContent;
  }
}

function displayExpressionNumber(num) {
  expressionNum.textContent = num;
}

function displayOperation(e) {
  let result;

  if (errorMessage.textContent) {
    errorMessage.textContent = "";
  }

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
  if (typeof e === "string") {
    inputOperation.textContent = e;
  } else {
    inputOperation.textContent = e.target.textContent;
  }
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

  expressionNum.textContent = "";
  inputOperation.textContent = "";
  inputNum.textContent = result;
  expressionDone = true;
}

function clearAll() {
  expressionNum.textContent = "";
  inputNum.textContent = "";
  inputOperation.textContent = "";
  errorMessage.textContent = "";
}

function deleteChar() {
  if (inputNum.textContent) {
    inputNum.textContent = inputNum.textContent.slice(0, -1);
  } else if (inputOperation.textContent) {
    inputOperation.textContent = "";
  }
}

function keyPress(e) {
  console.log(e.key);
  // 0-9
  if (!isNaN(e.key)) {
    document.getElementById(`${e.key}`).classList.add("number-active");
    displayInputNumber(+e.key);
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
  }
  // TODO: add key effect for decimal point
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

  numberBtns.forEach((btn) => {
    btn.addEventListener("click", displayInputNumber);
  });

  operationBtns.forEach((btn) => {
    btn.addEventListener("click", displayOperation);
  });

  equalsBtn.addEventListener("click", equals);
  clearBtn.addEventListener("click", clearAll);
  deleteBtn.addEventListener("click", deleteChar);
  window.addEventListener("keydown", keyPress);
}

init();
