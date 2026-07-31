/* modules/fretboard-engine.js */
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const SCALES = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  "pentatonic-major": [0, 2, 4, 7, 9],
  "pentatonic-minor": [0, 3, 5, 7, 10]
};

export function renderFretboard(canvas, root = "E", scaleType = "major", overlay = "none", maxFret = 12) {
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const padding = 24;
  const strings = 6;
  const stringGap = (h - padding * 2) / (strings - 1);
  const fretCount = Math.max(6, Math.min(24, maxFret));
  const fretGap = (w - padding * 2) / fretCount;

  const cardBg = getComputedStyle(document.documentElement).getPropertyValue("--card-bg").trim() || "#1c212b";
  const textMain = getComputedStyle(document.documentElement).getPropertyValue("--text-main").trim() || "#e8eaed";
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#4fd1c5";

  ctx.fillStyle = cardBg;
  ctx.fillRect(0, 0, w, h);

  // Frets
  ctx.strokeStyle = "#2b3942";
  ctx.lineWidth = 1;
  for (let f = 0; f <= fretCount; f++) {
    const x = padding + f * fretGap;
    ctx.beginPath();
    ctx.moveTo(x, padding);
    ctx.lineTo(x, h - padding);
    ctx.stroke();
  }

  // Strings
  for (let s = 0; s < strings; s++) {
    const y = padding + s * stringGap;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(w - padding, y);
    ctx.stroke();
  }

  // Standard tuning high-to-low for visual (E B G D A E from top)
  const tuning = ["E", "B", "G", "D", "A", "E"];
  const rootIndex = NOTES.indexOf(normalizeNote(root));
  const scale = SCALES[scaleType] || SCALES.major;

  for (let s = 0; s < strings; s++) {
    const openNote = NOTES.indexOf(normalizeNote(tuning[s]));
    for (let f = 0; f <= fretCount; f++) {
      const noteIndex = (openNote + f) % 12;
      const degree = (noteIndex - rootIndex + 12) % 12;
      const isInScale = scale.includes(degree);
      const x = padding + f * fretGap + fretGap * 0.5;
      const y = padding + s * stringGap;

      if (overlay === "none") {
        if (isInScale) {
          ctx.beginPath();
          ctx.fillStyle = degree === 0 ? "#f6ad55" : accent;
          ctx.arc(x, y, degree === 0 ? 7 : 6, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (overlay === "triads") {
        if (isInScale && (degree === 0 || degree === 4 || degree === 7)) {
          ctx.fillStyle = degree === 0 ? "#f6ad55" : "#fc8181";
          ctx.fillRect(x - 6, y - 6, 12, 12);
        }
      } else if (overlay === "arpeggios") {
        if (isInScale && (degree === 0 || degree === 4 || degree === 7)) {
          ctx.beginPath();
          ctx.fillStyle = degree === 0 ? "#f6ad55" : accent;
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (overlay === "sweeps") {
        if (f % 4 === 0 && isInScale) {
          ctx.beginPath();
          ctx.fillStyle = "#9f7aea";
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  // Label
  ctx.fillStyle = textMain;
  ctx.font = "13px system-ui, Arial";
  ctx.fillText(`${root.toUpperCase()} ${scaleType}`, padding, 16);

  // Fret numbers
  ctx.fillStyle = "#9aa3b2";
  ctx.font = "11px system-ui, Arial";
  for (let f = 1; f <= fretCount; f++) {
    if ([3, 5, 7, 9, 12, 15, 17, 19, 21, 24].includes(f)) {
      const x = padding + f * fretGap - fretGap * 0.5;
      ctx.fillText(String(f), x - 4, h - 6);
    }
  }
}

function normalizeNote(n) {
  if (!n) return "C";
  return n.replace("♭", "b").replace("♯", "#").toUpperCase();
}
