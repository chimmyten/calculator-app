function inputNumber(e) {
  const inputText = document.querySelector(".input-text");
  const expressionTracker = document.querySelector(".expression-tracker");
  inputText.textContent = inputText.textContent + (e.target.textContent);
  expressionTracker.textContent = (e.target.textContent);
}


function init() {
  const inputBtns = document.querySelectorAll(".input-btn");

  inputBtns.forEach((btn) => {
    btn.addEventListener("click", inputNumber)
  })
}

init();