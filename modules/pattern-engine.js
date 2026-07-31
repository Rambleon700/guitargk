/* modules/pattern-engine.js */
export function buildPatternDots(patternString, containerEl) {
  if (!containerEl) return;
  containerEl.innerHTML = "";
  const tokens = parsePattern(patternString);
  tokens.forEach((t, i) => {
    const dot = document.createElement("div");
    dot.className = "pattern-dot";
    dot.dataset.index = i;
    dot.dataset.stroke = t;
    dot.title = t === "D" ? "Downstroke" : t === "U" ? "Upstroke" : t;

    const label = document.createElement("span");
    label.className = "pattern-dot-label";
    if (t === "D") {
      label.textContent = "↓";
      label.setAttribute("aria-label", "Down");
    } else if (t === "U") {
      label.textContent = "↑";
      label.setAttribute("aria-label", "Up");
    } else {
      label.textContent = t;
    }
    dot.appendChild(label);
    containerEl.appendChild(dot);
  });
  return tokens;
}

/**
 * Play pattern animation.
 * @param {HTMLElement} containerEl
 * @param {number} tempo - BPM
 * @param {function} [onBeat] - called each beat: (index, token, isCycleStart)
 */
export function playPatternAnimation(containerEl, tempo = 90, onBeat = null) {
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

  // Fire first beat immediately
  const fire = () => {
    dots.forEach(d => d.classList.remove("active"));
    dots[i].classList.add("active");
    const token = dots[i].dataset.stroke || "";
    const isCycleStart = i === 0;
    if (typeof onBeat === "function") onBeat(i, token, isCycleStart);
    i = (i + 1) % dots.length;
  };

  fire();
  containerEl._patternInterval = setInterval(fire, interval);
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
