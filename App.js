let currentInput = "";
let previousInput = "";
let operation = null;

const display = document.getElementById('result');

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        switch (button.id) {
            case 'clear':
                clear();
                break;
            case 'equals':
                calculate();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                setOperation(button.textContent.trim()); // Ensure operation is correctly set
                break;
            default:
                appendNumber(button.textContent);
                break;
        }
    });
});

function appendNumber(number) {
    currentInput += number; // Append number
    updateDisplay();
}

function setOperation(op) {
    if (currentInput === "") return; // Don't set operation if there's no current input
    
    // If there's an existing operation, calculate it before setting the new operation
    if (operation && previousInput !== "") {
        calculate();
    }

    operation = op; // Set new operation
    previousInput = currentInput; // Move current input to previous input for calculation
    currentInput = ""; // Clear current input for the next number
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    // Perform calculation based on the operation
    if (!isNaN(prev) && !isNaN(current)) { // Check if both inputs are numbers
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return; // Exit if operation is not recognized
        }

        // Update for next operation or calculation
        currentInput = result.toString(); // Convert result back to string for display
        operation = null; // Clear operation
        previousInput = ""; // Clear previous input
        updateDisplay(); // Update the display with result
    }
}

function clear() {
    currentInput = "";
    previousInput = "";
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    display.textContent = currentInput || "0"; // Display current input; if empty, display '0'
}
