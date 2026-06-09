# Joshua Ortiz Baco — Academic Portfolio

A static portfolio site for a Digital Scholarship Librarian. Pure HTML, CSS,
and JavaScript — no build step, no framework. Animations use [p5.js](https://p5js.org/)
loaded from a CDN.

## Run locally

It's all static files. Either open `index.html` directly, or serve the folder
(recommended, because the pages use ES modules):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
index.html / publications.html / talks.html / teaching.html / cv.html
css/   reset · tokens (tropical palette) · layout · components
js/    data (all content) · render · filter · nav · hero-sketch · accent-sketch
assets/  profile.svg · cv.pdf  (placeholders — replace with real files)
```

## Editing content

All text lives in **`js/data.js`** — profile, publications, talks, teaching,
and CV. Edit that one file to update the site. Replace `assets/profile.svg`
and `assets/cv.pdf` with your real headshot and CV.

## Design

- **Palette:** minimalist tropical — sand, coral, teal, mango, ink (`css/tokens.css`).
- **Type:** Fraunces (display) + Space Grotesk (body).
- **Animation:** generative p5.js hero particles + scroll-gated section accents.
