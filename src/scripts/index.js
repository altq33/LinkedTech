let burgerButton = document.querySelector(".burger-button");
let headerMenu = document.querySelector(".menu-wrap");
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
