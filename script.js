// ===== COMPTE À REBOURS MARIAGE =====

// Date du mariage : 26 août 2027 à 15h
const weddingDate = new Date(2027, 7, 26, 15, 0, 0).getTime();

// Fonction pour animer les chiffres
function animateValue(id, value) {

    const element = document.getElementById(id);

    // ajoute une petite animation
    element.classList.add("flip");

    setTimeout(() => {

        // ajoute un 0 devant si nécessaire
        element.innerText = value < 10 ? "0" + value : value;

        element.classList.remove("flip");

    }, 200);
}


// Mise à jour toutes les secondes
setInterval(function() {

    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {

        document.getElementById("countdown").innerHTML =
        "<h2>✨ C'est le grand jour ✨</h2>";

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

    animateValue("days", days);
    animateValue("hours", hours);
    animateValue("minutes", minutes);
    animateValue("seconds", seconds);

}, 1000);

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.onclick = function() {
    navLinks.classList.toggle("open");
}

// Ferme le menu si on clique sur un lien (pratique sur tel)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.onclick = () => {
        navLinks.classList.remove("open");
    };
});
// ========= Fleche du CAROUSEL  ==========
let currentIndex = 0;
let autoSlideInterval;

function initCarousel() {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;

    const slide = carousel.querySelector('.carousel-slide');
    const images = slide.querySelectorAll('img');
    const totalSlides = images.length;

    // Création automatique des points indicateurs sous le carrousel
    const wrapper = carousel.closest('.carousel-wrapper');
    let dotsContainer = wrapper.querySelector('.carousel-dots');
    
    if (!dotsContainer) {
        dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';
        wrapper.appendChild(dotsContainer);
    }

    dotsContainer.innerHTML = '';
    images.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = idx === 0 ? 'dot active' : 'dot';
        dot.onclick = () => goToSlide(idx);
        dotsContainer.appendChild(dot);
    });

    startAutoSlide();
}

function updateCarousel() {
    const slide = document.getElementById('carousel').querySelector('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    
    slide.style.transform = `translateX(${-currentIndex * 100}%)`;
    
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
    });
}

function moveSlide(direction) {
    const totalSlides = document.getElementById('carousel').querySelectorAll('.carousel-slide img').length;
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    updateCarousel();
    resetAutoSlide(); // Relance le timer pour éviter un double saut
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        const totalSlides = document.getElementById('carousel').querySelectorAll('.carousel-slide img').length;
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }, 4000); // Change de photo toutes les 4 secondes
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Lancement au chargement de la page
document.addEventListener('DOMContentLoaded', initCarousel);

//===== Boutons Lieux ========//
function showLieu(idLieu) {
    // 1. Cacher tous les contenus
    const contenus = document.querySelectorAll('.lieu-content');
    contenus.forEach(c => c.classList.remove('active'));

    // 2. Désactiver tous les boutons
    const boutons = document.querySelectorAll('.tab-btn');
    boutons.forEach(b => b.classList.remove('active'));

    // 3. Afficher le contenu choisi et activer son bouton
    document.getElementById(idLieu).classList.add('active');
    event.currentTarget.classList.add('active');
}

// ========= à la google  ==========
function toggleFAQ(button) {
    const item = button.parentElement;
    
    // Optionnel : ferme les autres questions ouvertes
    /*
    document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) otherItem.classList.remove('active');
    });
    */

    item.classList.toggle('active');
}

// ==========================================================
// GESTION DE L'OUVERTURE DE L'ENVELOPPE AU CLIC
// ==========================================================

//  Écouteur de clic sur le cachet de cire
document.getElementById('wax-seal').addEventListener('click', () => {
  const container = document.getElementById('envelope-container');
  
  // Déclenche l'écartement des volets blancs en CSS
  document.getElementById('envelope').classList.add('opened');
  container.classList.add('opened');
  
  // Fait disparaître immédiatement le bouton du cachet
  document.getElementById('wax-seal').style.display = 'none';

  // Fait disparaître proprement tout le conteneur en fondu
  setTimeout(() => {
    container.style.opacity = '0';
    
    // Une fois invisible, on le retire totalement de l'écran pour pouvoir cliquer sur le site
    setTimeout(() => { 
        container.style.display = 'none'; 
        document.body.style.overflow = 'auto'; // Réactive le scroll du site
    }, 1200);
  }, 2200);
});

// Affiche le texte du cachet dès que les polices d'écriture sont prêtes
document.fonts.ready.then(() => {
  document.querySelector('.curved-text-svg').style.opacity = '1';
});
