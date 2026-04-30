const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const winScreen = document.getElementById("win-screen");
const gameGrid = document.getElementById("game-grid");
const timerEl = document.getElementById("timer");

let cards = [];
let flippedCards = [];
let matchedCount = 0;
let timer;
let seconds = 0;

// Your card image paths
const imagePaths = [
  "assets/Posters/Tiktok_posters_A4_1.jpg",
  "assets/Posters/Tiktok_posters_A4_2.jpg",
  "assets/Posters/Tiktok_posters_A4_3.jpg",
  "assets/Posters/Tiktok_posters_A4_4.jpg",
  "assets/Posters/Tiktok_posters_A4_5.jpg",
  "assets/Posters/Tiktok_posters_A4_6.jpg"
];

function startGame() {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  resetGame();
  createCards();
  startTimer();
}

function resetGame() {
  gameGrid.innerHTML = "";
  flippedCards = [];
  matchedCount = 0;
  seconds = 0;
  timerEl.textContent = "00:00";
  clearInterval(timer);
}

function createCards() {
  // Duplicate and shuffle cards
  cards = [...imagePaths, ...imagePaths].sort(() => 0.5 - Math.random());

  cards.forEach((src, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;

    const front = document.createElement("img");
    front.src = src;

    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = "🤔";

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", () => flipCard(card, src));
    gameGrid.appendChild(card);
  });
}

function flipCard(card, src) {
  if (flippedCards.length >= 2 || card.classList.contains("flipped")) return;

  card.classList.add("flipped");
  flippedCards.push({ card, src });

  if (flippedCards.length === 2) {
    const [first, second] = flippedCards;

    if (first.src === second.src) {
      matchedCount += 2;
      flippedCards = [];
      if (matchedCount === cards.length) endGame();
    } else {
      setTimeout(() => {
        first.card.classList.remove("flipped");
        second.card.classList.remove("flipped");
        flippedCards = [];
      }, 1000);
    }
  }
}

function endGame() {
  clearInterval(timer);
  gameScreen.classList.add("hidden");
  winScreen.classList.remove("hidden");
}

function restartGame() {
  winScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}

function startTimer() {
  timer = setInterval(() => {
    seconds++;
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    timerEl.textContent = `${mins}:${secs}`;
  }, 1000);
}
