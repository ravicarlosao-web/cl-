import './style.css';

console.log('Sizzer 3D Carousel Initializing...');

const baseArtists = [
  { name: 'The Beatles', label: 'CAPITOL RECORDS [LEGACY]', src: 'https://images.unsplash.com/photo-1593697821252-0c9137d9fc45?auto=format&fit=crop&q=80&w=600' },
  { name: 'NF', label: 'CAPITOL RECORDS / CCMG', src: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=600' },
  { name: 'Niall Horan', label: 'CAPITOL RECORDS', src: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600' },
  { name: 'Alessia Cara', label: 'DEF JAM', src: 'https://images.unsplash.com/photo-1513258496099-48166d281d2f?auto=format&fit=crop&q=80&w=600' },
  { name: 'Halsey', label: 'CAPITOL RECORDS', src: 'https://images.unsplash.com/photo-1525207797960-e41da98ecfb0?auto=format&fit=crop&q=80&w=600' },
  { name: 'Katy Perry', label: 'CAPITOL RECORDS', src: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=600' },
  { name: 'Sam Smith', label: 'CAPITOL RECORDS', src: 'https://images.unsplash.com/photo-1520638062013-108bb67fc9b4?auto=format&fit=crop&q=80&w=600' },
  { name: 'Troye Sivan', label: 'EMI MUSIC', src: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f458?auto=format&fit=crop&q=80&w=600' },
  { name: 'Maggie Rogers', label: 'CAPITOL RECORDS', src: 'https://images.unsplash.com/photo-1516280440504-45ea0fcb5cbc?auto=format&fit=crop&q=80&w=600' },
  { name: 'Lewis Capaldi', label: 'CAPITOL RECORDS', src: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&q=80&w=600' },
  { name: 'Fletcher', label: 'CAPITOL RECORDS', src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600' },
  { name: 'Paul McCartney', label: 'MPL COMMUNICATIONS', src: 'https://images.unsplash.com/photo-1549419163-fdf9d1cf324c?auto=format&fit=crop&q=80&w=600' }
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
document.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  angleStart = currentAngle;
  document.body.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
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
  startX = e.touches[0].clientX;
  angleStart = currentAngle;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const dx = e.touches[0].clientX - startX;
  currentAngle = angleStart + (dx * 0.25);
}, { passive: true });

document.addEventListener('touchend', stopDrag);

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

  // 4. Após a animação dos cards terminar (~1.75s + 0.9s de transição + 0.28s delay = ~3s),
  //    contrai a secção para a altura real dos cards
  setTimeout(() => {
    if (stickyEl) {
      stickyEl.classList.add('compact');
    }
  }, 3100);
}

if (sequenceSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) playSequence();
    });
  }, { threshold: 0.25 });

  observer.observe(sequenceSection);
}

// -------------------------------------
// CARD HOVER → FUNDO DINÂMICO
// Cada card activa o seu bg-layer correspondente
// -------------------------------------

const cardWrappers = document.querySelectorAll('.cards-grid .card-wrapper');
const bgLayers     = document.querySelectorAll('.bg-layer');
const cardsGrid    = document.querySelector('.cards-grid');

cardWrappers.forEach((card, index) => {
  card.addEventListener('mouseenter', () => {
    bgLayers.forEach(l => l.classList.remove('active'));
    bgLayers[index]?.classList.add('active');
  });
});

// Remove fundo ao sair do grid todo
cardsGrid?.addEventListener('mouseleave', () => {
  bgLayers.forEach(l => l.classList.remove('active'));
});
