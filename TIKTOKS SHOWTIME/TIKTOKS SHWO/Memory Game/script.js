document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const movesDisplay = document.querySelector('.moves');
    const timeDisplay = document.querySelector('.time');
    const resetButton = document.querySelector('.reset');

    const cardsData = [
        'images/image1.jpg',
        'images/image2.jpg',
        'images/image3.jpg',
        'images/image4.jpg',
        'images/image5.jpg',
        'images/image6.jpg',
        'images/image7.jpg',
        'images/image8.png'
    ];

    let deck = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let time = 0;
    let timer;
    let lockBoard = false;

    function initGame() {
        // Reset all state
        grid.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;
        moves = 0;
        time = 0;
        lockBoard = false;
        deck = [...cardsData, ...cardsData];
        movesDisplay.textContent = moves;
        timeDisplay.textContent = time;
        clearInterval(timer);
        timer = setInterval(updateTime, 1000);

        shuffleDeck();

        deck.forEach((imagePath, index) => {
            const card = document.createElement('div');
            card.className = 'card'; // resets all classes
            card.dataset.index = index;
            card.dataset.image = imagePath;
            card.style.backgroundImage = "url('images/default.png')";
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        });
    }

    function shuffleDeck() {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    function flipCard() {
        if (lockBoard || this.classList.contains('flipped') || this.classList.contains('matched') || flippedCards.includes(this)) {
            return;
        }

        this.classList.add('flipped');
        this.style.setProperty('background-image', `url(${this.dataset.image})`, 'important');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;
            lockBoard = true;
            checkMatch();
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.image === card2.dataset.image) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = [];
            matchedPairs++;
            lockBoard = false;

            if (matchedPairs === cardsData.length) {
                clearInterval(timer);
                localStorage.setItem('gameMoves', moves);
                localStorage.setItem('gameTime', time);
                window.location.href = '../congraulation.html';
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.style.backgroundImage = "url('images/default.png')";
                card2.style.backgroundImage = "url('images/default.png')";
                flippedCards = [];
                lockBoard = false;
            }, 1000);
        }
    }

    function updateTime() {
        time++;
        timeDisplay.textContent = time;
    }

    resetButton.addEventListener('click', initGame);

    initGame();
});
