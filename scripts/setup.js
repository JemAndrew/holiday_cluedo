let totalPlayers = 0;
let weapons = [];
let locations = [];
let playerNames = [];

// Step 1: Confirm player count
function confirmPlayerCount() {
  const input = document.getElementById("player-count-input");
  totalPlayers = parseInt(input.value);

  if (!totalPlayers || totalPlayers < 3) {
    alert("Enter at least 3 players.");
    return;
  }

  document.getElementById("player-count-screen").style.display = "none";
  showWeaponInputs();
}

// Step 2: Show weapon inputs
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

// Step 3: Show location inputs
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
}