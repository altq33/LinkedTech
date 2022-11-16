let burgerButton = document.querySelector(".burger-button");
let headerMenu = document.querySelector(".menu-wrap");
let basketButton = document.querySelector(".basket-button");



burgerButton.addEventListener("click", (e) => {
  burgerButton.classList.toggle("active");
  headerMenu.classList.toggle("active");

  if (burgerButton.classList.contains("active")) {
    const scrollY =
      document.documentElement.style.getPropertyValue("--scroll-y");
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}`;
  } else {
    const body = document.body;
    const scrollY = body.style.top;
    body.style.position = "";
    body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }
});

window.addEventListener("scroll", () => {
  document.documentElement.style.setProperty(
    "--scroll-y",
    `${window.scrollY}px`
  );
});

const goodTabsButtons = document.querySelectorAll(".categories-item");
const goodTabs = document.querySelectorAll(".products-slider");

goodTabsButtons.forEach((item) => {
  item.addEventListener("click", () => {
    goodTabsButtons.forEach((el) => {
      el.classList.remove("current");
    });
    item.classList.add("current");
    let tabID = item.getAttribute("data-tab");
    goodTabs.forEach((item) => {
      item.classList.remove("active");
    });
    document.querySelector(tabID).classList.add("active");
    goods.render();
  });
});
