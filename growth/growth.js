/* -----------------------------------------
   GROWTH DASHBOARD — BRIGHTFOUNDRY
------------------------------------------ */

function loadStats() {
    const statsGrid = document.getElementById("stats-grid");
    const data = JSON.parse(localStorage.getItem("bf_growth")) || {};

    const modules = [
        ["Pattern Induction", "pattern_induction_attempts", "pattern_induction_correct"],
        ["Fluid Reasoning", "fluid_reasoning_attempts", "fluid_reasoning_correct"],
        ["Working Memory", "working_memory_attempts", "working_memory_correct"],
        ["Processing Speed", "processing_speed_attempts", "processing_speed_correct"],
        ["Spatial Visualization", "spatial_visualization_attempts", "spatial_visualization_correct"],
        ["Meta‑Cognition", "meta_cognition_entries", null]
    ];

    modules.forEach(([name, attemptsKey, correctKey]) => {
        const attempts = data[attemptsKey] || 0;
        const correct = correctKey ? (data[correctKey] || 0) : null;

        const card = document.createElement("div");
        card.classList.add("stat-card");

        card.innerHTML = `
            <h3>${name}</h3>
            <p><strong>Attempts:</strong> ${attempts}</p>
            ${
                correct !== null
                ? `<p><strong>Correct:</strong> ${correct}</p>`
                : `<p><strong>Reflections:</strong> ${attempts}</p>`
            }
        `;

        statsGrid.appendChild(card);
    });
}

function loadReflections() {
    const list = document.getElementById("reflections-list");
    const reflections = JSON.parse(localStorage.getItem("bf_reflections")) || [];

    if (reflections.length === 0) {
        list.innerHTML = `<p>No reflections yet. Explore the Meta‑Cognition module to begin.</p>`;
        return;
    }

    reflections.slice().reverse().forEach(entry => {
        const div = document.createElement("div");
        div.classList.add("reflection-entry");

        div.innerHTML = `
            <h4>${entry.prompt}</h4>
            <p>${entry.response}</p>
            <p style="font-size:0.8rem; color:#777; margin-top:0.5rem;">
                ${new Date(entry.timestamp).toLocaleString()}
            </p>
        `;

        list.appendChild(div);
    });
}

// Initialize
loadStats();
loadReflections();