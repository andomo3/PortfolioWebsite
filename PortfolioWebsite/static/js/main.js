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

  const revealTargets = new Set();

  document.querySelectorAll(".hero-balanced").forEach((el) => revealTargets.add(el));
  document.querySelectorAll(".builder-rich-text").forEach((el) => revealTargets.add(el));

  document.querySelectorAll(".project-card").forEach((card) => {
    const row = card.closest(".row");
    if (row) {
      revealTargets.add(row);
    }
  });

  document.querySelectorAll(".experience-card").forEach((card) => {
    const section = card.closest(".section-block") || card;
    revealTargets.add(section);
  });

  revealTargets.forEach((el) => el.classList.add("reveal-on-scroll"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
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
