const board = document.getElementById("gameBoard");
const timerElement = document.getElementById("timer");
const matchesElement = document.getElementById("matches");
const message = document.getElementById("message");
const startBtn = document.getElementById("startBtn");

const emojis = [
  "🍎","🍌","🍇","🍉","🍒","🥝",
  "🍍","🥑","🍓","🍋","🍑","🥥",
  "🚗","✈️","🚀","🏀","⚽","🎮"
];

let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 0;
let timer;
let timeLeft;

startBtn.addEventListener("click", startGame);

function startGame() {

  clearInterval(timer);

  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);
  const totalTime = parseInt(document.getElementById("time").value);

  const totalCards = rows * cols;

  if (totalCards % 2 !== 0) {
    alert("Rows × Columns must be EVEN");
    return;
  }

  board.innerHTML = "";
  flippedCards = [];
  matchedPairs = 0;

  matchesElement.textContent = matchedPairs;
  message.textContent = "";

  totalPairs = totalCards / 2;

  board.style.gridTemplateColumns = `repeat(${cols}, 90px)`;

  let selected = emojis.slice(0, totalPairs);

  let cards = [...selected, ...selected];

  cards = shuffle(cards);

  cards.forEach((emoji) => {

    const card = document.createElement("div");

    card.classList.add("card");

    card.dataset.emoji = emoji;

    card.innerHTML = emoji;

    card.addEventListener("click", flipCard);

    board.appendChild(card);

  });

  timeLeft = totalTime;

  timerElement.textContent = timeLeft;

  timer = setInterval(() => {

    timeLeft--;

    timerElement.textContent = timeLeft;

    if (timeLeft <= 0) {

      clearInterval(timer);

      message.textContent = "💀 GAME OVER!";

    }

  }, 1000);
}

function flipCard() {

  if (
    this.classList.contains("flipped") ||
    this.classList.contains("matched") ||
    flippedCards.length === 2
  ) {
    return;
  }

  this.classList.add("flipped");

  flippedCards.push(this);

  if (flippedCards.length === 2) {

    checkMatch();

  }
}

function checkMatch() {

  const [card1, card2] = flippedCards;

  if (card1.dataset.emoji === card2.dataset.emoji) {

    card1.classList.add("matched");
    card2.classList.add("matched");

    matchedPairs++;

    matchesElement.textContent = matchedPairs;

    flippedCards = [];

    if (matchedPairs === totalPairs) {

      clearInterval(timer);

      message.textContent = "🎉 YOU WIN!";

    }

  } else {

    setTimeout(() => {

      card1.classList.remove("flipped");
      card2.classList.remove("flipped");

      flippedCards = [];

    }, 1000);
  }
}

function shuffle(array) {

  for (let i = array.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}