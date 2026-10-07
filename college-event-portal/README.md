# Tarang 2026 – Responsive College Event Portal

A front-end college festival website built with HTML5, CSS3 and vanilla JavaScript. No backend or frameworks needed.

## Features
- Hero section, live countdown, stats, featured events, expandable announcements
- Event cards rendered from a JavaScript array, with category filter and details popup
- Schedule table with day filters
- Registration form with JavaScript validation, success message and confirmation ID (nothing is sent to a server)
- Gallery with CSS grid, hover zoom and a lightbox (close button, Esc, click outside)
- Contact page with form, map placeholder and organizer info
- Sticky navigation, mobile menu, smooth scrolling, back-to-top button, active-link highlighting
- Responsive layout (CSS Grid, Flexbox, media queries) and keyboard-friendly focus styles

## Technologies used
HTML5 (semantic elements), CSS3 (custom properties, grid, flexbox, glassmorphism), vanilla JavaScript (DOM, IntersectionObserver, `<dialog>`).

## Folder structure
```
college-event-portal/
├── index.html  events.html  register.html  gallery.html  contact.html
├── css/style.css
├── js/  script.js (shared UI) · events.js (data + event cards) · registration.js (form)
├── images/   (optional – gallery uses emoji + gradient tiles)
└── README.md
```

## How to run
1. Download or clone the folder.
2. Double-click `index.html`, or serve it: `python -m http.server` and open http://localhost:8000.
3. An internet connection is only needed for the Google Fonts (a system-font fallback is included).

## Customising
Edit the `EVENTS`, `ANNOUNCEMENTS` and `GALLERY` arrays at the top of `js/events.js`. To use real photos, put them in `images/` and swap the gallery tile for an `<img>`.

## Screenshots
Add screenshots here: `![Home](images/home.png)`, `![Events](images/events.png)`, `![Register](images/register.png)`.

## Future enhancements
- Backend and database for real registrations and email confirmation
- Admin dashboard, user login and QR-code tickets
- Real photo gallery, embedded Google Map, dark/light toggle, PWA support

## Conclusion
This project demonstrates a complete multi-page, responsive site with dynamic rendering, validation and clean structure, making it a solid base for a college project demo.
