function removePlayer(button) {
    const container = document.getElementById("players-container");
    if (container.children.length > 3) {
      button.parentElement.remove();
    } else {
      alert("You must have at least 3 players!");
    }
  }
  
  function startGame() {
    const playerEntries = document.querySelectorAll(".player-entry");
    const players = [];
  
    playerEntries.forEach(entry => {
      const name = entry.querySelector(".player").value.trim();
      const weapon = entry.querySelector(".weapon").value.trim();
      const location = entry.querySelector(".location").value.trim();
  
      if (name && weapon && location) {
        players.push({ name, weapon, location });
      }
    });
  
    if (players.length < 3) {
      alert("You need at least 3 players!");
      return;
    }
  
    // Shuffle players
    for (let i = players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [players[i], players[j]] = [players[j], players[i]];
    }
  
    // Assign targets
    players.forEach((player, index) => {
      player.target = players[(index + 1) % players.length].name;
    });
  
    localStorage.setItem("holidayCluedoPlayers", JSON.stringify(players));
    window.location.href = "game.html";
  }