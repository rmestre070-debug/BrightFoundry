/* -----------------------------------------
   WORKING MEMORY MODULE — BRIGHTFOUNDRY
   Includes:
   - Digit span (forward/backward)
   - Symbol recall
   - Mini grid memory
   - Difficulty tiers
   - Reflection prompts
   - LocalStorage growth tracking
------------------------------------------ */

// ----------------------
// Growth Map (localStorage)
// ----------------------
function updateGrowthMap(success) {
    const data = JSON.parse(localStorage.getItem("bf_growth")) || {
        working_memory_attempts: 0,
        working_memory_correct: 0
    };

    data.working_memory_attempts++;

    if (success) {
        data.working_memory_correct++;
    }

    localStorage.setItem("bf_growth", JSON.stringify(data));
}

// ----------------------
// Challenge Bank
// ----------------------

// Generate random digits
function randomDigits(n) {
    return Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");
}

// Generate random symbols
function randomSymbols(n) {
    const symbols = ["★", "◆", "●", "▲", "■", "✦", "✧"];
    return Array.from({ length: n }, () => symbols[Math.floor(Math.random() * symbols.length)]).join(" ");
}

// Grid memory (3x3)
function randomGrid() {
    const grid = Array(9).fill("⬜");
    const filled = Math.floor(Math.random() * 3) + 2; // 2–4 filled squares
    for (let i = 0; i < filled; i++) {
        const idx = Math.floor(Math.random() * 9);
        grid[idx] = "⬛";
    }
    return grid.join("");
}

const challenges = [
    {
        type: "digits-forward",
        generate: () => randomDigits(4),
        transform: x => x,
        rule: "Recall the digits in the same order.",
        difficulty: "easy"
    },
    {
        type: "digits-backward",
        generate: () => randomDigits(4),
        transform: x => x.split("").reverse().join(""),
        rule: "Reverse the digits before answering.",
        difficulty: "medium"
    },
    {
        type: "symbols",
        generate: () => randomSymbols(5),
        transform: x => x,
        rule: "Recall the sequence of symbols.",
        difficulty: "easy"
    },
    {
        type: "grid",
        generate: () => randomGrid(),
        transform: x => x,
        rule: "Recall the pattern of filled squares.",
        difficulty: "hard"
    }
];

let currentChallenge = null;
let correctAnswer = null;

// ----------------------
// Load a challenge
// ----------------------
function loadChallenge() {
    currentChallenge = challenges[Math.floor(Math.random() * challenges.length)];

    const display = document.getElementById("memory-display");
    const inputArea = document.getElementById("input-area");
    const feedback = document.getElementById("feedback");
    const reflection = document.getElementById("reflection-box");

    feedback.textContent = "";
    reflection.classList.add("hidden");
    document.getElementById("next-btn").classList.add("hidden");
    document.getElementById("user-answer").value = "";

    const raw = currentChallenge.generate();
    correctAnswer = currentChallenge.transform(raw);

    display.textContent = raw;
    inputArea.classList.add("hidden");

    // Hide after 2 seconds
    setTimeout(() => {
        display.textContent = "Now enter what you remember.";
        inputArea.classList.remove("hidden");
    }, 2000);
}

// ----------------------
// Submit Answer
// ----------------------
document.getElementById("submit-btn").addEventListener("click", () => {
    const userAnswer = document.getElementById("user-answer").value.trim();
    const feedback = document.getElementById("feedback");

    if (userAnswer === correctAnswer) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";

        updateGrowthMap(true);

        document.getElementById("next-btn").classList.remove("hidden");

        const reflection = document.getElementById("reflection-box");
        reflection.classList.remove("hidden");
        reflection.querySelector("p").textContent =
            `Strategy: ${currentChallenge.rule}`;
    } else {
        feedback.textContent = "Not quite — try again.";
        feedback.style.color = "red";

        updateGrowthMap(false);
    }
});

// ----------------------
// Next Challenge
// ----------------------
document.getElementById("next-btn").addEventListener("click", loadChallenge);

// Initialize
loadChallenge();