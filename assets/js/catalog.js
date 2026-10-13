// ============================================================
// CATÁLOGO — busca, filtros e ordenação das bolsas
// ============================================================

const catalogGrid = document.getElementById("grid-bolsas");

if (catalogGrid) {
  const catalogProducts = produtos.filter((produto) => produto.categoria === "Bolsas");
  const catalogSearch = document.getElementById("catalog-search");
  const materialOptions = document.getElementById("catalog-material-options");
  const sortSelect = document.getElementById("catalog-sort");
  const kidsFilter = document.getElementById("catalog-kids-filter");
  const kidsOnly = document.getElementById("catalog-kids-only");
  const filterDetails = document.getElementById("catalog-filter-details");
  const resultsCount = document.getElementById("catalog-results-count");
  const clearButton = document.getElementById("catalog-clear");
  const emptyState = document.getElementById("catalog-empty");
  const emptyClearButton = document.getElementById("catalog-empty-clear");

  function normalizeCatalogText(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("pt-BR")
      .trim();
  }

  function getProductMaterialIds(produto) {
    const productionMaterials = Array.isArray(produto.opcoesProducao)
      ? produto.opcoesProducao
          .map((opcao) => opcao?.fioId)
          .filter((fioId) => fiosDisponiveis.some((fio) => fio.id === fioId))
      : [];

    if (productionMaterials.length) {
      return [...new Set(productionMaterials)];
    }

    const material = normalizeCatalogText(produto.detalhes?.material);
    return fiosDisponiveis
      .filter((fio) => material.includes(normalizeCatalogText(fio.nome)))
      .map((fio) => fio.id);
  }

  const materialsByProduct = new Map(
    catalogProducts.map((produto) => [produto.id, getProductMaterialIds(produto)]),
  );
  const materialCounts = new Map();

  materialsByProduct.forEach((materialIds) => {
    materialIds.forEach((materialId) => {
      materialCounts.set(materialId, (materialCounts.get(materialId) || 0) + 1);
    });
  });

  const availableMaterials = fiosDisponiveis
    .filter((fio) => materialCounts.has(fio.id))
    .sort((first, second) => materialCounts.get(second.id) - materialCounts.get(first.id));

  const productCards = new Map();
  catalogGrid.innerHTML = catalogProducts
    .map((produto, index) => generateCardHTML(produto, "bolsas", index === 0))
    .join("");

  Array.from(catalogGrid.querySelectorAll("[data-product-id]")).forEach((card) => {
    productCards.set(Number(card.dataset.productId), card);
  });

  function addMaterialFilter(value, label, checked = false) {
    const id = `catalog-material-${value || "todos"}`;
    const option = document.createElement("label");
    option.className = "catalog-filter-chip";
    option.htmlFor = id;
    option.innerHTML = `
      <input
        id="${id}"
        type="radio"
        name="catalog-material"
        value="${value}"
        ${checked ? "checked" : ""}
      />
      <span>${label}</span>
    `;
    materialOptions.appendChild(option);
  }

  addMaterialFilter("", "Todos", true);
  availableMaterials.forEach((fio) => addMaterialFilter(fio.id, fio.nome));

  const hasKidsProducts = catalogProducts.some((produto) => produto.badge === "Kids");
  kidsFilter.hidden = !hasKidsProducts;

  const searchParams = new URLSearchParams(window.location.search);
  const materialParam = searchParams.get("material") || "";
  const orderParam = searchParams.get("ordem") || "catalogo";
  const state = {
    query: searchParams.get("q") || "",
    material: availableMaterials.some((fio) => fio.id === materialParam)
      ? materialParam
      : "",
    kidsOnly: searchParams.get("infantil") === "1" && hasKidsProducts,
    order: ["catalogo", "menor-preco", "maior-preco"].includes(orderParam)
      ? orderParam
      : "catalogo",
  };

  catalogSearch.value = state.query;
  sortSelect.value = state.order;
  kidsOnly.checked = state.kidsOnly;

  const selectedMaterialInput = materialOptions.querySelector(
    `input[value="${state.material}"]`,
  );
  if (selectedMaterialInput) {
    selectedMaterialInput.checked = true;
  }

  if (state.material || state.kidsOnly || state.order !== "catalogo") {
    filterDetails.open = true;
  }

  function updateCatalogUrl() {
    const params = new URLSearchParams(window.location.search);
    ["q", "material", "infantil", "ordem"].forEach((key) => params.delete(key));

    if (state.query) params.set("q", state.query);
    if (state.material) params.set("material", state.material);
    if (state.kidsOnly) params.set("infantil", "1");
    if (state.order !== "catalogo") params.set("ordem", state.order);

    const queryString = params.toString();
    const nextUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ""}${window.location.hash}`;
    window.history.replaceState(window.history.state, "", nextUrl);
  }

  function getStartingPrice(produto) {
    return moedaParaNumero(getPrecoProduto(produto)?.pix);
  }

  function getMatchingProducts() {
    const query = normalizeCatalogText(state.query);
    const filtered = catalogProducts.filter((produto) => {
      if (query && !normalizeCatalogText(produto.nome).includes(query)) return false;
      if (state.material && !materialsByProduct.get(produto.id)?.includes(state.material)) {
        return false;
      }
      if (state.kidsOnly && produto.badge !== "Kids") return false;
      return true;
    });

    if (state.order === "catalogo") return filtered;

    const direction = state.order === "menor-preco" ? 1 : -1;
    return filtered
      .map((produto, index) => ({ produto, index, price: getStartingPrice(produto) }))
      .sort((first, second) => {
        const firstHasPrice = Number.isFinite(first.price);
        const secondHasPrice = Number.isFinite(second.price);
        if (firstHasPrice !== secondHasPrice) return firstHasPrice ? -1 : 1;
        if (firstHasPrice && first.price !== second.price) {
          return (first.price - second.price) * direction;
        }
        return first.index - second.index;
      })
      .map(({ produto }) => produto);
  }

  function renderCatalog() {
    const matchingProducts = getMatchingProducts();
    const matchingIds = new Set(matchingProducts.map((produto) => produto.id));

    productCards.forEach((card, productId) => {
      card.hidden = !matchingIds.has(productId);
    });

    matchingProducts.forEach((produto) => {
      const card = productCards.get(produto.id);
      if (card) catalogGrid.appendChild(card);
    });

    const count = matchingProducts.length;
    resultsCount.textContent =
      count === catalogProducts.length
        ? `${count} ${count === 1 ? "bolsa" : "bolsas"}`
        : `${count} de ${catalogProducts.length} bolsas`;
    emptyState.hidden = count > 0;

    const hasFilters =
      Boolean(state.query) ||
      Boolean(state.material) ||
      state.kidsOnly ||
      state.order !== "catalogo";
    clearButton.hidden = !hasFilters;
  }

  function applyCatalogState() {
    updateCatalogUrl();
    renderCatalog();
  }

  function clearCatalogState() {
    state.query = "";
    state.material = "";
    state.kidsOnly = false;
    state.order = "catalogo";
    catalogSearch.value = "";
    sortSelect.value = "catalogo";
    kidsOnly.checked = false;
    materialOptions.querySelector('input[value=""]').checked = true;
    applyCatalogState();
    catalogSearch.focus();
  }

  catalogSearch.addEventListener("input", () => {
    state.query = catalogSearch.value;
    applyCatalogState();
  });

  materialOptions.addEventListener("change", (event) => {
    if (event.target.matches('input[name="catalog-material"]')) {
      state.material = event.target.value;
      applyCatalogState();
    }
  });

  sortSelect.addEventListener("change", () => {
    state.order = sortSelect.value;
    applyCatalogState();
  });

  kidsOnly.addEventListener("change", () => {
    state.kidsOnly = kidsOnly.checked;
    applyCatalogState();
  });

  clearButton.addEventListener("click", clearCatalogState);
  emptyClearButton.addEventListener("click", clearCatalogState);

  renderCatalog();
}
