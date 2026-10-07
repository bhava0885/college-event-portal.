/* events.js – sample data + event card rendering/filtering */
const CATEGORIES = ['Technical','Cultural','Sports','Workshops','Gaming','Literary'];
const GRADS = {Technical:'linear-gradient(135deg,#19c3b1,#2b6cff)',Cultural:'linear-gradient(135deg,#ff5a5f,#ffb627)',Sports:'linear-gradient(135deg,#34d399,#0ea5a4)',Workshops:'linear-gradient(135deg,#9b7bff,#ff5a9d)',Gaming:'linear-gradient(135deg,#6d28d9,#19c3b1)',Literary:'linear-gradient(135deg,#f59e0b,#be123c)'};
// day: 1-3 (20-22 Nov 2026)
const EVENTS = [
 {id:1,name:'CodeStorm Hackathon',cat:'Technical',day:1,time:'09:00 AM',venue:'CS Block, Lab 3',icon:'💻',desc:'A 24-hour hackathon to build solutions for campus problems.',featured:true},
 {id:2,name:'RoboWars',cat:'Technical',day:2,time:'11:00 AM',venue:'Mech Arena',icon:'🤖',desc:'Build and battle remote-controlled bots in a knockout arena.',featured:true},
 {id:3,name:'Nrityanjali Dance Battle',cat:'Cultural',day:1,time:'05:00 PM',venue:'Open Air Theatre',icon:'💃',desc:'Classical, folk and western dance showdown between colleges.',featured:true},
 {id:4,name:'Battle of Bands',cat:'Cultural',day:3,time:'06:30 PM',venue:'Main Stage',icon:'🎸',desc:'Live band competition with a celebrity judging panel.',featured:true},
 {id:5,name:'Inter-College Cricket',cat:'Sports',day:2,time:'08:00 AM',venue:'College Ground',icon:'🏏',desc:'T10 knockout tournament for teams of eight.'},
 {id:6,name:'Futsal Face-off',cat:'Sports',day:3,time:'09:00 AM',venue:'Indoor Court',icon:'⚽',desc:'5-a-side futsal with league and final rounds.'},
 {id:7,name:'UI/UX Design Workshop',cat:'Workshops',day:1,time:'11:00 AM',venue:'Seminar Hall A',icon:'🎨',desc:'Hands-on Figma workshop led by industry designers.'},
 {id:8,name:'AI in Practice',cat:'Workshops',day:2,time:'02:00 PM',venue:'Seminar Hall B',icon:'🧠',desc:'Build a small machine-learning app in two hours.'},
 {id:9,name:'Valorant Showdown',cat:'Gaming',day:2,time:'03:00 PM',venue:'Gaming Zone, Library Block',icon:'🎮',desc:'5v5 esports tournament with a cash prize pool.'},
 {id:10,name:'Mobile Gaming League',cat:'Gaming',day:3,time:'10:30 AM',venue:'Gaming Zone, Library Block',icon:'📱',desc:'Squad-based mobile battle royale for all skill levels.'},
 {id:11,name:'Slam Poetry Night',cat:'Literary',day:1,time:'07:00 PM',venue:'Amphitheatre',icon:'🎤',desc:'Perform original poems in Tamil, English or Hindi.'},
 {id:12,name:'Quiz Quest',cat:'Literary',day:3,time:'01:00 PM',venue:'Auditorium',icon:'❓',desc:'A general-knowledge quiz with rapid-fire and buzzer rounds.'}
];
const DAYS = {1:'Fri, 20 Nov',2:'Sat, 21 Nov',3:'Sun, 22 Nov'};
const ANNOUNCEMENTS = [
 {type:'deadline',icon:'⏰',title:'Registration closes 15 November',text:'Last date to register for all events is 15 Nov, 11:59 PM. Late entries will not be accepted.'},
 {type:'venue',icon:'📍',title:'Battle of Bands moved to Main Stage',text:'Due to expected crowd size, the event shifts from the Auditorium to the Main Stage.'},
 {type:'competition',icon:'🏆',title:'Prize pool raised to ₹2,50,000',text:'Thanks to new sponsors, winners across all categories will receive bigger prizes.'},
 {type:'update',icon:'📢',title:'Food court opens Day 1 at 8 AM',text:'Over 20 stalls will be available near the Central Lawn all three days.'}
];
const GALLERY = [
 {icon:'🎤',cap:'Opening night 2025',g:'Cultural'},{icon:'🤖',cap:'RoboWars finals',g:'Technical'},{icon:'🏏',cap:'Cricket final',g:'Sports'},
 {icon:'💃',cap:'Dance battle',g:'Cultural'},{icon:'🎮',cap:'Esports arena',g:'Gaming'},{icon:'🧠',cap:'AI workshop',g:'Workshops'},
 {icon:'🎸',cap:'Band night',g:'Cultural'},{icon:'📚',cap:'Literary meet',g:'Literary'},{icon:'🏆',cap:'Prize ceremony',g:'Technical'}
];
const fmtDate = d => DAYS[d];

/* Build one event card as an HTML string */
function eventCard(e){
  return `<article class="card"><div class="thumb" style="background:${GRADS[e.cat]}" aria-hidden="true">${e.icon}</div>
  <div class="body"><span class="tag">${e.cat}</span><h3>${e.name}</h3>
  <p class="meta">📅 ${fmtDate(e.day)} &nbsp; 🕒 ${e.time}<br>📍 ${e.venue}</p><p>${e.desc}</p>
  <div class="actions"><button class="btn ghost sm" data-details="${e.id}">View Details</button>
  <a class="btn primary sm" href="register.html?event=${e.id}">Register Now</a></div></div></article>`;
}

/* Render a list of events into a container */
function renderEvents(list, box){
  box.innerHTML = list.length ? list.map(eventCard).join('') : '<p>No events in this category yet.</p>';
}

/* Details popup using the native <dialog> element */
function showDetails(id){
  const e = EVENTS.find(x => x.id === id);
  let dlg = document.getElementById('detailDlg');
  if(!dlg){ dlg = document.createElement('dialog'); dlg.id = 'detailDlg'; document.body.appendChild(dlg); }
  dlg.innerHTML = `<h2>${e.icon} ${e.name}</h2><p class="tag">${e.cat}</p><p style="margin:.8rem 0">${e.desc}</p>
  <p>📅 ${fmtDate(e.day)}, 2026<br>🕒 ${e.time}<br>📍 ${e.venue}</p>
  <div style="display:flex;gap:.6rem;margin-top:1.2rem"><a class="btn primary sm" href="register.html?event=${e.id}">Register Now</a>
  <button class="btn ghost sm" id="closeDlg">Close</button></div>`;
  dlg.showModal();
  document.getElementById('closeDlg').onclick = () => dlg.close();
}
document.addEventListener('click', ev => { const b = ev.target.closest('[data-details]'); if(b) showDetails(+b.dataset.details); });

/* Category filter buttons (events page) */
function setupEventFilter(){
  const box = document.getElementById('eventGrid'), bar = document.getElementById('eventFilters');
  if(!box || !bar) return;
  bar.innerHTML = ['All',...CATEGORIES].map((c,i) => `<button class="${i?'':'on'}" data-cat="${c}">${c}</button>`).join('');
  renderEvents(EVENTS, box);
  bar.addEventListener('click', ev => {
    const b = ev.target.closest('button'); if(!b) return;
    bar.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
    renderEvents(b.dataset.cat === 'All' ? EVENTS : EVENTS.filter(e => e.cat === b.dataset.cat), box);
  });
}
setupEventFilter();
const feat = document.getElementById('featuredGrid');
if(feat) renderEvents(EVENTS.filter(e => e.featured), feat);
