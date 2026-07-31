import { songs, chords } from "./modules/data.js";
import { renderChordDiagram } from "./modules/chord-diagram.js";
import { buildPatternDots, playPatternAnimation, stopPatternAnimation } from "./modules/pattern-engine.js";
import { renderFretboard } from "./modules/fretboard-engine.js";

const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

let chordCountFilter = "all";
let difficultyFilter = "all";
let currentModalSong = null;
let currentChordIndex = 0;

const songsGrid = qs("#songs-grid");

function renderSongs() {
  songsGrid.innerHTML = "";
  songs.forEach(song => {
    const chordCount = song.chords.length;
    const passesChordCount =
      chordCountFilter === "all" ||
      (chordCountFilter === "2" && chordCount === 2) ||
      (chordCountFilter === "3" && chordCount === 3) ||
      (chordCountFilter === "4plus" && chordCount >= 4);

    const passesDifficulty = difficultyFilter === "all" || song.difficulty === difficultyFilter;
    if (!passesChordCount || !passesDifficulty) return;

    const card = document.createElement("div");
    card.className = "song-card";
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="song-meta-row">
        <div>
          <h3 class="song-title">${song.title}</h3>
          <p class="song-artist">${song.artist}</p>
        </div>
        <span class="song-difficulty">${song.difficulty}</span>
      </div>
      <p class="song-chords"><strong>Chords:</strong> ${song.chords.join(", ")}</p>
      <p class="song-pattern"><strong>Pattern:</strong> ${song.pattern}</p>
    `;
    card.addEventListener("click", () => openSongModal(song));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openSongModal(song);
      }
    });
    songsGrid.appendChild(card);
  });
}

qsa(".chord-count-filter").forEach(btn => {
  btn.addEventListener("click", () => {
    qsa(".chord-count-filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    chordCountFilter = btn.dataset.filter;
    renderSongs();
  });
});

qsa(".difficulty-filter").forEach(btn => {
  btn.addEventListener("click", () => {
    qsa(".difficulty-filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    difficultyFilter = btn.dataset.filter;
    renderSongs();
  });
});

/* Modal */
const songModal = qs("#song-modal");
const songModalClose = qs("#song-modal-close");

function openSongModal(song) {
  currentModalSong = song;
  qs("#modal-song-title").textContent = song.title;
  qs("#modal-song-artist").textContent = song.artist;
  qs("#modal-song-pattern").textContent = song.pattern || "";
  qs("#modal-song-tips").textContent = song.tips || "";

  const chordsEl = qs("#modal-song-chords");
  chordsEl.innerHTML = "";
  (song.chords || []).forEach(ch => {
    const pill = document.createElement("button");
    pill.className = "modal-chord-pill";
    pill.textContent = ch;
    pill.addEventListener("click", () => {
      // Jump to chords page with that chord pre-selected via query
      window.location.href = `chords.html?chord=${encodeURIComponent(ch)}`;
    });
    chordsEl.appendChild(pill);
  });

  // Clear previous pattern visual and show static dots for this song
  const patternVisual = qs("#modal-pattern-visual");
  if (patternVisual) {
    patternVisual.innerHTML = "";
    const patternString = normalizePatternValue(song.pattern);
    buildPatternDots(patternString, patternVisual);
  }

  songModal.classList.add("open");
  songModal.setAttribute("aria-hidden", "false");

  // Default fretboard render — wait for modal layout to settle
  requestAnimationFrame(() => {
    setTimeout(() => {
      renderModalFretboard();
    }, 80);
  });
}

function closeSongModal() {
  const modalPatternVisual = qs("#modal-pattern-visual");
  if (modalPatternVisual) stopPatternAnimation(modalPatternVisual);
  clearChordHighlights();
  songModal.classList.remove("open");
  songModal.setAttribute("aria-hidden", "true");
  currentModalSong = null;
  currentChordIndex = 0;
}

songModalClose.addEventListener("click", closeSongModal);
songModal.addEventListener("click", (e) => {
  if (e.target === songModal) closeSongModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && songModal.classList.contains("open")) closeSongModal();
});

function normalizePatternValue(val) {
  if (!val) return "D D U U D U";
  if (val === "Reggae") return "D U D U";
  if (val === "Fingerpicked") return "D U D U D U";
  return val;
}

function clearChordHighlights() {
  qsa("#modal-song-chords .modal-chord-pill").forEach(p => {
    p.classList.remove("strumming", "downstroke", "upstroke");
  });
}

function highlightChord(index, stroke) {
  const pills = qsa("#modal-song-chords .modal-chord-pill");
  if (!pills.length) return;
  pills.forEach(p => p.classList.remove("strumming", "downstroke", "upstroke"));
  const pill = pills[index % pills.length];
  if (!pill) return;
  pill.classList.add("strumming");
  if (stroke === "D") pill.classList.add("downstroke");
  else if (stroke === "U") pill.classList.add("upstroke");
}

qs("#modal-pattern-play-btn")?.addEventListener("click", () => {
  if (!currentModalSong) return;
  const patternString = normalizePatternValue(currentModalSong.pattern);
  const modalPatternVisual = qs("#modal-pattern-visual");
  const songChords = currentModalSong.chords || [];
  const chordCount = Math.max(1, songChords.length);

  buildPatternDots(patternString, modalPatternVisual);
  currentChordIndex = 0;
  modalPatternVisual._cycleCount = 0;
  highlightChord(0, "D");

  // Each stroke highlights the current chord with ↓ or ↑ style.
  // After every full pattern cycle, advance to the next chord in the song.
  playPatternAnimation(modalPatternVisual, 90, (beatIndex, token, isCycleStart) => {
    if (isCycleStart) {
      if (modalPatternVisual._cycleCount > 0) {
        currentChordIndex = modalPatternVisual._cycleCount % chordCount;
      }
      modalPatternVisual._cycleCount += 1;
    }
    highlightChord(currentChordIndex, token);
  });
});

function renderModalFretboard() {
  const canvas = qs("#modal-fretboard-canvas");
  if (!canvas || !currentModalSong) return;

  // Force a layout pass so clientWidth is reliable inside the modal
  const parent = canvas.parentElement;
  if (parent) void parent.offsetWidth;

  const ratio = window.devicePixelRatio || 1;
  // Prefer measured width; fall back to modal content width or a safe default
  let displayW = canvas.clientWidth;
  if (!displayW || displayW < 100) {
    const modalBody = qs("#song-modal-body") || qs(".modal-content");
    displayW = (modalBody && modalBody.clientWidth) ? modalBody.clientWidth - 48 : 640;
  }
  const displayH = 200;

  canvas.style.width = displayW + "px";
  canvas.style.height = displayH + "px";
  canvas.width = Math.floor(displayW * ratio);
  canvas.height = Math.floor(displayH * ratio);

  const root = (currentModalSong.chords && currentModalSong.chords[0])
    ? currentModalSong.chords[0].replace(/[^A-G#b]/g, "")
    : "C";
  const overlay = qs("#modal-fb-overlay-select")?.value || "none";

  try {
    renderFretboard(canvas, root, "pentatonic-minor", overlay, 12);
  } catch (err) {
    console.warn("Modal fretboard render failed", err);
  }
}

qs("#modal-fb-render-btn")?.addEventListener("click", renderModalFretboard);
qs("#modal-fb-overlay-select")?.addEventListener("change", renderModalFretboard);

// Init
renderSongs();
