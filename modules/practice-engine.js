/* modules/practice-engine.js */
export function generatePracticePlan(focus = "songs", duration = 15) {
  const blocks = [];
  const d = Math.max(5, Math.min(60, Number(duration) || 15));

  if (focus === "songs") {
    const warm = Math.max(3, Math.round(d * 0.15));
    const main = Math.max(6, Math.round(d * 0.6));
    const cool = Math.max(2, d - warm - main);
    blocks.push({ title: "Warm-up", mins: warm, desc: "Finger stretching and chromatic runs." });
    blocks.push({ title: "Song Work", mins: main, desc: "Work on song sections and transitions." });
    blocks.push({ title: "Cool-down", mins: cool, desc: "Slow playthrough and reflection." });
  } else if (focus === "chords") {
    blocks.push({ title: "Warm-up", mins: 3, desc: "Open chord changes slowly." });
    blocks.push({ title: "Chord Drills", mins: Math.max(8, d - 6), desc: "Change between target chords with metronome." });
    blocks.push({ title: "Application", mins: Math.max(2, d - 11), desc: "Apply chords to a simple progression." });
  } else if (focus === "patterns") {
    blocks.push({ title: "Warm-up", mins: 3, desc: "Right-hand loose strumming." });
    blocks.push({ title: "Pattern Practice", mins: Math.max(8, d - 6), desc: "Practice selected strumming patterns with metronome." });
    blocks.push({ title: "Song Application", mins: Math.max(2, d - 11), desc: "Apply patterns to a song." });
  } else if (focus === "fretboard") {
    blocks.push({ title: "Warm-up", mins: 3, desc: "Single-string chromatic runs." });
    blocks.push({ title: "Scale Practice", mins: Math.max(8, d - 6), desc: "Play selected scale shapes ascending and descending." });
    blocks.push({ title: "Application", mins: Math.max(2, d - 11), desc: "Improvise short phrases over a backing track." });
  } else {
    blocks.push({ title: "Mixed Practice", mins: d, desc: "Balanced routine covering chords, patterns and fretboard." });
  }

  const container = document.createElement("div");
  container.className = "practice-plan-inner";
  blocks.forEach(b => {
    const card = document.createElement("div");
    card.className = "song-card";
    card.innerHTML = `
      <div class="song-meta-row">
        <div>
          <h4 style="margin:0;font-size:1rem">${b.title}</h4>
          <p class="muted" style="margin:4px 0 0">${b.desc}</p>
        </div>
        <div style="font-weight:600;color:var(--accent)">${b.mins}m</div>
      </div>`;
    container.appendChild(card);
  });
  return container.outerHTML;
}
