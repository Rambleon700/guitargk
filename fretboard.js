import { renderFretboard } from "./modules/fretboard-engine.js";

const rootSelect = document.querySelector("#fb-root-select");
const scaleSelect = document.querySelector("#fb-scale-select");
const overlaySelect = document.querySelector("#fb-overlay-select");
const maxFretInput = document.querySelector("#fb-max-fret-input");
const renderBtn = document.querySelector("#fb-render-btn");
const canvas = document.querySelector("#fretboard-canvas");

function sizeAndRender() {
  if (!canvas) return;

  const ratio = window.devicePixelRatio || 1;
  const displayW = canvas.clientWidth || 900;
  const displayH = 220;
  canvas.width = Math.floor(displayW * ratio);
  canvas.height = Math.floor(displayH * ratio);

  const root = rootSelect.value;
  const scale = scaleSelect.value;
  const overlay = overlaySelect.value;
  const maxFret = Number(maxFretInput.value) || 12;

  try {
    renderFretboard(canvas, root, scale, overlay, maxFret);
  } catch (err) {
    console.warn("Fretboard render failed", err);
  }
}

renderBtn.addEventListener("click", sizeAndRender);
rootSelect.addEventListener("change", sizeAndRender);
scaleSelect.addEventListener("change", sizeAndRender);
overlaySelect.addEventListener("change", sizeAndRender);
maxFretInput.addEventListener("change", sizeAndRender);

window.addEventListener("resize", () => {
  clearTimeout(window._fbResize);
  window._fbResize = setTimeout(sizeAndRender, 120);
});

// Initial render
sizeAndRender();
