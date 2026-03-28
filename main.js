import './style.css';

console.log('Sizzer 3D Carousel Initializing...');

const baseArtists = [
  { name: 'The Beatles', label: 'CAPITOL RECORDS [LEGACY]', tagline: 'O som que mudou o mundo para sempre', src: 'https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?auto=format&fit=crop&q=80&w=600', photo: 'https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?auto=format&fit=crop&q=85&w=1000&h=1200' },
  { name: 'NF', label: 'CAPITOL RECORDS / CCMG', tagline: 'Hip-hop que faz a mente pensar alto', src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=600', photo: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=85&w=1000&h=1200' },
  { name: 'Niall Horan', label: 'CAPITOL RECORDS', tagline: 'Pop com alma que toca o coração', src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600', photo: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=85&w=1000&h=1200' },
  { name: 'Alessia Cara', label: 'DEF JAM', tagline: 'Voz autêntica de uma geração inteira', src: 'https://images.unsplash.com/photo-1513258496099-48166d281d2f?auto=format&fit=crop&q=80&w=600', photo: 'https://images.unsplash.com/photo-1513258496099-48166d281d2f?auto=format&fit=crop&q=85&w=1000&h=1200' },
  { name: 'Halsey', label: 'CAPITOL RECORDS', tagline: 'Arte sem filtros, emoção pura e crua', src: 'https://images.unsplash.com/photo-1525207797960-e41da98ecfb0?auto=format&fit=crop&q=80&w=600', photo: 'https://images.unsplash.com/photo-1525207797960-e41da98ecfb0?auto=format&fit=crop&q=85&w=1000&h=1200' },
  { name: 'Katy Perry', label: 'CAPITOL RECORDS', tagline: 'Energia que incendeia qualquer palco', src: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=600', photo: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=85&w=1000&h=1200' },
  { name: 'Sam Smith', label: 'CAPITOL RECORDS', tagline: 'Cada nota conta uma história única', src: 'https://images.unsplash.com/photo-1520638062013-108bb67fc9b4?auto=format&fit=crop&q=80&w=600', photo: 'https://images.unsplash.com/photo-1520638062013-108bb67fc9b4?auto=format&fit=crop&q=85&w=1000&h=1200' },
  { name: 'Troye Sivan', label: 'EMI MUSIC', tagline: 'Pop alternativo com visão de futuro', src: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f458?auto=format&fit=crop&q=80&w=600', photo: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f458?auto=format&fit=crop&q=85&w=1000&h=1200' },
  { name: 'Maggie Rogers', label: 'CAPITOL RECORDS', tagline: 'Folk e electrónica em perfeita harmonia', src: 'https://images.unsplash.com/photo-1516280440504-45ea0fcb5cbc?auto=format&fit=crop&q=80&w=600', photo: 'https://images.unsplash.com/photo-1516280440504-45ea0fcb5cbc?auto=format&fit=crop&q=85&w=1000&h=1200' },
  { name: 'Lewis Capaldi', label: 'CAPITOL RECORDS', tagline: 'Alma escocesa que emociona o planeta', src: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&q=80&w=600', photo: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&q=85&w=1000&h=1200' },
  { name: 'Fletcher', label: 'CAPITOL RECORDS', tagline: 'Pop visceral com letras que partem o peito', src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600', photo: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=85&w=1000&h=1200' },
  { name: 'Paul McCartney', label: 'MPL COMMUNICATIONS', tagline: 'Uma lenda viva que nunca deixa de criar', src: 'https://images.unsplash.com/photo-1549419163-fdf9d1cf324c?auto=format&fit=crop&q=80&w=600', photo: 'https://images.unsplash.com/photo-1549419163-fdf9d1cf324c?auto=format&fit=crop&q=85&w=1000&h=1200' }
];

// Duplicamos o array de base para 24 itens, criando o diâmetro largo exigido.
const artists = [...baseArtists, ...baseArtists];

const carousel = document.getElementById('carousel');
const cellCount = artists.length;
let radius = 0;
let cellSize = 250; 
let currentAngle = 0;
let isDragging = false;
let startX = 0;
let angleStart = 0;
let rotationSpeed = 0.03; // Velocidade bem mais lenta e agradável, conforme solicitado.
let tiltAngle = -5; // Ângulo para simular a vista levemente superior ("de cima").
let lastTimestamp = 0;

artists.forEach((artist) => {
  const cell = document.createElement('div');
  cell.className = 'carousel-cell';
  
  const img = document.createElement('div');
  img.className = 'card-image';
  img.style.backgroundImage = `url(${artist.src})`;
  
  const info = document.createElement('div');
  info.className = 'card-info';
  
  const h3 = document.createElement('h3');
  h3.textContent = artist.name;
  
  const p = document.createElement('p');
  p.textContent = artist.label;
  
  info.appendChild(h3);
  info.appendChild(p);
  cell.appendChild(img);
  cell.appendChild(info);

  // Clique vs. drag diretamente na célula:
  // stopPropagation no mousedown evita que o document inicie o modo arrastar
  let pdownX = 0, pdownY = 0, pdownTime = 0;

  cell.addEventListener('mousedown', (e) => {
    e.stopPropagation();
  });
  cell.addEventListener('pointerdown', (e) => {
    pdownX    = e.clientX;
    pdownY    = e.clientY;
    pdownTime = Date.now();
  });
  cell.addEventListener('pointerup', (e) => {
    const held = Date.now() - pdownTime;
    const dist = Math.hypot(e.clientX - pdownX, e.clientY - pdownY);
    if (held < 500 && dist < 14) {
      openArtistModal(artist);
    }
  });

  carousel.appendChild(cell);
});

const cells = document.querySelectorAll('.carousel-cell');

function setupCarousel() {
  cellSize = cells[0].offsetWidth || 200;
  // Aumentando exponencialmente o arco da carta (Carta + Espaço em branco) para expandir a roda horizontalmente
  let gapSpace = window.innerWidth > 1024 ? 80 : (window.innerWidth > 768 ? 50 : 20);
  let effectiveCellSize = cellSize + gapSpace;
  radius = Math.round( ( effectiveCellSize / 2 ) / Math.tan( Math.PI / cellCount ) ); 
  
  cells.forEach((cell, i) => {
    const angle = (360 / cellCount) * i;
    cell.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
  });
}

setupCarousel();
window.addEventListener('resize', setupCarousel);

function animate(time) {
  if (!lastTimestamp) lastTimestamp = time;
  const dt = time - lastTimestamp;
  lastTimestamp = time;

  if (!isDragging) {
    currentAngle -= rotationSpeed * (dt / 16); 
  }
  
  // Inclinação agressiva para a câmera parecer estar filmando de cima e translação Z para não explodir a tela
  carousel.style.transform = `translateZ(${-radius}px) rotateX(-14deg) rotateY(${currentAngle}deg)`;

  // A matemática de opacidade que joga sombra no fundo segue inalterada
  cells.forEach((cell, i) => {
    let cellAngle = (360 / cellCount) * i;
     let absoluteRotation = (cellAngle + currentAngle) % 360;
     if (absoluteRotation < 0) absoluteRotation += 360; 
     
     let distanceToFront = Math.min(absoluteRotation, 360 - absoluteRotation);
     let darkness = distanceToFront / 180; 
     
     // 0.15 permite que fique visível ao fundo mas de forma esfumaçada, refletindo sua referência escurecida.
     let brightness = 1 - (darkness * 0.85);
     cell.style.filter = `brightness(${brightness.toFixed(2)})`;
  });

  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// Interações
let dragMoved = false;

document.addEventListener('mousedown', (e) => {
  isDragging = true;
  dragMoved = false;
  startX = e.clientX;
  angleStart = currentAngle;
  document.body.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  if (Math.abs(dx) > 6) dragMoved = true;
  currentAngle = angleStart + (dx * 0.2); 
});

const stopDrag = () => {
  isDragging = false;
  document.body.style.cursor = 'default';
};

document.addEventListener('mouseup', stopDrag);
document.addEventListener('mouseleave', stopDrag);

document.addEventListener('touchstart', (e) => {
  isDragging = true;
  dragMoved = false;
  startX = e.touches[0].clientX;
  angleStart = currentAngle;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const dx = e.touches[0].clientX - startX;
  if (Math.abs(dx) > 6) dragMoved = true;
  currentAngle = angleStart + (dx * 0.25);
}, { passive: true });

document.addEventListener('touchend', stopDrag);

// ================================================
// ARTIST MODAL — abrir/fechar com animação suave
// ================================================
const artistModal    = document.getElementById('artist-modal');
const modalBackdrop  = document.getElementById('modal-backdrop');
const modalCloseBtn  = document.getElementById('modal-close');
const modalHeadline  = document.getElementById('modal-headline');
const modalLabelEl   = document.getElementById('modal-label');
const modalImg       = document.getElementById('modal-img');
const modalNameEls   = artistModal?.querySelectorAll('.navlink-name');

function openArtistModal(artist) {
  if (!artistModal) return;
  modalLabelEl.textContent   = artist.label;
  modalHeadline.textContent  = artist.tagline;
  modalImg.src               = artist.photo;
  modalImg.alt               = artist.name;
  modalNameEls?.forEach(el => (el.textContent = artist.name));

  artistModal.classList.add('is-open');
  artistModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeArtistModal() {
  if (!artistModal) return;
  artistModal.classList.remove('is-open');
  artistModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalBackdrop?.addEventListener('click', closeArtistModal);
modalCloseBtn?.addEventListener('click', closeArtistModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeArtistModal(); });

// Animação de Entrada Premium (Revealing UI Elements de forma fluída)
function triggerEntrance() {
  const header = document.querySelector('.header');
  if (header) header.classList.add('loaded');
  
  // Stagger effect: efeito dominó cadenciado. Caindo um a um devagar e longo.
  cells.forEach((cell, i) => {
    setTimeout(() => {
      cell.classList.add('loaded');
    }, 500 + (i * 180)); // Cada carta aguarda 180 milisegundos a mais, garantindo 100% visibilidade individual
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', triggerEntrance);
} else {
  triggerEntrance();
}

// Lógica de Integração do Menu Mobile Responsivo
const navToggle = document.getElementById('mobile-menu-btn');
const navLinks = document.getElementById('nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-elem').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// -------------------------------------
// SEQUÊNCIA AUTOMÁTICA (texto → cards)
// Disparada quando a secção entra no viewport
// -------------------------------------

const sequenceSection  = document.querySelector('.scroll-sequence-wrapper');
const cinematicText    = document.querySelector('.cinematic-text');
const threeCardsEl     = document.querySelector('.three-cards-container');
const stickyEl         = document.querySelector('.scroll-sequence-sticky');

let sequencePlayed = false;

// Scroll suave com easing personalizado (easeInOutQuart)
// Muito mais confortável do que o scrollIntoView nativo do browser
function smoothScrollToCenter(element, duration) {
  const rect    = element.getBoundingClientRect();
  const center  = rect.top + rect.height / 2;
  const target  = window.scrollY + center - window.innerHeight / 2;
  const startY  = window.scrollY;
  const dist    = target - startY;
  const t0      = performance.now();

  function ease(t) {
    // easeInOutQuart: arranque e travagem muito suaves
    return t < 0.5
      ? 8 * t * t * t * t
      : 1 - Math.pow(-2 * t + 2, 4) / 2;
  }

  function step(now) {
    const p = Math.min((now - t0) / duration, 1);
    window.scrollTo(0, startY + dist * ease(p));
    if (p < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function playSequence() {
  if (sequencePlayed) return;
  sequencePlayed = true;

  // 1. Texto entra
  cinematicText.classList.add('text-in');

  // 2. Após 1.1s o texto sai
  setTimeout(() => {
    cinematicText.classList.remove('text-in');
    cinematicText.classList.add('text-exit');
  }, 1100);

  // 3. Após 1.75s os cards sobem
  setTimeout(() => {
    if (threeCardsEl) {
      threeCardsEl.classList.add('cards-in', 'active');
    }
  }, 1750);

  // 4. Após a animação dos cards terminar, fixa a secção em 100vh e centra no viewport
  setTimeout(() => {
    if (stickyEl) {
      stickyEl.classList.add('compact');
      // Centra suavemente a secção com easing personalizado (muito mais confortável)
      setTimeout(() => {
        smoothScrollToCenter(stickyEl, 1400);
      }, 300);
    }
  }, 3100);
}

// Reinicia toda a secção para o estado inicial (silencioso, sem animação)
function resetSequence() {
  sequencePlayed = false;

  // Texto cinematic volta ao estado escondido
  cinematicText?.classList.remove('text-in', 'text-exit');

  // Cards voltam ao estado inicial (escondidos)
  threeCardsEl?.classList.remove('cards-in', 'active');

  // Secção volta à altura completa (remove compact)
  stickyEl?.classList.remove('compact');
}

if (sequenceSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) playSequence();
    });
  }, { threshold: 0.25 });

  observer.observe(sequenceSection);
}

// Observa o Hero: quando fica visível novamente (scroll para cima),
// reinicia a animação — mas só se ela já tiver corrido antes
const heroEl = document.querySelector('.hero-scene');
if (heroEl) {
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && sequencePlayed) {
        resetSequence();
      }
    });
  }, { threshold: 0.2 });

  heroObserver.observe(heroEl);
}

// -------------------------------------
// CARD HOVER → FUNDO DINÂMICO + TEXTO ANIMADO PALAVRA A PALAVRA
// -------------------------------------

const cardWrappers = document.querySelectorAll('.cards-grid .card-wrapper');
const bgLayers     = document.querySelectorAll('.bg-layer');
const cardsGrid    = document.querySelector('.cards-grid');

const labelSlot = document.querySelector('.label-slot');
const dateSlot  = document.querySelector('.date-slot');

const DEFAULT_LABEL = 'AGENDA DE SHOW DA CLÈ';
const DEFAULT_DATE  = '';

const cardData = [
  { label: 'TRAPLANDIA 2ª EDIÇÃO', date: '02.05.2026' },
  { label: 'PERFORMER SHOW',       date: '15.06.2026' },
  { label: 'BELO — MAPUTO',        date: '24.06.2026' },
];

// Constrói word-spans dentro de um tray, já no estado inicial (visible ou hidden)
function buildWords(tray, text, visible) {
  tray.innerHTML = '';
  const words = text ? text.split(' ').filter(Boolean) : [];
  words.forEach(word => {
    const w = document.createElement('span');
    w.className = 'slot-word';
    w.textContent = word;
    w.style.transform = visible ? 'translateY(0)' : 'translateY(-70%)';
    w.style.opacity   = visible ? '1' : '0';
    tray.appendChild(w);
  });
}

// Anima as palavras de um tray para dentro (entrando de cima para baixo)
function animateWordsIn(tray, stagger = 0.18) {
  tray.querySelectorAll('.slot-word').forEach((w, i) => {
    w.style.transition = 'none';
    w.style.transform  = 'translateY(-80%)';
    w.style.opacity    = '0';
    void w.offsetWidth;
    w.style.transition = `transform 1s cubic-bezier(0.16,1,0.3,1) ${i * stagger}s, opacity 0.8s ease ${i * stagger}s`;
    w.style.transform  = 'translateY(0)';
    w.style.opacity    = '1';
  });
}

// Anima as palavras de um tray para fora (saindo para baixo)
function animateWordsOut(tray, stagger = 0.12) {
  tray.querySelectorAll('.slot-word').forEach((w, i) => {
    w.style.transition = `transform 0.7s cubic-bezier(0.4,0,0.6,1) ${i * stagger}s, opacity 0.55s ease ${i * stagger}s`;
    w.style.transform  = 'translateY(80%)';
    w.style.opacity    = '0';
  });
}

// Troca o texto de um slot com animação de palavras
function animateSlot(slot, newText) {
  if (!slot) return;
  const trays  = slot.querySelectorAll('.tray');
  const active = Array.from(trays).find(t => t.dataset.active === 'true');
  const next   = Array.from(trays).find(t => t.dataset.active === 'false');
  if (!active || !next) return;

  buildWords(next, newText, false);
  next.dataset.active   = 'true';
  active.dataset.active = 'false';

  animateWordsOut(active);
  animateWordsIn(next);
}

// Inicializa o texto padrão sem animação
function initSlot(slot, text) {
  if (!slot) return;
  const active = slot.querySelector('[data-active="true"]');
  if (active) buildWords(active, text, true);
}

initSlot(labelSlot, DEFAULT_LABEL);
initSlot(dateSlot,  DEFAULT_DATE);


cardWrappers.forEach((card, index) => {
  card.addEventListener('mouseenter', () => {
    bgLayers.forEach(l => l.classList.remove('active'));
    bgLayers[index]?.classList.add('active');

    const data = cardData[index];
    if (data) {
      animateSlot(labelSlot, data.label);
      animateSlot(dateSlot,  data.date);
    }
  });
});

cardsGrid?.addEventListener('mouseleave', () => {
  bgLayers.forEach(l => l.classList.remove('active'));
  animateSlot(labelSlot, DEFAULT_LABEL);
  animateSlot(dateSlot,  DEFAULT_DATE);
});
