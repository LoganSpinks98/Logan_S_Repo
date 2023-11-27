const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
  startString.remove();
  startButton.remove();
}

function handleCardClick(event) {
  if (noClicking) return;
  if (event.target.classList.contains("flipped")) return;

  let clickedCard = event.target;
  clickedCard.style.backgroundColor = clickedCard.classList[0];

  if (!card1 || !card2) {
    clickedCard.classList.add("flipped");
    card1 = card1 || clickedCard;
    card2 = clickedCard === card1 ? null : clickedCard;
  }

  if (card1 && card2) {
    noClicking = true;
    let check1 = card1.className;
    let check2 = card2.className;

    if (check1 === check2) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (cardsFlipped === COLORS.length) alert("Congratulations! You matched all of the cards!");
}

let startButton = document.createElement("button");
startButton.innerText = "Start";
let startString = document.createElement("h2");
startString.innerText = "Click the start button to begin";

startButton.addEventListener("click", startGame);

function startGame(event) {
  let clicked = event.target;
if (clicked) {
  createDivsForColors(shuffledColors);
}
}
gameContainer.appendChild(startString);
gameContainer.appendChild(startButton);