/* -----------------------------------------
   META‑COGNITION MODULE — BRIGHTFOUNDRY
   Includes:
   - Reflection prompts
   - Self‑observation
   - Strategy awareness
   - Emotional awareness
   - LocalStorage growth tracking
   - Local reflection saving
------------------------------------------ */

// ----------------------
// Growth Map (localStorage)
// ----------------------
function updateGrowthMap() {
    const data = JSON.parse(localStorage.getItem("bf_growth")) || {
        meta_cognition_entries: 0
    };

    data.meta_cognition_entries++;

    localStorage.setItem("bf_growth", JSON.stringify(data));
}

// ----------------------
// Reflection prompts
// ----------------------
const prompts = [
    "What strategy do you naturally use when solving new problems?",
    "What do you notice about your thinking when something feels difficult?",
    "How do you decide when to keep trying versus when to change strategies?",
    "What patterns do you see in the mistakes you make?",
    "How does your emotional state affect your ability to think clearly?",
    "What helps you stay focused when your mind starts to wander?",
    "How do you know when you truly understand something?",
    "What does your mind do right before you get an insight?",
    "How do you recover when you feel mentally stuck?",
    "What thinking habits are you proud of?"
];

let currentPrompt = null;

// ----------------------
// Load a prompt
// ----------------------
function loadPrompt() {
    const display = document.getElementById("prompt-display");
    const feedback = document.getElementById("feedback");

    feedback.textContent = "";
    document.getElementById("next-btn").classList.add("hidden");
    document.getElementById("user-response").value = "";

    currentPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    display.textContent = currentPrompt;
}

// ----------------------
// Save reflection
// ----------------------
document.getElementById("submit-btn").addEventListener("click", () => {
    const response = document.getElementById("user-response").value.trim();
    const feedback = document.getElementById("feedback");

    if (response.length < 3) {
        feedback.textContent = "Write a bit more to reflect meaningfully.";
        feedback.style.color = "red";
        return;
    }

    // Save reflection locally
    const reflections = JSON.parse(localStorage.getItem("bf_reflections")) || [];
    reflections.push({
        prompt: currentPrompt,
        response: response,
        timestamp: new Date().toISOString()
    });

    localStorage.setItem("bf_reflections", JSON.stringify(reflections));

    updateGrowthMap();

    feedback.textContent = "Reflection saved.";
    feedback.style.color = "green";

    document.getElementById("next-btn").classList.remove("hidden");
});

// ----------------------
// Next prompt
// ----------------------
document.getElementById("next-btn").addEventListener("click", loadPrompt);

// Initialize
loadPrompt();