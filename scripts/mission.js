// missions.js (Handles private mission reveal flow)

let players = JSON.parse(localStorage.getItem("holidayCluedoPlayers")) || [];
let currentMissionIndex = 0;
let stage = "pass"; // "pass" or "reveal"

function loadMission() {
  if (currentMissionIndex >= players.length) {
    window.location.href = "game.html";
    return;
  }

  const instructionText = document.getElementById("instruction-text");
  const missionDetails = document.getElementById("mission-details");
  const currentPlayer = players[currentMissionIndex];

  if (stage === "pass") {
    instructionText.textContent = `Pass the phone to ${currentPlayer.name}.`;
    missionDetails.style.display = "none";
  } else if (stage === "reveal") {
    instructionText.textContent = `Mission for ${currentPlayer.name}`;
    document.getElementById("target-name").textContent = currentPlayer.target;
    document.getElementById("target-weapon").textContent = currentPlayer.weapon;
    document.getElementById("target-location").textContent = currentPlayer.location;
    missionDetails.style.display = "block";
  }
}

function handleConfirm() {
  if (stage === "pass") {
    stage = "reveal";
    loadMission();
  } else if (stage === "reveal") {
    stage = "pass";
    currentMissionIndex++;
    loadMission();
  }
}

window.onload = loadMission;
