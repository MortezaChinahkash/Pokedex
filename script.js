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
        let typeID = `type-${i}`
        pkmCardsContainer.innerHTML += `
        <div class="poke_card">
            <p>ID:  #${pokemonArray[i].id}</p>
            <h3>${pokemonArray[i].name}</h3>
            <img src=${pokemonArray[i].sprites.other.showdown.front_shiny}>
            <div class="type_text" id="${typeID}"></div>
        </div>`
        let typeContainer = document.getElementById(typeID)
        for (let j = 0; j < pokemonArray[i].types.length; j++) {
            typeContainer.innerHTML += `
            <p>${pokemonArray[i].types[j].type.name}</p>`
        }
    }
}

function addMorePokemon() {
    lastIndex += 20
    fetchUrls()
}

