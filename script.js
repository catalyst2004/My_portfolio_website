// ── Mark body as JS-ready immediately.
// This enables reveal animations in CSS (.js-ready .reveal).
// Without this, all content stays fully visible — no blank page ever.
document.body.classList.add('js-ready');

/* ── TYPING EFFECT ── */
const phrases = ['Aspiring Developer', 'Web Developer', 'IoT Enthusiast', 'Problem Solver', 'CS Student'];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed-text');
function type() {
  const phrase = phrases[pi];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++ci);
    if (ci === phrase.length) { deleting = true; setTimeout(type, 2000); return; }
  } else {
    typedEl.textContent = phrase.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 55 : 95);
}
setTimeout(type, 800);

/* ── NAV / SCROLL ── */
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
  // Active nav link
  let current = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

/* ── MOBILE MENU ── */
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  document.getElementById('nav-links').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}));

/* ── REVEAL ANIMATIONS ──
   Runs multiple times to handle slow GitHub Pages loads.
*/
function triggerReveal() {
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight + 60) {
      el.classList.add('visible');
    }
  });
}
triggerReveal();
setTimeout(triggerReveal, 100);
setTimeout(triggerReveal, 300);
setTimeout(triggerReveal, 600);
document.addEventListener('DOMContentLoaded', triggerReveal);
window.addEventListener('load', triggerReveal);
window.addEventListener('scroll', triggerReveal);

/* ── SKILL BAR ANIMATIONS ── */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(f => {
        f.style.width = f.dataset.width + '%';
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-group').forEach(el => barObs.observe(el));

/* ── CONTACT FORM ── */
function handleSubmit(e) {
  e.preventDefault();
  const fb = document.getElementById('form-feedback');
  fb.className = 'form-feedback success';
  fb.textContent = '✓ Your message has been sent. Vicky will be in touch soon!';
  e.target.reset();
  setTimeout(() => { fb.className = 'form-feedback'; fb.textContent = ''; }, 6000);
}
