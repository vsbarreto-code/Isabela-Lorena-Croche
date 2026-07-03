// ============================================================
// MAIN.JS — inicialização geral
// ============================================================

// ---- CARROSSEL DE BANNERS / NOVIDADES ----
const bannerCarousel = document.querySelector("#banner-carousel");
const homeHero = document.querySelector("#home-hero");

if (bannerCarousel && homeHero) {
  const bannerWrapper = bannerCarousel.querySelector(
    ".banner-carousel-wrapper",
  );
  const bannerPrev = bannerCarousel.querySelector(".banner-prev");
  const bannerNext = bannerCarousel.querySelector(".banner-next");
  const bannerDotsContainer = bannerCarousel.querySelector(".banner-dots");

  const allSlides = Array.from(
    bannerCarousel.querySelectorAll(".banner-slide"),
  );

  const validSlides = allSlides.filter((slide) => {
    const img = slide.querySelector("img");
    const src = img?.getAttribute("src")?.trim();

    return src && src !== "#";
  });

  let currentBanner = 0;

  function showBanner(index) {
    allSlides.forEach((slide) => slide.classList.remove("active"));

    const dots = bannerCarousel.querySelectorAll(".banner-dot");
    dots.forEach((dot) => dot.classList.remove("active"));

    validSlides[index].classList.add("active");

    if (dots[index]) {
      dots[index].classList.add("active");
    }
  }

  function nextBanner() {
    currentBanner = (currentBanner + 1) % validSlides.length;
    showBanner(currentBanner);
  }

  function prevBanner() {
    currentBanner =
      (currentBanner - 1 + validSlides.length) % validSlides.length;
    showBanner(currentBanner);
  }

  if (validSlides.length === 0) {
    // Sem banner: esconde carrossel e mostra o hero
    bannerCarousel.classList.add("is-hidden");
    homeHero.classList.remove("is-hidden");
  } else {
    // Com banner: mostra carrossel e esconde o hero
    bannerCarousel.classList.remove("is-hidden");
    homeHero.classList.add("is-hidden");

    // Cria bolinhas automaticamente
    if (bannerDotsContainer) {
      bannerDotsContainer.innerHTML = "";

      validSlides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "banner-dot";
        dot.setAttribute("aria-label", `Ir para o banner ${index + 1}`);

        if (index === 0) {
          dot.classList.add("active");
        }

        dot.addEventListener("click", () => {
          currentBanner = index;
          showBanner(currentBanner);
        });

        bannerDotsContainer.appendChild(dot);
      });
    }

    showBanner(0);

    if (validSlides.length === 1) {
      // Só 1 banner: esconde setas e bolinhas
      bannerPrev?.classList.add("is-hidden");
      bannerNext?.classList.add("is-hidden");
      bannerDotsContainer?.classList.add("is-hidden");
    } else {
      // Mais de 1 banner: ativa setas, bolinhas e autoplay
      bannerPrev?.classList.remove("is-hidden");
      bannerNext?.classList.remove("is-hidden");
      bannerDotsContainer?.classList.remove("is-hidden");

      bannerNext?.addEventListener("click", nextBanner);
      bannerPrev?.addEventListener("click", prevBanner);

      setInterval(nextBanner, 6000);
    }
  }
}

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
