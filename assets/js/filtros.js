// ============================================================
// FILTROS.JS — filtragem de produtos na seção "Destaques"
// da página index.html.
//
// Dependências (devem ser carregados antes deste arquivo):
//   • produtos.js  — array global `produtos`
//   • cards.js     — função global `generateCardHTML(produto, prefix)`
//
// Uso no HTML:
//   <button onclick="filtrarDestaques('Bolsas', this)" class="filter-tab">
//     Bolsas
//   </button>
// ============================================================

/**
 * Filtra e re-renderiza o grid de destaques da home.
 *
 * @param {string}      categoria  - Categoria a exibir ou "Todos"
 * @param {HTMLElement} el         - Botão clicado (recebe classe .active)
 */
function filtrarDestaques(categoria, el) {
  const grid = document.getElementById("grid-destaques");
  if (!grid) return; // página sem grid de destaques (ex.: catálogo)

  // ---- Atualiza estado visual dos tabs ----
  document.querySelectorAll(".filter-tab").forEach((btn) => {
    btn.classList.remove("active");
  });
  if (el) el.classList.add("active");

  // ---- Fade-out antes de trocar o conteúdo ----
  // A opacidade é controlada por CSS: #grid-destaques { transition: opacity … }
  grid.style.opacity = "0";

  setTimeout(() => {
    // ---- Filtra por destaque e, opcionalmente, por categoria ----
    let filtered = produtos.filter((p) => p.destaque);

    if (categoria !== "Todos") {
      filtered = filtered.filter((p) => p.categoria === categoria);
    }

    // Limita a 4 cards para não quebrar o layout de 4 colunas
    filtered = filtered.slice(0, 4);

    // ---- Renderiza os cards ou mensagem de estado vazio ----
    grid.innerHTML =
      filtered.length > 0
        ? filtered.map((p) => generateCardHTML(p, "destaque")).join("")
        : `<p class="empty-products">Novidades chegando em breve! 🧶</p>`;

    // ---- Fade-in com o novo conteúdo ----
    grid.style.opacity = "1";
  }, 200); // duração deve coincidir com a transition do CSS
}
