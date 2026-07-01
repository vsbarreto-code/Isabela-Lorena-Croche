// ============================================================
// MAIN.JS — inicialização geral
// ============================================================

// ---- ANO DINÂMICO NO FOOTER ----
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ---- MENU MOBILE ----
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.toggle("hidden");
    menuBtn.setAttribute("aria-expanded", String(!isHidden));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// ---- GRID DE DESTAQUES (home) ----
const firstFilterTab = document.querySelector(".filter-tab");
if (typeof filtrarDestaques === "function") {
  filtrarDestaques("Bolsas", firstFilterTab);
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
