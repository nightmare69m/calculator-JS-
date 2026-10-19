console.log("project.js loaded");

let rt = 0;
let buffer = "0";
let prevOP = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = "0";
            rt = 0;
            prevOP = null;
            break;
        case '=':
            if (prevOP === null) {
                return;
            }
            flushOperation(parseFloat(buffer));
            prevOP = null;
            buffer = String(rt);
            rt = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === "0") {
        return;
    }
    const intBuffer = parseFloat(buffer);
    if (rt === 0) {
        rt = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    prevOP = symbol;
    buffer = "0";
}

function flushOperation(intBuffer) {
    if (prevOP === '+') {
        rt += intBuffer;
    } else if (prevOP === '−') {
        rt -= intBuffer;
    } else if (prevOP === '×') {
        rt *= intBuffer;
    } else if (prevOP === '÷') {
        rt /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer === "0") {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.wrapper').addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            buttonClick(event.target.innerText.trim());
        }
    });
}

init();