let currentInput = "";
let storedValue = 0;
let selectedOperator = null;

let screen = document.querySelector('.screen');
let buttons = document.querySelectorAll('.btn');
let clear = document.querySelector('.btn-clear');
let equal = document.querySelector('.btn-equal');

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? "Error: Division by zero!" : a / b);

const operate = (num1, operator, num2) => {
    switch (operator) {
        case "+": return add(num1, num2);
        case "-": return subtract(num1, num2);
        case "*": return multiply(num1, num2);
        case "/": return divide(num1, num2);
        default: return "Error: Invalid operator!";
    }
};

function updateScreen(value) {
    screen.value = value;

    if (value.length > 10) {
        screen.classList.add('small-text');
    } else {
        screen.classList.remove('small-text');
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        let buttonValue = button.getAttribute("data-num");

        if (buttonValue === "+" || buttonValue === "-" || buttonValue === "*" || buttonValue === "/") {
            if (currentInput !== "") {
                storedValue = parseFloat(currentInput);
            }
            if (screen.value !== "" && currentInput === "") {
                storedValue = parseFloat(screen.value);
            }
            selectedOperator = buttonValue;
            currentInput = "";
        } else {
            currentInput += buttonValue;
            updateScreen(currentInput);
        }
        updateEqualButton();
    });
});

clear.addEventListener("click", () => {
    currentInput = "";
    storedValue = 0;
    selectedOperator = null;
    updateScreen("");
    updateEqualButton();
});

equal.addEventListener("click", () => {
    if (selectedOperator === null || currentInput === "") {
        return;
    }

    let num1 = storedValue;
    let num2 = parseFloat(currentInput);
    let result = operate(num1, selectedOperator, num2);

    updateScreen(result);
    storedValue = result;
    currentInput = "";
    selectedOperator = null;
    updateEqualButton();
});

function updateEqualButton() {
    if (selectedOperator !== null && currentInput !== "") {
        equal.disabled = false; 
    } else {
        equal.disabled = true; 
    }
}

document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (!isNaN(key) || key === "+" || key === "-" || key === "*" || key === "/") {
        if (key === "+" || key === "-" || key === "*" || key === "/") {
            if (currentInput !== "") {
                storedValue = parseFloat(currentInput);
            }
            if (screen.value !== "" && currentInput === "") {
                storedValue = parseFloat(screen.value);
            }
            selectedOperator = key;
            currentInput = "";
        } else {
            currentInput += key;
            updateScreen(currentInput);
        }
        updateEqualButton();
    }

    if (key === "Enter") {
        event.preventDefault(); 
        equal.click(); 
    }

    if (key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        updateScreen(currentInput);
        updateEqualButton();
    }

    if (key === "Escape") {
        clear.click(); 
    }
});
