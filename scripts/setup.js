// setup.js (Handles secret player-by-player entry)

let players = [];
let currentPlayerIndex = 1;
let totalPlayers = 0;

function confirmPlayerCount() {
  const countInput = document.getElementById("player-count-input");
  totalPlayers = parseInt(countInput.value);

  if (!totalPlayers || totalPlayers < 3) {
    alert("Please enter a valid number of players (minimum 3). ");
    return;
  }

  document.getElementById("player-count-container").style.display = "none";
  document.getElementById("player-setup-container").style.display = "block";

  updatePlayerCountText();
}

function updatePlayerCountText() {
  const playerText = document.getElementById("player-count-text");
  playerText.textContent = `Player ${currentPlayerIndex}: Enter your details`;
}

function submitPlayer() {
  const nameInput = document.getElementById("player-name");
  const weaponInput = document.getElementById("player-weapon");
  const locationInput = document.getElementById("player-location");

  const name = nameInput.value.trim();
  const weapon = weaponInput.value.trim();
  const location = locationInput.value.trim();

  if (!name || !weapon || !location) {
    alert("Please fill in all fields!");
    return;
  }

  players.push({ name, weapon, location });

  // Reset inputs for next player
  nameInput.value = "";
  weaponInput.value = "";
  locationInput.value = "";

  if (currentPlayerIndex >= totalPlayers) {
    shufflePlayers(players);
    assignTargets(players);
    localStorage.setItem("holidayCluedoPlayers", JSON.stringify(players));
    window.location.href = "mission.html";
  } else {
    currentPlayerIndex++;
    updatePlayerCountText();
  }
}

function shufflePlayers(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function assignTargets(players) {
  players.forEach((player, index) => {
    const targetPlayer = players[(index + 1) % players.length];
    player.target = targetPlayer.name;
  });
}

// Clean up previous game data on load
window.onload = () => {
  localStorage.removeItem("holidayCluedoPlayers");
};
document.getElementById("confirm-player-count").onclick = confirmPlayerCount;
document.getElementById("submit-player").onclick = submitPlayer;