const clock = document.getElementById("clock");
function tick() {
  const now = new Date();
  const t = now.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Luanda"
  });
  if (clock) clock.textContent = `LUANDA · ${t}`;
}
tick();
setInterval(tick, 30000);

const progress = document.getElementById("progress");
const nav = document.getElementById("nav");
function onScroll() {
  const h = document.documentElement;
  const pct = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
  if (progress) progress.style.transform = `scaleX(${pct})`;
  if (nav) {
    if (window.scrollY > 60) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
);
document.querySelectorAll(".rev").forEach(el => io.observe(el));

const sideLinks = [...document.querySelectorAll(".side-index a")];
const sections = sideLinks.map(a => document.getElementById(a.dataset.for));
const sIo = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        sideLinks.forEach(a => {
          a.classList.toggle("active", a.dataset.for === id);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -40% 0px" }
);
sections.forEach(s => s && sIo.observe(s));

const cursor = document.getElementById("cursor");
let cx = 0;
let cy = 0;
let tx = 0;
let ty = 0;
window.addEventListener("mousemove", e => {
  tx = e.clientX;
  ty = e.clientY;
});

function cursorLoop() {
  cx += (tx - cx) * 0.22;
  cy += (ty - cy) * 0.22;
  if (cursor) {
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
  }
  requestAnimationFrame(cursorLoop);
}
cursorLoop();

document.querySelectorAll("a, button, .btn, .card, input, textarea").forEach(el => {
  el.addEventListener("mouseenter", () => cursor?.classList.add("big"));
  el.addEventListener("mouseleave", () => cursor?.classList.remove("big"));
});
