import { profile, publications, talks, teaching, cv } from "./data.js";

const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function entryHTML(item) {
  const titleInner = item.url
    ? `<a href="${esc(item.url)}" target="_blank" rel="noopener">${esc(item.title)}</a>`
    : esc(item.title);
  return `<li class="pub-item" data-category="${esc(item.category)}">
    <div class="pub-item__num" aria-hidden="true"></div>
    <div>
      <h3 class="pub-item__title">${titleInner}</h3>
      <div class="pub-item__meta">
        <span class="pub-item__year">${esc(item.year)}</span>
        <span class="pub-item__venue">${esc(item.venue)}</span>
        <span class="tag">${esc(item.category)}</span>
      </div>
      <p class="pub-item__cite">${esc(item.citation)}</p>
    </div>
  </li>`;
}

function renderList(elId, items) {
  const el = document.getElementById(elId);
  if (el) el.innerHTML = items.map(entryHTML).join("");
}

export function renderProfile() {
  const set = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
  set("p-name", profile.name);
  set("p-title", profile.title);
  set("p-institution", profile.institution);
  const bioEl = document.getElementById("p-bio");
  if (bioEl) bioEl.textContent = profile.bio;
  const photo = document.getElementById("p-photo");
  if (photo) { photo.src = profile.photo; photo.alt = profile.name; }
  const focus = document.getElementById("p-focus");
  if (focus) focus.innerHTML = profile.focusAreas.map((f) => `<span class="tag">${esc(f)}</span>`).join("");
  const links = document.getElementById("p-links");
  if (links) links.innerHTML = profile.links
    .map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("");
}

export function renderPublications() { renderList("publications-list", publications); }
export function renderTalks() { renderList("talks-list", talks); }
export function renderTeaching() { renderList("teaching-list", teaching); }

export function renderHighlights() {
  const featured = publications.slice(0, 3);
  renderList("highlights-list", featured);
}

export function renderCV() {
  const ed = document.getElementById("cv-education");
  if (ed) ed.innerHTML = cv.education.map((e) =>
    `<li><strong>${esc(e.degree)}</strong><br>${esc(e.institution)} <span class="muted">${esc(e.year)}</span></li>`).join("");
  const pos = document.getElementById("cv-positions");
  if (pos) pos.innerHTML = cv.positions.map((p) =>
    `<li><strong>${esc(p.title)}</strong><br>${esc(p.institution)} <span class="muted">${esc(p.period)}</span></li>`).join("");
  const gr = document.getElementById("cv-grants");
  if (gr) gr.innerHTML = cv.grants.map((g) =>
    `<li><strong>${esc(g.name)}</strong> <span class="muted">${esc(g.year)}</span></li>`).join("");
}
