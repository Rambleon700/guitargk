/* modules/pattern-engine.js */
export function buildPatternDots(patternString, containerEl) {
  if (!containerEl) return;
  containerEl.innerHTML = "";
  const tokens = parsePattern(patternString);
  tokens.forEach((t, i) => {
    const dot = document.createElement("div");
    dot.className = "pattern-dot";
    dot.dataset.index = i;
    dot.title = t;
    containerEl.appendChild(dot);
  });
}

export function playPatternAnimation(containerEl, tempo = 90) {
  if (!containerEl) return;
  const dots = Array.from(containerEl.querySelectorAll(".pattern-dot"));
  if (!dots.length) return;

  let i = 0;
  const interval = Math.max(120, Math.round(60000 / tempo));

  if (containerEl._patternInterval) {
    clearInterval(containerEl._patternInterval);
    containerEl._patternInterval = null;
  }

  dots.forEach(d => d.classList.remove("active"));

  containerEl._patternInterval = setInterval(() => {
    dots.forEach(d => d.classList.remove("active"));
    dots[i].classList.add("active");
    i = (i + 1) % dots.length;
  }, interval);
}

export function stopPatternAnimation(containerEl) {
  if (containerEl && containerEl._patternInterval) {
    clearInterval(containerEl._patternInterval);
    containerEl._patternInterval = null;
    const dots = containerEl.querySelectorAll(".pattern-dot");
    dots.forEach(d => d.classList.remove("active"));
  }
}

function parsePattern(str) {
  if (!str) return ["D", "D", "U", "U", "D", "U"];
  if (str === "Reggae") return ["D", "U", "D", "U"];
  if (str === "Fingerpicked") return ["D", "U", "D", "U", "D", "U"];
  if (str.includes(" ")) return str.split(" ").filter(Boolean);
  return str.split("").filter(Boolean);
}
