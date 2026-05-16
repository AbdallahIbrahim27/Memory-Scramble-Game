const board = document.getElementById("gameBoard");
  cards.forEach((emoji) => {

    const card = document.createElement("div");

    card.classList.add("card");

    card.dataset.emoji = emoji;

    card.innerHTML = emoji;

    card.addEventListener("click", flipCard);

    board.appendChild(card);

  });
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

  } else {

    setTimeout(() => {

      card1.classList.remove("flipped");
      card2.classList.remove("flipped");

      flippedCards = [];

    }, 1000);
  }
}