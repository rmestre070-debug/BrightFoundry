/* -----------------------------------------
   FLUID REASONING MODULE — BRIGHTFOUNDRY
   Includes:
   - Analogies
   - Logic puzzles
   - Word transformations
   - Difficulty tiers
   - Reflection prompts
   - LocalStorage growth tracking
------------------------------------------ */

// ----------------------
// Growth Map (localStorage)
// ----------------------
function updateGrowthMap(success) {
    const data = JSON.parse(localStorage.getItem("bf_growth")) || {
        fluid_reasoning_attempts: 0,
        fluid_reasoning_correct: 0
    };

    data.fluid_reasoning_attempts++;

    if (success) {
        data.fluid_reasoning_correct++;
    }

    localStorage.setItem("bf_growth", JSON.stringify(data));
}

// ----------------------
// Puzzle Bank
// ----------------------

// Analogies
const analogies = [
    {
        puzzle: "Hand is to glove as foot is to ____",
        answer: "sock",
        rule: "A glove covers a hand; a sock covers a foot.",
        difficulty: "easy"
    },
    {
        puzzle: "Bird is to sky as fish is to ____",
        answer: "water",
        rule: "Birds move through sky; fish move through water.",
        difficulty: "easy"
    },
    {
        puzzle: "Seed is to tree as egg is to ____",
        answer: "bird",
        rule: "Seed becomes tree; egg becomes bird.",
        difficulty: "medium"
    }
];

// Logic puzzles
const logicPuzzles = [
    {
        puzzle: "If all Bloops are Razzies, and all Razzies are Lazzos, are all Bloops Lazzos? (yes/no)",
        answer: "yes",
        rule: "Transitive logic: A→B and B→C implies A→C.",
        difficulty: "medium"
    },
    {
        puzzle: "A farmer has 17 sheep. All but 9 run away. How many remain?",
        answer: "9",
        rule: "‘All but 9’ means 9 remain.",
        difficulty: "easy"
    }
];

// Word transformations
const wordPuzzles = [
    {
        puzzle: "Change ONE letter in 'COLD' to make it the opposite.",
        answer: "warm",
        rule: "COLD → WOLD → WARM (one‑step reasoning).",
        difficulty: "hard"
    },
    {
        puzzle: "What word becomes shorter when you add two letters?",
        answer: "short",
        rule: "SHORT → SHORTER.",
        difficulty: "medium"
    }
];

// Combine all puzzles
const allPuzzles = [...analogies, ...logicPuzzles, ...wordPuzzles];

let currentPuzzle = null;

// ----------------------
// Load a random puzzle
// ----------------------
function loadPuzzle() {
    currentPuzzle = allPuzzles[Math.floor(Math.random() * allPuzzles.length)];

    const display = document.getElementById("puzzle-display");
    const feedback = document.getElementById("feedback");
    const reflection = document.getElementById("reflection-box");

    display.textContent = currentPuzzle.puzzle;
    feedback.textContent = "";
    reflection.classList.add("hidden");
    document.getElementById("next-btn").classList.add("hidden");
    document.getElementById("user-answer").value = "";
}

// ----------------------
// Submit Answer
// ----------------------
document.getElementById("submit-btn").addEventListener("click", () => {
    const userAnswer = document.getElementById("user-answer").value.trim().toLowerCase();
    const feedback = document.getElementById("feedback");

    if (userAnswer === currentPuzzle.answer) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";

        updateGrowthMap(true);

        document.getElementById("next-btn").classList.remove("hidden");

        // Show reflection
        const reflection = document.getElementById("reflection-box");
        reflection.classList.remove("hidden");
        reflection.querySelector("p").textContent =
            `Reasoning: ${currentPuzzle.rule}`;
    } else {
        feedback.textContent = "Not quite — try again.";
        feedback.style.color = "red";

        updateGrowthMap(false);
    }
});

// ----------------------
// Next Puzzle
// ----------------------
document.getElementById("next-btn").addEventListener("click", loadPuzzle);

// Initialize
loadPuzzle();