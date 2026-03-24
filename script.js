// Toggle modo día/noche
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

const lightTheme = {
    '--color-primary': '#0066ff',
    '--color-bg': '#ffffff',
    '--color-text': '#1a1a1a',
    '--color-bg-alt': '#f8f9fa',
    '--color-border': '#e0e0e0'
};

const darkTheme = {
    '--color-primary': '#00ff00',
    '--color-bg': '#000000',
    '--color-text': '#00ff00',
    '--color-bg-alt': '#111111',
    '--color-border': '#333333'
};

let currentTheme = localStorage.getItem('theme') || 'dark';
applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
    themeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

function applyTheme(theme) {
    const themeVars = theme === 'dark' ? darkTheme : lightTheme;
    for (const [key, value] of Object.entries(themeVars)) {
        root.style.setProperty(key, value);
    }
}

// Toggle música
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let musicMuted = true; // Empieza muted

bgMusic.volume = 0; // Silenciado al inicio

musicToggle.addEventListener('click', () => {
    if (musicMuted) {
        bgMusic.volume = 0.3;
        bgMusic.play();
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        bgMusic.volume = 0;
        musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
    musicMuted = !musicMuted;
});

// Activar música al clic en foto de perfil
document.querySelector('.profile-photo img').addEventListener('click', () => {
    bgMusic.volume = 0.3;
    bgMusic.play();
    musicMuted = false;
    musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
});

// Activar música al clic en "Sobre mí"
document.querySelector('a[href="#sobre-mi"]').addEventListener('click', () => {
    bgMusic.volume = 0.3;
    bgMusic.play();
    musicMuted = false;
    musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
});

// Modal para proyectos
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        modalTitle.textContent = card.dataset.title;
        modalDescription.textContent = card.dataset.description;
        modal.style.display = 'block';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Contador de visitas
let visits = localStorage.getItem('visits') || 0;
visits++;
localStorage.setItem('visits', visits);

const visitCounter = document.createElement('div');
visitCounter.textContent = `Visitas: ${visits}`;
visitCounter.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: var(--color-primary);
    color: var(--color-bg);
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    z-index: 1000;
`;
document.body.appendChild(visitCounter);

// Animaciones de entrada al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Aplicar a secciones
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Botón volver arriba
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    background: var(--color-primary);
    color: var(--color-bg);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s, background 0.3s;
    z-index: 1000;
`;
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mostrar/ocultar botón
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.opacity = '1';
    } else {
        backToTopButton.style.opacity = '0';
    }
});

// Efecto typing para el nombre
const nameElement = document.querySelector('header h1.faster-one-regular');
if (nameElement) {
    const text = nameElement.textContent;
    nameElement.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            nameElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    setTimeout(typeWriter, 1000);
}