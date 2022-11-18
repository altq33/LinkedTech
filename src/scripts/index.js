const burgerButton = document.querySelector(".burger-button");
const headerMenu = document.querySelector(".menu-wrap");
const basketButton = document.querySelector(".basket-button");
const basketModal = document.querySelector("#basket-modal");
const closeModalBtn = basketModal.querySelector(".close-basket-modal");
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

basketButton.addEventListener("click", () => {
  basketModal.classList.toggle("active");
  basket.render();
});

closeModalBtn.addEventListener("click", () => {
  basketModal.classList.remove("active");
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
