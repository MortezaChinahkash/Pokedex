/**
 * Utility functions for the Pokemon application
 */

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
 * Formats Pokemon weight for display
 * @function formatWeight
 * @param {number} weight - Raw weight value from API
 * @returns {string} Formatted weight string with decimal
 */
function formatWeight(weight) {
  let weightString = weight.toString();
  return weightString.slice(0, weightString.length - 1) + "," + weightString.slice(-1);
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
