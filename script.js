const board = document.getElementById("gameBoard");
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
}