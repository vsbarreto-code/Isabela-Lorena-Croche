// ============================================================
// CORES-UI.JS — renderização da página e da prévia de cores
// Depende do arquivo cores.js.
// ============================================================

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function criarLinkWhatsApp(grupoNome, corNome) {
  const mensagem = `Olá! Gostaria de encomendar uma bolsa na cor ${corNome}, do ${grupoNome}. Pode me passar mais detalhes?`;
  return `https://wa.me/${WHATSAPP_LOJA}?text=${encodeURIComponent(mensagem)}`;
}

function criarCardCor(cor, grupo) {
  const borda = cor.borda || "#9B8D7E";

  return `
    <article class="color-card" data-grupo="${grupo.id}" data-nome="${normalizarTexto(cor.nome)} ${normalizarTexto(grupo.nome)}">
      <div class="color-swatch" style="--swatch: ${cor.hex}; --swatch-border: ${borda};" aria-hidden="true"></div>

      <div class="color-card-content">
        <h3>${cor.nome}</h3>
        <p>${grupo.nome}</p>
      </div>

      <a
        class="color-order"
        href="${criarLinkWhatsApp(grupo.nome, cor.nome)}"
        target="_blank"
        rel="noopener"
        aria-label="Encomendar bolsa na cor ${cor.nome}"
      >
        Escolher cor
      </a>
    </article>
  `;
}

function renderizarPaginaCores() {
  const grid = document.getElementById("colors-grid");
  const filtros = document.getElementById("colors-filters");
  const busca = document.getElementById("colors-search");
  const contador = document.getElementById("colors-count");

  if (!grid || typeof gruposDeCores === "undefined") return;

  const todasAsCores = gruposDeCores.flatMap((grupo) =>
    grupo.cores.map((cor) => ({ cor, grupo }))
  );

  function atualizarContador(total) {
    if (!contador) return;
    contador.textContent = `${total} ${total === 1 ? "cor disponível" : "cores disponíveis"}`;
  }

  function renderizar(lista) {
    grid.innerHTML = lista.length
      ? lista.map(({ cor, grupo }) => criarCardCor(cor, grupo)).join("")
      : `<p class="colors-empty">Nenhuma cor encontrada com esse nome.</p>`;

    atualizarContador(lista.length);
  }

  function aplicarFiltros() {
    const filtroAtivo = filtros?.querySelector(".color-filter.active")?.dataset.filter || "todos";
    const termo = normalizarTexto(busca?.value || "");

    const filtradas = todasAsCores.filter(({ cor, grupo }) => {
      const combinaGrupo = filtroAtivo === "todos" || grupo.id === filtroAtivo;
      const textoBusca = `${normalizarTexto(cor.nome)} ${normalizarTexto(grupo.nome)}`;
      const combinaBusca = !termo || textoBusca.includes(termo);
      return combinaGrupo && combinaBusca;
    });

    renderizar(filtradas);
  }

  if (filtros) {
    filtros.innerHTML = `
      <button class="color-filter active" data-filter="todos" type="button">Todas</button>
      ${gruposDeCores
        .map(
          (grupo) =>
            `<button class="color-filter" data-filter="${grupo.id}" type="button">${grupo.nome}</button>`
        )
        .join("")}
    `;

    filtros.addEventListener("click", (event) => {
      const botao = event.target.closest(".color-filter");
      if (!botao) return;

      filtros.querySelectorAll(".color-filter").forEach((item) => {
        item.classList.remove("active");
      });

      botao.classList.add("active");
      aplicarFiltros();
    });
  }

  if (busca) {
    busca.addEventListener("input", aplicarFiltros);
  }

  renderizar(todasAsCores);
}

function renderizarPreviewCoresHome() {
  const preview = document.getElementById("home-colors-preview");
  if (!preview || typeof gruposDeCores === "undefined") return;

  const coresPreview = gruposDeCores.flatMap((grupo) =>
    grupo.cores.slice(0, 6).map((cor) => ({ cor, grupo }))
  );

  preview.innerHTML = coresPreview
    .map(
      ({ cor, grupo }) => `
        <a
          class="home-color-dot"
          href="cores.html"
          title="${cor.nome} - ${grupo.nome}"
          style="--swatch: ${cor.hex}; --swatch-border: ${cor.borda || "#9B8D7E"};"
          aria-label="Ver cor ${cor.nome}"
        ></a>
      `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarPaginaCores();
  renderizarPreviewCoresHome();
});
