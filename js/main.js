(function () {
  "use strict";

  var root = document.documentElement;
  var menuBtn = document.querySelector(".menu-btn");
  var navLinks = document.querySelector(".nav-links");
  var themeBtn = document.querySelector(".theme-btn");

  /* ---------- 移动端菜单 ---------- */
  function closeMenu() {
    if (!navLinks || !menuBtn) return;
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "打开菜单");
    menuBtn.textContent = "☰";
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
      menuBtn.textContent = open ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navLinks.classList.contains("open")) {
        closeMenu();
        menuBtn.focus();
      }
    });
  }

  /* ---------- 主题切换 ---------- */
  function isLight() {
    return root.classList.contains("light");
  }

  function syncThemeBtn() {
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", isLight() ? "true" : "false");
    }
  }

  syncThemeBtn();

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      root.classList.toggle("light");
      var light = isLight();

      try {
        localStorage.setItem("theme", light ? "light" : "dark");
      } catch (e) {
        /* 忽略隐私模式等异常 */
      }

      root.style.colorScheme = light ? "light" : "dark";
      syncThemeBtn();
    });
  }
})();