const dropDownBtn = document.querySelector(".dropdown");
const dropDownList = document.querySelector(".dropdown-list");
const dropDownListItems = document.querySelectorAll(".dropdown-list-item");

const filteredRender = (value) => {
  switch (value) {
    case "no-filter":
      goods.getProducts("http://localhost:3000/goods").then(() => {
        goods.render();
      });
      break;
    case "cheap":
      goods
        .getProducts("http://localhost:3000/goods?_sort=price&_order=asc")
        .then(() => {
          goods.render();
        });
      break;
    case "expensive":
      goods
        .getProducts("http://localhost:3000/goods?_sort=price&_order=desc")
        .then(() => {
          goods.render();
        });
      break;
    case "discount":
      goods
        .getProducts("http://localhost:3000/goods?_sort=intSale&_order=desc")
        .then(() => {
          goods.render();
        });
      break;
    case "rating":
      goods
        .getProducts("http://localhost:3000/goods?_sort=rating&_order=desc")
        .then(() => {
          goods.render();
        });
      break;
  }
};

dropDownBtn.addEventListener("click", () => {
  dropDownList.classList.toggle("active");
});

dropDownListItems.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    dropDownBtn.textContent = e.target.textContent;
    dropDownList.classList.remove("active");
    filteredRender(e.target.dataset.value);
  });
});

document.addEventListener("click", (e) => {
  if (e.target != dropDownBtn) {
    dropDownList.classList.remove("active");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    dropDownList.classList.remove("active");
  }
});
