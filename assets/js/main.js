// ============================================================
// MAIN.JS — inicialização geral, presente em todas as páginas
//
// Ordem de carregamento (fim do <body>):
//   1. produtos.js   — dados dos produtos
//   2. cards.js      — gerador de HTML de card
//   3. filtros.js    — lógica de filtragem (apenas na home)
//   4. main.js       ← este arquivo
// ============================================================

// ---- ANO DINÂMICO NO FOOTER ----
// Evita ter que atualizar o copyright manualmente todo ano.
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ---- MENU MOBILE ----
// Alterna a classe .hidden no painel mobile ao clicar no hambúrguer.
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.toggle("hidden");

    // Atualiza atributo ARIA para leitores de tela
    menuBtn.setAttribute("aria-expanded", String(!isHidden));
  });

  // Fecha o menu ao clicar em qualquer link interno (melhoria UX)
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// ---- GRID DE DESTAQUES (home) ----
// Renderiza o tab "Todos" ao carregar, se a função e o grid existirem.
const firstFilterTab = document.querySelector(".filter-tab");
if (typeof filtrarDestaques === "function" && firstFilterTab) {
  filtrarDestaques("Todos", firstFilterTab);
}

// ---- GRID CATÁLOGO — BOLSAS ----
const gridBolsas = document.getElementById("grid-bolsas");
if (gridBolsas) {
  const bolsas = produtos.filter((p) => p.categoria === "Bolsas");

  gridBolsas.innerHTML =
    bolsas.length > 0
      ? bolsas.map((p) => generateCardHTML(p, "bolsas")).join("")
      : `<p class="catalog-empty">Nenhuma bolsa disponível no momento.</p>`;
}

// ---- GRID CATÁLOGO — DECORAÇÃO ----
const gridDecoracao = document.getElementById("grid-decoracao");
if (gridDecoracao) {
  const decoracao = produtos.filter((p) => p.categoria === "Decoração");

  gridDecoracao.innerHTML =
    decoracao.length > 0
      ? decoracao.map((p) => generateCardHTML(p, "decoracao")).join("")
      : `<p class="catalog-empty">Nenhuma peça de decoração disponível no momento.</p>`;
}

// ---- GRID CATÁLOGO — VESTIDOS ----
const gridVestidos = document.getElementById("grid-vestidos");
if (gridVestidos) {
  const vestidos = produtos.filter((p) => p.categoria === "Vestidos");

  gridVestidos.innerHTML =
    vestidos.length > 0
      ? vestidos.map((p) => generateCardHTML(p, "vestidos")).join("")
      : `<p class="catalog-empty">Nenhum vestido disponível no momento.</p>`;
}
