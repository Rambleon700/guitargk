import { generatePracticePlan } from "./modules/practice-engine.js";

const focusSelect = document.querySelector("#practice-focus-select");
const durationInput = document.querySelector("#practice-duration-input");
const generateBtn = document.querySelector("#practice-generate-btn");
const planContainer = document.querySelector("#practice-plan");

function generate() {
  const focus = focusSelect.value;
  const duration = Number(durationInput.value) || 15;
  planContainer.innerHTML = generatePracticePlan(focus, duration);
}

generateBtn.addEventListener("click", generate);

// Show a default plan on load
generate();
