let height = document.getElementById("heightInput");
let weight = document.getElementById("weightInput");
let submitbtn = document.getElementById("submitbtn");

let bmi;
submitbtn.addEventListener("click", () => {
    if (!height.value) {
        height.style.border = "2px solid red"
    }
    else if (!weight.value) {
        weight.style.border = "2px solid red"
    }
    else {
        calculatebmi()
    }
})


let image = document.querySelector(".image")
let bmival = document.querySelector(".bmiVal")
let decref = document.querySelector(".desc")
let closebtn = document.querySelector(".closebtn")

function calculatebmi() {
    height.style.border = "none"
    weight.style.border = "none"

    let heiVal = parseFloat(height.value)
    let weival = parseFloat(weight.value)
    bmi = (weival / ((heiVal / 100) * (heiVal / 100)))
    console.log(bmi)
    showResult()
}

function showResult() {
    let description;
    let imagePath;
    if (bmi < 18.5) {
        description = "Underweight"
        imagePath = "./Images/underweight.png"
    }
    else if (bmi <= 24.9) {
        description = "Normal"
        imagePath = "./Images/normal.jpg"
    }
    else {
        description = "Overweight"
        imagePath = "./Images/overweight.png"
    }

    document.querySelector("#result").style.display = "flex"
    document.querySelector("#inputcontainer").style.display = "none"

    image.src = imagePath
    bmival.innerText = bmi.toFixed(2)
    decref.textContent = description
}

document.querySelector(".closebtn").addEventListener("click", () => {
    document.querySelector("#result").style.display = "none"
    document.querySelector("#inputcontainer").style.display = "flex"
    bmi = 0
    height.value = ""
    weight.value = ""
})

// When we press keyboard enter button to calculate
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        calculatebmi();
    }
});