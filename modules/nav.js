/* Shared navigation helper */
export function setActiveNav(page) {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    const isActive = btn.dataset.page === page;
    btn.classList.toggle("active", isActive);
    if (isActive) btn.setAttribute("aria-current", "page");
    else btn.removeAttribute("aria-current");
  });
}
