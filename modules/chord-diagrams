/* modules/chord-diagram.js */
export function renderChordDiagram(canvas, name, chordData) {
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const padding = 18;
  const nutHeight = 8;
  const strings = 6;
  const frets = 5;
  const gridW = w - padding * 2;
  const gridH = h - padding * 2 - 30;
  const stringGap = gridW / (strings - 1);
  const fretGap = gridH / frets;

  const cardBg = getComputedStyle(document.documentElement).getPropertyValue("--card-bg").trim() || "#1c212b";
  const textMain = getComputedStyle(document.documentElement).getPropertyValue("--text-main").trim() || "#e8eaed";
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#4fd1c5";

  ctx.fillStyle = cardBg;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = textMain;
  ctx.font = "bold 14px system-ui, Arial";
  ctx.fillText(name, padding, padding + 12);

  // Nut
  ctx.fillStyle = "#e8eaed";
  ctx.fillRect(padding - 2, padding + 18, gridW + 4, nutHeight);

  // Strings
  ctx.strokeStyle = "#4a5568";
  ctx.lineWidth = 1.5;
  for (let i = 0; i < strings; i++) {
    const x = padding + i * stringGap;
    ctx.beginPath();
    ctx.moveTo(x, padding + 18 + nutHeight);
    ctx.lineTo(x, padding + 18 + nutHeight + gridH);
    ctx.stroke();
  }

  // Frets
  ctx.strokeStyle = "#3a4355";
  ctx.lineWidth = 1;
  for (let f = 0; f <= frets; f++) {
    const y = padding + 18 + nutHeight + f * fretGap;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(padding + gridW, y);
    ctx.stroke();
  }

  if (!chordData || !Array.isArray(chordData.frets)) {
    ctx.fillStyle = "#9aa3b2";
    ctx.font = "12px system-ui, Arial";
    ctx.fillText("No chord data available", padding, h - 12);
    return;
  }

  const fretsArr = chordData.frets;
  for (let s = 0; s < strings; s++) {
    const fret = fretsArr[s];
    const x = padding + s * stringGap;
    if (fret === -1) {
      ctx.fillStyle = "#9aa3b2";
      ctx.font = "12px system-ui, Arial";
      ctx.fillText("×", x - 4, padding + 12);
    } else if (fret === 0) {
      ctx.fillStyle = "#9aa3b2";
      ctx.font = "12px system-ui, Arial";
      ctx.fillText("○", x - 4, padding + 12);
    } else {
      const dotY = padding + 18 + nutHeight + (fret - 0.5) * fretGap;
      ctx.beginPath();
      ctx.fillStyle = accent;
      ctx.arc(x, dotY, Math.max(6, stringGap * 0.18), 0, Math.PI * 2);
      ctx.fill();
      const finger = (chordData.fingers && chordData.fingers[s]) || null;
      if (finger) {
        ctx.fillStyle = "#0a1210";
        ctx.font = "10px monospace";
        ctx.fillText(String(finger), x - 3, dotY + 4);
      }
    }
  }
}
