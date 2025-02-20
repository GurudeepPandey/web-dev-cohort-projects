// This code is written by myself.
const nameInput = document.querySelector("#name");
const titleInput = document.querySelector("#title");
const reviewInput = document.querySelector("#review");
const stars = document.querySelectorAll(".star")
const reviewCont = document.querySelector(".reviewInnerCont")
let starNo = 0
let prev;

// Handling Submit Button Click
document.querySelector("#submit").addEventListener("click", () => {
    let name = nameInput.value.trim();
    let title = titleInput.value.trim();
    let review = reviewInput.value.trim();

    if (!name || !title || !review || starNo == 0) {
        alert("Please fill all values")
    }
    else {
        createReview(name, title, review, starNo);
        emptyStars();
        nameInput.value = "";
        titleInput.value = "";
        reviewInput.value = "";
        starNo = 0
    }
})

// Handling Star Clicks
document.querySelector(".starBox").addEventListener("click", (event) => {
    starNo = Number(event.target.id.slice(-1))
    if (starNo == prev) {
        console.log("testing")
        emptyStars()
        prev = 0
    }
    else {
        highlightStars();
        prev = starNo
    }
})

// Function to create a review card
function createReview(name, title, review, rating) {
    let div = document.createElement("div");

    let h3 = document.createElement("h3");
    h3.textContent = title;

    let ratingDiv = document.createElement("div");  // create colored stars
    ratingDiv.style.color = "yellow"
    for(let i = 0; i < rating; i++) {
        ratingDiv.textContent += "★"
    }
    let span = document.createElement("span");      // create black stars
    span.style.color = "transparent"
    span.style.webkitTextStroke = "1px black"
    for(let i = 0; i < 5 - rating; i++) {
        span.textContent += "★"
    }
    ratingDiv.appendChild(span)

    let p = document.createElement("p");
    p.textContent = review;

    let nameDiv = document.createElement("h4");
    nameDiv.textContent = `~Name: ${name}`;

    div.appendChild(h3);
    div.appendChild(ratingDiv);
    div.appendChild(p);
    div.appendChild(nameDiv);
    reviewCont.prepend(div);
}

// Function to clear star selection
function emptyStars() {
    stars.forEach(star => (star.style.color = "white"));
}

// Function to highlight stars
function highlightStars() {
    emptyStars();
    for (let i = 0; i < starNo; i++) {
        stars[i].style.color = "yellow";
    }
}