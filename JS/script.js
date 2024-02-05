const btns = document.querySelectorAll('#botons button');
const Display = document.getElementById('display');
const DisplayHis = document.getElementById('history');
let displayValue = '0';
let displayValueHis = '0';
let currentInput = '';
let operator = '';
let simbolRepeat = false;
const maxLength = 8;

btns.forEach(btn => {
    btn.addEventListener('click', function () {
        // console.log(`Botón ${btn.id} clickeado con clase ${btn.className}`);
        switch (btn.id) {
            case 'reset':
                clearDisplay();
                break;
            case 'equal':
                calculateResult();
                break;
            case 'negative':
                toggleSign();
                break;
            case 'dot':
                appendDecimalPoint();
                break;
            case 'porcentage':
                appendPorcentage();
                break;
            default:
                if (displayValue != 'Error') {
                    if (btn.classList.contains('number')) {
                        if (currentInput.length >= maxLength-1 ){
                            // console.log(currentInput.length);
                            break;
                        }
                        appendNumber(btn.textContent);
                        simbolRepeat = false;
                    } else {
                        appendSymbol(btn.textContent);
                        simbolRepeat = true;
                    }
                }
                break;
        }
    });
});

function updateDisplay() {
    Display.textContent = displayValue;
    DisplayHis.textContent = displayValueHis;
}

function showDisplayHistory (){
    if (DisplayHis.classList.contains('oculto')){
        DisplayHis.classList.remove('oculto');
    }
}

function unShowDisplayHistory () {
    if (!DisplayHis.classList.contains('oculto')){
        DisplayHis.classList.add('oculto');
    }
}


function clearDisplay() {
    displayValue = '0';
    displayValueHis = '0';
    currentInput = '';
    operator = '';
    unShowDisplayHistory();
    updateDisplay();
}

function appendNumber(number) {
    if (displayValue === '0') {
        displayValue = number;
    } else {
        displayValue += number;
    }
    // console.log('currentInput antes: ' + currentInput);
    currentInput += number;
    // console.log('currentInput despues: ' + currentInput);
    updateDisplay();
}

function appendSymbol(symbol) {
    if (operator !== '' && !simbolRepeat) {
        // console.log('!operator: ' + operator);
        calculateResult();
    } else {
        currentInput = '';
        operator = symbol;
        // console.log('operator: ' + operator);
        if (simbolRepeat){
            displayValueHis = displayValueHis.slice(0, -1);
            displayValueHis = displayValueHis + symbol;
        } else {
            displayValueHis = displayValue + symbol;
        }
        // console.log('displayValueHis: ' + displayValueHis);
        displayValue = '0';
        showDisplayHistory();
        updateDisplay();
    }
}

function appendDecimalPoint() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        displayValue = currentInput;
        updateDisplay();
    }
}

function toggleSign() {
    if (currentInput !== '0' && currentInput !== '') {
        currentInput = (currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput);
        displayValue = currentInput;
        updateDisplay();
    }
}

function appendPorcentage() {
    // if (!currentInput.includes('%')) {
        currentInput = (parseFloat(currentInput)/100).toString();
        //currentInput += '%';
        displayValue = currentInput;
        updateDisplay();
    //}
}

function calculateResult() {
    if (operator !== '' && currentInput !== '') {
        // console.log('displayValueHis: ' + displayValueHis);
        displayValueHis = displayValueHis.slice(0, -1);
        // console.log('displayValueHis: ' + displayValueHis);
        // console.log('displayValue: ' + displayValue);
        const num1 = parseFloat(displayValueHis);
        const num2 = parseFloat(displayValue);
        // console.log('num1: ' + num1);
        // console.log('num2: ' + num2);
        switch (operator) {
            case '+':
                displayValue = (num1 + num2).toString();
                break;
            case '-':
                displayValue = (num1 - num2).toString();
                break;
            case 'x':
                displayValue = (num1 * num2).toString();
                break;
            case '/':
                if (currentInput !== '0') {
                    displayValue = (num1 / num2).toString();
                } else {
                    displayValue = 'Error';
                }
                break;
        }
        currentInput = '';
        operator = '';
        unShowDisplayHistory();
        updateDisplay();
    }
}