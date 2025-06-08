// game.js - Complete game flow: Mission Briefing → Game On → Victory

let players = JSON.parse(localStorage.getItem("holidayCluedoPlayers")) || [];

// Game state management
let gamePhase = "briefing"; // "briefing", "gameOn", "victory"
let currentPlayerIndex = 0;
let briefingStage = "pass"; // "pass" or "reveal"

function initializeGame() {
  if (!players.length) {
    alert("No player data found. Redirecting to setup...");
    window.location.href = "index.html";
    return;
  }

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
    case "gameOn":
      renderGameOnPhase(container);
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

function renderGameOnPhase(container) {
  container.innerHTML = `
    <div class="game-on-screen">
      <h2>🎯 GAME ON! 🎯</h2>
      <p>Players click "Dead" next to your name when eliminated:</p>
      <div class="players-list">
        ${players.map(player => `
          <div class="player-card">
            <span class="player-name">${player.name}</span>
            <span class="health-indicator">💚 Alive</span>
            <button class="dead-btn" onclick="playerDead('${player.name}')">Dead</button>
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
      <h2>VICTORY</h2>
      <p>${winner.name}</p>
      <button onclick="restartGame()">Play Again</button>
    </div>
  `;
}

// Mission briefing functions
function showPlayerMission() {
  briefingStage = "reveal";
  renderCurrentPhase();
}

function completeBriefing() {
  currentPlayerIndex++;
  
  if (currentPlayerIndex >= players.length) {
    // All players have been briefed - move to Game On phase
    gamePhase = "gameOn";
    renderCurrentPhase();
  } else {
    // Move to next player's briefing
    briefingStage = "pass";
    renderCurrentPhase();
  }
}

// Game On phase functions
function playerDead(victimName) {
  const victimIndex = players.findIndex(p => p.name === victimName);
  const victim = players[victimIndex];
  
  if (!victim) return;

  // Find who had this victim as their target (the killer)
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

  // Show killer celebration
  showKillerCelebration(killer.name, victimName);
}

function showKillerCelebration(killerName, victimName) {
  const container = document.getElementById("game-container");
  container.innerHTML = `
    <div class="celebration-screen">
      <h2>🎯 ELIMINATION! 🎯</h2>
      <p><strong>Congratulations for killing ${victimName}!</strong></p>
      <p><strong>You have done well, ${killerName}!</strong></p>
      <button onclick="showKillerUpdate('${killerName}')">Confirm</button>
    </div>
  `;
}

function showKillerUpdate(killerName) {
  const killer = players.find(p => p.name === killerName);
  const container = document.getElementById("game-container");
  
  container.innerHTML = `
    <div class="update-screen">
      <h2>Your Updated Mission, ${killerName}</h2>
      <div class="mission-details">
        <p><strong>New Target:</strong> ${killer.target}</p>
        <p><strong>Weapon:</strong> ${killer.weapon}</p>
        <p><strong>Location:</strong> ${killer.location}</p>
      </div>
      <button onclick="returnToGameOn()">Got it - Continue Game</button>
    </div>
  `;
}

function returnToGameOn() {
  gamePhase = "gameOn";
  renderCurrentPhase();
}

function restartGame() {
  localStorage.clear();
  window.location.href = "index.html";
}

// Initialize game when page loads
window.onload = initializeGame;