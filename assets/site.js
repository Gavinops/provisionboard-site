(() => {
  document.documentElement.classList.add('js');
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll('[data-reveal]');
  if (rm || !('IntersectionObserver' in window)) els.forEach(el => el.classList.add('in'));
  else { const io = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: .08 }); els.forEach(el => io.observe(el)); }
  // menu
  const b = document.querySelector('.menu'), n = document.getElementById('links');
  b.addEventListener('click', () => { const o = n.classList.toggle('open'); b.setAttribute('aria-expanded', o); });
  n.addEventListener('click', e => { if (e.target.tagName === 'A') { n.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); } });
  // active nav
  const links = [...n.querySelectorAll('a')], secs = links.map(a => document.querySelector(a.getAttribute('href')));
  const so = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + x.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach(s => s && so.observe(s));
  // gentle parallax on phone media (desktop, motion allowed)
  if (rm) return; const media = [...document.querySelectorAll('.media')]; let tick = false;
  const run = () => { tick = false; if (innerWidth < 820) return; const h = innerHeight; media.forEach(m => { const r = m.getBoundingClientRect(); if (r.bottom < 0 || r.top > h) return; m.style.setProperty('--py', ((r.top + r.height / 2 - h / 2) * -0.06).toFixed(1) + 'px'); }); };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(run); } }, { passive: true }); run();
})();
