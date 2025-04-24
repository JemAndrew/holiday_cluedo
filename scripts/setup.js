// Updated setup.js: Player Count ➜ Player Names ➜ Weapons ➜ Locations ➜ Mission

let totalPlayers = 0;
let playerNames = [];
let weapons = [];
let locations = [];

// Step 1: Confirm player count
function confirmPlayerCount() {
  const input = document.getElementById("player-count-input");
  totalPlayers = parseInt(input.value);

  if (!totalPlayers || totalPlayers < 3) {
    alert("Enter at least 3 players.");
    return;
  }

  document.getElementById("player-count-screen").style.display = "none";
  showNameInputs();
}

// Step 2: Player names
function showNameInputs() {
  const container = document.getElementById("player-name-inputs");
  container.innerHTML = "";

  for (let i = 0; i < totalPlayers; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Player ${i + 1} name`;
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
  }

  document.getElementById("player-names-screen").style.display = "block";
}

function confirmPlayerNames() {
  const inputs = document.querySelectorAll("#player-name-inputs input");
  playerNames = Array.from(inputs).map(input => input.value.trim());

  const nameSet = new Set(playerNames);
  if (playerNames.includes("") || nameSet.size !== playerNames.length) {
    alert("Enter unique names for all players!");
    return;
  }

  document.getElementById("player-names-screen").style.display = "none";
  showWeaponInputs();
}

// Step 3: Show weapon inputs
function showWeaponInputs() {
  const container = document.getElementById("weapon-inputs");
  container.innerHTML = "";

  for (let i = 0; i < totalPlayers; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Weapon ${i + 1}`;
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
  }

  document.getElementById("weapons-screen").style.display = "block";
}

function confirmWeapons() {
  const inputs = document.querySelectorAll("#weapon-inputs input");
  weapons = Array.from(inputs).map(input => input.value.trim());

  if (weapons.includes("")) {
    alert("Fill in all weapons!");
    return;
  }

  document.getElementById("weapons-screen").style.display = "none";
  showLocationInputs();
}

// Step 4: Show location inputs
function showLocationInputs() {
  const container = document.getElementById("location-inputs");
  container.innerHTML = "";

  for (let i = 0; i < totalPlayers; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Location ${i + 1}`;
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
  }

  document.getElementById("locations-screen").style.display = "block";
}

function confirmLocations() {
  const inputs = document.querySelectorAll("#location-inputs input");
  locations = Array.from(inputs).map(input => input.value.trim());

  if (locations.includes("")) {
    alert("Fill in all locations!");
    return;
  }

  const players = playerNames.map(name => ({ name }));
  shuffle(players);
  assignTargets(players);

  localStorage.setItem("holidayCluedoPlayers", JSON.stringify(players));
  localStorage.setItem("holidayCluedoWeapons", JSON.stringify(shuffle([...weapons])));
  localStorage.setItem("holidayCluedoLocations", JSON.stringify(shuffle([...locations])));

  window.location.href = "mission.html";
}

function assignTargets(players) {
  players.forEach((player, i) => {
    const target = players[(i + 1) % players.length];
    player.target = target.name;
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

window.onload = () => {
  localStorage.clear();
};
