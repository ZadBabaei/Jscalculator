let currentInput = "";
let previousInput = "";
let operation = null;

const resultDisplay = document.getElementById('result');

// Add event listeners to all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonId = this.id;
        const buttonText = this.textContent.trim(); // Trim any whitespace

        switch (buttonId) {
            case 'clear':
                clearAll();
                break;
            case 'delete':
                deleteLast();
                break;
            case 'equals':
                calculate();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                selectOperation(buttonText);
                break;
            default:
                appendNumber(buttonText);
                break;
        }
    });
});

function appendNumber(number) {
    currentInput += number;
    updateDisplay(currentInput);
}

function selectOperation(op) {
    if (currentInput === "" && previousInput === "") return;
    if (currentInput !== "") {
        if (previousInput !== "") {
            calculate();
        }
        operation = op;
        previousInput = currentInput;
        currentInput = "";
    } else {
        operation = op; // Allows changing the operation without entering a new number
    }
}

function calculate() {
    let calculationResult;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            calculationResult = prev + current;
            break;
        case '-':
            calculationResult = prev - current;
            break;
        case '*':
            calculationResult = prev * current;
            break;
        case '/':
            calculationResult = prev / current;
            break;
        default:
            return;
    }

    currentInput = calculationResult.toString();
    operation = null;
    previousInput = "";
    updateDisplay(currentInput);
}

function clearAll() {
    currentInput = "";
    previousInput = "";
    operation = null;
    updateDisplay("0");
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
}

function updateDisplay(value) {
    resultDisplay.textContent = value;
}

// Initially show 0
updateDisplay("0");
