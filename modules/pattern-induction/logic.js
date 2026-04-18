const patterns = [
    {
        sequence: [2, 4, 6, 8],
        answer: "10",
        rule: "Even numbers increasing by 2"
    },
    {
        sequence: [3, 9, 27],
        answer: "81",
        rule: "Multiply by 3 each step"
    },
    {
        sequence: [1, 1, 2, 3, 5],
        answer: "8",
        rule: "Fibonacci sequence"
    },
    {
        sequence: [10, 7, 4, 1],
        answer: "-2",
        rule: "Subtract 3 each step"
    }
];

let currentPattern = null;

function loadPattern() {
    const randomIndex = Math.floor(Math.random() * patterns.length);
    currentPattern = patterns[randomIndex];

    const display = document.getElementById("sequence-display");
    display.textContent = currentPattern.sequence.join(", ");

    document.getElementById("feedback").textContent = "";
    document.getElementById("user-answer").value = "";
    document.getElementById("next-btn").classList.add("hidden");
}

document.getElementById("submit-btn").addEventListener("click", () => {
    const userAnswer = document.getElementById("user-answer").value.trim();
    const feedback = document.getElementById("feedback");

    if (userAnswer === currentPattern.answer) {
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
        document.getElementById("next-btn").classList.remove("hidden");
    } else {
        feedback.textContent = "Not quite — try again.";
        feedback.style.color = "red";
    }
});

document.getElementById("next-btn").addEventListener("click", loadPattern);

loadPattern();