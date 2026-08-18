// ============================================================
// MAIN.JS — inicialização geral
// ============================================================

// ---- CARROSSEL DE BANNERS / NOVIDADES ----
const bannerCarousel = document.querySelector("#banner-carousel");
const homeHero = document.querySelector("#home-hero");

if (bannerCarousel && homeHero) {
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
  let autoplay;

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

  function startAutoplay() {
    autoplay = setInterval(nextBanner, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplay);

    if (validSlides.length > 1) {
      startAutoplay();
    }
  }

  if (validSlides.length === 0) {
    // Sem banner: mostra o hero normal
    bannerCarousel.classList.add("is-hidden");
    homeHero.classList.remove("is-hidden");
  } else {
    // Com banner: esconde o hero
    bannerCarousel.classList.remove("is-hidden");
    homeHero.classList.add("is-hidden");

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
          resetAutoplay();
        });

        bannerDotsContainer.appendChild(dot);
      });
    }

    showBanner(0);

    if (validSlides.length === 1) {
      bannerPrev?.classList.add("is-hidden");
      bannerNext?.classList.add("is-hidden");
      bannerDotsContainer?.classList.add("is-hidden");
    } else {
      bannerPrev?.classList.remove("is-hidden");
      bannerNext?.classList.remove("is-hidden");
      bannerDotsContainer?.classList.remove("is-hidden");

      bannerNext?.addEventListener("click", () => {
        nextBanner();
        resetAutoplay();
      });

      bannerPrev?.addEventListener("click", () => {
        prevBanner();
        resetAutoplay();
      });

      startAutoplay();

      // Swipe no mobile
      let touchStartX = 0;
      let touchEndX = 0;

      bannerCarousel.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].screenX;
      });

      bannerCarousel.addEventListener("touchend", (event) => {
        touchEndX = event.changedTouches[0].screenX;

        const swipeDistance = touchStartX - touchEndX;

        if (Math.abs(swipeDistance) > 50) {
          if (swipeDistance > 0) {
            nextBanner();
          } else {
            prevBanner();
          }

          resetAutoplay();
        }
      });
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

// ---- CARROSSEL DE DEPOIMENTOS ----
const reviewsCarousel = document.querySelector("#reviews-carousel");

if (reviewsCarousel) {
  const reviewsViewport = reviewsCarousel.querySelector(".reviews-viewport");
  const reviewsTrack = reviewsCarousel.querySelector(".reviews-grid");
  const reviewCards = Array.from(reviewsTrack?.querySelectorAll(".review-card") || []);
  const reviewsPrev = reviewsCarousel.querySelector(".reviews-prev");
  const reviewsNext = reviewsCarousel.querySelector(".reviews-next");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let currentReview = 0;
  let reviewsTimer = null;
  let isPointerDown = false;
  let touchStartX = 0;

  function getVisibleReviews() {
    return Math.max(
      1,
      Number.parseInt(
        window.getComputedStyle(reviewsCarousel).getPropertyValue("--reviews-visible"),
        10,
      ) || 1,
    );
  }

  function getMaxIndex() {
    return Math.max(0, reviewCards.length - getVisibleReviews());
  }

  function getStep() {
    if (!reviewCards[0]) return 0;
    const cardWidth = reviewCards[0].getBoundingClientRect().width;
    const styles = window.getComputedStyle(reviewsTrack);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    return cardWidth + gap;
  }

  function updateReviews(index, animate = true) {
    if (!reviewsTrack || !reviewCards.length) return;

    currentReview = Math.min(Math.max(index, 0), getMaxIndex());
    const step = getStep();

    reviewsTrack.style.transitionDuration = animate && !reduceMotion.matches ? "0.55s" : "0s";
    reviewsTrack.style.transform = `translate3d(${-currentReview * step}px, 0, 0)`;

    const hasOverflow = reviewCards.length > getVisibleReviews();
    reviewsPrev?.toggleAttribute("disabled", !hasOverflow);
    reviewsNext?.toggleAttribute("disabled", !hasOverflow);

    reviewCards.forEach((card, index) => {
      const firstVisible = currentReview;
      const lastVisible = currentReview + getVisibleReviews() - 1;
      const visible = index >= firstVisible && index <= lastVisible;
      card.setAttribute("aria-hidden", String(!visible));
    });
  }

  function nextReview() {
    const maxIndex = getMaxIndex();
    if (maxIndex === 0) return;
    updateReviews(currentReview >= maxIndex ? 0 : currentReview + 1);
  }

  function prevReview() {
    const maxIndex = getMaxIndex();
    if (maxIndex === 0) return;
    updateReviews(currentReview <= 0 ? maxIndex : currentReview - 1);
  }

  function stopReviewsAutoplay() {
    if (reviewsTimer) {
      clearInterval(reviewsTimer);
      reviewsTimer = null;
    }
  }

  function startReviewsAutoplay() {
    stopReviewsAutoplay();

    if (reduceMotion.matches || reviewCards.length <= getVisibleReviews()) return;

    // 6,5s deixa tempo suficiente para ler e ainda mantém o bloco dinâmico.
    reviewsTimer = window.setInterval(nextReview, 6500);
  }

  function resetReviewsAutoplay() {
    startReviewsAutoplay();
  }

  if (reviewCards.length) {
    updateReviews(0, false);
    startReviewsAutoplay();

    reviewsNext?.addEventListener("click", () => {
      nextReview();
      resetReviewsAutoplay();
    });

    reviewsPrev?.addEventListener("click", () => {
      prevReview();
      resetReviewsAutoplay();
    });

    // Pausa quando o usuário está lendo/interagindo com o bloco.
    reviewsCarousel.addEventListener("mouseenter", stopReviewsAutoplay);
    reviewsCarousel.addEventListener("mouseleave", startReviewsAutoplay);
    reviewsCarousel.addEventListener("focusin", stopReviewsAutoplay);
    reviewsCarousel.addEventListener("focusout", (event) => {
      if (!reviewsCarousel.contains(event.relatedTarget)) {
        startReviewsAutoplay();
      }
    });

    // Swipe horizontal no celular.
    reviewsViewport?.addEventListener("touchstart", (event) => {
      isPointerDown = true;
      touchStartX = event.changedTouches[0].screenX;
      stopReviewsAutoplay();
    }, { passive: true });

    reviewsViewport?.addEventListener("touchend", (event) => {
      if (!isPointerDown) return;
      isPointerDown = false;

      const swipeDistance = touchStartX - event.changedTouches[0].screenX;

      if (Math.abs(swipeDistance) > 45) {
        swipeDistance > 0 ? nextReview() : prevReview();
      }

      startReviewsAutoplay();
    }, { passive: true });

    // Recalcula largura/posição ao girar o celular ou redimensionar a janela.
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        currentReview = Math.min(currentReview, getMaxIndex());
        updateReviews(currentReview, false);
        startReviewsAutoplay();
      }, 120);
    });

    reduceMotion.addEventListener?.("change", () => {
      updateReviews(currentReview, false);
      startReviewsAutoplay();
    });

    // Não continua avançando enquanto a aba está em segundo plano.
    document.addEventListener("visibilitychange", () => {
      document.hidden ? stopReviewsAutoplay() : startReviewsAutoplay();
    });
  }
}
