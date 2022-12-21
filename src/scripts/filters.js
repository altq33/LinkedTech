const dropDownBtn = document.querySelector(".dropdown");
const dropDownList = document.querySelector(".dropdown-list");
const dropDownListItems = document.querySelectorAll(".dropdown-list-item");
const dropDownInput = document.querySelector(".dropdown-input");

dropDownBtn.addEventListener("click", () => {
  dropDownList.classList.toggle("active");
});

dropDownListItems.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    dropDownBtn.textContent = e.target.textContent;
    dropDownList.classList.remove("active");
    dropDownInput.setAttribute("value", e.target.dataset.value);
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
