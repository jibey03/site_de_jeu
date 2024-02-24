const symbols = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🍑'];
let cards = [];
let flippedCardIndex = null;
let canFlip = true; 
let startTime;
let timerInterval;

function createDeck() {
    const doubledSymbols = symbols.concat(symbols);
    doubledSymbols.forEach(symbol => {
        const card = {
            symbol: symbol,
            flipped: false
        };
        cards.push(card);
    });
    shuffle(cards);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initGame() {
    createDeck();
    const memoryGame = document.getElementById('memoryGame');
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', () => flipCard(index));
        memoryGame.appendChild(cardElement);
    });
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('time').textContent = elapsedTime;
}

function stopTimer() {
    clearInterval(timerInterval);
}

function checkWin() {
    return cards.every(card => card.flipped);
}

function flipCard(index) {
    if (!canFlip) return; 
    
    const card = cards[index];
    if (!card.flipped) {
        card.flipped = true;
        const cardElement = document.querySelector(`.card[data-index="${index}"]`);
        cardElement.textContent = card.symbol;
        cardElement.classList.add('flipped');
        
        if (flippedCardIndex === null) {
            flippedCardIndex = index; 
        } else {
            canFlip = false; 
            if (cards[flippedCardIndex].symbol === card.symbol) {
                setTimeout(() => {
                    flippedCardIndex = null;
                    canFlip = true;
                    if (checkWin()) {
                        stopTimer();
                        alert(`Congratulations! You won in ${document.getElementById('time').textContent} seconds.`);
                    }
                }, 1000); 
            } else {
                setTimeout(() => {
                    const firstCardElement = document.querySelector(`.card[data-index="${flippedCardIndex}"]`);
                    firstCardElement.textContent = '';
                    firstCardElement.classList.remove('flipped');
                    cardElement.textContent = '';
                    cardElement.classList.remove('flipped');
                    cards[flippedCardIndex].flipped = false;
                    card.flipped = false;
                    flippedCardIndex = null;
                    canFlip = true;
                }, 1000); 
            }
        }
    }
}

function startGame() {
    initGame();
    startTimer();
    document.querySelector('button').disabled = true; 
}


function toggleNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.querySelector('.scroll-to-top').style.display = "block";
    } else {
      document.querySelector('.scroll-to-top').style.display = "none";
    }
  }
  
  function scrollToTop() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
  }
  
  window.onscroll = function() {
    scrollFunction();
  };
  
  
  function redirectToProfil() {
      window.location.href = "profil.php";
  }