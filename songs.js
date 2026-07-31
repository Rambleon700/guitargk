import { songs, chords } from "./modules/data.js";
import { renderChordDiagram } from "./modules/chord-diagram.js";
import { buildPatternDots, playPatternAnimation } from "./modules/pattern-engine.js";
import { renderFretboard } from "./modules/fretboard-engine.js";

const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));

let chordCountFilter = "all";
let difficultyFilter = "all";
let currentModalSong = null;

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

  // Clear previous pattern visual
  const patternVisual = qs("#modal-pattern-visual");
  if (patternVisual) patternVisual.innerHTML = "";

  songModal.classList.add("open");
  songModal.setAttribute("aria-hidden", "false");

  // Default fretboard render
  setTimeout(() => {
    renderModalFretboard();
  }, 50);
}

function closeSongModal() {
  songModal.classList.remove("open");
  songModal.setAttribute("aria-hidden", "true");
  currentModalSong = null;
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

qs("#modal-pattern-play-btn")?.addEventListener("click", () => {
  if (!currentModalSong) return;
  const patternString = normalizePatternValue(currentModalSong.pattern);
  const modalPatternVisual = qs("#modal-pattern-visual");
  buildPatternDots(patternString, modalPatternVisual);
  playPatternAnimation(modalPatternVisual);
});

function renderModalFretboard() {
  const canvas = qs("#modal-fretboard-canvas");
  if (!canvas || !currentModalSong) return;

  const ratio = window.devicePixelRatio || 1;
  const displayW = canvas.clientWidth || 900;
  const displayH = 220;
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
