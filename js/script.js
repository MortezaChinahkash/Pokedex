/**
 * Global variables for Pokemon data management
 */
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

/**
 * Fetches Pokemon data from the PokeAPI and renders the cards
 * Shows loading screen during fetch operation
 * @async
 * @function fetchUrls
 * @returns {Promise<void>} Promise that resolves when all Pokemon data is fetched and rendered
 */
async function fetchUrls() {
  // Show loading screen
  showLoadingScreen();
  
  for (let i = startIndex; i < lastIndex; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentJSON = await response.json();
    pokemonArray.push(currentJSON);
  }
  renderPkmCard();
  
  // Hide loading screen after data is loaded
  hideLoadingScreen();
}

/**
 * Renders all Pokemon cards to the DOM
 * Clears existing content and creates new cards with types and backgrounds
 * @function renderPkmCard
 * @returns {void}
 */
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

/**
 * Opens the Pokemon detail overlay modal
 * Saves current scroll position and displays Pokemon details
 * @function renderOverlay
 * @param {number} i - Index of the Pokemon in the pokemonArray
 * @returns {void}
 */
function renderOverlay(i) {
  // Save current scroll position without moving the page
  window.scrollPositionBeforeOverlay = window.scrollY;
  
  let pokeTypeBg = pokemonArray[i].types[0].type.name;
  document.getElementById("dialogueWindow").classList.add("overlay");
  document.body.classList.add("no_scroll");
  document.getElementById("dialogueWindow").classList.remove("d_none");
  updateOverlay(i, pokeTypeBg);
}

/**
 * Updates the overlay content with Pokemon details
 * Sets the background type and renders initial stats
 * @function updateOverlay
 * @param {number} i - Index of the Pokemon in the pokemonArray
 * @param {string} pokeTypeBg - Primary Pokemon type for background styling
 * @returns {void}
 */
function updateOverlay(i, pokeTypeBg) {
  let dialogueWindow = document.getElementById("dialogueWindow");
  dialogueWindow.innerHTML = updateOverlayHTMLTemplate(i, pokeTypeBg);
  let overlayBg = document.getElementById("overlayInnerWindow");
  addTypeBgOverlay(overlayBg, pokeTypeBg);
  renderGeneralStats(i);
  addTypesToOverlay(i);
}

/**
 * Closes the Pokemon detail overlay modal
 * Restores scroll position and removes overlay classes
 * @function closeOverlay
 * @returns {void}
 */
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

/**
 * Wrapper function to load more Pokemon
 * Calls loadMorePokemon function
 * @function addMorePokemon
 * @returns {void}
 */
function addMorePokemon() {
  loadMorePokemon();
}

/**
 * Navigates to the previous Pokemon in the overlay
 * Wraps around to the last Pokemon if at the beginning
 * @function previousPkmn
 * @param {number} i - Current Pokemon index
 * @returns {void}
 */
function previousPkmn(i) {
  let newIndex = i > 0 ? i - 1 : pokemonArray.length - 1;
  let pokeTypeBg = pokemonArray[newIndex].types[0].type.name;
  updateOverlay(newIndex, pokeTypeBg);
}

/**
 * Navigates to the next Pokemon in the overlay
 * Wraps around to the first Pokemon if at the end
 * @function nextPkmn
 * @param {number} i - Current Pokemon index
 * @returns {void}
 */
function nextPkmn(i) {
  let newIndex = i < pokemonArray.length - 1 ? i + 1 : 0;
  let pokeTypeBg = pokemonArray[newIndex].types[0].type.name;
  updateOverlay(newIndex, pokeTypeBg);
}

/**
 * Shows the loading screen and hides content
 * @function showLoadingScreen
 * @returns {void}
 */
function showLoadingScreen() {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");
  loader.classList.remove("d_none");
  content.style.display = "none";
}

/**
 * Hides the loading screen and shows content
 * @function hideLoadingScreen
 * @returns {void}
 */
function hideLoadingScreen() {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");
  loader.classList.add("d_none");
  content.style.display = "flex";
}

/**
 * Loads additional Pokemon data from the API
 * Updates the start and end indices and fetches new Pokemon
 * @async
 * @function loadMorePokemon
 * @returns {Promise<void>} Promise that resolves when new Pokemon data is loaded
 */
async function loadMorePokemon() {
  // Show loading screen
  showLoadingScreen();
  
  startIndex = lastIndex;
  lastIndex += 20;
  
  // Load more Pokemon
  for (let i = startIndex; i < lastIndex; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentJSON = await response.json();
    pokemonArray.push(currentJSON);
  }
  renderPkmCard();
  
  // Hide loading screen after data is loaded
  hideLoadingScreen();
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
 * Applies background type styling to the overlay
 * Sets background image and removes old type classes
 * @function addTypeBgOverlay
 * @param {HTMLElement} overlayBg - Overlay background element
 * @param {string} pokeTypeBg - Pokemon type for background styling
 * @returns {void}
 */
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

/**
 * Renders general Pokemon statistics in the overlay
 * Displays basic info like weight, height, base experience
 * @function renderGeneralStats
 * @param {number} i - Index of the Pokemon in the pokemonArray
 * @returns {void}
 */
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

/**
 * Renders Pokemon base stats with progress bars
 * Shows HP, Attack, Defense, etc. with visual progress indicators
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
 * Renders progress bars for Pokemon base stats
 * Creates HTML for each stat and updates their visual representation
 * @function renderProgressbar
 * @param {HTMLElement} statsContainer - Container element for the stats
 * @param {Array} baseStats - Array of Pokemon base statistics
 * @param {string} cardHTML - Initial HTML string for the card
 * @returns {void}
 */
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

/**
 * Updates the width of a progress bar based on stat values
 * @function updateProgressBar
 * @param {string} id - ID of the progress bar element
 * @param {number} value - Current stat value
 * @param {number} maxValue - Maximum possible value for the stat
 * @returns {void}
 */
function updateProgressBar(id, value, maxValue) {
  let percentage = (value / maxValue) * 100;
  let bar = document.getElementById(id);
  bar.style.width = percentage + "%";
}

/**
 * Capitalizes the first letter of a string
 * @function capitalize
 * @param {string} str - String to capitalize
 * @returns {string} String with first letter capitalized
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Renders Pokemon attacks/moves in the overlay
 * Displays all available moves for the Pokemon
 * @function renderAttacks
 * @param {number} i - Index of the Pokemon in the pokemonArray
 * @returns {void}
 */
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

/**
 * Adds Pokemon type icons to the overlay
 * Displays visual type indicators with SVG icons
 * @function addTypesToOverlay
 * @param {number} i - Index of the Pokemon in the pokemonArray
 * @returns {void}
 */
function addTypesToOverlay(i) {
  let typesContainer = document.getElementById("typesInOverlayandScream");
  typesContainer.innerHTML = "";
  for (let j = 0; j < pokemonArray[i].types.length; j++) {
    let pokeType = pokemonArray[i].types[j].type.name;
    typesContainer.innerHTML += `<div class="type_pic_container"><img class="type_pic" src="./assets/png/overlay_types/${pokeType}.svg"></div>`;
  }
}

/**
 * Plays the Pokemon's cry/sound
 * Creates audio element and plays the Pokemon's latest cry
 * @function playScream
 * @param {number} i - Index of the Pokemon in the pokemonArray
 * @returns {void}
 */
function playScream(i) {
  let scream = pokemonArray[i].cries.latest;
  let cry = new Audio(scream);
  cry.play();
}

/**
 * Searches for Pokemon by name in the current loaded Pokemon array
 * Filters and displays matching Pokemon cards based on user input
 * @function findPokemon
 * @returns {void}
 */
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

/**
 * Opens overlay for a Pokemon from search results
 * Finds Pokemon by ID and renders its overlay
 * @function renderOverlayFromFilter
 * @param {number} pokemonId - ID of the Pokemon to display
 * @returns {void}
 */
function renderOverlayFromFilter(pokemonId) {
  let i = pokemonArray.findIndex(p => p.id === pokemonId);
  if (i !== -1) {
    renderOverlay(i);
  }
}

/**
 * Toggles between light and dark theme
 * Updates theme icon and saves preference to localStorage
 * @function toggleTheme
 * @returns {void}
 */
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.querySelector('.theme-icon');
  
  if (body.classList.contains('light-theme')) {
    // Switch to dark theme
    body.classList.remove('light-theme');
    themeIcon.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  } else {
    // Switch to light theme
    body.classList.add('light-theme');
    themeIcon.textContent = '☀️';
    localStorage.setItem('theme', 'light');
  }
}

/**
 * Initializes the theme based on saved localStorage preference
 * Sets theme and icon on page load
 * @function initializeTheme
 * @returns {void}
 */
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const body = document.body;
  const themeIcon = document.querySelector('.theme-icon');
  
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeIcon.textContent = '☀️';
  } else {
    body.classList.remove('light-theme');
    themeIcon.textContent = '🌙';
  }
}

/**
 * Event listener to initialize theme when DOM content is loaded
 */
document.addEventListener('DOMContentLoaded', initializeTheme);
