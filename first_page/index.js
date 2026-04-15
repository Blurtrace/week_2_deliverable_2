function openModal(id) {
    document.getElementById(id).classList.add('open');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('open');
}

function closeBackground(event, id) {
    if (event.target === event.currentTarget) {
        closeModal(id);
    }
}

const toggle = document.querySelector('.MenuToggle');
const sidebar = document.querySelector('.sidebar');

toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    sidebar.classList.toggle('active');
});

const track      = document.getElementById('carouselTrack');
const cards      = track.querySelectorAll('.pokemon-card');
const dotsContainer = document.getElementById('carouselDots');
const prevBtn    = document.getElementById('prevBtn');
const nextBtn    = document.getElementById('nextBtn');

const visibleCount = 4; // cuántas cards se ven a la vez
const total = cards.length;
let current = 0;
let autoplayTimer;

// Crear dots
const maxDots = total - visibleCount + 1;
for (let i = 0; i < maxDots; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
}

function getCardWidth() {
    return cards[0].offsetWidth + 24; // width + gap
}

function updateDots() {
    document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
    });
}

function goTo(index) {
    current = Math.max(0, Math.min(index, maxDots - 1));
    track.style.transform = `translateX(-${current * getCardWidth()}px)`;
    updateDots();
}

prevBtn.addEventListener('click', () => {
    goTo(current - 1);
    resetAutoplay();
});

nextBtn.addEventListener('click', () => {
    goTo(current + 1);
    resetAutoplay();
});

// Autoplay cada 3 segundos
function startAutoplay() {
    autoplayTimer = setInterval(() => {
        goTo(current < maxDots - 1 ? current + 1 : 0);
    }, 3000);
}

function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
}

startAutoplay();