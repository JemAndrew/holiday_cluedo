// game.js (Updated to kill clicked player and go to update screen)

let players = JSON.parse(localStorage.getItem("holidayCluedoPlayers")) || [];

function renderGame() {
  const container = document.getElementById("game-container");
  container.innerHTML = "";

  if (players.length === 1) {
    document.getElementById("victory-message").style.display = "block";
    container.style.display = "none";
    return;
  }

  players.forEach(player => {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("player-entry");

    playerDiv.innerHTML = `
      <strong>${player.name}</strong><br>
      <button onclick="killPlayer('${player.name}')">Killed</button>
    `;

    container.appendChild(playerDiv);
  });
}

function killPlayer(victimName) {
  const victim = players.find(p => p.name === victimName);

  if (!victim) return;

  // Find who is assigned to kill the victim
  const killer = players.find(p => p.target === victim.name);

  if (!killer) {
    alert("Error: Killer not found!");
    return;
  }

  // Killer inherits victim's target, weapon, and location
  killer.target = victim.target;
  killer.weapon = victim.weapon;
  killer.location = victim.location;

  // Remove victim from players
  players = players.filter(p => p.name !== victim.name);

  // Save updated state
  localStorage.setItem("holidayCluedoPlayers", JSON.stringify(players));

  // Store killer's name for update screen
  localStorage.setItem("lastKiller", killer.name);

  // Go to update screen
  window.location.href = "update.html";
}

function restartGame() {
  localStorage.removeItem("holidayCluedoPlayers");
  localStorage.removeItem("lastKiller");
  window.location.href = "index.html";
}

window.onload = renderGame;
document.getElementById("restart-button").onclick = restartGame;
document.getElementById("victory-message").style.display = "none";