const game = () => {
  let pScore = 0;
  let cScore = 0;

  // ── Start the Game ──────────────────────────────────────────────
  const startGame = () => {
    const playBtn     = document.getElementById("play-btn");
    const introScreen = document.getElementById("intro");
    const match       = document.getElementById("match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.remove("fadeIn");
      introScreen.classList.add("fadeOut");

      // Wait for intro fade-out before showing match
      setTimeout(() => {
        match.classList.remove("fadeOut");
        match.classList.add("fadeIn");
      }, 400);
    });
  };

  // ── Play a Round ─────────────────────────────────────────────────
  const playMatch = () => {
    const optionBtns  = document.querySelectorAll(".option-btn");
    const playerHand  = document.getElementById("player-hand");
    const computerHand = document.getElementById("computer-hand");
    const resetBtn    = document.getElementById("reset-btn");
    const computerOptions = ["rock", "paper", "scissors"];

    // Clear hand animation after it ends
    [playerHand, computerHand].forEach(hand => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    // Option buttons click handler
    optionBtns.forEach(btn => {
      btn.addEventListener("click", function () {
        // Prevent clicking during animation
        setButtonsDisabled(true);

        const playerChoice   = this.dataset.choice;
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        // Trigger shake animations
        playerHand.style.animation   = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";

        // Show winner message after animation
        setTimeout(() => {
          playerHand.src   = `./assets/${playerChoice}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
          compareHands(playerChoice, computerChoice);
          setButtonsDisabled(false);
        }, 2000);
      });
    });

    // Reset button
    resetBtn.addEventListener("click", () => {
      pScore = 0;
      cScore = 0;
      updateScore();
      setWinnerText("Choose your move", "");
      playerHand.src   = "./assets/rock.png";
      computerHand.src = "./assets/rock.png";
    });
  };

  // ── Helpers ──────────────────────────────────────────────────────
  const setButtonsDisabled = (disabled) => {
    document.querySelectorAll(".option-btn").forEach(btn => {
      btn.disabled = disabled;
    });
  };

  const updateScore = () => {
    document.getElementById("player-score").textContent   = pScore;
    document.getElementById("computer-score").textContent = cScore;
  };

  const setWinnerText = (message, type) => {
    const winner = document.getElementById("winner-text");
    winner.textContent = message;
    winner.className = "winner"; // reset classes
    if (type) winner.classList.add(type);
  };

  // ── Compare Hands ────────────────────────────────────────────────
  const compareHands = (playerChoice, computerChoice) => {
    // Tie
    if (playerChoice === computerChoice) {
      setWinnerText("It's a Tie! 🤝", "tie");
      return;
    }

    const winsAgainst = {
      rock:     "scissors",
      paper:    "rock",
      scissors: "paper",
    };

    if (winsAgainst[playerChoice] === computerChoice) {
      setWinnerText(`${cap(playerChoice)} beats ${cap(computerChoice)} — You Win! 🎉`, "player-win");
      pScore++;
    } else {
      setWinnerText(`${cap(computerChoice)} beats ${cap(playerChoice)} — CPU Wins! 🤖`, "computer-win");
      cScore++;
    }

    updateScore();
  };

  const cap = str => str.charAt(0).toUpperCase() + str.slice(1);

  // ── Init ─────────────────────────────────────────────────────────
  startGame();
  playMatch();
};

game();