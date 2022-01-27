let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    artes: ['Art1',
    'Art2', 
    'Art3', 
    'Art4', 
    'Art5', 
    'Art6', 
    'Art7', 
    'Art8', 
    'Art9', 
    'Art10'],

cards: null,

    setCard: function(id){

       let card = this.cards.filter(card => card.id === id) [0];
        console.log(card);
       if(card.flipped || this.lockMode) {
           return false;
       }

       if(!this.firstCard){
           this.firstCard = card;
           this.firstCard.flipped = true;
           return true;
       }else{
           this.secondCard = card;
           this.secondCard.flipped = true;
           this.lockMode = true;
           return true;
       }

    },

    checkMatch: function () {
        if(!this.firstCard || !this.secondCard){
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
        
    },

        clearCards: function(){
            this.firstCard = null;
            this.secondCard = null;
            this.lockMode = false;
        },

        unflipCards(){
            this.firstCard.flipped = false;
            this.secondCard.flipped = false;
            this.clearCards();
        },

        checkGameOver(){
            return this.cards.filter(card=>!card.flipped).length == 0;
        },


createCardsFromArtes: function () {

    this.cards = [];

    this.artes.forEach((arte) => {
        this.cards.push(this.createPairFromArte(arte));
    })

    this.cards = this.cards.flatMap(pair => pair); //retornando as 20 cartas com flatMap
    this.shuffleCards();
    return this.cards;

},

createPairFromArte: function (arte){

    return [{
        id: this.createIdWithArte(arte),
        icon: arte,
        flipped: false,
    },{
        id: this.createIdWithArte(arte),
        icon: arte,
        flipped: false,
    }]
},

createIdWithArte: function (arte) {
    return arte + parseInt(Math.random() * 1000);
},

    shuffleCards: function (cards){ //misturando e embaralhando todas as cartas para que não fiquem em ordem
    let currentIndex = this.cards.length;
    let randomIndex = 0;

    while(currentIndex !== 0){

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];

    }

}


}