let startIndex = 1;
let lastIndex = 21;
let pokemonArray = [];
let maxStats = {
  hp: 255,
  attack: 190,
  defense: 250,
  "special-attack": 154,
  "special-defense": 250,
  speed: 150,
};

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
            <div class="d_flex flex_y_center">
                <div onclick="renderGeneralStats(${i})" class="btn overlay_btn">General stats</div>
                <div onclick="renderBaseStats(${i})" class="btn overlay_btn">Base stats</div>
                <div onclick="renderAttacks(${i})" class="btn overlay_btn">Attacks</div>
            </div>
            <img class="img_btn" onclick="closeOverlay()" src="./assets/png/close.svg">
        </div>
        <div class="pokemon_info">
            <div class="flex_column">
                <h1>${pokemonArray[i].name}</h1>
                <div class="pokemon_card_bg">
                    <img class="pkmn_overlay" src=${pokemonArray[i].sprites.other.showdown.front_shiny}>
                </div>
            </div>
            <div>
                <h1 class="stats">Pokemon Stats</h1>
                <div id="differentStats"></div>
            </div>
        </div>
        <div class="types_scream">
          <div id="typesInOverlayandScream"></div>
          <button onclick="playScream(${i})" class="btn scream_button">Play Scream</button>
        </div>
        <div class="forward_backward">
        <img class="arrow" onclick="previousPkmn(${i}, '${pokeTypeBg}')" src="./assets/png/arrow_back.png">
          <p>${pokemonArray[i].id} of ${pokemonArray.length}</p>
        <img class="arrow" onclick="nextPkmn(${i}, '${pokeTypeBg}')" src="./assets/png/arrow_forward.png">
        </div>
    </div>
`;
  let overlayBg = document.getElementById("overlayInnerWindow");
  addTypeBgOverlay(overlayBg, pokeTypeBg);
  renderGeneralStats(i);
  addTypesToOverlay(i);
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
  let newIndex = i > 0 ? i - 1 : pokemonArray.length - 1;
  let pokeTypeBg = pokemonArray[newIndex].types[0].type.name;
  updateOverlay(newIndex, pokeTypeBg);
  let overlayBg = document.getElementById("overlayInnerWindow");
  addTypeBgOverlay(overlayBg, pokeTypeBg);
}

function nextPkmn(i) {
  let newIndex = i < pokemonArray.length - 1 ? i + 1 : 0;
  let pokeTypeBg = pokemonArray[newIndex].types[0].type.name;
  updateOverlay(newIndex, pokeTypeBg);
  let overlayBg = document.getElementById("overlayInnerWindow");
  addTypeBgOverlay(overlayBg, pokeTypeBg);
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
function renderGeneralStats(i) {
  let statsContainer = document.getElementById("differentStats");
  let weight = pokemonArray[i].weight;
  let weightString = weight.toString();
  let formattedWeight =
    weightString.slice(0, weightString.length - 1) +
    "," +
    weightString.slice(-1);
  statsContainer.innerHTML = "";
  statsContainer.innerHTML += `
   <div class="card">
    <table>
      <tr>
        <th>Category</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>Base EXP</td>
        <td>${pokemonArray[i].base_experience} XP</td>
      </tr>
      <tr>
        <td>Height</td>
        <td>${pokemonArray[i].height} dm</td>
      </tr>
      <tr>
        <td>Weight</td>
        <td>${formattedWeight} KG</td>
      </tr>
      <tr>
        <td>ID#</td>
        <td>${pokemonArray[i].id}</td>
      </tr>
    </table>
  </div>
   `;
}

function renderBaseStats(i) {
  let statsContainer = document.getElementById("differentStats");
  let baseStats = pokemonArray[i].stats;
  statsContainer.innerHTML = "";
  let cardHTML = `
      <div class="card" id="pokemon-card">
        <div class="progress_bars">`;
  renderProgressbar(statsContainer, baseStats, cardHTML);
}

function renderProgressbar(statsContainer, baseStats, cardHTML) {
  for (let k = 0; k < baseStats.length; k++) {
    let statName = baseStats[k].stat.name;
    let baseValue = baseStats[k].base_stat;
    let maxValue = maxStats[statName];
    cardHTML += `
  <div class="progress_bar_container">
    <span class="stat-label">${capitalize(
      statName
    )}: ${baseValue} / ${maxValue}</span>
    <div id="${statName}-bar" class="progress_bar"></div>
  </div>`;
  }
  statsContainer.innerHTML = cardHTML;
  for (let k = 0; k < baseStats.length; k++) {
    let statName = baseStats[k].stat.name;
    let baseValue = baseStats[k].base_stat;
    let maxValue = maxStats[statName];
    updateProgressBar(`${statName}-bar`, baseValue, maxValue);
  }
}

function updateProgressBar(id, value, maxValue) {
  let percentage = (value / maxValue) * 100;
  let bar = document.getElementById(id);
  bar.style.width = percentage + "%";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderAttacks(i) {
  let statsContainer = document.getElementById("differentStats");
  let attacks = pokemonArray[i].moves;
  statsContainer.innerHTML = "";
  statsContainer.innerHTML = `<div class="card_attacks" id="pokemon_attacks"></div>`;
  for (let l = 0; l < attacks.length; l++) {
    document.getElementById("pokemon_attacks").innerHTML += /*html*/ `
      <div class="attacks">
      <p>${attacks[l].move.name}</p>
      </div>`;
  }
}

function addTypesToOverlay(i) {
  let typesContainer = document.getElementById("typesInOverlayandScream");
  typesContainer.innerHTML = "";
  for (let j = 0; j < pokemonArray[i].types.length; j++) {
    let pokeType = pokemonArray[i].types[j].type.name;
    typesContainer.innerHTML += `
      <img class="type_pic" src="./assets/png/overlay_types/${pokeType}.svg">
    `;
  }
}

function playScream(i) {
  let scream = pokemonArray[i].cries.latest;
  let cry = new Audio(scream);
  cry.play();
}

function findPokemon() {
  let pokemonName = document.getElementById("input").value.toLowerCase();
  let result = pokemonArray.filter((pokemon) => pokemon.name.toLowerCase().includes(pokemonName));
  let pkmCardsContainer = document.getElementById("content");
  pkmCardsContainer.innerHTML = "";

  for (let i = 0; i < result.length; i++) {
    let currentPokemon = result[i];
    let typeID = `type-${i}`;
    let pokeCardIndex = `pokeCard${i}`;

    pkmCardsContainer.innerHTML += `
        <div onclick="renderOverlayFromFilter(${currentPokemon.id})" id="${pokeCardIndex}" class="poke_card">
            <p>ID:  #${currentPokemon.id}</p>
            <h3>${currentPokemon.name}</h3>
            <img src="${currentPokemon.sprites.other.showdown.front_shiny}">
            <div class="type_text" id="${typeID}"></div>
        </div>`;

    let typeContainer = document.getElementById(typeID);
    for (let j = 0; j < currentPokemon.types.length; j++) {
      let pokeType = currentPokemon.types[j].type.name;
      let pokeTypeBg = currentPokemon.types[0].type.name;
      typeContainer.innerHTML += `<p>${pokeType}</p>`;
      addTypeBg(pokeTypeBg, pokeCardIndex);
    }
  }
}


function renderOverlayFromFilter(pokemonId) {
  let i = pokemonArray.findIndex(p => p.id === pokemonId);
  if (i !== -1) {
    renderOverlay(i);
  }
}
