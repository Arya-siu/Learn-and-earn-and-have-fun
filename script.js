const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

const sections = document.querySelectorAll(".section-reveal");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);
sections.forEach(section => observer.observe(section));

const testimonials = [
  { text: "My son completed geometry topics faster because visuals made everything easy.", by: "Parent - Kavya" },
  { text: "I earned cashback coins after buying notebooks from marketplace.", by: "Student - Arjun" },
  { text: "The AI assistant explained robotics wiring step by step for homework.", by: "Parent - Niharika" },
  { text: "Triangles and circles are now simple for me after interactive practice.", by: "Student - Aadhya" },
  { text: "I can track my child progress and wallet top-ups in one place.", by: "Parent - Rahul" },
  { text: "Coding tasks feel like a game because rewards come with every challenge.", by: "Student - Sana" }
];

const stage = document.getElementById("testimonialStage");

function spawnTestimonial() {
  if (!stage) return;
  const item = testimonials[Math.floor(Math.random() * testimonials.length)];
  const note = document.createElement("div");
  note.className = "toast-note";
  note.innerHTML = `<p>${item.text}</p><span>${item.by}</span>`;
  const top = Math.random() * 68 + 8;
  const left = Math.random() * 64 + 3;
  note.style.top = `${top}%`;
  note.style.left = `${left}%`;
  stage.appendChild(note);
  window.setTimeout(() => note.remove(), 4600);
}

spawnTestimonial();
window.setInterval(spawnTestimonial, 2200);
