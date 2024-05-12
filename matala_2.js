  
const gameForm = document.getElementById("game-form");
const gameContainer = document.getElementById("game-container");
const scoreTableBody = document.getElementById("score-table-body");
const scoreTable = document.getElementById("score-table");
const endGameButton = document.getElementById("end-game-button");
const SpecialButton = document.querySelector('.styled-button');


let playerName;
let cardAmount;
let cardArray = [];
let flippedCards = [];
let matchedCards = [];
let timer;
let startTime;

gameForm.addEventListener("submit", startGame);
endGameButton.addEventListener("click", endGame);

function startGame(event) {
  event.preventDefault();
  playerName = document.getElementById("player-name").value;
  cardAmount = parseInt(document.getElementById("card-amount").value);

  if (cardAmount % 2 != 0) {
    alert("Please choose an even number of cards.");
    return;
  }

  gameForm.style.display = "none";
  createCards();
  startTimer();
  endGameButton.style.display = "block";
}SpecialButton

function createCards() {
  Name=document.getElementById("PlayerName");
  Name.innerHTML=`Lets go ${playerName}! `;
  const cardValues = generateCardValues(cardAmount);
  cardValues.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.addEventListener("click", flipCard);
    card.setAttribute("data-value", value);
    gameContainer.appendChild(card);
  });
} 

function generateCardValues(amount) {
  const values = [];
  for (let i = 0; i < amount / 2; i++) {
    const emojis= ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🤟🏼','🍌', '🥭', '🍍', '🥀', '🌺', 
    '🌭', '🍔', '🐸', '🍟','🐵', '🍕', '⚽️','👍🏽', '🏀', '🏈', '💛', '🦁', '🐮' ,'💚', '💙', '🍻', '🌈', '☀️', ]
    values.push(emojis[i], emojis[i]);
  }
  return shuffleArray(values);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function flipCard(event) {
  const card = event.target;
  if (!card.classList.contains("flip") && flippedCards.length < 2) {
    card.classList.add("flip");
    flippedCards.push(card);
    card.textContent = card.getAttribute("data-value");
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
}

function checkMatch() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];
  if (card1.getAttribute("data-value") === card2.getAttribute("data-value")) {
    matchedCards.push(card1, card2);
    flippedCards = [];
    if (matchedCards.length === cardArray.length) {
      endGame();
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flip");
      card2.classList.remove("flip");
      card1.textContent = "";
      card2.textContent = "";
      flippedCards = [];
    }, 1000);
  }
}

function startTimer() {
  startTime = Date.now();
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;
  const timerDisplay = document.createElement("div");
  timerDisplay.classList.add("timer");
  timerDisplay.textContent = `Time: ${minutes}:${seconds.toString().padStart(2, "0")}`;
  if (document.querySelector(".timer") === null) {
    gameContainer.insertAdjacentElement("beforebegin", timerDisplay);
  } else {
    document.querySelector(".timer").textContent = timerDisplay.textContent;
  }
}

function endGame() {
  clearInterval(timer);
  const endTime = Math.floor((Date.now() - startTime) / 1000);
  const matches = matchedCards.length / 2;

  if (matches !== cardAmount / 2) {
    alert("You did not finish the game. Your score will not be saved.");
    resetGame();
    return;
  }

  const playAgain = confirm(`Congratulations ${playerName}! You completed the game in ${endTime} seconds and found ${matches} pairs of cards.\nDo you want to play again?`);
  if (playAgain) {
    saveScore(playerName, endTime, matches);
    resetGame();
  } else {
    gameForm.style.display = "block";
    endGameButton.style.display = "none";
    document.querySelector(".timer").remove();
    gameContainer.innerHTML = "";
    gameForm.innerHTML="";
    scoreTable.innerHTML="";
    document.querySelector('#reset-button').innerHTML="";
    document.querySelector('#PlayerName').innerHTML="";
    SpecialButton.innerHTML="Hope to see you again 🤙🏽";
    resetButton.remove();
    SpecialButton.classList.add('finish');
    
  }
}

function saveScore(name, time, matches) {
  const newRow = document.createElement("tr");
  const nameCell = document.createElement("td");
  nameCell.textContent = name;
  const timeCell = document.createElement("td");
  timeCell.textContent = time;
  const matchesCell = document.createElement("td");
  matchesCell.textContent = matches;
  newRow.appendChild(nameCell);
  newRow.appendChild(timeCell);
  newRow.appendChild(matchesCell);
  scoreTableBody.appendChild(newRow);
  updateScoreTable();
}

function resetGame() {
  playerName = "";
  cardAmount = 0;
  cardArray = [];
  flippedCards = [];
  matchedCards = [];
  startTime = 0;
  gameContainer.innerHTML = "";
  gameForm.style.display = "block";
  document.querySelector(".timer").remove();
  endGameButton.style.display = "none";
}
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetTable);

function resetTable() {
  scoreTableBody.innerHTML = "";
  updateScoreTable();
}

function updateScoreTable() {
  const tableRows = Array.from(scoreTableBody.querySelectorAll("tr"));
  const sortedRows = tableRows.sort((row1, row2) => {
    const time1 = parseInt(row1.cells[1].textContent);
    const time2 = parseInt(row2.cells[1].textContent);
    return time1 - time2;
  });
  sortedRows.forEach((row) => {
    scoreTableBody.appendChild(row);
  });
 
}
const button = document.querySelector('.styled-button');

setInterval(() => {
  button.classList.toggle('styled-button-animation');
}, 2000);
