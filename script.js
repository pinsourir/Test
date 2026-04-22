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

function moveSlide(direction) {
    const slide = document.getElementById('carousel').querySelector('.carousel-slide');
    const totalSlides = slide.querySelectorAll('img').length;
    
    currentIndex += direction;

    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    }

    const offset = -currentIndex * 100;
    slide.style.transform = `translateX(${offset}%)`;
}

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

// ========= carousel notre histoire  ==========
// ========= Nouveau CAROUSEL CERCLE (Histoire) ==========
let indexHistoire = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide-histoire'); // On cible les slides du cercle
    
    // On cache la slide actuelle
    slides[indexHistoire].classList.remove('active');
    
    // On calcule le nouvel index
    indexHistoire += direction;

    if (indexHistoire >= slides.length) {
        indexHistoire = 0;
    } else if (indexHistoire < 0) {
        indexHistoire = slides.length - 1;
    }

    // On affiche la nouvelle slide
    slides[indexHistoire].classList.add('active');
}
// Fait tourner le cercle automatiquement toutes les 5 secondes
setInterval(() => changeSlide(1), 5000);
