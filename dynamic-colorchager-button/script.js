const colorInput = document.querySelector(".color-input")
const btn = document.querySelector("#btn")
const btnCont = document.querySelector(".btn-cont")

btn.addEventListener("click", function() {
    let value = colorInput.value
    if(value === "empty") {
        alert("Please choose color")
    }
    else if(value === "custom") {
        let color = prompt("Enter hex value of color in this format #RRGGBB (0-9 and A-F)")
        validateColor(color)
        colorInput.value = "empty"
    }
    else {
        colorInput.value = "empty"
        createBtn(value)
    }
})

function createBtn(color) {
    let button = document.createElement("button")
    button.innerText = color.charAt(0).toUpperCase() + color.slice(1)
    button.style.backgroundColor = `${color}`
    button.onclick = changeBgColor(color)
    btnCont.appendChild(button)
}

function changeBgColor(color) {
    return function() {
        document.body.style.backgroundColor = `${color}`
    }
}

function validateColor(color) {
    let regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    if(regex.test(color)) {
        createBtn(color)
    }
    else {
        alert("Invalid color")
    }
}