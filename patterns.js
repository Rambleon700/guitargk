import { buildPatternDots, playPatternAnimation, stopPatternAnimation } from "./modules/pattern-engine.js";

const patternVisual = document.querySelector("#pattern-visual");
const patternSelect = document.querySelector("#pattern-select");
const patternPlayBtn = document.querySelector("#pattern-play-btn");
const patternStopBtn = document.querySelector("#pattern-stop-btn");

function normalizePatternValue(val) {
  if (!val) return "D D U U D U";
  if (val === "Reggae") return "D U D U";
  if (val === "Fingerpicked") return "D U D U D U";
  return val;
}

patternPlayBtn.addEventListener("click", () => {
  const patternString = normalizePatternValue(patternSelect.value);
  buildPatternDots(patternString, patternVisual);
  playPatternAnimation(patternVisual);
});

patternStopBtn.addEventListener("click", () => {
  stopPatternAnimation(patternVisual);
});

// Show initial pattern dots
buildPatternDots(normalizePatternValue(patternSelect.value), patternVisual);

patternSelect.addEventListener("change", () => {
  stopPatternAnimation(patternVisual);
  buildPatternDots(normalizePatternValue(patternSelect.value), patternVisual);
});
