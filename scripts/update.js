// update.js (Fixed for final victory!)

let players = JSON.parse(localStorage.getItem("holidayCluedoPlayers")) || [];
let killerName = localStorage.getItem("lastKiller");
let killer = players.find(p => p.name === killerName);

let stage = "pass"; // "pass" or "reveal"

function loadUpdate() {
  const instructionText = document.getElementById("instruction-text");
  const missionDetails = document.getElementById("mission-details");

  if (!killer) {
    window.location.href = "game.html";
    return;
  }

  if (players.length === 1) {
    // 🎉 Victory state
    instructionText.textContent = `🎉 GAME WON! WELL DONE, ${killer.name}! 🎉`;
    missionDetails.style.display = "none";
    document.querySelector("button").textContent = "Play Again";
    document.querySelector("button").onclick = () => {
      localStorage.removeItem("holidayCluedoPlayers");
      localStorage.removeItem("lastKiller");
      window.location.href = "index.html";
    };
    return;
  }

  if (stage === "pass") {
    instructionText.textContent = `Pass the phone to ${killer.name}.`;
    missionDetails.style.display = "none";
  } else if (stage === "reveal") {
    instructionText.textContent = `Mission Update for ${killer.name}`;
    document.getElementById("target-name").textContent = killer.target;
    document.getElementById("target-weapon").textContent = killer.weapon;
    document.getElementById("target-location").textContent = killer.location;
    missionDetails.style.display = "block";
  }
}

function handleConfirm() {
  if (players.length === 1) {
    // Game is already won, return to start
    localStorage.removeItem("holidayCluedoPlayers");
    localStorage.removeItem("lastKiller");
    window.location.href = "index.html";
    return;
  }

  if (stage === "pass") {
    stage = "reveal";
    loadUpdate();
  } else if (stage === "reveal") {
    window.location.href = "game.html";
  }
}

window.onload = loadUpdate;
