class Search {
  constructor() {
    // init
    this.searchBtn = document.querySelector(".search-button");
    this.cancelBtn = document.querySelector(".cancel-button");
    this.searchContainer = document.querySelector(".search-container");
    this.searchInput = document.querySelector(".seacrh-input");
    this.searchResults = document.querySelector(".search-results");
    this._isOpened = false;
    this._clickedOnInput = false;
    // listeners
    this.searchBtn.addEventListener("click", this.openSearch.bind(this));
    this.cancelBtn.addEventListener("click", this.closeSearch.bind(this));
    this.searchInput.addEventListener("mousedown", (e) => {
      this._clickedOnInput = true;
    });
    document.addEventListener("click", (e) => {
      if (
        e.target != this.searchContainer &&
        e.target != this.searchBtn &&
        e.target != this.searchInput &&
        e.target != this.searchResults &&
        this._isOpened &&
        !this._clickedOnInput
      ) {
        this.closeSearch();
      }
      this._clickedOnInput = false;
    });
  }

  // methods
  closeSearch(e) {
    this.searchContainer.classList.remove("active");
    this.searchInput.classList.remove("active");
    this.cancelBtn.classList.remove("active");
    setTimeout(() => {
      this.searchInput.value = "";
    }, 500);
    this._isOpened = false;
    this.searchResults.style.display = "none";
  }

  openSearch(e) {
    this._isOpened = true;
    this.searchContainer.classList.add("active");
    this.searchInput.classList.add("active");
    this.cancelBtn.classList.add("active");
  }

  startLiveSearch() {
    const debounce = (fn, ms) => {
      let timeout;
      return function () {
        const fnCall = () => {
          fn.apply(this, arguments);
        };
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms);
      };
    };

    const debouncedGetResults = debounce(this.getResults, 250);

    this.searchInput.addEventListener("input", debouncedGetResults.bind(this));
  }

  getResults(e) {
    let value = e.target.value.trim().toLowerCase();
    if (value) {
      this.render(value);
    } else {
      this.searchResults.style.display = "none";
    }
  }

  render(seacrhQuery) {
    let resultHTML = ``;
    this.searchResults.style.display = "flex";
    goods.allGoods.forEach(({ imgPath, name, price, rating }) => {
      if (name.toLowerCase().startsWith(seacrhQuery)) {
        let templateHTML = `
          <a href="">
          <li class="search-results-item">
            <img src="${imgPath}" alt="goodPic" />
            <div class="info">
              <h2 class="name">${name}</h2>
              <h2 class="price">${price}$</h2>
              ${goods.createStars(rating)}
            </div>
          </li>
        </a>`;
        resultHTML += templateHTML;
      }
    });

    if (!resultHTML) {
      this.searchResults.innerHTML = `<p class="no-results">Nothing found \u{1F615}</p>`;
    } else {
      this.searchResults.innerHTML = resultHTML;
    }
  }
}
const search = new Search();
