/**
 * Pokemon rendering and display functions
 */

/**
 * Renders all Pokemon cards to the DOM
 * @function renderPkmCard
 * @returns {void}
 */
function renderPkmCard() {
  let pkmCardsContainer = document.getElementById("content");
  pkmCardsContainer.innerHTML = "";
  for (let i = 0; i < pokemonArray.length; i++) {
    renderSingleCard(i, pkmCardsContainer);
  }
}

/**
 * Renders a single Pokemon card
 * @function renderSingleCard
 * @param {number} i - Pokemon index
 * @param {HTMLElement} container - Container element
 * @returns {void}
 */
function renderSingleCard(i, container) {
  let typeID = `type-${i}`;
  let pokeCardIndex = `pokeCard${i}`;
  container.innerHTML += renderPkmCardHTMLTemplate(i, typeID, pokeCardIndex);
  let typeContainer = document.getElementById(typeID);
  addTypesToCard(i, typeContainer, pokeCardIndex);
}

/**
 * Adds types to a Pokemon card
 * @function addTypesToCard
 * @param {number} i - Pokemon index
 * @param {HTMLElement} typeContainer - Type container element
 * @param {string} cardIndex - Card ID
 * @returns {void}
 */
function addTypesToCard(i, typeContainer, cardIndex) {
  for (let j = 0; j < pokemonArray[i].types.length; j++){
    let pokeType = pokemonArray[i].types[j].type.name;
    let pokeTypeBg = pokemonArray[i].types[0].type.name;
    typeContainer.innerHTML += `<p>${pokeType}</p>`;
    addTypeBg(pokeTypeBg, cardIndex);
  }
}

/**
 * Adds background type class to a Pokemon card
 * @function addTypeBg
 * @param {string} pokeTypeBg - Pokemon type for background styling
 * @param {string} pokeCardIndex - ID of the Pokemon card element
 * @returns {void}
 */
function addTypeBg(pokeTypeBg, pokeCardIndex) {
  const card = document.getElementById(pokeCardIndex);
  if (card) {
    card.classList.add(pokeTypeBg);
  }
}

/**
 * Renders general Pokemon statistics
 * @function renderGeneralStats
 * @param {number} i - Index of the Pokemon in the pokemonArray
 * @returns {void}
 */
function renderGeneralStats(i) {
  let statsContainer = document.getElementById("differentStats");
  let weight = pokemonArray[i].weight;
  let formattedWeight = formatWeight(weight);
  statsContainer.innerHTML = "";
  statsContainer.innerHTML += renderGeneralStatsHTMLTemplate(i, formattedWeight);
}

/**
 * Renders Pokemon base stats with progress bars
 * @function renderBaseStats
 * @param {number} i - Index of the Pokemon in the pokemonArray
 * @returns {void}
 */
function renderBaseStats(i) {
  let statsContainer = document.getElementById("differentStats");
  let baseStats = pokemonArray[i].stats;
  statsContainer.innerHTML = "";
  let cardHTML = `<div class="card" id="pokemon-card"><div class="progress_bars">`;
  renderProgressbar(statsContainer, baseStats, cardHTML);
}

/**
 * Creates progress bar HTML for stats
 * @function createProgressbarHTML
 * @param {Array} baseStats - Pokemon base statistics
 * @param {string} cardHTML - Initial HTML string
 * @returns {string} Complete HTML string
 */
function createProgressbarHTML(baseStats, cardHTML) {
  for (let k = 0; k < baseStats.length; k++) {
    let statName = baseStats[k].stat.name;
    let baseValue = baseStats[k].base_stat;
    let maxValue = maxStats[statName];
    cardHTML += renderProgressbarHTMLTemplate(statName, baseValue, maxValue);
  }
  return cardHTML;
}

/**
 * Updates all progress bars with current values
 * @function updateAllProgressBars
 * @param {Array} baseStats - Pokemon base statistics
 * @returns {void}
 */
function updateAllProgressBars(baseStats) {
  for (let k = 0; k < baseStats.length; k++) {
    let statName = baseStats[k].stat.name;
    let baseValue = baseStats[k].base_stat;
    let maxValue = maxStats[statName];
    updateProgressBar(`${statName}-bar`, baseValue, maxValue);
  }
}

/**
 * Renders progress bars for Pokemon base stats
 * @function renderProgressbar
 * @param {HTMLElement} statsContainer - Container element for the stats
 * @param {Array} baseStats - Array of Pokemon base statistics
 * @param {string} cardHTML - Initial HTML string for the card
 * @returns {void}
 */
function renderProgressbar(statsContainer, baseStats, cardHTML) {
  cardHTML = createProgressbarHTML(baseStats, cardHTML);
  statsContainer.innerHTML = cardHTML;
  updateAllProgressBars(baseStats);
}

/**
 * Renders Pokemon attacks/moves in the overlay
 * @function renderAttacks
 * @param {number} i - Index of the Pokemon in the pokemonArray
 * @returns {void}
 */
function renderAttacks(i) {
  let statsContainer = document.getElementById("differentStats");
  let attacks = pokemonArray[i].moves;
  statsContainer.innerHTML = "";
  statsContainer.innerHTML = `<div class="card_attacks" id="pokemon_attacks"></div>`;
  addAttacksToContainer(attacks);
}

/**
 * Adds attack list to container
 * @function addAttacksToContainer
 * @param {Array} attacks - Pokemon moves array
 * @returns {void}
 */
function addAttacksToContainer(attacks) {
  for (let l = 0; l < attacks.length; l++) {
    document.getElementById("pokemon_attacks").innerHTML +=`<div class="attacks">
    <p>${attacks[l].move.name}</p></div>`;
  }
}
