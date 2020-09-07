const cards = document.querySelectorAll('.memory-card');
//Controle of het de eerste kaart is of de 2de kaart die wordt aangeduid
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
    if (lockBoard) return;
    if (this === firstCard)return;
    this.classList.add('flip');

    if (!hasFlippedCard){
        //1ste click
        hasFlippedCard = true;
        firstCard = this;
    }else{
        // 2de klik
        hasFlippedCard = false;
        secondCard = this;
        checkForMatch();

    }
}

function checkForMatch() {
    // Zijn het dezelfde kaart? Ja = Blijven staan. Nee = terug om draaien
    if (firstCard.dataset.framework === secondCard.dataset.framework){
        disableCards();
    }else {
        unflipCards();

    }
}
function disableCards(){
    //De zelfde kaarten, blijven deze kaarten staan, men kan niet meer op de kaarten klikken
    firstCard.removeEventListener('click' , flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards(){
    lockBoard = true;
    //Terug omdraaien van de kaarten die niet hetzelfde zijn
    setTimeout(() => {
        firstCard. classList.remove('flip');
        secondCard.classList.remove('flip');
       resetBoard();
    }, 1500);
}
function resetBoard(){
    [hasFlippedCard, lockBoard] = [false , false];
    [firstCard, secondCard] = [null, null];
}
// Kaarten door elkaar
(function shuffle(){
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random() * 18);
        card.style.order = randomPos;
    });
})();
cards.forEach(card => card.addEventListener('click', flipCard));