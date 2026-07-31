import { chords } from "./modules/data.js";
import { renderChordDiagram } from "./modules/chord-diagram.js";

const qs = s => document.querySelector(s);

const chordsListEl = qs("#chords-list");
const chordSearchInput = qs("#chord-search-input");
const chordSearchBtn = qs("#chord-search-btn");
const chordCanvas = qs("#chord-canvas");

function renderChordList() {
  chordsListEl.innerHTML = "";
  Object.keys(chords).sort().forEach(name => {
    const pill = document.createElement("button");
    pill.className = "chord-pill";
    pill.textContent = name;
    pill.addEventListener("click", () => showChordDiagram(name));
    chordsListEl.appendChild(pill);
  });
}

function showChordDiagram(name) {
  if (!chordCanvas) return;
  try {
    renderChordDiagram(chordCanvas, name, chords[name] || null);
  } catch (err) {
    console.warn("renderChordDiagram failed", err);
  }
}

chordSearchBtn.addEventListener("click", () => {
  const q = chordSearchInput.value.trim();
  if (!q) return;
  // Try exact match first, then case-insensitive
  const key = Object.keys(chords).find(k => k.toLowerCase() === q.toLowerCase()) || q;
  if (chords[key]) {
    showChordDiagram(key);
  } else {
    showChordDiagram(q); // still draw "no data" state
  }
});

chordSearchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") chordSearchBtn.click();
});

// Support deep-link from songs page: ?chord=Am
const params = new URLSearchParams(window.location.search);
const initialChord = params.get("chord");
if (initialChord && chords[initialChord]) {
  showChordDiagram(initialChord);
} else if (Object.keys(chords).length) {
  // Show first chord by default
  showChordDiagram(Object.keys(chords).sort()[0]);
}

renderChordList();
