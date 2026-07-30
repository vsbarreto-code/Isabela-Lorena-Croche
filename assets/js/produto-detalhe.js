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

  function normalizarCaminhoImagem(imagem) {
    const valor = String(imagem || "")
      .trim()
      .replaceAll("\\", "/");

    if (!valor) return "";

    try {
      const url = new URL(valor, window.location.href);

      // Query e hash não tornam a fotografia diferente.
      url.search = "";
      url.hash = "";

      return decodeURIComponent(url.pathname)
        .replace(/\/{2,}/g, "/")
        .replace(/\/$/, "");
    } catch {
      return valor
        .replace(/^\.\//, "")
        .replace(/^\//, "")
        .replace(/\/{2,}/g, "/");
    }
  }

  function normalizarImagens(produto) {
    const imagens = [];
    const usados = new Map();

    function adicionar(item, fallbackLegenda = "Foto da bolsa") {
      if (!item) return;

      const imagem = typeof item === "string" ? item : item.imagem;
      const chaveImagem = normalizarCaminhoImagem(imagem);

      if (!imagem || !chaveImagem) return;

      const legendaNova =
        typeof item === "string"
          ? fallbackLegenda
          : item.legenda || item.corNome || fallbackLegenda;

      // A mesma fotografia pode servir para cor, tamanho e galeria.
      // Ela aparece uma única vez nas miniaturas.
      if (usados.has(chaveImagem)) {
        const indexExistente = usados.get(chaveImagem);
        const fotoExistente = imagens[indexExistente];

        // Conserva a legenda mais informativa.
        if (
          fotoExistente &&
          (!fotoExistente.legenda ||
            fotoExistente.legenda === "Foto da bolsa") &&
          legendaNova
        ) {
          fotoExistente.legenda = legendaNova;
        }

        return indexExistente;
      }

      const index = imagens.length;

      imagens.push({
        imagem,
        legenda: legendaNova,
        corNome: typeof item === "string" ? null : item.corNome || null,
      });

      usados.set(chaveImagem, index);
      return index;
    }

    (produto.galeria || []).forEach((item) => adicionar(item));

    (produto.variantes || []).forEach((item) =>
      adicionar(
        item,
        item.corNome ? `Variação ${item.corNome}` : "Variação da bolsa",
      ),
    );

    // Fotos cadastradas diretamente em cada tamanho.
    (produto.tamanhos || []).forEach((tamanho) => {
      if (!tamanho) return;

      const nomeTamanho = tamanho.nome || tamanho.id || "";

      if (tamanho.imagem) {
        adicionar(
          {
            imagem: tamanho.imagem,
            legenda:
              tamanho.legendaImagem ||
              `${produto.nome} — tamanho ${nomeTamanho}`,
          },
          `${produto.nome} — tamanho ${nomeTamanho}`,
        );
      }

      // Fotos opcionais para uma combinação específica de tamanho + cor.
      const imagensPorCor = tamanho.imagensPorCor;

      if (Array.isArray(imagensPorCor)) {
        imagensPorCor.forEach((item) => {
          adicionar(
            item,
            item?.legenda ||
              `${produto.nome} — tamanho ${nomeTamanho}`,
          );
        });
      } else if (
        imagensPorCor &&
        typeof imagensPorCor === "object"
      ) {
        Object.values(imagensPorCor).forEach((item) => {
          adicionar(
            item,
            `${produto.nome} — tamanho ${nomeTamanho}`,
          );
        });
      }
    });

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

  function normalizarTexto(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function getImagemDaCor(produto, fioId, corId, corNome) {
    // 1. Primeiro tenta pegar imagem diretamente em opcoesProducao
    const opcao = produto.opcoesProducao?.find((item) => item.fioId === fioId);

    const corOpcao = opcao?.cores?.find((item) => item.corId === corId);

    if (corOpcao?.imagem) {
      return corOpcao.imagem;
    }

    // 2. Depois tenta pegar pela lista de variantes
    const variante = produto.variantes?.find((item) => {
      const mesmoFio = !item.fioId || item.fioId === fioId;
      const mesmaCorId = item.corId && item.corId === corId;
      const mesmaCorNome =
        normalizarTexto(item.corNome) === normalizarTexto(corNome);

      return mesmoFio && (mesmaCorId || mesmaCorNome);
    });

    return variante?.imagem || "";
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
  document.body.classList.add("produto-detail-active");

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
  let corIdSelecionada = "";
  let corHexSelecionada = "";
  let imagemCorSelecionada = "";

  const tamanhoInicial =
    typeof getTamanhoMaisBarato === "function"
      ? getTamanhoMaisBarato(produto)
      : null;

  let tamanhoSelecionado = tamanhoInicial?.id
    ? String(tamanhoInicial.id)
    : "";

  function renderPrice(produto) {
    if (typeof generatePriceHTML === "function") {
      return generatePriceHTML(produto, tamanhoSelecionado || null);
    }

    const precoAtual =
      typeof getPrecoProduto === "function"
        ? getPrecoProduto(produto, tamanhoSelecionado || null)
        : produto.preco;

    if (!precoAtual) return "";

    return `
      <div class="product-price">
        <div class="price-line price-pix">
          <span>Pix</span>
          <strong>${escapeHTML(precoAtual.pix)}</strong>
        </div>

        <div class="price-line">
          <span>Cartão</span>
          <strong>
            ${precoAtual.parcelas}x de ${escapeHTML(precoAtual.valorParcela)}
          </strong>
        </div>

        <small>Total parcelado: ${escapeHTML(precoAtual.parcelado)}</small>
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

  function getTamanhoSelecionado(produto) {
    if (!tamanhoSelecionado) return null;

    if (typeof getTamanhoPorId === "function") {
      return getTamanhoPorId(produto, tamanhoSelecionado) || null;
    }

    return (
      produto.tamanhos?.find(
        (item) => String(item.id) === String(tamanhoSelecionado),
      ) || null
    );
  }

  function normalizarItemImagem(item, legendaPadrao = "Foto da bolsa") {
    if (!item) return null;

    if (typeof item === "string") {
      const imagem = item.trim();
      return imagem
        ? {
            imagem,
            legenda: legendaPadrao,
          }
        : null;
    }

    if (typeof item !== "object" || !item.imagem) {
      return null;
    }

    return {
      imagem: String(item.imagem).trim(),
      legenda: item.legenda || legendaPadrao,
    };
  }

  function getImagemBaseDoTamanho(tamanho) {
    if (!tamanho) return null;

    const nomeTamanho = tamanho.nome || tamanho.id || "";

    return normalizarItemImagem(
      tamanho.imagem,
      tamanho.legendaImagem ||
        `${produto.nome} — tamanho ${nomeTamanho}`,
    );
  }

  function getImagemDoTamanhoPorCor(
    tamanho,
    corId = "",
    corNome = "",
  ) {
    if (!tamanho?.imagensPorCor) return null;

    const nomeTamanho = tamanho.nome || tamanho.id || "";
    const legendaPadrao = `${produto.nome} — tamanho ${nomeTamanho}`;

    if (Array.isArray(tamanho.imagensPorCor)) {
      const item = tamanho.imagensPorCor.find((imagemCor) => {
        if (!imagemCor) return false;

        const mesmoId =
          corId &&
          imagemCor.corId &&
          String(imagemCor.corId) === String(corId);

        const mesmoNome =
          corNome &&
          imagemCor.corNome &&
          normalizarTexto(imagemCor.corNome) ===
            normalizarTexto(corNome);

        return mesmoId || mesmoNome;
      });

      return normalizarItemImagem(item, legendaPadrao);
    }

    if (typeof tamanho.imagensPorCor === "object") {
      const entradas = Object.entries(tamanho.imagensPorCor);

      const entrada = entradas.find(([chave]) => {
        return (
          (corId && String(chave) === String(corId)) ||
          (corNome &&
            normalizarTexto(chave) === normalizarTexto(corNome))
        );
      });

      return normalizarItemImagem(entrada?.[1], legendaPadrao);
    }

    return null;
  }

  function getImagemRelacionadaAoTamanho(tamanho) {
    return (
      getImagemDoTamanhoPorCor(
        tamanho,
        corIdSelecionada,
        corSelecionada,
      ) || getImagemBaseDoTamanho(tamanho)
    );
  }

  function getDimensoesCadastradas(origem) {
    if (!origem) return null;

    const dimensoes = origem.dimensoes;
    if (!dimensoes) return null;

    if (typeof dimensoes === "string") {
      const texto = dimensoes.trim();
      return texto ? { texto } : null;
    }

    if (typeof dimensoes !== "object" || Array.isArray(dimensoes)) {
      return null;
    }

    const campos = [
      ["largura", "Largura"],
      ["altura", "Altura"],
      ["profundidade", "Profundidade"],
      ["comprimento", "Comprimento"],
      ["diametro", "Diâmetro"],
      ["base", "Base"],
      ["abertura", "Abertura"],
      ["alca", "Alça"],
    ]
      .map(([chave, rotulo]) => ({
        chave,
        rotulo,
        valor: dimensoes[chave],
      }))
      .filter((campo) => String(campo.valor || "").trim());

    return campos.length ? { campos } : null;
  }

  function todasDimensoesDosTamanhosEstaoCadastradas(produto) {
    const tamanhos =
      typeof getTamanhosDisponiveis === "function"
        ? getTamanhosDisponiveis(produto)
        : Array.isArray(produto.tamanhos)
          ? produto.tamanhos.filter(
              (tamanho) =>
                tamanho && tamanho.disponivel !== false && tamanho.preco,
            )
          : [];

    return (
      tamanhos.length > 0 &&
      tamanhos.every((tamanho) => Boolean(getDimensoesCadastradas(tamanho)))
    );
  }

  function getLinkWhatsAppDimensoes() {
    let mensagem = `Olá! Tenho interesse na ${produto.nome}.`;

    if (tamanhoSelecionado) {
      const tamanho = getTamanhoSelecionado(produto);
      mensagem += ` Gostaria de confirmar as medidas do tamanho ${
        tamanho?.nome || tamanhoSelecionado
      }.`;
    } else {
      mensagem += " Gostaria de confirmar as medidas desse modelo.";
    }

    if (fioSelecionado && corSelecionada) {
      mensagem += ` Minha preferência é ${fioSelecionado}, cor ${corSelecionada}.`;
    }

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      mensagem,
    )}`;
  }

  function renderDimensoesSobConsulta(nomeTamanho = "") {
    return `
      <section
        class="produto-dimensions-section produto-dimensions-section--consult"
        aria-label="Consulta de medidas da bolsa"
      >
        <div class="produto-dimensions-heading">
          <div>
            <p class="detail-label">Medidas do modelo</p>
            <h2>Confirme as proporções antes de encomendar</h2>
          </div>

          ${
            nomeTamanho
              ? `<span class="produto-dimensions-size">Tamanho ${escapeHTML(
                  nomeTamanho,
                )}</span>`
              : ""
          }
        </div>

        <div class="produto-dimensions-consult">
          <div class="produto-dimensions-consult-icon" aria-hidden="true">
            <i class="fa-solid fa-ruler-combined"></i>
          </div>

          <div class="produto-dimensions-consult-content">
            <p>
              As proporções podem variar levemente conforme o acabamento
              artesanal deste modelo. Para confirmar as medidas do tamanho
              escolhido, fale com o Atelier.
            </p>

            <a
              class="produto-dimensions-consult-btn"
              href="${getLinkWhatsAppDimensoes()}"
              target="_blank"
              rel="noopener"
            >
              <i class="fa-brands fa-whatsapp"></i>
              Consultar medidas no WhatsApp
            </a>
          </div>
        </div>
      </section>
    `;
  }

  function renderDimensoes(produto) {
    // false: esconde completamente a área de medidas.
    if (produto.exibirDimensoes !== true) return "";

    const temTamanhos =
      typeof produtoTemTamanhos === "function"
        ? produtoTemTamanhos(produto)
        : Array.isArray(produto.tamanhos) && produto.tamanhos.length > 0;

    let dimensoes = null;
    let nomeTamanho = "";

    if (temTamanhos) {
      const tamanho = getTamanhoSelecionado(produto);
      nomeTamanho = tamanho?.nome || tamanho?.id || tamanhoSelecionado;

      const forcarConsulta = produto.dimensoesSobConsulta === true;
      const dimensoesCompletas =
        todasDimensoesDosTamanhosEstaoCadastradas(produto);

      // Pode forçar a consulta pelo boolean ou simplesmente omitir dimensões.
      // Em ambos os casos, o cliente recebe uma orientação profissional.
      if (forcarConsulta || !dimensoesCompletas) {
        return renderDimensoesSobConsulta(nomeTamanho);
      }

      dimensoes = getDimensoesCadastradas(tamanho);
    } else {
      dimensoes = getDimensoesCadastradas(detalhes);

      if (produto.dimensoesSobConsulta === true || !dimensoes) {
        return renderDimensoesSobConsulta();
      }
    }

    if (!dimensoes) {
      return renderDimensoesSobConsulta(nomeTamanho);
    }

    const conteudo = dimensoes.texto
      ? `
          <div class="produto-dimensions-text">
            ${escapeHTML(dimensoes.texto)}
          </div>
        `
      : `
          <div class="produto-dimensions-grid">
            ${dimensoes.campos
              .map(
                (campo) => `
                  <div class="produto-dimension-item">
                    <span>${escapeHTML(campo.rotulo)}</span>
                    <strong>${escapeHTML(campo.valor)}</strong>
                  </div>
                `,
              )
              .join("")}
          </div>
        `;

    return `
      <section class="produto-dimensions-section" aria-label="Dimensões da bolsa">
        <div class="produto-dimensions-heading">
          <div>
            <p class="detail-label">Dimensões aproximadas</p>
            <h2>Proporções do modelo</h2>
          </div>

          ${
            nomeTamanho
              ? `<span class="produto-dimensions-size">Tamanho ${escapeHTML(
                  nomeTamanho,
                )}</span>`
              : ""
          }
        </div>

        ${conteudo}

        <p class="produto-dimensions-note">
          Por ser uma peça artesanal, podem ocorrer pequenas variações nas medidas.
        </p>
      </section>
    `;
  }

  function renderTamanhos(produto) {
    const tamanhos = Array.isArray(produto.tamanhos)
      ? produto.tamanhos.filter(
          (tamanho) => tamanho && (tamanho.id || tamanho.nome),
        )
      : [];

    const temTamanhoDisponivel = tamanhos.some(
      (tamanho) => tamanho.disponivel !== false && tamanho.preco,
    );

    if (!tamanhos.length || !temTamanhoDisponivel) return "";

    return `
      <section class="produto-size-section">
        <p class="detail-label">Escolha o tamanho</p>

        <p class="production-help">
          O preço e a foto são atualizados conforme o tamanho escolhido.
        </p>

        <div class="production-sizes" role="group" aria-label="Tamanhos da bolsa">
          ${tamanhos
            .map((tamanho) => {
              const idTamanho = String(tamanho.id || tamanho.nome || "");
              const nomeTamanho = tamanho.nome || tamanho.id || "";
              const disponivel =
                tamanho.disponivel !== false && Boolean(tamanho.preco);
              const ativo =
                disponivel && idTamanho === String(tamanhoSelecionado);

              return `
                <button
                  type="button"
                  class="production-size-btn ${ativo ? "active" : ""} ${
                    disponivel ? "" : "unavailable"
                  }"
                  data-tamanho-id="${escapeHTML(idTamanho)}"
                  aria-pressed="${ativo}"
                  aria-label="Tamanho ${escapeHTML(nomeTamanho)}${
                    disponivel ? "" : " indisponível"
                  }"
                  title="Tamanho ${escapeHTML(nomeTamanho)}${
                    disponivel ? "" : " — indisponível"
                  }"
                  ${disponivel ? "" : 'disabled aria-disabled="true"'}
                >
                  <span>${escapeHTML(nomeTamanho)}</span>
                </button>
              `;
            })
            .join("")}
        </div>

        <p class="selected-size-text" id="selected-size-text">
          ${
            tamanhoSelecionado
              ? `Tamanho selecionado: ${escapeHTML(
                  tamanhos.find(
                    (tamanho) =>
                      String(tamanho.id || tamanho.nome) ===
                      String(tamanhoSelecionado),
                  )?.nome || tamanhoSelecionado,
                )}`
              : "Selecione um tamanho disponível."
          }
        </p>
      </section>
    `;
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
          Escolha a cor da sua bolsa. As fotos mostram peças já produzidas;
          sua seleção será feita especialmente para você.
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
                  aria-pressed="${index === 0}"
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
                          data-cor-hex="${escapeHTML(cor.corHex)}"
                          data-imagem="${escapeHTML(getImagemDaCor(produto, fio.id, item.corId, cor.nome))}"
                          title="${escapeHTML(cor.nome)}${
                            disponivel ? "" : " — indisponível"
                          }"
                          aria-label="${escapeHTML(cor.nome)}${
                            disponivel ? "" : " indisponível"
                          }"
                          aria-pressed="false"
                          ${disponivel ? "" : 'disabled aria-disabled="true"'}
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

        <div
          class="produto-color-confirmation"
          id="produto-color-confirmation"
          aria-live="polite"
          hidden
        >
          <span
            class="produto-color-confirmation__swatch"
            id="produto-color-confirmation-swatch"
            aria-hidden="true"
          ></span>

          <div class="produto-color-confirmation__content">
            <small>Produção personalizada</small>
            <strong id="produto-color-confirmation-name">
              Cor escolhida
            </strong>
            <p id="produto-color-confirmation-status"></p>
          </div>
        </div>
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

    if (tamanhoSelecionado) {
      const tamanho =
        typeof getTamanhoPorId === "function"
          ? getTamanhoPorId(produto, tamanhoSelecionado)
          : produto.tamanhos?.find(
              (item) => String(item.id) === String(tamanhoSelecionado),
            );

      mensagem += ` Tamanho: ${tamanho?.nome || tamanhoSelecionado}.`;

      const precoAtual =
        typeof getPrecoProduto === "function"
          ? getPrecoProduto(produto, tamanhoSelecionado)
          : tamanho?.preco;

      if (precoAtual?.pix) {
        mensagem += ` Valor no Pix: ${precoAtual.pix}.`;
      }
    }

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      mensagem,
    )}`;
  }

  root.innerHTML = `
    <div class="produto-detail-grid">
      <div class="produto-gallery">
        <div
          class="gallery-main-wrap"
          id="produto-gallery-focus"
          tabindex="-1"
        >
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

        <div id="produto-price-root">
          ${renderPrice(produto)}
        </div>

        ${renderTamanhos(produto)}

        ${renderOpcoesProducao(produto)}

        <section
          class="produto-mobile-choice"
          id="produto-mobile-choice"
          aria-label="Resumo da configuração escolhida"
          aria-live="polite"
        >
          <button
            class="produto-mobile-choice__photo"
            id="produto-mobile-view-photo"
            type="button"
            aria-label="Ver fotos reais do modelo"
          >
            <span class="produto-mobile-choice__visual">
              <img
                id="produto-mobile-choice-img"
                src="${escapeHTML(imagens[0].imagem)}"
                alt=""
              />
              <span
                class="produto-mobile-choice__swatch"
                id="produto-mobile-choice-swatch"
                aria-hidden="true"
              ></span>
            </span>

            <span id="produto-mobile-choice-action">Ver modelo</span>
          </button>

          <div class="produto-mobile-choice__content">
            <span>Sua escolha</span>
            <strong id="produto-mobile-choice-options">
              Selecione tamanho e cor
            </strong>
            <small
              class="produto-mobile-choice__note"
              id="produto-mobile-choice-note"
            ></small>
            <em id="produto-mobile-choice-price"></em>
          </div>
        </section>

        <div class="produto-actions-main">
          <a
            id="produto-wa-btn"
            class="btn-whatsapp"
            href="${getLinkWhatsApp()}"
            target="_blank"
            rel="noopener"
          >
            <i class="fa-brands fa-whatsapp"></i>
            Encomendar esta configuração
          </a>

          <a class="btn-details btn-secondary-detail" href="bolsas.html">
            <i class="fa-solid fa-bag-shopping"></i>
            Ver catálogo
          </a>
        </div>

        <div id="produto-dimensions-root">
          ${renderDimensoes(produto)}
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
  const mobileWaBtn = document.getElementById("produto-mobile-wa-btn");
  const priceRoot = document.getElementById("produto-price-root");
  const dimensionsRoot = document.getElementById("produto-dimensions-root");

  const mobileChoiceImg = document.getElementById(
    "produto-mobile-choice-img",
  );
  const mobileChoiceOptions = document.getElementById(
    "produto-mobile-choice-options",
  );
  const mobileChoicePrice = document.getElementById(
    "produto-mobile-choice-price",
  );
  const mobileChoiceNote = document.getElementById(
    "produto-mobile-choice-note",
  );
  const mobileChoiceSwatch = document.getElementById(
    "produto-mobile-choice-swatch",
  );
  const mobileChoiceAction = document.getElementById(
    "produto-mobile-choice-action",
  );
  const mobileViewPhoto = document.getElementById(
    "produto-mobile-view-photo",
  );

  const colorConfirmation = document.getElementById(
    "produto-color-confirmation",
  );
  const colorConfirmationSwatch = document.getElementById(
    "produto-color-confirmation-swatch",
  );
  const colorConfirmationName = document.getElementById(
    "produto-color-confirmation-name",
  );
  const colorConfirmationStatus = document.getElementById(
    "produto-color-confirmation-status",
  );

  const mobileBuybarImg = document.getElementById(
    "produto-mobile-buybar-img",
  );
  const mobileBuybarOptions = document.getElementById(
    "produto-mobile-buybar-options",
  );
  const mobileBuybarPrice = document.getElementById(
    "produto-mobile-buybar-price",
  );
  const mobileBuybarSwatch = document.getElementById(
    "produto-mobile-buybar-swatch",
  );
  const mobileBuybarPhoto = document.getElementById(
    "produto-mobile-buybar-photo",
  );

  function getPrecoAtualSelecionado() {
    if (typeof getPrecoProduto === "function") {
      return getPrecoProduto(produto, tamanhoSelecionado || null);
    }

    return getTamanhoSelecionado(produto)?.preco || produto.preco || null;
  }

  function getResumoOpcoesSelecionadas() {
    const tamanho = getTamanhoSelecionado(produto);
    const partes = [];

    if (tamanho?.nome || tamanhoSelecionado) {
      partes.push(`Tam. ${tamanho?.nome || tamanhoSelecionado}`);
    }

    if (corSelecionada) {
      partes.push(corSelecionada);
    }

    if (fioSelecionado) {
      partes.push(fioSelecionado);
    }

    return partes.length ? partes.join(" • ") : "Escolha tamanho e cor";
  }

  function getPrecoResumo() {
    const preco = getPrecoAtualSelecionado();

    return preco?.pix ? `${preco.pix} no Pix` : "";
  }

  function getEstadoVisualConfiguracao() {
    const tamanho = getTamanhoSelecionado(produto);
    const nomeTamanho =
      tamanho?.nome || tamanho?.id || tamanhoSelecionado || "";

    const imagemExata = getImagemDoTamanhoPorCor(
      tamanho,
      corIdSelecionada,
      corSelecionada,
    );

    if (imagemExata) {
      return {
        tipo: "exata",
        imagem: imagemExata,
        usarFotoNoResumo: true,
        nota: "Foto disponível desta cor e deste tamanho.",
        status:
          "Esta foto representa a configuração selecionada.",
      };
    }

    const imagemDaCor = normalizarItemImagem(
      imagemCorSelecionada,
      `${produto.nome} na cor ${corSelecionada}`,
    );

    if (imagemDaCor) {
      return {
        tipo: "cor",
        imagem: imagemDaCor,
        usarFotoNoResumo: true,
        nota: "Foto real disponível na cor escolhida.",
        status:
          nomeTamanho
            ? `A foto representa a cor ${corSelecionada}; as proporções seguem o tamanho ${nomeTamanho}.`
            : `Você está vendo uma foto real na cor ${corSelecionada}.`,
      };
    }

    const imagemDoTamanho = getImagemBaseDoTamanho(tamanho);

    if (imagemDoTamanho) {
      return {
        tipo: "tamanho",
        imagem: imagemDoTamanho,
        usarFotoNoResumo: false,
        nota: "Cor escolhida para produção.",
        status:
          `A foto do tamanho ${nomeTamanho} está em outra cor. ` +
          `Sua bolsa será produzida na cor ${corSelecionada}.`,
      };
    }

    return {
      tipo: "modelo",
      imagem: null,
      usarFotoNoResumo: false,
      nota: "Cor escolhida para produção.",
      status:
        `As fotos mostram versões já produzidas deste modelo. ` +
        `Sua bolsa será produzida na cor ${corSelecionada}.`,
    };
  }

  function atualizarConfirmacaoDaCor(estado) {
    if (
      !colorConfirmation ||
      !corSelecionada ||
      !corHexSelecionada
    ) {
      if (colorConfirmation) colorConfirmation.hidden = true;
      return;
    }

    colorConfirmation.hidden = false;

    if (colorConfirmationSwatch) {
      colorConfirmationSwatch.style.setProperty(
        "--selected-color",
        corHexSelecionada,
      );
    }

    if (colorConfirmationName) {
      colorConfirmationName.textContent =
        `Cor escolhida: ${corSelecionada}`;
    }

    if (colorConfirmationStatus) {
      colorConfirmationStatus.textContent = estado.status;
    }
  }

  function atualizarVisualResumo(elementoImg, elementoSwatch, estado) {
    if (!elementoImg || !elementoSwatch) return;

    const usarFoto = Boolean(
      estado.usarFotoNoResumo && estado.imagem?.imagem,
    );

    elementoImg.hidden = !usarFoto;
    elementoSwatch.hidden = usarFoto;

    if (usarFoto) {
      elementoImg.src = estado.imagem.imagem;
      elementoImg.alt = estado.imagem.legenda || produto.nome;
    } else {
      elementoSwatch.style.setProperty(
        "--selected-color",
        corHexSelecionada || "#f0ebe1",
      );
      elementoSwatch.setAttribute(
        "aria-label",
        corSelecionada
          ? `Cor selecionada: ${corSelecionada}`
          : "Cor ainda não selecionada",
      );
    }
  }

  function atualizarResumoMobile() {
    const opcoes = getResumoOpcoesSelecionadas();
    const preco = getPrecoResumo();
    const estado = getEstadoVisualConfiguracao();

    if (mobileChoiceOptions) {
      mobileChoiceOptions.textContent = opcoes;
    }

    if (mobileChoiceNote) {
      mobileChoiceNote.textContent = estado.nota;
    }

    if (mobileChoicePrice) {
      mobileChoicePrice.textContent = preco;
    }

    if (mobileChoiceAction) {
      mobileChoiceAction.textContent =
        estado.usarFotoNoResumo ? "Ver foto" : "Ver modelo";
    }

    if (mobileBuybarOptions) {
      mobileBuybarOptions.textContent = opcoes;
    }

    if (mobileBuybarPrice) {
      mobileBuybarPrice.textContent = preco;
    }

    atualizarVisualResumo(
      mobileChoiceImg,
      mobileChoiceSwatch,
      estado,
    );

    atualizarVisualResumo(
      mobileBuybarImg,
      mobileBuybarSwatch,
      estado,
    );

    atualizarConfirmacaoDaCor(estado);
  }

  function irParaGaleria() {
    const galleryFocus = document.getElementById("produto-gallery-focus");
    if (!galleryFocus) return;

    galleryFocus.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.setTimeout(() => {
      galleryFocus.focus({ preventScroll: true });
    }, 450);
  }

  function atualizarPreco() {
    if (priceRoot) {
      priceRoot.innerHTML = renderPrice(produto);
    }

    atualizarResumoMobile();
  }

  function atualizarDimensoes() {
    if (dimensionsRoot) {
      dimensionsRoot.innerHTML = renderDimensoes(produto);
    }
  }

  function atualizarWhatsApp() {
    const link = getLinkWhatsApp();

    if (waBtn) {
      waBtn.href = link;
    }

    if (mobileWaBtn) {
      mobileWaBtn.href = link;
    }

    atualizarResumoMobile();
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
    atualizarResumoMobile();

    if (resetTimer) iniciarAutoplay();
  }

  function selecionarImagemPorUrl(imagemConfig) {
    if (!imagemConfig?.imagem) return false;

    const chaveProcurada = normalizarCaminhoImagem(
      imagemConfig.imagem,
    );

    const indexDaImagem = imagens.findIndex(
      (foto) =>
        normalizarCaminhoImagem(foto.imagem) === chaveProcurada,
    );

    if (indexDaImagem >= 0) {
      selecionarImagem(indexDaImagem);
      return true;
    }

    if (!mainImg) return false;

    mainImg.style.opacity = "0";

    setTimeout(() => {
      mainImg.src = imagemConfig.imagem;
      mainImg.alt = imagemConfig.legenda || produto.nome;

      mainImg.onload = () => {
        mainImg.style.opacity = "1";
      };

      mainImg.onerror = () => {
        mainImg.src = FALLBACK_SVG;
        mainImg.style.opacity = "1";
      };
    }, 120);

    if (caption) {
      caption.textContent = imagemConfig.legenda || produto.nome;
    }

    thumbs.forEach((thumb) => thumb.classList.remove("active"));
    atualizarResumoMobile();
    iniciarAutoplay();

    return true;
  }

  function initGallerySwipe() {
    const galleryWrap = document.querySelector(".gallery-main-wrap");

    if (!galleryWrap || imagens.length <= 1) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    galleryWrap.addEventListener(
      "touchstart",
      (event) => {
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
      },
      { passive: true },
    );

    galleryWrap.addEventListener(
      "touchend",
      (event) => {
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;

        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        const minSwipeDistance = 50;

        // Se o movimento vertical for maior, entende que a pessoa só rolou a página
        if (Math.abs(diffY) > Math.abs(diffX)) return;

        if (Math.abs(diffX) < minSwipeDistance) return;

        if (diffX > 0) {
          // Arrastou para esquerda: próxima imagem
          selecionarImagem(imagemAtual + 1);
        } else {
          // Arrastou para direita: imagem anterior
          selecionarImagem(imagemAtual - 1);
        }
      },
      { passive: true },
    );
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
      .forEach((btn) => {
        const ativo = btn === button;
        btn.classList.toggle("active", ativo);
        btn.setAttribute("aria-pressed", String(ativo));
      });

    fioSelecionado = button.dataset.fioNome || "";
    corSelecionada = button.dataset.corNome || "";
    corIdSelecionada = button.dataset.corId || "";
    corHexSelecionada = button.dataset.corHex || "";
    imagemCorSelecionada = button.dataset.imagem || "";

    const selectedText = document.getElementById("selected-production-text");

    if (selectedText) {
      selectedText.textContent = `Selecionado: ${fioSelecionado} — ${corSelecionada}`;
    }

    const tamanhoAtual = getTamanhoSelecionado(produto);

    // Ao escolher uma cor, a galeria só muda quando existe uma foto
    // que realmente representa essa cor.
    const imagemTamanhoCor = getImagemDoTamanhoPorCor(
      tamanhoAtual,
      corIdSelecionada,
      corSelecionada,
    );

    const imagemDaCor = normalizarItemImagem(
      imagemCorSelecionada,
      `${produto.nome} na cor ${corSelecionada}`,
    );

    selecionarImagemPorUrl(imagemTamanhoCor || imagemDaCor);

    atualizarWhatsApp();
  }

  function selecionarTamanho(button) {
    if (!button || button.disabled) return;

    document.querySelectorAll(".production-size-btn").forEach((item) => {
      const ativo = item === button;
      item.classList.toggle("active", ativo);
      item.setAttribute("aria-pressed", String(ativo));
    });

    tamanhoSelecionado = button.dataset.tamanhoId || "";

    const tamanho =
      typeof getTamanhoPorId === "function"
        ? getTamanhoPorId(produto, tamanhoSelecionado)
        : produto.tamanhos?.find(
            (item) => String(item.id) === String(tamanhoSelecionado),
          );

    const selectedText = document.getElementById("selected-size-text");

    if (selectedText) {
      selectedText.textContent = `Tamanho selecionado: ${
        tamanho?.nome || tamanhoSelecionado
      }`;
    }

    const imagemExata = getImagemDoTamanhoPorCor(
      tamanho,
      corIdSelecionada,
      corSelecionada,
    );
    const imagemDoTamanho = getImagemBaseDoTamanho(tamanho);

    // Ao escolher o tamanho, prioriza uma foto exata da configuração.
    // Caso não exista, pode mostrar a foto real do tamanho, deixando claro
    // no cartão de confirmação quando ela estiver em outra cor.
    selecionarImagemPorUrl(imagemExata || imagemDoTamanho);

    atualizarPreco();
    atualizarDimensoes();
    atualizarWhatsApp();
  }

  function initSizeOptions() {
    const sizeButtons = document.querySelectorAll(".production-size-btn");

    sizeButtons.forEach((button) => {
      button.addEventListener("click", () => selecionarTamanho(button));
    });
  }

  function getCorInicialDoGrupo(group) {
    if (!group) return null;

    const disponiveis = Array.from(
      group.querySelectorAll(
        ".production-color-dot:not(.unavailable):not(:disabled)",
      ),
    );

    // Primeiro escolhe uma cor que tenha foto própria cadastrada.
    // Caso nenhuma tenha, usa normalmente a primeira cor disponível.
    return (
      disponiveis.find((button) =>
        String(button.dataset.imagem || "").trim(),
      ) ||
      disponiveis[0] ||
      null
    );
  }

  function initProductionOptions() {
    const fioButtons = document.querySelectorAll(".production-fio-btn");
    const colorGroups = document.querySelectorAll(".production-color-group");

    fioButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const fioId = button.dataset.fioId;

        fioButtons.forEach((btn) => {
          const ativo = btn === button;
          btn.classList.toggle("active", ativo);
          btn.setAttribute("aria-pressed", String(ativo));
        });

        colorGroups.forEach((group) => {
          const isActive = group.dataset.fioId === fioId;
          group.classList.toggle("active", isActive);

          if (isActive) {
            group
              .querySelectorAll(".production-color-dot")
              .forEach((btn) => btn.classList.remove("active"));

            const initialColor = getCorInicialDoGrupo(group);
            selecionarCorProducao(initialColor);
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
    const initialColor = getCorInicialDoGrupo(firstGroup);

    selecionarCorProducao(initialColor);
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      selecionarImagem(Number(thumb.dataset.index));
    });
  });

  mobileViewPhoto?.addEventListener("click", irParaGaleria);
  mobileBuybarPhoto?.addEventListener("click", irParaGaleria);

  prevBtn?.addEventListener("click", () => selecionarImagem(imagemAtual - 1));
  nextBtn?.addEventListener("click", () => selecionarImagem(imagemAtual + 1));

  initGallerySwipe();
  initProductionOptions();
  initSizeOptions();
  atualizarPreco();
  atualizarDimensoes();
  atualizarWhatsApp();
  atualizarResumoMobile();
  iniciarAutoplay();
})();