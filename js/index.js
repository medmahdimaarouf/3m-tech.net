// Cursor
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + "px";
  cursor.style.top = my + "px";
});
function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll("a,button,.service-card,.project-card,.edu-item,.exp-item,.pill").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%,-50%) scale(2.2)";
    ring.style.width = "52px";
    ring.style.height = "52px";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%,-50%) scale(1)";
    ring.style.width = "36px";
    ring.style.height = "36px";
  });
});

// Intersection Observer for fade-up
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        // Animate skill bars
        e.target.querySelectorAll(".skill-fill").forEach((bar) => {
          bar.classList.add("animated");
        });
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

// Also watch skill sections
document.querySelectorAll(".skills-categories > div").forEach((el) => {
  el.querySelectorAll(".skill-fill").forEach((bar) => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) bar.classList.add("animated");
      },
      { threshold: 0.5 }
    );
    io.observe(bar);
  });
});

// Counter animation
function animateCounter(el, target, suffix = "") {
  let start = 0;
  const dur = 1800;
  const startTime = performance.now();
  function step(now) {
    const progress = Math.min((now - startTime) / dur, 1);
    const val = Math.round(progress * target);
    el.textContent = val + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        document.querySelectorAll("[data-count]").forEach((el) => {
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || "+";
          animateCounter(el, target, suffix);
        });
        statsObserver.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);

const statsEl = document.querySelector(".hero-stats");
if (statsEl) statsObserver.observe(statsEl);

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Nav shrink on scroll
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  nav.style.padding = window.scrollY > 50 ? "14px 60px" : "20px 60px";
});
