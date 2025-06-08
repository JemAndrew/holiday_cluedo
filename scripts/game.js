// game.js - Complete game flow management

let players = JSON.parse(localStorage.getItem("holidayCluedoPlayers")) || [];
let weapons = JSON.parse(localStorage.getItem("holidayCluedoWeapons")) || [];
let locations = JSON.parse(localStorage.getItem("holidayCluedoLocations")) || [];

// Game state management
let gamePhase = "briefing"; // "briefing", "elimination", "victory"
let currentPlayerIndex = 0;
let briefingStage = "pass"; // "pass" or "reveal"

function initializeGame() {
  // Assign weapons and locations to players
  players.forEach((player, index) => {
    player.weapon = weapons[index];
    player.location = locations[index];
  });
  
  // Save updated player data
  localStorage.setItem("holidayCluedoPlayers", JSON.stringify(players));
  
  // Start with briefing phase
  gamePhase = "briefing";
  currentPlayerIndex = 0;
  briefingStage = "pass";
  
  renderCurrentPhase();
}

function renderCurrentPhase() {
  const container = document.getElementById("game-container");
  container.innerHTML = "";

  switch (gamePhase) {
    case "briefing":
      renderBriefingPhase(container);
      break;
    case "elimination":
      renderEliminationPhase(container);
      break;
    case "victory":
      renderVictoryPhase(container);
      break;
  }
}

function renderBriefingPhase(container) {
  const currentPlayer = players[currentPlayerIndex];
  
  if (briefingStage === "pass") {
    // Show "Pass phone to player" screen
    container.innerHTML = `
      <div class="briefing-screen">
        <h2>Mission Briefing</h2>
        <p>Pass the phone to <strong>${currentPlayer.name}</strong></p>
        <button onclick="showPlayerMission()">Confirm</button>
      </div>
    `;
  } else if (briefingStage === "reveal") {
    // Show player's mission details
    container.innerHTML = `
      <div class="briefing-screen">
        <h2>Your Mission, ${currentPlayer.name}</h2>
        <div class="mission-details">
          <p><strong>Target:</strong> ${currentPlayer.target}</p>
          <p><strong>Weapon:</strong> ${currentPlayer.weapon}</p>
          <p><strong>Location:</strong> ${currentPlayer.location}</p>
        </div>
        <button onclick="completeBriefing()">Got it - Pass Phone</button>
      </div>
    `;
  }
}

function renderEliminationPhase(container) {
  container.innerHTML = `
    <div class="elimination-screen">
      <h2>Active Players</h2>
      <p>Click "Eliminated" when a player has been successfully eliminated:</p>
      <div class="players-list">
        ${players.map(player => `
          <div class="player-card">
            <span class="player-name">${player.name}</span>
            <button class="eliminate-btn" onclick="eliminatePlayer('${player.name}')">Eliminated</button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderVictoryPhase(container) {
  const winner = players[0];
  container.innerHTML = `
    <div class="victory-screen">
      <h2>🎉 Victory! 🎉</h2>
      <p><strong>${winner.name}</strong> is the last player standing!</p>
      <button onclick="restartGame()">Play Again</button>
    </div>
  `;
}

function showPlayerMission() {
  briefingStage = "reveal";
  renderCurrentPhase();
}

function completeBriefing() {
  currentPlayerIndex++;
  
  if (currentPlayerIndex >= players.length) {
    // All players have been briefed - move to elimination phase
    gamePhase = "elimination";
    renderCurrentPhase();
  } else {
    // Move to next player's briefing
    briefingStage = "pass";
    renderCurrentPhase();
  }
}

function eliminatePlayer(victimName) {
  const victimIndex = players.findIndex(p => p.name === victimName);
  const victim = players[victimIndex];
  
  if (!victim) return;

  // Find who had this victim as their target
  const killerIndex = players.findIndex(p => p.target === victim.name);
  const killer = players[killerIndex];

  if (!killer) {
    alert("Error: No player was assigned to eliminate " + victimName);
    return;
  }

  // Remove victim from players array
  players.splice(victimIndex, 1);

  // Check for victory condition
  if (players.length === 1) {
    gamePhase = "victory";
    localStorage.setItem("holidayCluedoPlayers", JSON.stringify(players));
    renderCurrentPhase();
    return;
  }

  // Killer inherits victim's target, weapon, and location
  killer.target = victim.target;
  killer.weapon = victim.weapon;
  killer.location = victim.location;

  // Save updated game state
  localStorage.setItem("holidayCluedoPlayers", JSON.stringify(players));

  // Show killer their updated mission
  showKillerUpdate(killer);
}

function showKillerUpdate(killer) {
  const container = document.getElementById("game-container");
  container.innerHTML = `
    <div class="update-screen">
      <h2>Mission Update</h2>
      <p>Pass the phone to <strong>${killer.name}</strong></p>
      <button onclick="revealKillerMission('${killer.name}')">Confirm</button>
    </div>
  `;
}

function revealKillerMission(killerName) {
  const killer = players.find(p => p.name === killerName);
  const container = document.getElementById("game-container");
  
  container.innerHTML = `
    <div class="update-screen">
      <h2>Your Updated Mission, ${killer.name}</h2>
      <div class="mission-details">
        <p><strong>New Target:</strong> ${killer.target}</p>
        <p><strong>Weapon:</strong> ${killer.weapon}</p>
        <p><strong>Location:</strong> ${killer.location}</p>
      </div>
      <button onclick="returnToElimination()">Got it - Continue Game</button>
    </div>
  `;
}

function returnToElimination() {
  gamePhase = "elimination";
  renderCurrentPhase();
}

function restartGame() {
  localStorage.removeItem("holidayCluedoPlayers");
  localStorage.removeItem("holidayCluedoWeapons");
  localStorage.removeItem("holidayCluedoLocations");
  localStorage.removeItem("lastKiller");
  window.location.href = "index.html";
}

// Initialize game when page loads
window.onload = () => {
  if (!players.length || !weapons.length || !locations.length) {
    alert("Game data missing. Redirecting to setup...");
    window.location.href = "index.html";
    return;
  }
  
  initializeGame();
};