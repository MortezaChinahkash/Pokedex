let startIndex = 1;
let lastIndex = 20;
let pokemonArray = [];

async function fetchUrls() {
    for (let i = startIndex; i < lastIndex; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url)
        let currentJSON = await response.json();
        pokemonArray.push(currentJSON)
    }
    renderPkmCard()
}

function renderPkmCard(){
    let pkmCardsContainer = document.getElementById("content")
    pkmCardsContainer.innerHTML = "";
    for (let i = 0; i < pokemonArray.length; i++) {
        pkmCardsContainer.innerHTML += `<div class="poke_card"></div>`
    }
    console.log(pokemonArray)
}

