let input = document.getElementById("display");
let buttons = document.querySelectorAll("input[type='button']");

let operation = ["+", "-", "*", "/"];
let historyArray = JSON.parse(localStorage.getItem("calcHistory")) || [];
let equalPressed = 0;

// Add event listener to buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.value == "AC") {
            input.value = "";
        } else if (button.value == "DEL") {
            input.value = input.value.slice(0, -1);
        } else if (button.value == "=") {
            calculateResult();
        } else {
            if(equalPressed == 1) {
                input.value = "";
                equalPressed = 0;
            }
            if (operation.includes(input.value.slice(-1)) && operation.includes(button.value)) {
                alert("Don't repeat operations");
            } else {
                input.value += button.value;
            }
        }
    });
});

// calculate results
function calculateResult() {
    equalPressed = 1;
    if (!input.value) {
        alert("Please enter a value");
    } else {
        try {
            let s = eval(input.value);
            saveCalculation(input.value, s);
            displayHistory();
            input.value = String(s).length > 5 ? s.toFixed(2) : s;
        } catch {
            alert("Invalid Expression");
            input.value = "";
        }
    }
}

// When we press keyboard enter button to calculate
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        calculateResult();
    }
});

// variables to hold references
let calcont = document.querySelector(".calcont");
let historyCont = document.querySelector(".hiscont");
let hisbtn = document.querySelector(".hisbtn");
let hisbtnPress = 0;

// history button action
hisbtn.addEventListener("click", () => {
    if (hisbtnPress == 0) {
        calcont.style.display = "none";
        document.querySelector(".clbtn").style.display = "block";
        historyCont.style.display = "block";
        hisbtn.textContent = "X";
        hisbtnPress = 1;
    } else {
        calcont.style.display = "block";
        document.querySelector(".clbtn").style.display = "none";
        historyCont.style.display = "none";
        hisbtn.textContent = "History";
        hisbtnPress = 0;
    }
    displayHistory()
});

// Save calculation
function saveCalculation(expression, result) {
    historyArray.push(`${expression} = ${result}`);
    localStorage.setItem("calcHistory", JSON.stringify(historyArray));
}

// Display history
function displayHistory() {
    historyCont.innerHTML = historyArray.map(calc => `<p>${calc}</p>`).join("");
}

// Clear history
document.querySelector(".clbtn").addEventListener("click", () => {
    historyArray = [];
    localStorage.removeItem("calcHistory");
    historyCont.innerHTML = "";
});

// This code is added to stop the user to enter characters other than numbers
document.addEventListener("keydown", function (event) {
    const allowedKeys = ["Enter", "Backspace", "Delete", ".", "+", "-", "=", "*", "/"];

    if ((event.key >= "0" && event.key <= "9") || (event.keyCode >= 96 && event.keyCode <= 105)) {
        return;
    }
    if (allowedKeys.includes(event.key)) {
        return;
    }
    event.preventDefault();
});