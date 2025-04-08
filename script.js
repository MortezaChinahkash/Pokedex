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
        pkmCardsContainer.innerHTML += `
        <div class="poke_card">
            <p>ID:  #${pokemonArray[i].id}</p>
            <h3>${pokemonArray[i].name}</h3>
            <img src=${pokemonArray[i].sprites.other.showdown.front_shiny}>
            <div id="type"></div>
        </div>`
        let typeContainer = document.getElementById("type")
        typeContainer = "";
        for (let j = 0; j < pokemonArray[i].types.length; j++) {
            const types = pokemonArray[i].types[j].type.name
            console.log(pokemonArray[i].types);
            typeContainer.innerHTML += `
            <p>${types}</p>`
            
            
        }
    }
    console.log(pokemonArray)
}

