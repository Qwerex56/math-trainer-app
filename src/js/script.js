const EQUATION_DISPLAY = document.querySelector(".math-trainer__equation");
const INPUT_DISPLAY = document.querySelector(".math-trainer__input");
const BUTTONS = document.querySelectorAll(".math-trainer__input-container__button");
const VALID_INPUT = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Enter'];

let lhs = 0;
let rhs = 0;
let input = 0;
let operand = '+';

randomizeQuestion()

window.addEventListener('keydown', (ev) => {
  let key_code = ev.key;
  console.log(key_code);
  if (!VALID_INPUT.includes(key_code)) {
    return;
  }

  if (key_code === 'Backspace') {
    input = Math.floor(input / 10);
    INPUT_DISPLAY.innerText = input;
    return;
  }

  input = parseInt(input.toString() + key_code);
  INPUT_DISPLAY.innerText = input;
  
  if (!checkResult()) {
    return;
  }

  INPUT_DISPLAY.classList.remove("math-trainer__input--good");
  
  randomizeQuestion();
})

BUTTONS.forEach((button) => {
  button.addEventListener('click', (ev) => {
    if (button.innerHTML == 'C') {
      input = Math.floor(input / 10);
      INPUT_DISPLAY.innerText = input;
      return;
    }

    input = parseInt(input.toString() + button.innerHTML);
    INPUT_DISPLAY.innerText = input;

    if (!checkResult()) {
      return;
    }
  
    INPUT_DISPLAY.classList.remove("math-trainer__input--good");
    
    randomizeQuestion();
  });
});

function getResult(oper, left, right) {
  let result = 0;
  switch (oper) {
    case '+':
      result = left + right;
      break;
    case '-':
      result = left - right;
      break;
    case '*':
      result = left * right;
      break;
    case '/':
      result = left / right;
      break;
  }
  return result;
}

function checkResult() {
  const RESULT = getResult(operand, lhs, rhs);

  return RESULT === input;
}

function randomizeQuestion() {
  input = 0;
  lhs = Math.floor(Math.random() * 10) + 1;
  rhs = Math.floor(Math.random() * 10) + 1;
  EQUATION_DISPLAY.innerText = lhs + operand + rhs;
  INPUT_DISPLAY.innerText = input;
}