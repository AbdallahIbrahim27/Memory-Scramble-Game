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