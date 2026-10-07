/* script.js – shared layout + interactions used on every page */
const NAV = [['Home','index.html'],['Events','events.html'],['Schedule','events.html#schedule'],['Register','register.html'],['Gallery','gallery.html'],['Announcements','index.html#announcements'],['Contact','contact.html']];
const page = location.pathname.split('/').pop() || 'index.html';

/* Inject the same header and footer on every page */
function renderLayout(){
  const links = NAV.map(([t,h]) => `<li><a href="${h}">${t}</a></li>`).join('');
  document.getElementById('siteHeader').innerHTML = `<header class="site"><nav class="nav wrap" aria-label="Main">
   <a class="logo" href="index.html">Tarang<span>26</span></a>
   <button class="burger" id="burger" aria-label="Toggle menu" aria-expanded="false">☰</button><ul id="menu">${links}</ul></nav></header>`;
  document.getElementById('siteFooter').innerHTML = `<footer class="site"><div class="wrap"><div class="fgrid">
   <div><h3>Tarang 2026</h3><p style="color:var(--muted)">The annual inter-college festival of Sri Vidya Institute of Technology, Chennai: three days of tech, art, sport and play.</p></div>
   <div><h3>Quick links</h3><ul>${links}</ul></div>
   <div><h3>Contact</h3><ul><li>📍 12 Campus Road, Chennai 600025</li><li>✉️ tarang@svit.example.edu</li><li>📞 +91 98765 43210</li></ul></div>
   <div><h3>Follow us</h3><ul><li><a href="contact.html">📸 Instagram</a></li><li><a href="contact.html">▶️ YouTube</a></li><li><a href="contact.html">🐦 X / Twitter</a></li></ul></div>
  </div><p class="copy">© 2026 Tarang – SVIT. All rights reserved.</p></div></footer>`;
  // highlight the link for the current page
  document.querySelectorAll('#menu a').forEach(a => { if(a.getAttribute('href') === page) a.classList.add('active'); });
  const burger = document.getElementById('burger'), menu = document.getElementById('menu');
  // Mobile menu toggle
  burger.onclick = () => { const o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); };
  menu.addEventListener('click', e => { if(e.target.tagName === 'A') menu.classList.remove('open'); });
}
renderLayout();

/* Countdown to the first festival day */
function startCountdown(){
  const box = document.getElementById('countdown'); if(!box) return;
  const target = new Date('2026-11-20T09:00:00');
  function tick(){
    const s = Math.max(0, Math.floor((target - new Date())/1000));
    const v = [['Days',Math.floor(s/86400)],['Hours',Math.floor(s%86400/3600)],['Mins',Math.floor(s%3600/60)],['Secs',s%60]];
    box.innerHTML = v.map(([l,n]) => `<div><b>${String(n).padStart(2,'0')}</b><small>${l}</small></div>`).join('');
  }
  tick(); setInterval(tick, 1000);
}
startCountdown();

/* Announcement cards: click to expand/collapse */
const annBox = document.getElementById('announcements');
if(annBox){
  annBox.innerHTML = ANNOUNCEMENTS.map(a => `<div class="note ${a.type}" tabindex="0" role="button" aria-expanded="false"><span class="ic">${a.icon}</span><div><h3>${a.title}</h3><p class="more">${a.text}</p></div></div>`).join('');
  const toggle = n => { const o = n.classList.toggle('open'); n.setAttribute('aria-expanded', o); };
  annBox.addEventListener('click', e => { const n = e.target.closest('.note'); if(n) toggle(n); });
  annBox.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ const n = e.target.closest('.note'); if(n){ e.preventDefault(); toggle(n); } } });
}

/* Schedule table with day filter */
const schedBody = document.getElementById('scheduleBody');
if(schedBody){
  const bar = document.getElementById('dayFilters');
  bar.innerHTML = ['All Days',...Object.values(DAYS)].map((d,i) => `<button class="${i?'':'on'}" data-day="${i}">${d}</button>`).join('');
  const mins = t => new Date('1/1/2000 ' + t).getHours()*60 + new Date('1/1/2000 ' + t).getMinutes();
  function drawSchedule(day){
    const rows = EVENTS.filter(e => !day || e.day === day).sort((a,b) => a.day-b.day || mins(a.time)-mins(b.time));
    schedBody.innerHTML = rows.map(e => `<tr><td>${fmtDate(e.day)}</td><td>${e.time}</td><td>${e.icon} ${e.name}</td><td>${e.venue}</td></tr>`).join('');
  }
  drawSchedule(0);
  bar.addEventListener('click', e => { const b = e.target.closest('button'); if(!b) return;
    bar.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); drawSchedule(+b.dataset.day); });
}

/* Gallery grid + lightbox */
const gal = document.getElementById('gallery');
if(gal){
  gal.innerHTML = GALLERY.map((g,i) => `<figure tabindex="0" data-i="${i}"><div class="tile" style="background:${GRADS[g.g]}" role="img" aria-label="${g.cap}">${g.icon}</div><figcaption>${g.cap}</figcaption></figure>`).join('');
  const lb = document.getElementById('lightbox'), big = lb.querySelector('.big'), cap = lb.querySelector('p');
  const open = i => { big.style.background = GRADS[GALLERY[i].g]; big.textContent = GALLERY[i].icon; cap.textContent = GALLERY[i].cap; lb.classList.add('show'); };
  const close = () => lb.classList.remove('show');
  gal.addEventListener('click', e => { const f = e.target.closest('figure'); if(f) open(+f.dataset.i); });
  gal.addEventListener('keydown', e => { if(e.key === 'Enter'){ const f = e.target.closest('figure'); if(f) open(+f.dataset.i); } });
  lb.querySelector('button').onclick = close;
  lb.addEventListener('click', e => { if(e.target === lb) close(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') close(); });
}

/* Back-to-top button */
const topBtn = document.getElementById('top');
window.addEventListener('scroll', () => topBtn.classList.toggle('show', scrollY > 400));
topBtn.onclick = () => scrollTo({top:0,behavior:'smooth'});

/* Scroll-spy on the home page: highlight Announcements when it is in view */
const annSec = document.getElementById('announcements-section');
if(annSec && page === 'index.html'){
  const link = document.querySelector('#menu a[href="index.html#announcements"]'), home = document.querySelector('#menu a[href="index.html"]');
  new IntersectionObserver(([en]) => { link.classList.toggle('active', en.isIntersecting); home.classList.toggle('active', !en.isIntersecting); }, {threshold:.4}).observe(annSec);
}

/* Contact form (demo only – nothing is sent) */
const cf = document.getElementById('contactForm');
if(cf) cf.addEventListener('submit', e => {
  e.preventDefault();
  const ok = [...cf.querySelectorAll('[required]')].every(f => f.value.trim());
  const msg = document.getElementById('contactMsg');
  msg.textContent = ok ? '✅ Thanks! The organizing team will reply within 2 days.' : 'Please fill in every field.';
  msg.className = 'ok show'; if(ok) cf.reset();
});
