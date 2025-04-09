let startIndex = 1;
let lastIndex = 21;
let pokemonArray = [];

function renderOverlay(i) {
  let pokeTypeBg = pokemonArray[i].types[0].type.name;
  document.getElementById("dialogueWindow").classList.add("overlay");
  document.getElementById("dialogueWindow").classList.remove("d_none");
  updateOverlay(i, pokeTypeBg);
}

function updateOverlay(i, pokeTypeBg) {
  let dialogueWindow = document.getElementById("dialogueWindow");
  dialogueWindow.innerHTML = `
            <div class="overlay_innerwindow" id="overlayInnerWindow">
                <div class="overlay_header">
                    <h1>${pokemonArray[i].name}</h1>
                    <img class="img_btn" onclick="closeOverlay()" src="./assets/png/close.svg">
                </div>
                <div class="pokemon_info">
                    <div class="pokemon_card_bg">
                        <img class="pkmn_overlay" src=${pokemonArray[i].sprites.other.showdown.front_shiny}>
                    </div>
                    <h1 class="stats">Pokemon Stats</h1>
                </div>
    `;
  let overlayBg = document.getElementById("overlayInnerWindow");
  addTypeBgOverlay(overlayBg, pokeTypeBg);
}

function closeOverlay() {
  document.getElementById("dialogueWindow").classList.remove("overlay");
  document.getElementById("dialogueWindow").classList.add("d_none");
  document.getElementById("overlayInnerWindow").classList.add("d_none");
}

async function fetchUrls() {
  for (let i = startIndex; i < lastIndex; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentJSON = await response.json();
    pokemonArray.push(currentJSON);
  }
  renderPkmCard();
}

function renderPkmCard() {
  let pkmCardsContainer = document.getElementById("content");
  pkmCardsContainer.innerHTML = "";
  for (let i = 0; i < pokemonArray.length; i++) {
    let typeID = `type-${i}`;
    let pokeCardIndex = `pokeCard${i}`;
    pkmCardsContainer.innerHTML += `
        <div onclick="renderOverlay(${i})" id="${pokeCardIndex}" class="poke_card">
            <p>ID:  #${pokemonArray[i].id}</p>
            <h3>${pokemonArray[i].name}</h3>
            <img src=${pokemonArray[i].sprites.other.showdown.front_shiny}>
            <div class="type_text" id="${typeID}"></div>
        </div>`;
    let typeContainer = document.getElementById(typeID);
    for (let j = 0; j < pokemonArray[i].types.length; j++) {
      let pokeType = pokemonArray[i].types[j].type.name;
      let pokeTypeBg = pokemonArray[i].types[0].type.name;
      typeContainer.innerHTML += `
            <p>${pokeType}</p>`;
      addTypeBg(pokeTypeBg, pokeCardIndex);
      updateOverlay(i, pokeTypeBg);
    }
  }
}

function addMorePokemon() {
  loadMorePkmnLS();
  startIndex = lastIndex;
  lastIndex += 20;
  fetchUrls();
}

function previousPkmn(i) {
  if (i > 0) {
    updateOverlay(i - 1);
  } else {
    updateOverlay(pokemonArray.length - 1);
  }
}

function nextPkmn(i) {
  if (i < pokemonArray.length - 1) {
    updateOverlay(i + 1);
  } else {
    updateOverlay(0);
  }
}

function loadingScreen() {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    const content = document.getElementById("content");
    loader.classList.add("d_none");
    content.style.display = "flex";
  }, 5000);
}

function loadMorePkmnLS() {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");
  loader.classList.remove("d_none");
  content.style.display = "none";
  setTimeout(() => {
    loader.classList.add("d_none");
    content.style.display = "flex";
  }, 5000);
}

function addTypeBg(pokeTypeBg, pokeCardIndex) {
  const card = document.getElementById(pokeCardIndex);
  if (card) {
    card.classList.add(pokeTypeBg);
  }
}

function addTypeBgOverlay(overlayBg, pokeTypeBg) {
  const imagePath = `./assets/img/poke_card_bg/${pokeTypeBg}.png`;
  overlayBg.style.backgroundImage = `url('${imagePath}')`;
  overlayBg.style.backgroundSize = "cover";
  overlayBg.style.backgroundRepeat = "no-repeat";
  overlayBg.style.backgroundPosition = "center";
}
