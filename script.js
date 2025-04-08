let startIndex = 1
let lastIndex = 20

async function fetchUrls() {
    for (let i = startIndex; i < lastIndex; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url)
        let currentJSON = await response.json();
        renderPkmCard(currentJSON)
    }
}

function renderPkmCard(currentJSON){
    let pkmCardsContainer = document.getElementById("content")
    pkmCardsContainer.innerHTML = "";
    for (let i = 0; i < currentJSON.length; i++) {
        const currentPkm = currentJSON[i];
        console.log(currentJSON[i]);
        
        pkmCardsContainer.innerHTML += `
        <p>currentPkm</p>
        `
    }
}

