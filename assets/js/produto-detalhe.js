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
      imagens.push({ imagem: FALLBACK_SVG, legenda: "Foto da bolsa" });
    }

    return imagens;
  }

  if (!produto) {
    document.title = "Bolsa não encontrada | Isabela Lorena Crochê";
    root.innerHTML = `
      <div class="produto-not-found">
        <span class="section-label">Produto não encontrado</span>
        <h1 class="section-title">Não encontrei essa bolsa.</h1>
        <p>O link pode estar incorreto ou o produto pode ter sido removido do catálogo.</p>
        <a class="btn-dark" href="bolsas.html">Voltar para bolsas</a>
      </div>
    `;
    return;
  }

  document.title = `${produto.nome} | Isabela Lorena Crochê`;

  const imagens = normalizarImagens(produto);
  const primeiraCor = produto.variantes?.[0]?.corNome || null;
  let imagemAtual = 0;
  let corSelecionada = primeiraCor;
  let autoplay = null;

  const detalhes = produto.detalhes || {};
  const diferenciais = detalhes.diferenciais || [
    "Peça artesanal feita com cuidado",
    "Produção sob encomenda pelo WhatsApp",
    "Possibilidade de verificar cores disponíveis",
  ];

  function getLinkWhatsApp() {
    if (typeof getWhatsappLink === "function") {
      return getWhatsappLink(produto, corSelecionada);
    }

    const mensagem = `Olá! Tenho interesse na bolsa ${produto.nome}. Gostaria de saber disponibilidade e prazo de confecção.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
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
            <img src="${escapeHTML(foto.imagem)}" alt="${escapeHTML(foto.legenda)}" loading="lazy" />
          </button>
        `,
      )
      .join("");
  }

  function renderVariantes() {
    if (!produto.variantes || produto.variantes.length === 0) return "";

    return `
      <div class="produto-color-section">
        <p class="detail-label">Cores / variações</p>
        <div class="produto-color-options">
          ${produto.variantes
            .map((v, index) => {
              const corNome = v.corNome || `Opção ${index + 1}`;
              const corHex = v.corHex || "#f0ebe1";

              return `
                <button
                  type="button"
                  class="produto-color-btn ${index === 0 ? "active" : ""}"
                  style="--color:${escapeHTML(corHex)}"
                  data-cor="${escapeHTML(corNome)}"
                  data-imagem="${escapeHTML(v.imagem || "")}"
                  aria-label="Selecionar cor ${escapeHTML(corNome)}"
                >
                  <span></span>
                  ${escapeHTML(corNome)}
                </button>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  root.innerHTML = `
    <div class="produto-detail-grid">
      <section class="produto-gallery" aria-label="Galeria de imagens da ${escapeHTML(produto.nome)}">
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
                <button type="button" class="gallery-nav gallery-prev" id="gallery-prev" aria-label="Imagem anterior">
                  <i class="fa-solid fa-chevron-left"></i>
                </button>
                <button type="button" class="gallery-nav gallery-next" id="gallery-next" aria-label="Próxima imagem">
                  <i class="fa-solid fa-chevron-right"></i>
                </button>
              `
              : ""
          }

          <span class="gallery-counter" id="gallery-counter">1 / ${imagens.length}</span>
        </div>

        <p class="gallery-caption" id="gallery-caption">${escapeHTML(imagens[0].legenda)}</p>

        ${imagens.length > 1 ? `<div class="gallery-thumbs">${renderThumbs()}</div>` : ""}
      </section>

      <section class="produto-info" aria-label="Informações da bolsa">
        <a class="back-link" href="bolsas.html">
          <i class="fa-solid fa-arrow-left-long"></i>
          Voltar para bolsas
        </a>

        <span class="section-label">${escapeHTML(produto.badge || "Bolsa artesanal")}</span>
        <h1 class="section-title">${escapeHTML(produto.nome)}</h1>
        <p class="produto-subtitle">${escapeHTML(detalhes.subtitulo || produto.descricao)}</p>
        <p class="produto-description">${escapeHTML(produto.descricaoDetalhada || produto.descricao)}</p>

        ${typeof generatePriceHTML === "function" ? generatePriceHTML(produto) : ""}
        ${renderVariantes()}

        <div class="produto-actions-main">
          <a id="produto-wa-btn" class="btn-whatsapp" href="${getLinkWhatsApp()}" target="_blank" rel="noopener noreferrer">
            <i class="fa-brands fa-whatsapp"></i>
            Encomendar pelo WhatsApp
          </a>
          <a class="btn-details btn-secondary-detail" href="bolsas.html">
            <i class="fa-solid fa-bag-shopping"></i>
            Ver outras bolsas
          </a>
        </div>

        <div class="produto-detail-card">
          <h2>Por que essa bolsa encanta?</h2>
          <ul>
            ${diferenciais.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}
          </ul>
        </div>

        <div class="produto-meta-grid">
          <div>
            <span>Material</span>
            <strong>${escapeHTML(detalhes.material || "Crochê artesanal")}</strong>
          </div>
          <div>
            <span>Medidas</span>
            <strong>${escapeHTML(detalhes.medidas || "Sob consulta")}</strong>
          </div>
          <div>
            <span>Prazo</span>
            <strong>${escapeHTML(detalhes.prazo || "Sob encomenda")}</strong>
          </div>
          <div>
            <span>Entrega</span>
            <strong>Aracaju, SE</strong>
          </div>
        </div>
      </section>
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
    if (waBtn) waBtn.href = getLinkWhatsApp();
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

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      selecionarImagem(Number(thumb.dataset.index));
    });
  });

  prevBtn?.addEventListener("click", () => selecionarImagem(imagemAtual - 1));
  nextBtn?.addEventListener("click", () => selecionarImagem(imagemAtual + 1));

  document.querySelectorAll(".produto-color-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".produto-color-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      corSelecionada = btn.dataset.cor || null;
      atualizarWhatsApp();

      const imagemDaCor = btn.dataset.imagem;
      const indexDaImagem = imagens.findIndex(
        (foto) => foto.imagem === imagemDaCor,
      );
      if (indexDaImagem >= 0) selecionarImagem(indexDaImagem);
    });
  });

  iniciarAutoplay();
})();
