// setup.js - Complete setup flow: Player Count → Weapons → Locations → Random Assignment

let totalPlayers = 0;
let playerNames = [];
let weapons = [];
let locations = [];

// Step 1: Player Count
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

// Step 2: Player Names
function showNameInputs() {
  const container = document.getElementById("player-name-inputs");
  container.innerHTML = "";

  for (let i = 0; i < totalPlayers; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Player ${i + 1} name`;
    input.classList.add("player-name-input");
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
  }

  document.getElementById("player-names-screen").style.display = "block";
}

function confirmPlayerNames() {
  const inputs = document.querySelectorAll(".player-name-input");
  playerNames = Array.from(inputs).map(input => input.value.trim());

  const nameSet = new Set(playerNames);
  if (playerNames.includes("") || nameSet.size !== playerNames.length) {
    alert("Enter unique names for all players!");
    return;
  }

  document.getElementById("player-names-screen").style.display = "none";
  showWeaponInputs();
}

// Step 3: Weapons
function showWeaponInputs() {
  const container = document.getElementById("weapon-inputs");
  container.innerHTML = "";

  for (let i = 0; i < totalPlayers; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Weapon ${i + 1}`;
    input.classList.add("weapon-input");
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
  }

  document.getElementById("weapons-screen").style.display = "block";
}

function confirmWeapons() {
  const inputs = document.querySelectorAll(".weapon-input");
  weapons = Array.from(inputs).map(input => input.value.trim());

  if (weapons.includes("")) {
    alert("Fill in all weapons!");
    return;
  }

  document.getElementById("weapons-screen").style.display = "none";
  showLocationInputs();
}

// Step 4: Locations
function showLocationInputs() {
  const container = document.getElementById("location-inputs");
  container.innerHTML = "";

  for (let i = 0; i < totalPlayers; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Location ${i + 1}`;
    input.classList.add("location-input");
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
  }

  document.getElementById("locations-screen").style.display = "block";
}

function confirmLocations() {
  const inputs = document.querySelectorAll(".location-input");
  locations = Array.from(inputs).map(input => input.value.trim());

  if (locations.includes("")) {
    alert("Fill in all locations!");
    return;
  }

  // Create players and randomly assign everything
  createPlayersWithRandomAssignments();
  
  // Save to localStorage and proceed to mission briefing
  localStorage.setItem("holidayCluedoPlayers", JSON.stringify(players));
  window.location.href = "game.html";
}

// Step 5: Random Assignment
function createPlayersWithRandomAssignments() {
  // Shuffle all arrays
  const shuffledNames = shuffle([...playerNames]);
  const shuffledWeapons = shuffle([...weapons]);
  const shuffledLocations = shuffle([...locations]);
  
  // Create players with random weapons and locations
  window.players = shuffledNames.map((name, index) => ({
    name: name,
    weapon: shuffledWeapons[index],
    location: shuffledLocations[index],
    target: null // Will be assigned next
  }));

  // Randomly assign targets (each player gets a random other player as target)
  assignRandomTargets(window.players);
}

function assignRandomTargets(players) {
  const availableTargets = [...players];
  
  players.forEach(player => {
    // Remove self from available targets
    const possibleTargets = availableTargets.filter(target => target.name !== player.name);
    
    // Pick random target
    const randomIndex = Math.floor(Math.random() * possibleTargets.length);
    const chosenTarget = possibleTargets[randomIndex];
    
    player.target = chosenTarget.name;
    
    // Remove chosen target from available targets so no one gets assigned the same target
    const targetIndex = availableTargets.findIndex(t => t.name === chosenTarget.name);
    availableTargets.splice(targetIndex, 1);
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Clean up previous game data on load
window.onload = () => {
  localStorage.clear();
};