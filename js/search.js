/**
 * Search functionality and theme management
 */

/**
 * Searches for Pokemon by name
 * @function findPokemon
 * @returns {void}
 */
function findPokemon() {
  const input = document.getElementById("input").value.toLowerCase();
  const container = document.getElementById("content");
  container.innerHTML = "";
  
  if (input.length === 0) return renderPkmCard();
  if (input.length < 3) return showSearchHint(container, "Please enter at least 3 characters to search.");
  
  const result = pokemonArray.filter(p => p.name.toLowerCase().includes(input));
  if (result.length === 0) {
    showSearchHint(container, "No Pokémon found.");
  } else {
    renderSearchResults(result, container);
  }
}

/**
 * Shows search hint message
 * @function showSearchHint
 * @param {HTMLElement} container - Container element
 * @param {string} message - Message to display
 * @returns {void}
 */
function showSearchHint(container, message) {
  container.innerHTML = `<p class="hint-text">${message}</p>`;
}

/**
 * Renders search results
 * @function renderSearchResults
 * @param {Array} results - Search results array
 * @param {HTMLElement} container - Container element
 * @returns {void}
 */
function renderSearchResults(results, container) {
  results.forEach((p, i) => {
    const cardId = `pokeCard${i}`;
    const typeId = `type-${i}`;
    container.innerHTML += findPokemonHTMLTemplate(p, cardId, typeId);
    addTypesToSearchCard(p, typeId, cardId);
  });
}

/**
 * Adds types to a search result card
 * @function addTypesToSearchCard
 * @param {Object} pokemon - Pokemon object
 * @param {string} typeId - Type container ID
 * @param {string} cardId - Card ID
 * @returns {void}
 */
function addTypesToSearchCard(pokemon, typeId, cardId) {
  const typeContainer = document.getElementById(typeId);
  pokemon.types.forEach(type => {
    typeContainer.innerHTML += `<p>${type.type.name}</p>`;
  });
  addTypeBg(pokemon.types[0].type.name, cardId);
}

/**
 * Opens overlay for a Pokemon from search results
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
 * @function toggleTheme
 * @returns {void}
 */
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.querySelector('.theme-icon');
  
  if (body.classList.contains('light-theme')) {
    setDarkTheme(body, themeIcon);
  } else {
    setLightTheme(body, themeIcon);
  }
}

/**
 * Sets dark theme
 * @function setDarkTheme
 * @param {HTMLElement} body - Body element
 * @param {HTMLElement} themeIcon - Theme icon element
 * @returns {void}
 */
function setDarkTheme(body, themeIcon) {
  body.classList.remove('light-theme');
  themeIcon.textContent = '🌙';
  localStorage.setItem('theme', 'dark');
}

/**
 * Sets light theme
 * @function setLightTheme
 * @param {HTMLElement} body - Body element
 * @param {HTMLElement} themeIcon - Theme icon element
 * @returns {void}
 */
function setLightTheme(body, themeIcon) {
  body.classList.add('light-theme');
  themeIcon.textContent = '☀️';
  localStorage.setItem('theme', 'light');
}

/**
 * Initializes the theme based on saved localStorage preference
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
