// Category filtering for the publications page.
export function initFilter(barId, listId) {
  const bar = document.getElementById(barId);
  const list = document.getElementById(listId);
  if (!bar || !list) return;

  const items = [...list.querySelectorAll(".pub-item")];
  const categories = [...new Set(items.map((i) => i.dataset.category))].sort();

  const makeChip = (label, value, pressed) => {
    const b = document.createElement("button");
    b.className = "chip";
    b.textContent = label;
    b.dataset.filter = value;
    b.setAttribute("aria-pressed", pressed ? "true" : "false");
    return b;
  };

  bar.appendChild(makeChip("All", "*", true));
  categories.forEach((c) => bar.appendChild(makeChip(c, c, false)));

  bar.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    bar.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", "false"));
    chip.setAttribute("aria-pressed", "true");
    const f = chip.dataset.filter;
    items.forEach((i) => i.classList.toggle("is-hidden", f !== "*" && i.dataset.category !== f));
  });
}
