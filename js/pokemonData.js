/**
 * Pokemon data management and API functions
 */

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
 * @async
 * @function fetchUrls
 * @returns {Promise<void>}
 */
async function fetchUrls() {
  showLoadingScreen();
  await loadPokemonBatch(startIndex, lastIndex);
  renderPkmCard();
  hideLoadingScreen();
}

/**
 * Loads a batch of Pokemon from the API
 * @async
 * @function loadPokemonBatch
 * @param {number} start - Start index
 * @param {number} end - End index
 * @returns {Promise<void>}
 */
async function loadPokemonBatch(start, end) {
  for (let i = start; i < end; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let currentJSON = await response.json();
    pokemonArray.push(currentJSON);
  }
}

/**
 * Loads additional Pokemon data from the API
 * @async
 * @function loadMorePokemon
 * @returns {Promise<void>}
 */
async function loadMorePokemon() {
  showLoadingScreen();
  startIndex = lastIndex;
  lastIndex += 20;
  await loadPokemonBatch(startIndex, lastIndex);
  renderPkmCard();
  hideLoadingScreen();
}

/**
 * Wrapper function to load more Pokemon
 * @function addMorePokemon
 * @returns {void}
 */
function addMorePokemon() {
  loadMorePokemon();
}
