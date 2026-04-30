document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const movesDisplay = document.querySelector('.moves');
  const timeDisplay = document.querySelector('.time');
  const resetButton = document.querySelector('.reset');

  // Local image paths
  const cards = [
    'images/image1.jpg', 
    'images/image2.jpg',
    'images/image3.jpg',
    'images/image4.jpg',
    'images/image5.jpg',
    'images/image6.jpg',
    'images/image7.jpg',
    'images/image8.png'
   
  ];
  console.log("Testing image paths:");
cards.forEach(img => {
  const testImg = new Image();
  testImg.src = img;
  testImg.onload = () => console.log(`✅ ${img} loads OK`);
  testImg.onerror = () => console.log(`❌ ${img} FAILED to load`);
});
  const deck = [...cards, ...cards]; // Pairs

  let flippedCards = [];
  let matchedPairs = 0;
  let moves = 0;
  let time = 0;
  let timer;

  // Initialize game
  function initGame() {
    grid.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    time = 0;
    movesDisplay.textContent = moves;
    timeDisplay.textContent = time;
    clearInterval(timer);
    timer = setInterval(updateTime, 1000);

    // Shuffle and create cards
    shuffleDeck();
    deck.forEach((imagePath, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.index = index;
      card.dataset.image = imagePath;
      card.addEventListener('click', flipCard);
      grid.appendChild(card);
    });
  }

  // Shuffle deck
  function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  }

  // Flip card
  function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
      this.classList.add('flipped');
      this.style.backgroundImage = `url(${this.dataset.image})`;
      flippedCards.push(this);

      if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;
        checkMatch();
      }
    }
  }

  // Check for match
  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.image === card2.dataset.image) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      matchedPairs++;
      flippedCards = [];

      if (matchedPairs === cards.length) {
        clearInterval(timer);
        showWinPopup();
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.style.backgroundImage = "url('images/default.png')";
        card2.style.backgroundImage = "url('images/default.png')";
        flippedCards = [];
      }, 2000);
    }
  }

  // Custom Win Popup
  function showWinPopup() {
    const popup = document.createElement('div');
    popup.className = 'win-popup';
    popup.innerHTML = `
      <div class="popup-content">
        <h2>You Won! 🎉</h2>
        <p>Moves: ${moves} | Time: ${time}s</p>
        <button class="play-again">Play Again</button>
      </div>
    `;
    document.body.appendChild(popup);

    document.querySelector('.play-again').addEventListener('click', () => {
      popup.remove();
      initGame();
    });
  }

  // Update timer
  function updateTime() {
    time++;
    timeDisplay.textContent = time;
  }

  // Reset game
  resetButton.addEventListener('click', initGame);

  // Start the game
  initGame();
});