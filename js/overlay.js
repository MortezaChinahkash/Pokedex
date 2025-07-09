/**
 * Pokemon overlay and modal functions
 */

/**
 * Opens the Pokemon detail overlay modal
 * @function renderOverlay
 * @param {number} i - Index of the Pokemon in the pokemonArray
 * @returns {void}
 */
function renderOverlay(i) {
  window.scrollPositionBeforeOverlay = window.scrollY;
  let pokeTypeBg = pokemonArray[i].types[0].type.name;
  showOverlayElements();
  updateOverlay(i, pokeTypeBg);
}

/**
 * Shows overlay elements and adds classes
 * @function showOverlayElements
 * @returns {void}
 */
function showOverlayElements() {
  document.getElementById("dialogueWindow").classList.add("overlay");
  document.body.classList.add("no_scroll");
  document.getElementById("dialogueWindow").classList.remove("d_none");
}

/**
 * Updates the overlay content with Pokemon details
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
 * @function closeOverlay
 * @returns {void}
 */
function closeOverlay() {
  hideOverlayElements();
  restoreScrollPosition();
}

/**
 * Hides overlay elements and removes classes
 * @function hideOverlayElements
 * @returns {void}
 */
function hideOverlayElements() {
  document.getElementById("dialogueWindow").classList.remove("overlay");
  document.body.classList.remove("no_scroll");
  document.getElementById("dialogueWindow").classList.add("d_none");
  document.getElementById("overlayInnerWindow").classList.add("d_none");
}

/**
 * Restores the original scroll position
 * @function restoreScrollPosition
 * @returns {void}
 */
function restoreScrollPosition() {
  if (window.scrollPositionBeforeOverlay !== undefined) {
    window.scrollTo(0, window.scrollPositionBeforeOverlay);
    window.scrollPositionBeforeOverlay = undefined;
  }
}

/**
 * Applies background type styling to the overlay
 * @function addTypeBgOverlay
 * @param {HTMLElement} overlayBg - Overlay background element
 * @param {string} pokeTypeBg - Pokemon type for background styling
 * @returns {void}
 */
function addTypeBgOverlay(overlayBg, pokeTypeBg) {
  if (overlayBg && pokeTypeBg) {
    setOverlayBackgroundImage(overlayBg, pokeTypeBg);
    updateOverlayTypeClass(overlayBg, pokeTypeBg);
  }
}

/**
 * Sets the background image for overlay
 * @function setOverlayBackgroundImage
 * @param {HTMLElement} overlayBg - Overlay background element
 * @param {string} pokeTypeBg - Pokemon type
 * @returns {void}
 */
function setOverlayBackgroundImage(overlayBg, pokeTypeBg) {
  const imagePath = `./assets/img/poke_card_bg/${pokeTypeBg}.png`;
  overlayBg.style.backgroundImage = `url('${imagePath}')`;
  overlayBg.style.backgroundSize = "cover";
  overlayBg.style.backgroundRepeat = "no-repeat";
  overlayBg.style.backgroundPosition = "center";
}

/**
 * Updates the type class for overlay
 * @function updateOverlayTypeClass
 * @param {HTMLElement} overlayBg - Overlay background element
 * @param {string} pokeTypeBg - Pokemon type
 * @returns {void}
 */
function updateOverlayTypeClass(overlayBg, pokeTypeBg) {
  const typePattern = /\b(normal|fire|water|electric|grass|ice|fighting|poison|ground|flying|psychic|bug|rock|ghost|dragon|dark|steel|fairy)\b/g;
  overlayBg.className = overlayBg.className.replace(typePattern, '');
  overlayBg.classList.add(pokeTypeBg);
}

/**
 * Navigates to the previous Pokemon in the overlay
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
 * Adds Pokemon type icons to the overlay
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
 * @function playScream
 * @param {number} i - Index of the Pokemon in the pokemonArray
 * @returns {void}
 */
function playScream(i) {
  let scream = pokemonArray[i].cries.latest;
  let cry = new Audio(scream);
  cry.play();
}
