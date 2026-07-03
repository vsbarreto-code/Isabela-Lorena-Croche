// ============================================================
// PRODUTO-DETALHE.JS — página individual da bolsa
// Usa: produto.html?id=1, produto.html?id=2, etc.
// ============================================================

(function () {
  const root = document.getElementById("produto-detalhe-root");
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const produto = produtos.find((p) => p.id === id);

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalizarImagens(produto) {
    const imagens = [];
    const usados = new Set();

    function adicionar(item, fallbackLegenda = "Foto da bolsa") {
      if (!item) return;

      const imagem = typeof item === "string" ? item : item.imagem;
      if (!imagem || usados.has(imagem)) return;

      imagens.push({
        imagem,
        legenda:
          typeof item === "string"
            ? fallbackLegenda
            : item.legenda || item.corNome || fallbackLegenda,
        corNome: typeof item === "string" ? null : item.corNome || null,
      });

      usados.add(imagem);
    }

    (produto.galeria || []).forEach((item) => adicionar(item));

    (produto.variantes || []).forEach((item) =>
      adicionar(
        item,
        item.corNome ? `Variação ${item.corNome}` : "Variação da bolsa",
      ),
    );

    if (imagens.length === 0) {
      imagens.push({
        imagem: FALLBACK_SVG,
        legenda: "Foto da bolsa",
      });
    }

    return imagens;
  }

  function getFioById(fioId) {
    return fiosDisponiveis.find((fio) => fio.id === fioId);
  }

  function getCorById(fioId, corId) {
    const fio = getFioById(fioId);
    return fio?.cores.find((cor) => cor.id === corId);
  }

  if (!produto) {
    document.title = "Bolsa não encontrada | Isabela Lorena Crochê";

    root.innerHTML = `
      <div class="produto-not-found">
        <span class="section-label">Produto não encontrado</span>
        <h1 class="section-title">Não encontrei essa bolsa.</h1>
        <p>
          O link pode estar incorreto ou o produto pode ter sido removido do catálogo.
        </p>
        <a class="btn-dark" href="bolsas.html">Voltar para bolsas</a>
      </div>
    `;

    return;
  }

  window.produtoAtual = produto;

  document.title = `${produto.nome} | Isabela Lorena Crochê`;

  const imagens = normalizarImagens(produto);
  const detalhes = produto.detalhes || {};
  const diferenciais = detalhes.diferenciais || [
    "Peça artesanal feita com cuidado",
    "Produção sob encomenda pelo WhatsApp",
    "Possibilidade de verificar cores disponíveis",
  ];

  let imagemAtual = 0;
  let autoplay = null;
  let fioSelecionado = "";
  let corSelecionada = "";

  function renderPrice(produto) {
    if (typeof generatePriceHTML === "function") {
      return generatePriceHTML(produto);
    }

    if (!produto.preco) return "";

    return `
      <div class="product-price">
        <div class="price-line price-pix">
          <span>Pix</span>
          <strong>${escapeHTML(produto.preco.pix)}</strong>
        </div>

        <div class="price-line">
          <span>Cartão</span>
          <strong>
            ${produto.preco.parcelas}x de ${escapeHTML(produto.preco.valorParcela)}
          </strong>
        </div>

        <small>Total parcelado: ${escapeHTML(produto.preco.parcelado)}</small>
      </div>
    `;
  }

  function renderThumbs() {
    return imagens
      .map(
        (foto, index) => `
          <button
            type="button"
            class="gallery-thumb ${index === 0 ? "active" : ""}"
            data-index="${index}"
            aria-label="Ver imagem ${index + 1} de ${imagens.length}"
          >
            <img
              src="${escapeHTML(foto.imagem)}"
              alt="${escapeHTML(foto.legenda)}"
              loading="lazy"
            />
          </button>
        `,
      )
      .join("");
  }

  function renderOpcoesProducao(produto) {
    if (!produto.opcoesProducao || produto.opcoesProducao.length === 0) {
      return `
        <section class="produto-production-section">
          <p class="detail-label">Cores e fios</p>

          <p class="production-help">
            Este modelo pode ter opções de cores sob consulta. Chame no WhatsApp
            para verificar disponibilidade do fio e da cor desejada.
          </p>
        </section>
      `;
    }

    return `
      <section class="produto-production-section">
        <p class="detail-label">Escolha o fio e a cor</p>

        <p class="production-help">
          Nem todos os modelos podem ser feitos com todos os fios. Escolha uma
          opção disponível abaixo e confirme a produção pelo WhatsApp.
        </p>

        <div class="production-fios">
          ${produto.opcoesProducao
            .map((opcao, index) => {
              const fio = getFioById(opcao.fioId);
              if (!fio) return "";

              return `
                <button
                  type="button"
                  class="production-fio-btn ${index === 0 ? "active" : ""}"
                  data-fio-id="${escapeHTML(fio.id)}"
                >
                  ${escapeHTML(fio.nome)}
                </button>
              `;
            })
            .join("")}
        </div>

        <div class="production-colors">
          ${produto.opcoesProducao
            .map((opcao, index) => {
              const fio = getFioById(opcao.fioId);
              if (!fio) return "";

              return `
                <div
                  class="production-color-group ${index === 0 ? "active" : ""}"
                  data-fio-id="${escapeHTML(fio.id)}"
                >
                  ${opcao.cores
                    .map((item) => {
                      const cor = getCorById(fio.id, item.corId);
                      if (!cor) return "";

                      const disponivel = item.disponivel !== false;

                      return `
                        <button
                          type="button"
                          class="production-color-dot ${
                            disponivel ? "" : "unavailable"
                          }"
                          style="--color: ${escapeHTML(cor.corHex)}"
                          data-fio-id="${escapeHTML(fio.id)}"
                          data-fio-nome="${escapeHTML(fio.nome)}"
                          data-cor-id="${escapeHTML(cor.id)}"
                          data-cor-nome="${escapeHTML(cor.nome)}"
                          data-imagem="${escapeHTML(item.imagem || "")}"
                          title="${escapeHTML(cor.nome)}${
                            disponivel ? "" : " — indisponível"
                          }"
                          aria-label="${escapeHTML(cor.nome)}${
                            disponivel ? "" : " indisponível"
                          }"
                          ${disponivel ? "" : "disabled"}
                        >
                          <span></span>
                        </button>
                      `;
                    })
                    .join("")}
                </div>
              `;
            })
            .join("")}
        </div>

        <p class="selected-production-text" id="selected-production-text">
          Selecione uma cor disponível.
        </p>
      </section>
    `;
  }

  function getLinkWhatsApp() {
    let mensagem = `Olá! Tenho interesse na ${produto.nome}.`;

    if (fioSelecionado && corSelecionada) {
      mensagem += ` Gostaria de encomendar no ${fioSelecionado}, cor ${corSelecionada}.`;
    } else {
      mensagem += ` Gostaria de saber disponibilidade, prazo de produção e opções de cores.`;
    }

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      mensagem,
    )}`;
  }

  root.innerHTML = `
    <div class="produto-detail-grid">
      <div class="produto-gallery">
        <div class="gallery-main-wrap">
          <img
            id="gallery-main-img"
            class="gallery-main-img"
            src="${escapeHTML(imagens[0].imagem)}"
            alt="${escapeHTML(imagens[0].legenda)}"
          />

          ${
            imagens.length > 1
              ? `
                <button
                  class="gallery-nav gallery-prev"
                  id="gallery-prev"
                  type="button"
                  aria-label="Imagem anterior"
                >
                  <i class="fa-solid fa-chevron-left"></i>
                </button>

                <button
                  class="gallery-nav gallery-next"
                  id="gallery-next"
                  type="button"
                  aria-label="Próxima imagem"
                >
                  <i class="fa-solid fa-chevron-right"></i>
                </button>

                <span class="gallery-counter" id="gallery-counter">
                  1 / ${imagens.length}
                </span>
              `
              : ""
          }
        </div>

        <p class="gallery-caption" id="gallery-caption">
          ${escapeHTML(imagens[0].legenda)}
        </p>

        ${
          imagens.length > 1
            ? `<div class="gallery-thumbs">${renderThumbs()}</div>`
            : ""
        }
      </div>

      <article class="produto-info">
        <a href="bolsas.html" class="back-link">
          <i class="fa-solid fa-arrow-left"></i>
          Voltar para bolsas
        </a>

        <span class="section-label">Detalhes da bolsa</span>

        <h1 class="section-title">${escapeHTML(produto.nome)}</h1>

        <p class="produto-subtitle">
          ${escapeHTML(detalhes.subtitulo || produto.descricao || "")}
        </p>

        <p class="produto-description">
          ${escapeHTML(produto.descricaoDetalhada || produto.descricao || "")}
        </p>

        ${renderPrice(produto)}

        ${renderOpcoesProducao(produto)}

        <div class="produto-actions-main">
          <a
            id="produto-wa-btn"
            class="btn-whatsapp"
            href="${getLinkWhatsApp()}"
            target="_blank"
            rel="noopener"
          >
            <i class="fa-brands fa-whatsapp"></i>
            Encomendar pelo WhatsApp
          </a>

          <a class="btn-details btn-secondary-detail" href="bolsas.html">
            <i class="fa-solid fa-bag-shopping"></i>
            Ver catálogo
          </a>
        </div>

        <div class="produto-detail-card">
          <h2>Por que essa bolsa encanta?</h2>

          <ul>
            ${diferenciais
              .map((item) => `<li>${escapeHTML(item)}</li>`)
              .join("")}
          </ul>
        </div>

        <div class="produto-meta-grid">
          <div>
            <span>Material</span>
            <strong>${escapeHTML(detalhes.material || "Sob consulta")}</strong>
          </div>

          <div>
            <span>Medidas</span>
            <strong>${escapeHTML(detalhes.medidas || "Sob consulta")}</strong>
          </div>

          <div>
            <span>Prazo</span>
            <strong>${escapeHTML(detalhes.prazo || "Sob consulta")}</strong>
          </div>

          <div>
            <span>Entrega</span>
            <strong>Entregas e retiradas locais em Aracaju, SE.</strong>
          </div>
        </div>
      </article>
    </div>
  `;

  const mainImg = document.getElementById("gallery-main-img");
  const caption = document.getElementById("gallery-caption");
  const counter = document.getElementById("gallery-counter");
  const thumbs = document.querySelectorAll(".gallery-thumb");
  const prevBtn = document.getElementById("gallery-prev");
  const nextBtn = document.getElementById("gallery-next");
  const waBtn = document.getElementById("produto-wa-btn");

  function atualizarWhatsApp() {
    if (waBtn) {
      waBtn.href = getLinkWhatsApp();
    }
  }

  function selecionarImagem(index, resetTimer = true) {
    if (!mainImg) return;

    imagemAtual = (index + imagens.length) % imagens.length;
    const foto = imagens[imagemAtual];

    mainImg.style.opacity = "0";

    setTimeout(() => {
      mainImg.src = foto.imagem;
      mainImg.alt = foto.legenda;

      mainImg.onload = () => {
        mainImg.style.opacity = "1";
      };

      mainImg.onerror = () => {
        mainImg.src = FALLBACK_SVG;
        mainImg.style.opacity = "1";
      };
    }, 120);

    if (caption) caption.textContent = foto.legenda;
    if (counter) counter.textContent = `${imagemAtual + 1} / ${imagens.length}`;

    thumbs.forEach((thumb) => thumb.classList.remove("active"));
    thumbs[imagemAtual]?.classList.add("active");

    if (resetTimer) iniciarAutoplay();
  }

  function iniciarAutoplay() {
    if (autoplay) clearInterval(autoplay);
    if (imagens.length <= 1) return;

    autoplay = setInterval(() => {
      selecionarImagem(imagemAtual + 1, false);
    }, 4500);
  }

  function selecionarCorProducao(button) {
    if (!button || button.disabled) return;

    const currentGroup = button.closest(".production-color-group");

    currentGroup
      ?.querySelectorAll(".production-color-dot")
      .forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    fioSelecionado = button.dataset.fioNome || "";
    corSelecionada = button.dataset.corNome || "";

    const selectedText = document.getElementById("selected-production-text");

    if (selectedText) {
      selectedText.textContent = `Selecionado: ${fioSelecionado} — ${corSelecionada}`;
    }

    const imagemDaCor = button.dataset.imagem;

    if (imagemDaCor) {
      const indexDaImagem = imagens.findIndex(
        (foto) => foto.imagem === imagemDaCor,
      );

      if (indexDaImagem >= 0) {
        selecionarImagem(indexDaImagem);
      } else if (mainImg) {
        mainImg.src = imagemDaCor;

        if (caption) {
          caption.textContent = `${fioSelecionado} na cor ${corSelecionada}`;
        }
      }
    }

    atualizarWhatsApp();
  }

  function initProductionOptions() {
    const fioButtons = document.querySelectorAll(".production-fio-btn");
    const colorGroups = document.querySelectorAll(".production-color-group");

    fioButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const fioId = button.dataset.fioId;

        fioButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        colorGroups.forEach((group) => {
          const isActive = group.dataset.fioId === fioId;
          group.classList.toggle("active", isActive);

          if (isActive) {
            group
              .querySelectorAll(".production-color-dot")
              .forEach((btn) => btn.classList.remove("active"));

            const firstAvailable = group.querySelector(
              ".production-color-dot:not(.unavailable):not(:disabled)",
            );

            selecionarCorProducao(firstAvailable);
          }
        });
      });
    });

    document.querySelectorAll(".production-color-dot").forEach((button) => {
      button.addEventListener("click", () => {
        selecionarCorProducao(button);
      });
    });

    const firstGroup = document.querySelector(".production-color-group.active");
    const firstAvailable = firstGroup?.querySelector(
      ".production-color-dot:not(.unavailable):not(:disabled)",
    );

    selecionarCorProducao(firstAvailable);
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      selecionarImagem(Number(thumb.dataset.index));
    });
  });

  prevBtn?.addEventListener("click", () => selecionarImagem(imagemAtual - 1));
  nextBtn?.addEventListener("click", () => selecionarImagem(imagemAtual + 1));

  initProductionOptions();
  atualizarWhatsApp();
  iniciarAutoplay();
})();
