
const operators = ['=', '+', '-', 'X', '/'];

function createButtons(containerSelector, buttons) {
  const container = document.querySelector(containerSelector);
  const input = document.querySelector('#input-box');
  buttons.forEach(button => {
    const buttonElement = document.createElement('button');
    buttonElement.innerHTML = button;
    buttonElement.className = 'calc-button';
    if (operators.includes(button)) {
      buttonElement.addEventListener('click', (e) => {
        input.value += String(e.target.innerHTML);
        handleInput(e);
      });
    } else if (button === '.') {
      buttonElement.addEventListener('click', (e) => {
        if (!input.value.includes('.')) {
          input.value += String(e.target.innerHTML);
        }
      });
    } else {
      buttonElement.addEventListener('click', (e) => {
        input.value += String(e.target.innerHTML);
      });
    }
    container.appendChild(buttonElement);
  });
}

function generateCalcButtons() {
  createButtons('#nums-area', [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '=']);
  createButtons('#control-area', ['+', '-', 'X', '/']);
  document.querySelector('#input-ac').addEventListener('click', () => {
    document.querySelector('#input-box').value = '';
  });
}

function handleInput(event) {
  let operator = '';
  const input = document.querySelector('#input-box').value;

  let exp = [];
  let remainingExp = '';
  let prevIdx = 0;
  for (let i = 0; i < input.length; i++) {
    if (operators.includes(input[i])) {
      exp.push(input.slice(prevIdx, i));
      prevIdx = i + 1;
      operator = (operator == '') ? input[i] : operator;
      console.log('operator', operator, 'exp', exp);
    }
  }
  remainingExp = input.slice(prevIdx - 1);
  if (exp.length < 2) {
    return;
  }

  console.log('solving', exp, operator, remainingExp);

  switch (operator) {
    case '+':
      document.querySelector('#input-box').value = (parseFloat(exp[0]) + parseFloat(exp[1])).toFixed(2);
      break;
    case '-':
      document.querySelector('#input-box').value = (parseFloat(exp[0]) - parseFloat(exp[1])).toFixed(2);
      break;
    case 'X':
      document.querySelector('#input-box').value = (parseFloat(exp[0]) * parseFloat(exp[1])).toFixed(2);
      break;
    case '/':
      if (parseFloat(exp[1]) === 0) {
        document.querySelector('#input-box').value = 'DIV/0!';
        return;
      }
      document.querySelector('#input-box').value = (parseFloat(exp[0]) / parseFloat(exp[1])).toFixed(2);
      break;
  }
  document.querySelector('#input-box').value += remainingExp == '=' ? '' : remainingExp;
}

generateCalcButtons();
