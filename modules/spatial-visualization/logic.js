/* -----------------------------------------
   SPATIAL VISUALIZATION MODULE — BRIGHTFOUNDRY
   Includes:
   - Mental rotation
   - Grid transformations
   - Shape flipping
   - Spatial pattern prediction
   - Reflection prompts
   - LocalStorage growth tracking
------------------------------------------ */

// ----------------------
// Growth Map (localStorage)
// ----------------------
function updateGrowthMap(success) {
    const data = JSON.parse(localStorage.getItem("bf_growth")) || {
        spatial_visualization_attempts: 0,
        spatial_visualization_correct: 0
    };

    data.spatial_visualization_attempts++;

    if (success) {
        data.spatial_visualization_correct++;
    }

    localStorage.setItem("bf_growth", JSON.stringify(data));
}

// ----------------------
// Spatial puzzle bank
// ----------------------

// Simple shapes
const shapes = ["▲", "▼", "◀", "▶", "◆", "■"];

// Rotate shape 90° clockwise
function rotate(shape) {
    switch (shape) {
        case "▲": return "▶";
        case "▶": return "▼";
        case "▼": return "◀";
        case "◀": return "▲";
        default: return shape;
    }
}

// Flip horizontally
function flip(shape) {
    switch (shape) {
        case "◀": return "▶";
        case "▶": return "◀";
        default: return shape;
    }
}

// Grid generator (3x3)
function randomGrid() {
    const grid = Array(9).fill("⬜");
    const filled = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < filled; i++) {
        const idx = Math.floor(Math.random() * 9);
        grid[idx] = "⬛";
    }
    return grid.join("");
}

// Flip grid horizontally
function flipGrid(grid) {
    return (
        grid[2] + grid[1] + grid[0] +
        grid[5] + grid[4] + grid[3] +
        grid[8] + grid[7] + grid[6]
    );
}

const puzzles = [
    {
        type: "rotate",
        generate: () => {
            const s = shapes[Math.floor(Math.random() * 4)];
            return { prompt: s, answer: rotate(s), rule: "Rotate 90° clockwise" };
        }
    },
    {
        type: "flip",
        generate: () => {
            const s = ["◀", "▶"][Math.floor(Math.random() * 2)];
            return { prompt: s, answer: flip(s), rule: "Flip horizontally" };
        }
    },
    {
        type: "grid-flip",
        generate: () => {
            const g = randomGrid();
            return { prompt: g, answer: flipGrid(g), rule: "Flip the grid horizontally" };
        }
    }
];

let currentPuzzle = null;

// ----------------------
// Load puzzle
// ----------------------
function loadPuzzle() {
    const display = document.getElementById("spatial-display");
    const grid = document.getElementById("options-grid");
    const feedback = document.getElementById("feedback");
    const reflection = document.getElementById("reflection-box");

    feedback.textContent = "";
    reflection.classList.add("hidden");
    document.getElementById("next-btn").classList.add("hidden");

    const p = puzzles[Math.floor(Math.random() * puzzles.length)].generate();
    currentPuzzle = p;

    display.textContent = p.prompt;

    // Generate options
    grid.innerHTML = "";
    const correctIndex = Math.floor(Math.random() * 4);

    for (let i = 0; i < 4; i++) {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");

        btn.textContent = i === correctIndex ? p.answer : randomGrid().slice(0, p.answer.length);

        btn.addEventListener("click", () => checkAnswer(btn.textContent));

        grid.appendChild(btn);
    }
}

// ----------------------
// Check answer
// ----------------------
function checkAnswer(choice) {
    const feedback = document.getElementById("feedback");

    if (choice === currentPuzzle.answer) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";

        updateGrowthMap(true);

        document.getElementById("next-btn").classList.remove("hidden");

        const reflection = document.getElementById("reflection-box");
        reflection.classList.remove("hidden");
        reflection.querySelector("p").textContent =
            `Transformation: ${currentPuzzle.rule}`;
    } else {
        feedback.textContent = "Try again.";
        feedback.style.color = "red";

        updateGrowthMap(false);
    }
}

// ----------------------
// Next puzzle
// ----------------------
document.getElementById("next-btn").addEventListener("click", loadPuzzle);

// Initialize
loadPuzzle();