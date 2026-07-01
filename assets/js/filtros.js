// ============================================================
// FILTROS.JS — destaques da home
// Agora o atelier trabalha apenas com bolsas.
// ============================================================

function filtrarDestaques(categoria = "Bolsas", el = null) {
  const grid = document.getElementById("grid-destaques");
  if (!grid) return;

  document.querySelectorAll(".filter-tab").forEach((btn) => {
    btn.classList.remove("active");
  });
  if (el) el.classList.add("active");

  grid.style.opacity = "0";

  setTimeout(() => {
    const filtered = produtos
      .filter((p) => p.destaque && p.categoria === "Bolsas")
      .slice(0, 4);

    grid.innerHTML =
      filtered.length > 0
        ? filtered.map((p) => generateCardHTML(p, "destaque")).join("")
        : `<p class="empty-products">Novas bolsas chegando em breve! 🧶</p>`;

    grid.style.opacity = "1";
  }, 200);
}
