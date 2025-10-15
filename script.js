document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.memory-card');
    let hadFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let moves = 0;
    let matches = 0;
function flipCard() {
    if(lockBoard) return; // prevents fliping more cards while flipping
    if(this === firstCard) return;
    this.classList.add('flip'); // rotates the card in 180 deg
    if(!hadFlippedCard) {
        hadFlippedCard = true; // mark flipcard 
        firstCard = this;
        return;
    }
    secondCard = this; //marks second card
    moves++;
    checkForMatch(); 
}
function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    
    if(isMatch) {
        disableCards();
        matches++;
        console.log(`Matches: ${matches}`);

        if(matches === 6) {
            setTimeout(() => {
                alert(`You won in ${moves} moves!`);
            }, 100); 
        }
    } else {
        unflipCards();
    }
}
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}
function unflipCards() {
    lockBoard = true; 
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}
function resetBoard() {
    hadFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function shuffle() {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    });
}
cards.forEach(card => card.addEventListener('click', flipCard));
shuffle();
});