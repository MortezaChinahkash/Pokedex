let startIndex = 1;
let lastIndex = 21;
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
        let pokeCardIndex = `pokeCard${i}`
        pkmCardsContainer.innerHTML += `
        <div id="${pokeCardIndex}" class="poke_card">
            <p>ID:  #${pokemonArray[i].id}</p>
            <h3>${pokemonArray[i].name}</h3>
            <img src=${pokemonArray[i].sprites.other.showdown.front_shiny}>
            <div class="type_text" id="${typeID}"></div>
        </div>`
        let typeContainer = document.getElementById(typeID)
        for (let j = 0; j < pokemonArray[i].types.length; j++) {
            let pokeType = pokemonArray[i].types[j].type.name
            let pokeTypeBg = pokemonArray[i].types[0].type.name
            typeContainer.innerHTML += `
            <p>${pokeType}</p>`
            addTypeBg(pokeTypeBg, pokeCardIndex)
        }
    }
}

function addMorePokemon() {
    startIndex = lastIndex;
    lastIndex += 20;
    fetchUrls();
}
