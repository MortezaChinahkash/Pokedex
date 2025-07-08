function updateOverlayHTMLTemplate(i, pokeTypeBg){
    return  `
    <div class="overlay_innerwindow" id="overlayInnerWindow" onclick="event.stopPropagation()">
        <div class="overlay_header">
            <div class="d_flex flex_y_center stats_button">
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
          <button onclick="playScream(${i})" class="btn scream_button">Play Sound</button>
        </div>
        <div class="forward_backward">
        <img class="arrow" onclick="previousPkmn(${i}, '${pokeTypeBg}')" src="./assets/png/arrow_back.png">
          <p>${pokemonArray[i].id} of ${pokemonArray.length}</p>
        <img class="arrow" onclick="nextPkmn(${i}, '${pokeTypeBg}')" src="./assets/png/arrow_forward.png">
        </div>
    </div>
`;
}

function renderPkmCardHTMLTemplate(i, typeID, pokeCardIndex){
    return  `
    <div onclick="renderOverlay(${i})" id="${pokeCardIndex}" class="poke_card">
        <p>ID:  #${pokemonArray[i].id}</p>
        <h3>${pokemonArray[i].name}</h3>
        <img src=${pokemonArray[i].sprites.other.showdown.front_shiny}>
        <div class="type_text" id="${typeID}"></div>
    </div>`;
}

function renderGeneralStatsHTMLTemplate(i, formattedWeight) {
    return  `
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

function renderProgressbarHTMLTemplate(statName, baseValue, maxValue) {
    return  `
    <div class="progress_bar_container">
      <span class="stat-label">${capitalize(
        statName
      )}: ${baseValue} / ${maxValue}</span>
      <div id="${statName}-bar" class="progress_bar"></div>
    </div>`;
}

function findPokemonHTMLTemplate(p, cardId, typeId) {
    return `
          <div onclick="renderOverlayFromFilter(${p.id})" id="${cardId}" class="poke_card">
              <p>ID:  #${p.id}</p>
              <h3>${p.name}</h3>
              <img src="${p.sprites.other.showdown.front_shiny}">
              <div class="type_text" id="${typeId}"></div>
          </div>`;
}