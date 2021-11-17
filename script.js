"use strict";
let deck = {};
let cardz = [];
let points = 0;
let counter = document.getElementById("points");
let kortKvar = 52;
const heading = document.getElementById("header");
const stylingBody = document.querySelector("body");
const drawCardBtn = document.getElementById("drawCard");
const images = document.getElementById("imgdiv");
const higherBtn = document.getElementById("btnHi");
const lowerBtn = document.getElementById("btnLow");
const cardImage = document.getElementById("image");

const buttons = document.getElementById("btn");
const cardImage2 = document.getElementById("image2");
stylingBody.style.backgroundColor = "lightblue";
drawCardBtn.style.padding = "8px";
higherBtn.style.padding = "8px";
lowerBtn.style.padding = "8px";
lowerBtn.style.backgroundColor = "red";
higherBtn.style.backgroundColor = "green";
drawCardBtn.style.backgroundColor = "yellow";
buttons.style.textAlign = "center";
counter.style.textAlign = "center";
images.style.textAlign = "center";
counter.innerText = `Your score: ${points}`;
counter.style.fontSize = "xx-large";
heading.innerText = `Draw a card, for every card, 
  a hidden card will be drawn, 
  guess if its higher or lower`;
heading.style.textAlign = "center";
document.getElementById("btnLow").style.visibility = "hidden";
  document.getElementById("btnHi").style.visibility = "hidden";
async function getDeck() {
  const res = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  const data = await res.json();
  console.log(data);
  deck = data;

}

getDeck();

function gameOver (){
  if(kortKvar ===0){
    alert(`Alla kort är slut. Poäng: ${points}`);
    window.location.reload();
  }
}

function hideContent() {
  document.getElementById("image2").style.visibility = "hidden";
  document.getElementById("btnLow").style.visibility = "visible";
  document.getElementById("btnHi").style.visibility = "visible";
  document.getElementById("drawCard").style.visibility = "hidden";

}
function showContent() {
  document.getElementById("image2").style.visibility = "visible";
  document.getElementById("btnLow").style.visibility = "hidden";
  document.getElementById("btnHi").style.visibility = "hidden";
  document.getElementById("drawCard").style.visibility = "visible";
}

drawCardBtn.addEventListener("click", async () => {
  const res = await fetch(
    `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=2`
  );
  const data = await res.json();
  image.src = data.cards[0].image;
  image2.src = data.cards[1].image; 

  console.log(data.cards);
  cardz = data.cards;
  console.log(kortKvar);
  kortKvar-=2;
  gameOver();

  const print = document.getElementById("rattfel");
  print.style.visibility = "hidden";
});

const stringConvert = function () {
  for (let i = 0; i < cardz.length; i++) {
    if (cardz[i].value === "ACE") {
      cardz[i].value = 14;
    }
    if (cardz[i].value === "KING") {
      cardz[i].value = 13;
    }
    if (cardz[i].value === "QUEEN") {
      cardz[i].value = 12;
    }
    if (cardz[i].value === "JACK") {
      cardz[i].value = 11;
    }
    cardz[i].value = Number(cardz[i].value);
  }
};

higherBtn.addEventListener("click", function () {
  stringConvert();
  const print = document.getElementById("rattfel");
  print.style.visibility = "visible";
  print.style.textAlign = "center";

  if (cardz[0].value < cardz[1].value) {
    points++;
    counter.innerText = `Your score: ${points}`;
    print.style.color = "green";
    print.innerText = "Correct✅";
  } else if (cardz[0].value === cardz[1].value) {
    print.style.color = "black";
    print.innerText = "Korten är lika.😒😒😒😒";
  }
  if (cardz[0].value > cardz[1].value) {
    print.style.color = "red";
    print.innerText = "Wrong❌";
  }
});

lowerBtn.addEventListener("click", function () {
  stringConvert();
  const print = document.getElementById("rattfel");
  print.style.textAlign = "center";

  print.style.visibility = "visible";
  if (cardz[0].value > cardz[1].value) {
    print.style.color = "green";
    print.innerText = "Correct✅";
    points++;
    counter.innerText = `Your score: ${points}`;
  } else if (cardz[0].value === cardz[1].value) {
    print.innerText = "Korten är lika.";
  }
  if (cardz[0].value < cardz[1].value) {
    print.style.color = "red";
    print.innerText = "Wrong❌";
  }
});
