/* 1) Nom animé lettre par lettre */
function buildName(id, text, startDelay, extraClass){
  const el = document.getElementById(id);
  if(extraClass) el.classList.add(extraClass);
  [...text].forEach((ch, i) => {
    const s = document.createElement('span');
    s.className = 'letter';
    s.textContent = ch;
    s.style.setProperty('--d', (startDelay + i * 0.07) + 's');
    el.appendChild(s);
  });
}
buildName('first', 'Douaa', 0.2);
buildName('last', 'Mahieddine', 0.6, 'second');

/* 2) Texte qui s'écrit tout seul */
const phrases = [
  "Étudiante à l'Université Blida 1",
  "Bienvenue sur mon portfolio",
  "Découvrez mes travaux"
];
const typed = document.getElementById('typed');
let p = 0, c = 0, deleting = false;
function type(){
  const word = phrases[p];
  typed.textContent = word.slice(0, c);
  if(!deleting && c < word.length){ c++; setTimeout(type, 70); }
  else if(!deleting){ deleting = true; setTimeout(type, 1800); }
  else if(c > 0){ c--; setTimeout(type, 35); }
  else { deleting = false; p = (p + 1) % phrases.length; setTimeout(type, 400); }
}
setTimeout(type, 2700);

/* 3) Apparition au scroll */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 3) * 0.12 + 's';
  io.observe(el);
});

/* 4) Lumière qui suit la souris */
const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

/* 5) Effet 3D sur les cartes */
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-6px)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});

/* 6) Année du footer */
document.getElementById('year').textContent = new Date().getFullYear();