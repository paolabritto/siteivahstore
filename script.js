// Ativa o estado "js" para liberar as animações de entrada no CSS
document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");
const menu = document.getElementById("menu");
const toggle = document.getElementById("menuToggle");

// ===== Header ganha fundo sólido ao rolar a página =====
function atualizarHeader() {
  header.classList.toggle("scrolled", window.scrollY > 40);
}
atualizarHeader();
window.addEventListener("scroll", atualizarHeader, { passive: true });

// ===== Menu hambúrguer (celular) =====
function fecharMenu() {
  menu.classList.remove("open");
  toggle.classList.remove("active");
  header.classList.remove("menu-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Abrir menu");
}

toggle.addEventListener("click", () => {
  const abrindo = !menu.classList.contains("open");
  menu.classList.toggle("open", abrindo);
  toggle.classList.toggle("active", abrindo);
  header.classList.toggle("menu-open", abrindo);
  toggle.setAttribute("aria-expanded", String(abrindo));
  toggle.setAttribute("aria-label", abrindo ? "Fechar menu" : "Abrir menu");
});

// Fecha o menu ao clicar em um link ou ao apertar Esc
menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", fecharMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fecharMenu();
});

// Se a tela voltar a ser grande, garante o menu fechado
window.addEventListener("resize", () => {
  if (window.innerWidth > 960) fecharMenu();
});

// ===== Animação de entrada (fade-in ao rolar) =====
const itens = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  itens.forEach((item) => observer.observe(item));
} else {
  // Navegadores antigos: mostra tudo sem animação
  itens.forEach((item) => item.classList.add("visible"));
}