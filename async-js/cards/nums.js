document.addEventListener('load', getDeck())
btn = document.querySelector('#btn')
appendHere = document.querySelector('#append-card')
remNum = document.querySelector('#rem-num')


btn.addEventListener("click", getCard)

deck_id = ''

async function getDeck() {
    deck = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    console.log(deck.data)
    deck_id = deck.data.deck_id
}

async function getCard(){
    card = await axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    console.log(card)
    if (card.data.success === true) {
        saveCard(card.data)
        appendCard(card.data)
        appendRemainder(card.data.remaining)
    } else {
        endGame()
    }
    
}

prevCard = ''
currCard = ''
function saveCard(card){
    prevCard = currCard
    currCard = card
    if (prevCard !== ''){
        console.log("Previous card:")
        console.log(`Value: ${prevCard.cards[0].value}`)
        console.log(`suit: ${prevCard.cards[0].suit}`)
        console.log("Current card:")
        console.log(`Value: ${currCard.cards[0].value}`)
        console.log(`suit: ${currCard.cards[0].suit}`)
    }
}

function appendCard(card){
    appendHere.innerText = ''
    cardIMG = document.createElement('img')
    cardIMG.setAttribute('src', card.cards[0].image)
    appendHere.append(cardIMG)
}
function appendRemainder(num){
    remNum.innerText = num
}

function endGame(){
    alert("the game is over. no more cards to be found ")
    location.reload()
}