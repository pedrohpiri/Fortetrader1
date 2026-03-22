(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var header = document.querySelector(".js-header");
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 20) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");
  }
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  var toggle = document.querySelector(".menu-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      if (open) mobileNav.setAttribute("hidden", "");
      else mobileNav.removeAttribute("hidden");
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("hidden", "");
      });
    });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = typeof window.gsap !== "undefined";
  var hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";

  function initTilt() {
    if (reduceMotion || typeof window.VanillaTilt === "undefined") return;
    window.VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      gyroscope: false,
      "mouse-event-element": document.body,
    });
  }

  if (reduceMotion) {
    if (hasGsap) {
      gsap.set(".chart-line", { strokeDashoffset: 0 });
    }
    return;
  }

  if (hasGsap && hasScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    var heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    heroTl
      .from(".hero-copy .eyebrow", { opacity: 0, y: 22, duration: 0.55 }, 0)
      .from(".hero-copy h1", { opacity: 0, y: 34, duration: 0.75 }, 0.08)
      .from(".hero-copy .lead", { opacity: 0, y: 24, duration: 0.62 }, 0.18)
      .from(".hero-copy .hero-actions", { opacity: 0, y: 18, duration: 0.5 }, 0.28)
      .from(".hero-stats li", { opacity: 0, x: -14, duration: 0.45, stagger: 0.07 }, 0.32)
      .from(
        ".panel-card-wrap",
        {
          opacity: 0,
          y: 48,
          scale: 0.9,
          rotateX: 10,
          transformOrigin: "center bottom",
          duration: 0.9,
          ease: "power3.out",
        },
        0.12
      );

    gsap.to(".chart-line", {
      strokeDashoffset: 0,
      duration: 1.75,
      ease: "power2.inOut",
      delay: 0.45,
    });

    document.querySelectorAll(".js-section-head").forEach(function (head) {
      gsap.from(head.children, {
        opacity: 0,
        y: 32,
        duration: 0.68,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: head,
          start: "top 86%",
          toggleActions: "play none none none",
        },
      });
    });

    var cardsGrid = document.querySelector(".cards-3");
    if (cardsGrid) {
      gsap.from(cardsGrid.querySelectorAll(".card-wrap"), {
        opacity: 0,
        y: 56,
        duration: 0.72,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsGrid,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });
    }

    gsap.utils.toArray(".js-reveal").forEach(function (el) {
      gsap.from(el, {
        opacity: 0,
        y: 44,
        duration: 0.78,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 89%",
          toggleActions: "play none none none",
        },
      });
    });

    var pills = document.querySelector(".js-pills");
    if (pills) {
      gsap.from(pills.children, {
        opacity: 0,
        y: 20,
        scale: 0.94,
        duration: 0.55,
        stagger: 0.1,
        ease: "back.out(1.25)",
        scrollTrigger: {
          trigger: pills,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }

    gsap.from(".js-fab", {
      scale: 0,
      opacity: 0,
      duration: 0.55,
      ease: "back.out(1.7)",
      delay: 1.1,
    });

    ScrollTrigger.refresh();
  } else if ("IntersectionObserver" in window) {
    document.querySelectorAll(".js-reveal").forEach(function (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity 0.65s ease, transform 0.65s ease";
    });
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
          obs.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 }
    );
    document.querySelectorAll(".js-reveal").forEach(function (n) {
      obs.observe(n);
    });
    if (hasGsap) gsap.set(".chart-line", { strokeDashoffset: 0 });
  }

  initTilt();
})();
