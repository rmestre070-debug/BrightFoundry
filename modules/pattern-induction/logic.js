/* -----------------------------------------
   PATTERN INDUCTION MODULE — BRIGHTFOUNDRY
   Includes:
   - Difficulty tiers
   - Visual patterns
   - Reflection prompts
   - LocalStorage growth tracking
------------------------------------------ */

// ----------------------
// Growth Map (localStorage)
// ----------------------
function updateGrowthMap(success) {
    const data = JSON.parse(localStorage.getItem("bf_growth")) || {
        pattern_induction_attempts: 0,
        pattern_induction_correct: 0
    };

    data.pattern_induction_attempts++;

    if (success) {
        data.pattern_induction_correct++;
    }

    localStorage.setItem("bf_growth", JSON.stringify(data));
}

// ----------------------
// Pattern Bank
// ----------------------

// Numeric patterns
const numericPatterns = [
    // Easy
    { sequence: [2, 4, 6, 8], answer: "10", rule: "Even numbers increasing by 2", difficulty: "easy" },
    { sequence: [5, 10, 15], answer: "20", rule: "Add 5 each step", difficulty: "easy" },

    // Medium
    { sequence: [3, 9, 27], answer: "81", rule: "Multiply by 3", difficulty: "medium" },
    { sequence: [1, 1, 2, 3, 5], answer: "8", rule: "Fibonacci sequence", difficulty: "medium" },

    // Hard
    { sequence: [4, 7, 11, 18, 29], answer: "47", rule: "Add increasing primes (3,4,7,11...)", difficulty: "hard" },
    { sequence: [2, 3, 5, 9, 17], answer: "33", rule: "Double then subtract 1", difficulty: "hard" }
];

// Visual patterns
const visualPatterns = [
    {
        type: "shapes",
        images: ["⬤", "⬤⬤", "⬤⬤⬤"],
        answer: "⬤⬤⬤⬤",
        rule: "Add one circle each step",
        difficulty: "easy"
    },
    {
        type: "shapes",
        images: ["■", "▲", "■", "▲"],
        answer: "■",
        rule: "Alternating shapes",
        difficulty: "easy"
    },
    {
        type: "grid",
        images: ["⬛⬜⬜", "⬜⬛⬜", "⬜⬜⬛"],
        answer: "⬛⬜⬜",
        rule: "Diagonal shift pattern",
        difficulty: "medium"
    }
];

// Combine all patterns
const allPatterns = [...numericPatterns, ...visualPatterns];

let currentPattern = null;

// ----------------------
// Load a random pattern
// ----------------------
function loadPattern() {
    currentPattern = allPatterns[Math.floor(Math.random() * allPatterns.length)];

    const display = document.getElementById("sequence-display");
    const feedback = document.getElementById("feedback");
    const reflection = document.getElementById("reflection-box");

    feedback.textContent = "";
    reflection.classList.add("hidden");
    document.getElementById("next-btn").classList.add("hidden");
    document.getElementById("user-answer").value = "";

    // Visual pattern
    if (currentPattern.images) {
        display.innerHTML = currentPattern.images.join(" → ");
    }
    // Numeric pattern
    else {
        display.textContent = currentPattern.sequence.join(", ");
    }
}

// ----------------------
// Submit Answer
// ----------------------
document.getElementById("submit-btn").addEventListener("click", () => {
    const userAnswer = document.getElementById("user-answer").value.trim();
    const feedback = document.getElementById("feedback");

    if (userAnswer === currentPattern.answer) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";

        updateGrowthMap(true);

        document.getElementById("next-btn").classList.remove("hidden");

        // Show reflection prompt
        const reflection = document.getElementById("reflection-box");
        reflection.classList.remove("hidden");
        reflection.querySelector("p").textContent =
            `Rule: ${currentPattern.rule}`;
    } else {
        feedback.textContent = "Not quite — try again.";
        feedback.style.color = "red";

        updateGrowthMap(false);
    }
});

// ----------------------
// Next Pattern
// ----------------------
document.getElementById("next-btn").addEventListener("click", loadPattern);

// Initialize
loadPattern();