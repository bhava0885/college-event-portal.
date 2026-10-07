/* registration.js – validation + confirmation for the registration form */
const form = document.getElementById('regForm');
const eventSel = document.getElementById('event');
eventSel.innerHTML = '<option value="">-- Choose an event --</option>' + EVENTS.map(e => `<option value="${e.id}">${e.name} (${e.cat})</option>`).join('');
// Pre-select the event when arriving from "Register Now" (register.html?event=3)
const pre = new URLSearchParams(location.search).get('event'); if(pre) eventSel.value = pre;

// Show the team name field only for team entries
const teamBox = document.getElementById('teamBox');
form.querySelectorAll('[name=mode]').forEach(r => r.addEventListener('change', () => { teamBox.hidden = form.mode.value !== 'Team'; }));

/* Show or clear an error message under a field; returns true if valid */
function setError(id, message){
  document.getElementById(id + 'Err').textContent = message;
  document.getElementById(id).classList.toggle('bad', !!message);
  return !message;
}

/* Check every field; returns true only if all are valid */
function validate(){
  const v = id => document.getElementById(id).value.trim();
  let ok = true;
  ok = setError('name', v('name').length < 3 ? 'Enter your full name (min 3 letters).' : '') && ok;
  ok = setError('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email')) ? '' : 'Enter a valid email address.') && ok;
  ok = setError('phone', /^[6-9]\d{9}$/.test(v('phone')) ? '' : 'Enter a 10-digit Indian mobile number.') && ok;
  ok = setError('college', v('college') ? '' : 'Enter your college and department.') && ok;
  ok = setError('year', v('year') ? '' : 'Select your year of study.') && ok;
  ok = setError('event', v('event') ? '' : 'Choose an event.') && ok;
  ok = setError('team', form.mode.value === 'Team' && v('team').length < 2 ? 'Enter a team name.' : '') && ok;
  const t = document.getElementById('terms');
  document.getElementById('termsErr').textContent = t.checked ? '' : 'Please accept the terms.';
  return ok && t.checked;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if(!validate()) return;
  const ev = EVENTS.find(x => x.id === +eventSel.value);
  const ref = 'TRG' + Math.floor(100000 + Math.random()*900000); // demo reference number
  const box = document.getElementById('success');
  box.innerHTML = `<h3>🎉 Registration successful!</h3><p>Thanks, <b>${document.getElementById('name').value.trim()}</b>. You are registered for <b>${ev.name}</b> on ${fmtDate(ev.day)} at ${ev.time}, ${ev.venue}.</p><p>Confirmation ID: <b>${ref}</b> (demo only – no data was sent).</p>`;
  box.classList.add('show'); box.scrollIntoView({behavior:'smooth',block:'center'});
  form.reset(); teamBox.hidden = true;
});
