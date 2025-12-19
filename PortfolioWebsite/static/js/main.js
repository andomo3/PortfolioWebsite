document.addEventListener("DOMContentLoaded", () => {
  const navToggler = document.querySelector(".navbar-toggler");
  const navCollapse = document.querySelector("#navbarNav");

  if (navToggler && navCollapse) {
    navToggler.addEventListener("click", () => {
      const isOpen = navCollapse.classList.toggle("show");
      navToggler.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }
});
