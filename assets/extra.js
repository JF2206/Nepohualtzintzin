document.addEventListener("DOMContentLoaded", function () {
  const OFFSET = 0;

  // Scroll suave
  document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = decodeURIComponent(this.getAttribute("href").substring(1));
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - OFFSET,
          behavior: "smooth"
        });
      }
    });
  });

  // Fade-in al cargar
  document.body.classList.add("page-loaded");

  // Fade-out antes de cambiar de página
  document.querySelectorAll("a.md-nav__link, a.md-nav__title, a.md-footer__link").forEach(link => {
    link.addEventListener("click", function (e) {
      const url = new URL(link.href);
      const current = window.location.pathname;

      if (url.origin === window.location.origin && url.pathname !== current) {
        e.preventDefault(); // Cancelar navegación inmediata

        document.body.classList.remove("page-loaded"); // Inicia fade-out

        setTimeout(() => {
          window.location.href = link.href; // Redirige tras animación
        }, 250); // Espera 250ms (ajustable al gusto)
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Obtener el tema guardado en localStorage
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    // Aplicar el tema guardado (oscuro o claro) inmediatamente
    document.documentElement.setAttribute("data-theme", savedTheme);
  } else {
    // Si no hay tema guardado, aplicar el tema claro por defecto
    document.documentElement.setAttribute("data-theme", "light");
  }

  // Detectar el cambio de tema y guardarlo en localStorage
  const toggle = document.querySelector(".md-header__toggle");

  if (toggle) {
    toggle.addEventListener("click", function() {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "light" ? "dark" : "light";
      
      // Guardar el tema seleccionado en localStorage
      localStorage.setItem("theme", newTheme);
      
      // Cambiar el atributo data-theme
      document.documentElement.setAttribute("data-theme", newTheme);
    });
  }
});


