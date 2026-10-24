
// --- Typewriter Effect ---
const roles = [
    "Cybersecurity Researcher", 
    "Cloud Engineer", 
    "Application Developer",
    "Bug Hunter"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter");

function typeWriter() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typewriterElement.textContent = currentRole.substring(0, charIndex);

    // Kecepatan ketik
    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000; // Jeda setelah kata selesai
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Jeda sebelum mengetik kata baru
    }

    setTimeout(typeWriter, typeSpeed);
}

// Mulai typewriter setelah halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    if(roles.length) setTimeout(typeWriter, 1000);
});

// --- Scroll Reveal Animation ---
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 120; // Jarak dari bawah layar untuk memicu animasi

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
reveal(); // Trigger saat pertama diload

// --- Navbar efek Blur/Shadow saat di-scroll ---
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(13, 17, 23, 0.95)";
        navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.4)";
    } else {
        navbar.style.background = "rgba(13, 17, 23, 0.8)";
        navbar.style.boxShadow = "none";
    }
});

// --- Carousel / Slider Dinamis & Otomatis (Multi-Carousel Support) ---
const carouselState = {};
const carouselIntervals = {};

function updateCarousel(carouselId) {
    const container = document.getElementById(carouselId);
    if (!container) return;

    const track = container.querySelector('.carousel-track');
    const images = container.querySelectorAll('.carousel-img');
    const dots = container.querySelectorAll('.carousel-dots .dot');
    
    if (!images.length) return;

    // Pastikan index melingkar (looping)
    let index = carouselState[carouselId] || 0;
    if (index >= images.length) index = 0;
    if (index < 0) index = images.length - 1;
    carouselState[carouselId] = index;

    // Geser presisi sesuai lebar kontainer masing-masing
    const width = container.clientWidth;
    track.style.transform = `translateX(-${index * width}px)`;

    // Update status dot aktif
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function moveSlide(direction, carouselId) {
    if (carouselState[carouselId] === undefined) {
        carouselState[carouselId] = 0;
    }
    carouselState[carouselId] += direction;
    updateCarousel(carouselId);
}

function goToSlide(index, carouselId) {
    carouselState[carouselId] = index;
    updateCarousel(carouselId);
}

function startAutoSlide(carouselId) {
    stopAutoSlide(carouselId);
    carouselIntervals[carouselId] = setInterval(() => {
        moveSlide(1, carouselId);
    }, 3500);
}

function stopAutoSlide(carouselId) {
    if (carouselIntervals[carouselId]) {
        clearInterval(carouselIntervals[carouselId]);
    }
}

// Inisialisasi otomatis semua slider yang ada di website
document.addEventListener("DOMContentLoaded", () => {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach((container) => {
        const carouselId = container.id;
        if (!carouselId) return;

        carouselState[carouselId] = 0;
        updateCarousel(carouselId);
        startAutoSlide(carouselId);

        // Pause auto-slide saat mouse diarahkan ke slider
        container.addEventListener('mouseenter', () => stopAutoSlide(carouselId));
        container.addEventListener('mouseleave', () => startAutoSlide(carouselId));
    });

    // Menyesuaikan posisi gambar saat ukuran browser di-resize
    window.addEventListener('resize', () => {
        carousels.forEach((container) => {
            if (container.id) updateCarousel(container.id);
        });
    });
});