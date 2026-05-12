const APP_NAME = "Brainosaur";

const nameNodes = document.querySelectorAll("[data-app-name]");
nameNodes.forEach(node => {
  node.textContent = APP_NAME;
});
document.title = `${APP_NAME} - AI Learning Platform`;

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

const revealSections = document.querySelectorAll(".section-reveal");
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);
revealSections.forEach(section => revealObserver.observe(section));

const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach(item => {
  const button = item.querySelector(".faq-q");
  if (!button) return;
  button.addEventListener("click", () => {
    faqItems.forEach(node => node.classList.remove("open"));
    item.classList.add("open");
  });
});

const courseTrack = document.getElementById("courseTrack");
const prevCourse = document.getElementById("prevCourse");
const nextCourse = document.getElementById("nextCourse");
let courseIndex = 0;

function carouselStepSize() {
  if (!courseTrack) return 0;
  const card = courseTrack.querySelector(".course-card");
  if (!card) return 0;
  const gap = 14;
  return card.getBoundingClientRect().width + gap;
}

function visibleCardsCount() {
  if (window.innerWidth <= 620) return 1;
  if (window.innerWidth <= 1100) return 2;
  return 4;
}

function maxCourseIndex() {
  if (!courseTrack) return 0;
  const total = courseTrack.querySelectorAll(".course-card").length;
  return Math.max(0, total - visibleCardsCount());
}

function updateCarousel() {
  if (!courseTrack) return;
  const step = carouselStepSize();
  courseTrack.style.transform = `translateX(-${courseIndex * step}px)`;
}

if (prevCourse && nextCourse && courseTrack) {
  prevCourse.addEventListener("click", () => {
    courseIndex = Math.max(0, courseIndex - 1);
    updateCarousel();
  });

  nextCourse.addEventListener("click", () => {
    courseIndex = Math.min(maxCourseIndex(), courseIndex + 1);
    updateCarousel();
  });

  window.addEventListener("resize", () => {
    courseIndex = Math.min(courseIndex, maxCourseIndex());
    updateCarousel();
  });
}

const particlesCanvas = document.getElementById("particles");
const particleContext = particlesCanvas ? particlesCanvas.getContext("2d") : null;
const particles = [];

function resizeParticles() {
  if (!particlesCanvas || !particleContext) return;
  particlesCanvas.width = window.innerWidth;
  particlesCanvas.height = window.innerHeight;
}

function makeParticle() {
  return {
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.9 + 0.8,
    vx: (Math.random() - 0.5) * 0.24,
    vy: (Math.random() - 0.5) * 0.24,
    hue: Math.random() > 0.5 ? 195 : 260
  };
}

function initParticles() {
  if (!particlesCanvas || !particleContext) return;
  resizeParticles();
  particles.length = 0;
  const count = Math.min(120, Math.floor(window.innerWidth / 12));
  for (let index = 0; index < count; index += 1) {
    particles.push(makeParticle());
  }
}

function drawParticles() {
  if (!particlesCanvas || !particleContext) return;
  particleContext.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
  particles.forEach(point => {
    point.x += point.vx;
    point.y += point.vy;

    if (point.x < -10) point.x = window.innerWidth + 10;
    if (point.x > window.innerWidth + 10) point.x = -10;
    if (point.y < -10) point.y = window.innerHeight + 10;
    if (point.y > window.innerHeight + 10) point.y = -10;

    particleContext.beginPath();
    particleContext.fillStyle = `hsla(${point.hue}, 100%, 70%, 0.55)`;
    particleContext.arc(point.x, point.y, point.r, 0, Math.PI * 2);
    particleContext.fill();
  });
  window.requestAnimationFrame(drawParticles);
}

initParticles();
drawParticles();
window.addEventListener("resize", initParticles);

