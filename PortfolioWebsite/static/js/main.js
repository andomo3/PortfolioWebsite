document.addEventListener("DOMContentLoaded", () => {
  const navToggler = document.querySelector(".navbar-toggler");
  const navCollapse = document.querySelector("#navbarNav");

  if (navToggler && navCollapse) {
    navToggler.addEventListener("click", () => {
      const isOpen = navCollapse.classList.toggle("show");
      navToggler.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  const body = document.body;
  body.classList.add("is-loaded");
  body.classList.remove("is-leaving");

  window.addEventListener("pageshow", () => {
    body.classList.add("is-loaded");
    body.classList.remove("is-leaving");
  });

  const revealContainers = document.querySelectorAll("main, .section-block, .hero-balanced");
  const revealTargets = new Set();

  revealContainers.forEach((container) => {
    const items = container.querySelectorAll(
      "h1, h2, h3, h4, p, li, img, video, .status-badge, .chip, .btn, .card, .project-card, .experience-card, .builder-rich-text, .builder-rich-text-body"
    );
    items.forEach((item, index) => {
      item.classList.add("reveal-on-scroll");
      item.style.setProperty("--reveal-delay", `${index * 60}ms`);
      revealTargets.add(item);
    });
  });

  document.querySelectorAll(".card-premium, .project-card, .experience-card").forEach((card) => {
    card.classList.add("reveal-on-scroll");
    revealTargets.add(card);
  });

  document.querySelectorAll(".project-card").forEach((card, index) => {
    card.style.setProperty("--reveal-delay", `${index * 65}ms`);
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio || 0;
          if (ratio >= 0.3) {
            entry.target.classList.add("is-visible");
          } else if (ratio <= 0.1) {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: [0.1, 0.3], rootMargin: "0px 0px -5% 0px" }
    );

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  document.querySelectorAll("a[href]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      const target = link.getAttribute("target");
      const isAnchor = href && href.startsWith("#");
      const isExternal = href && /^(https?:)?\/\//.test(href) && !href.includes(window.location.host);
      const isModified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

      if (isModified || target === "_blank" || isAnchor || isExternal) {
        return;
      }

      if (href && href.startsWith("/")) {
        event.preventDefault();
        body.classList.add("is-leaving");
        window.setTimeout(() => {
          window.location.href = href;
        }, 40);
      }
    });
  });
});
