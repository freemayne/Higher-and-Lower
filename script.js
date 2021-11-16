"use strict";
let deck = {}; // Skapar en variabel för att spara vårat deck i.
let cardz = [];
let points = 0;
let counter = document.getElementById("points");
const heading = document.getElementById("header");
heading.innerText= "Draw a card, for every card a hidden card will be drawn, guess if its higher or lower";
heading.style.textAlign = "center";

async function getDeck() {
  // En asynchron funktion som vi anropar från root för att hämta vårat deck så fort vår kod laddas och exekveras
  const res = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1" // Kolla dokumentationen för api:et hur ni kan skicka in variabler, men här väljer vi att vi bara ska ett deck
  );
  const data = await res.json(); // Vi löser ut body från vårat response och gör om det till ett javascriptobjekt

  console.log(data);
  deck = data;
  console.log(deck);
}

getDeck();

const stylingBody = document.querySelector("body");
const drawCardBtn = document.getElementById("drawCard");
const images = document.getElementById("imgdiv");
const higherBtn = document.getElementById("btnHi");
const lowerBtn = document.getElementById("btnLow");
const cardImage = document.getElementById("image");

const buttons = document.getElementById("btn")
const cardImage2 = document.getElementById("image2");
stylingBody.style.backgroundColor= "lightblue";
drawCardBtn.style.padding = "8px";
higherBtn.style.padding = "8px";
lowerBtn.style.padding = "8px";
lowerBtn.style.backgroundColor = "red";
higherBtn.style.backgroundColor = "green";
drawCardBtn.style.backgroundColor = "yellow";
buttons.style.textAlign ="center";
counter.style.textAlign = "center";
images.style.textAlign= "center";
counter.innerText = `Your score: ${points}`;

function hideImage() {
  document.getElementById("image2").style.visibility = "hidden";
  
}
function showImage() {
  document.getElementById("image2").style.visibility="visible";
}


drawCardBtn.addEventListener("click", async () => {
  // Funktionen anropar api:et och får en array av kort plus lite response data
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`
    );
    const data = await res.json();
    image.src = data.cards[0].image;
    image2.src = data.cards[1].image;
   
    console.log(data.cards);
    cardz = data.cards;
    console.log();
    const print =document.getElementById("rattfel");
    print.style.visibility="hidden";
    
    // Loggar det första kortet i resultatet då jag bara ville dra 1 kort.
  });
  
  const stringConvert = function () {
    if (cardz.code === "0S" || cardz.value === "0D" || cardz.value === "0C"  || cardz.value === "0H") {
      cardz.value = 10;
    }
    
    if (cardz.value === "ACE") {
      cardz.value = 14;
    }
    if (cardz.value === "KING") {
      cardz.value = 13;
    }
    if (cardz.value === "QUEEN") {
      cardz.value = 12;
    }
    if (cardz.value === "JACK") {
      cardz.value = 11;
    }
  };
  
  higherBtn.addEventListener("click", function () {
    stringConvert();
    const print =document.getElementById("rattfel");
      print.style.visibility="visible";
    if (cardz[0].value < cardz[1].value) {
      console.log("rätt");
      points++;
      counter.innerText = `Your score: ${points}`;
      print.style.color = "green";
      print.innerText = "RÄTT";
      
    console.log(`RÄTT SVAR! Kortet var ${cardz[0].value} : ${cardz[1].value}`)
      console.log(points);
    } else if (cardz[0].value === cardz[1].value) {
      console.log("draw. no point");
      print.innerText = "Korten är lika.";
    }
    if (cardz[0].value > cardz[1].value) {
      print.style.color = "red";
      print.innerText = "FEL";
      console.log("fel");
    }
  });
  
  lowerBtn.addEventListener("click", function () {
    
    stringConvert();
    const print =document.getElementById("rattfel");
    print.style.textAlign= "center";
   
      print.style.visibility="visible";
    if (cardz[0].value > cardz[1].value) {
      console.log("Rätt");
      print.style.color = "green";
      print.innerText = "RÄTT";
      points++;
      counter.innerText = `Your score: ${points}`;
      console.log(points);
    } else if (cardz[0].value === cardz[1].value) {
      console.log("draw. no point");
      print.innerText = "Korten är lika.";
    }
    if (cardz[0].value < cardz[1].value) {
      console.log("fel");
      print.style.color = "red";
      print.innerText = "FEL";
    }
});
