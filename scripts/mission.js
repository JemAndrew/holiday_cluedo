// mission.js - Handles the secret assignment display per player

let players = JSON.parse(localStorage.getItem("holidayCluedoPlayers")) || [];
let weapons = JSON.parse(localStorage.getItem("holidayCluedoWeapons")) || [];
let locations = JSON.parse(localStorage.getItem("holidayCluedoLocations")) || [];

let currentPlayerIndex = 0;

window.onload = () => {
  const revealButton = document.getElementById("reveal-button");
  const missionConfirmButton = document.getElementById("mission-confirm-button");

  if (!players.length || !weapons.length || !locations.length) {
    document.body.innerHTML = "<h2>Mission data missing. Please restart the game from the beginning.</h2>";
    return;
  }

  revealButton.addEventListener("click", () => {
    revealMission();
  });

  missionConfirmButton.addEventListener("click", () => {
    currentPlayerIndex++;

    if (currentPlayerIndex >= players.length) {
      document.body.innerHTML = `<h1>GAME WON 🎉</h1><p>Well done, ${players[players.length - 1].name}!</p><button onclick='location.href="index.html"'>Restart Game</button>`;
    } else {
      prepareNextPlayer();
    }
  });

  prepareNextPlayer();
};

function prepareNextPlayer() {
  document.getElementById("mission-details").style.display = "none";
  document.getElementById("instructions").style.display = "block";
  document.getElementById("pass-instruction").textContent = `Pass the phone to ${players[currentPlayerIndex].name}`;
}

function revealMission() {
  const player = players[currentPlayerIndex];
  const weapon = weapons[currentPlayerIndex];
  const location = locations[currentPlayerIndex];

  document.getElementById("target-name").textContent = player.target;
  document.getElementById("target-weapon").textContent = weapon;
  document.getElementById("target-location").textContent = location;

  document.getElementById("instructions").style.display = "none";
  document.getElementById("mission-details").style.display = "block";
}
