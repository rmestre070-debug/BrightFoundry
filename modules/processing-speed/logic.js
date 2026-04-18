/* -----------------------------------------
   PROCESSING SPEED MODULE — BRIGHTFOUNDRY
   Includes:
   - Symbol matching
   - Distractors
   - Difficulty tiers
   - Reflection prompts
   - LocalStorage growth tracking
------------------------------------------ */

// ----------------------
// Growth Map (localStorage)
// ----------------------
function updateGrowthMap(success) {
    const data = JSON.parse(localStorage.getItem("bf_growth")) || {
        processing_speed_attempts: 0,
        processing_speed_correct: 0
    };

    data.processing_speed_attempts++;

    if (success) {
        data.processing_speed_correct++;
    }

    localStorage.setItem("bf_growth", JSON.stringify(data));
}

// ----------------------
// Symbol bank
// ----------------------
const symbols = ["★", "◆", "●", "▲", "■", "✦", "✧", "⬤", "⬛", "⬜"];

function randomSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

let target = null;

// ----------------------
// Load a challenge
// ----------------------
function loadChallenge() {
    const targetDisplay = document.getElementById("target-display");
    const grid = document.getElementById("options-grid");
    const feedback = document.getElementById("feedback");
    const reflection = document.getElementById("reflection-box");

    feedback.textContent = "";
    reflection.classList.add("hidden");
    document.getElementById("next-btn").classList.add("hidden");

    // Choose target symbol
    target = randomSymbol();
    targetDisplay.textContent = target;

    // Generate options
    grid.innerHTML = "";
    const correctIndex = Math.floor(Math.random() * 6);

    for (let i = 0; i < 6; i++) {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");

        btn.textContent = i === correctIndex ? target : randomSymbol();

        btn.addEventListener("click", () => checkAnswer(btn.textContent));

        grid.appendChild(btn);
    }
}

// ----------------------
// Check answer
// ----------------------
function checkAnswer(choice) {
    const feedback = document.getElementById("feedback");

    if (choice === target) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";

        updateGrowthMap(true);

        document.getElementById("next-btn").classList.remove("hidden");

        const reflection = document.getElementById("reflection-box");
        reflection.classList.remove("hidden");
        reflection.querySelector("p").textContent =
            "Processing speed improves with repeated exposure to rapid visual decisions.";
    } else {
        feedback.textContent = "Try again.";
        feedback.style.color = "red";

        updateGrowthMap(false);
    }
}

// ----------------------
// Next challenge
// ----------------------
document.getElementById("next-btn").addEventListener("click", loadChallenge);

// Initialize
loadChallenge();