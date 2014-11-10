var completeArray = new Array();
var flippedCards = 0;
var activeCard1 = "none";
var activeCard2 = "none";
var twoCardsFlippedSetTimeOut;
var seeingFlippedCards = false;
var gottenCards = new Array();

if(typeof(memoryGameElementId) == "undefined"){
    window.memoryGameElementId = "memory-container";
}

if(typeof(cardBack) == "undefined"){
    window.cardBack = "img/card_back.jpg";
}

if(typeof(timeShowingCards) == "undefined"){
    window.timeShowingCards = 2000;
}

if(typeof(memoryGameImages) != "undefined"){
    initGame();
}


function initGame(){
    
    generateCompleteArray(completeArray);
    randomizeArray(completeArray);
    createHtml(completeArray);
}

function generateCompleteArray(array){
    for(var i=0; i<memoryGameImages.length; i++){
        array.push("position_"+i+"-0");
        array.push("position_"+i+"-1");
    }
}

function randomizeArray(array){
    for(var i=array.length-1; i>=0; i--){        
        var randomIndex = Math.floor(Math.random() * (i+1));
        var temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
    }
}

function createHtml(array){
    var memoryGameElement = document.getElementById(memoryGameElementId);
    for(var i=0; i<array.length; i++){
        var cardElement = '<div id="card_'+i+'" class="card">';
        cardElement += '<img id="card-back_'+i+'" class="card-back" src="' + cardBack + '" />';
        cardElement += '<img id="card-inside_'+i+'" class="card-inside" src="' + getImageFromPosition(array[i]) + '" style="display:none" />';
        cardElement += '</div>';
        
        memoryGameElement.innerHTML += cardElement;
        
        
    }
    for(var i=0; i<array.length; i++){
        addOnClick('card_'+i);
    }
}

function getImageFromPosition(position){
    var firstIndex = /\d+/.exec(position)[0];
    var secondIndex = /-\d+/.exec(position)[0].replace("-","");
    
    return memoryGameImages[firstIndex][secondIndex];
}

function addOnClick(elementId){
    var element = document.getElementById(elementId);
    element.onclick = function(){
        var elementNumber = this.id;
        elementNumber = /\d+/.exec(elementNumber)[0];
        if(flippedCards < 2 && elementNumber != activeCard1
           && elementNumber != activeCard2
           && gottenCards.indexOf(elementNumber) == -1
           && !seeingFlippedCards){
            if(flippedCards == 0){
                activeCard1 = elementNumber;
                showCard(activeCard1);
            }else{
                activeCard2 = elementNumber;
                showCard(activeCard2);
            }
            flippedCards++;
        }
        if(flippedCards == 2 && !seeingFlippedCards){
            seeingFlippedCards = true;
            twoCardsFlipped();
        }
    }
}

function showCard(number){
    var cardBack = "card-back_"+number;
    var cardInside = "card-inside_"+number;
    cardBack = document.getElementById(cardBack);
    cardInside = document.getElementById(cardInside);

    cardBack.style.display = "none";
    cardInside.style.display = "";
}
function hideCard(number){
    var cardBack = "card-back_"+number;
    var cardInside = "card-inside_"+number;
    cardBack = document.getElementById(cardBack);
    cardInside = document.getElementById(cardInside);

    cardBack.style.display = "";
    cardInside.style.display = "none";
}

function twoCardsFlipped(){
    if(compareFirstIndexes(completeArray[activeCard1],completeArray[activeCard2])){
        gottenCards.push(activeCard1);
        gottenCards.push(activeCard2);
        activeCard1 = "none";
        activeCard2 = "none";
        flippedCards = 0;
        seeingFlippedCards = false;
        
        if(gottenCards.length == completeArray.length){
            gameEnd();
        }
    }else{
        twoCardsFlippedSetTimeOut = setTimeout(cardsDontMatch, timeShowingCards);
        
    }
}

function cardsDontMatch(){
    hideCard(activeCard1);
    hideCard(activeCard2);
    activeCard1 = "none";
    activeCard2 = "none";
    flippedCards = 0;
    seeingFlippedCards = false;
}

function cardsMatch(){

}

function compareFirstIndexes(position1, position2){
    var index1 = /\d+/.exec(position1)[0];
    var index2 = /\d+/.exec(position2)[0];
    
    return index1 == index2;
}

function gameEnd(){
    alert("Game End");
}