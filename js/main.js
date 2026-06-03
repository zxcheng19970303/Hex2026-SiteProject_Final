const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [
  ...scope.querySelectorAll(selector),
];

$(".menu-toggle")?.addEventListener("click", () => {
  const menu = $(".nav-menu");
  const expanded = menu.classList.toggle("is-open");
  $(".menu-toggle").setAttribute("aria-expanded", expanded ? "true" : "false");
});

$$(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.closest(".faq-item")?.classList.toggle("is-open");
  });
});

$$(".category-tabs").forEach((group) => {
  const buttons = $$("[data-filter]", group);
  const type = group.dataset.filterGroup;
  const selector = type === "project" ? ".project-card" : ".blog-list-item";
  const cards = $$(selector);
  const empty = $(".empty-state");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.dataset.filter;
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      let visible = 0;
      cards.forEach((card) => {
        const cats = card.dataset.category || "";
        const show = value === "全部" || cats.includes(value);
        card.classList.toggle("hide", !show);
        if (show) visible += 1;
      });
      if (empty && type === "blog")
        empty.style.display = visible ? "none" : "block";
      if (window.AOS) AOS.refreshHard();
    });
  });
});

$$("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("表單已送出，這是靜態作業示範。");
    form.reset();
  });
});

if (window.AOS) {
  AOS.init({
    duration: 760,
    easing: "ease-out-cubic",
    once: true,
    offset: 80,
    disable: () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  });
}

const refreshMotion = () => {
  if (window.AOS) AOS.refreshHard();
};
window.addEventListener("load", refreshMotion);

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  const menu = $(".nav-menu");
  const toggle = $(".menu-toggle");
  if (!menu?.classList.contains("is-open")) return;
  menu.classList.remove("is-open");
  toggle?.setAttribute("aria-expanded", "false");
});

$$(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = $(".nav-menu");
    const toggle = $(".menu-toggle");
    menu?.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});
