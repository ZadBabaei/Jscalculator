let currentInput = "";
let previousInput = "";
let operation = null;

const display = document.getElementById('result');

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        if (button.id === 'clear') {
            clear();
        } 
        else if (button.id === 'equals') {
            calculate();
        } else if (['add', 'subtract', 'multiply', 'divide'].includes(button.id)) {
            setOperation(button.textContent);
            console.log("btn context: ", button.textContent);
        } else {
            appendNumber(button.textContent);
        }
    });
});

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function setOperation(op) {
    console.log("insetOP", op);
    if (currentInput === "") return;
    if (previousInput !== "") {
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = "";
}

function calculate() {
    let myResult;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    
    switch (operation.trim()) {
        case '+':
            myResult = prev + current;
            break;
        case '-':
            myResult = prev - current;
            break;
        case '*':
            myResult = prev * current;
            break;
        case '/':
            myResult = prev / current;
            break;
        default:
            return;
    }
    currentInput = myResult.toString();
    operation = null;
    previousInput = "";
    updateDisplay();
}

function clear() {
    currentInput = "";
    previousInput = "";
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    console.log(result.innerHTML);
    result.textContent = currentInput;
}

