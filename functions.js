/* ===========================
   Minimal enhancements
=========================== */

// 1) Projects grid (add items here as you build)
const projects = [
    {
      title: "Roll the Dice",
      blurb:
        "A quick dice roller with single or double dice modes — handy for board games or odds.",
      tags: ["HTML", "CSS", "JavaScript"],
      link: "https://darwinsdicegame.netlify.app/"
    },
    // Example to add:
    // { title: "Strength Therapy", blurb: "Fitness app in React + Express.", tags: ["React","Node","MySQL"], link: "https://..." }
  ];
  
  const grid = document.getElementById("projectGrid");
  if (grid) {
    grid.innerHTML = projects
      .map(
        (p) => `<article class="card reveal">
          <h3>${p.title}</h3>
          <p>${p.blurb}</p>
          <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
          <a class="more btn" href="${p.link}" target="_blank" rel="noopener">Open</a>
        </article>`
      )
      .join("");
  }
  
  // 2) Reveal-on-scroll
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => e.isIntersecting && e.target.classList.add("show"));
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  
  // 3) Active nav link on scroll
  const sections = [...document.querySelectorAll("section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const setActive = () => {
    const y = scrollY + innerHeight * 0.3;
    let current = sections[0]?.id;
    for (const s of sections) if (s.offsetTop <= y) current = s.id;
    navLinks.forEach((a) => a.setAttribute("aria-current", a.getAttribute("href") === `#${current}` ? "true" : "false"));
  };
  addEventListener("scroll", setActive, { passive: true });
  setActive();
  
  // 4) Theme toggle (persists)
  const themeToggle = document.getElementById("themeToggle");
  const applyTheme = (t) => document.documentElement.setAttribute("data-theme", t);
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) applyTheme(savedTheme);
  themeToggle?.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });
  
  // 5) Contact form UX (shows success/error inline)
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      formStatus.textContent = "Sending…";
      try {
        const data = new FormData(contactForm);
        const res = await fetch(contactForm.action, { method: "POST", body: data, headers: { Accept: "application/json" }});
        if (res.ok) {
          contactForm.reset();
          formStatus.textContent = "Thanks! I’ll get back to you soon.";
        } else {
          formStatus.textContent = "Something went wrong. Please email me directly.";
        }
      } catch {
        formStatus.textContent = "Network error. Please try again later.";
      }
    });
  }
  
  // 6) Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  