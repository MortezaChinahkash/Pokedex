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
    pkmCardsContainer.innerHTML += renderPkmCardHTMLTemplate(i, typeID, pokeCardIndex);
    let typeContainer = document.getElementById(typeID);
    for (let j = 0; j < pokemonArray[i].types.length; j++){
      let pokeType = pokemonArray[i].types[j].type.name;
      let pokeTypeBg = pokemonArray[i].types[0].type.name;
      typeContainer.innerHTML += `<p>${pokeType}</p>`;
      addTypeBg(pokeTypeBg, pokeCardIndex);
    }
  }
}

function renderOverlay(i) {
  // Save current scroll position without moving the page
  window.scrollPositionBeforeOverlay = window.scrollY;
  
  let pokeTypeBg = pokemonArray[i].types[0].type.name;
  document.getElementById("dialogueWindow").classList.add("overlay");
  document.body.classList.add("no_scroll");
  document.getElementById("dialogueWindow").classList.remove("d_none");
  updateOverlay(i, pokeTypeBg);
}

function updateOverlay(i, pokeTypeBg) {
  let dialogueWindow = document.getElementById("dialogueWindow");
  dialogueWindow.innerHTML = updateOverlayHTMLTemplate(i, pokeTypeBg);
  let overlayBg = document.getElementById("overlayInnerWindow");
  addTypeBgOverlay(overlayBg, pokeTypeBg);
  renderGeneralStats(i);
  addTypesToOverlay(i);
}

function closeOverlay() {
  document.getElementById("dialogueWindow").classList.remove("overlay");
  document.body.classList.remove("no_scroll");
  document.getElementById("dialogueWindow").classList.add("d_none");
  document.getElementById("overlayInnerWindow").classList.add("d_none");
  
  // Restore the original scroll position
  if (window.scrollPositionBeforeOverlay !== undefined) {
    window.scrollTo(0, window.scrollPositionBeforeOverlay);
    window.scrollPositionBeforeOverlay = undefined;
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
}

function nextPkmn(i) {
  let newIndex = i < pokemonArray.length - 1 ? i + 1 : 0;
  let pokeTypeBg = pokemonArray[newIndex].types[0].type.name;
  updateOverlay(newIndex, pokeTypeBg);
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
  // Ensure the background type is applied
  if (overlayBg && pokeTypeBg) {
    const imagePath = `./assets/img/poke_card_bg/${pokeTypeBg}.png`;
    overlayBg.style.backgroundImage = `url('${imagePath}')`;
    overlayBg.style.backgroundSize = "cover";
    overlayBg.style.backgroundRepeat = "no-repeat";
    overlayBg.style.backgroundPosition = "center";
    
    // Also add a class for the type to ensure consistent styling
    overlayBg.className = overlayBg.className.replace(/\b(normal|fire|water|electric|grass|ice|fighting|poison|ground|flying|psychic|bug|rock|ghost|dragon|dark|steel|fairy)\b/g, '');
    overlayBg.classList.add(pokeTypeBg);
  }
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
  statsContainer.innerHTML += renderGeneralStatsHTMLTemplate(i, formattedWeight)
}

function renderBaseStats(i) {
  let statsContainer = document.getElementById("differentStats");
  let baseStats = pokemonArray[i].stats;
  statsContainer.innerHTML = "";
  let cardHTML = `<div class="card" id="pokemon-card"><div class="progress_bars">`;
  renderProgressbar(statsContainer, baseStats, cardHTML);
}

function renderProgressbar(statsContainer, baseStats, cardHTML) {
  for (let k = 0; k < baseStats.length; k++) {
    let statName = baseStats[k].stat.name;
    let baseValue = baseStats[k].base_stat;
    let maxValue = maxStats[statName];
    cardHTML += renderProgressbarHTMLTemplate(statName, baseValue, maxValue)
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
    document.getElementById("pokemon_attacks").innerHTML +=`<div class="attacks">
    <p>${attacks[l].move.name}</p></div>`;
  }
}

function addTypesToOverlay(i) {
  let typesContainer = document.getElementById("typesInOverlayandScream");
  typesContainer.innerHTML = "";
  for (let j = 0; j < pokemonArray[i].types.length; j++) {
    let pokeType = pokemonArray[i].types[j].type.name;
    typesContainer.innerHTML += `<div class="type_pic_container"><img class="type_pic" src="./assets/png/overlay_types/${pokeType}.svg"></div>`;
  }
}

function playScream(i) {
  let scream = pokemonArray[i].cries.latest;
  let cry = new Audio(scream);
  cry.play();
}

function findPokemon() {
  const input = document.getElementById("input").value.toLowerCase();
  const container = document.getElementById("content");
  container.innerHTML = "";
  if (input.length === 0) return renderPkmCard();
  if (input.length < 3) return container.innerHTML = `<p class="hint-text">Please enter at least 3 characters to search.</p>`;
  const result = pokemonArray.filter(p => p.name.toLowerCase().includes(input));
  return result.length === 0
    ? container.innerHTML = `<p class="hint-text">No Pokémon found.</p>`
    : result.forEach((p, i) => {
        const cardId = `pokeCard${i}`;
        const typeId = `type-${i}`;
        container.innerHTML += findPokemonHTMLTemplate(p, cardId, typeId) 
        const typeContainer = document.getElementById(typeId);
        p.types.forEach(type => {
          typeContainer.innerHTML += `<p>${type.type.name}</p>`;});
        addTypeBg(p.types[0].type.name, cardId);});
}

function renderOverlayFromFilter(pokemonId) {
  let i = pokemonArray.findIndex(p => p.id === pokemonId);
  if (i !== -1) {
    renderOverlay(i);
  }
}
