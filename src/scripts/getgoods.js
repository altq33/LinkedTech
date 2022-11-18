class Goods {
  constructor() {
    this.recentTab = document.querySelector("#recent");
    this.bestTab = document.querySelector("#best");
    this.specialTab = document.querySelector("#special");
    this.featuredTab = document.querySelector("#featured-in");
    this.activeBasketClass = "";
    this.allGoods = null;
  }

  async getProducts(get) {
    const response = await fetch(get);
    this.allGoods = await response.json();
  }

  handleSetLocationStorage(id, element) {
    const { goods, isPushed } = localStorageUtil.putGoods(id);

    if (isPushed) {
      element.classList.add("added");
    } else {
      element.classList.remove("added");
    }
    basket.render();
    localStorageUtil.setGoodsCount();
  }

  createStars(rate) {
    let res = '<div class="rating">';
    for (let i = 0; i < 5; ++i) {
      if (i < rate) res += '<div class="rate-star fill"></div>\n';
      else res += '<div class="rate-star"></div>\n';
    }
    res += "</div>";
    return res;
  }

  render(goods = this.allGoods) {
    let htmlRecent = "";
    let htmlBest = "";
    let htmlSpecial = "";
    let htmlFeatured = "";

    const goodsStore = localStorageUtil.getGoods();

    goods.forEach(
      ({ id, sale, imgPath, name, category, price, oldPrice, raiting }) => {
        this.activeBasketClass = "";

        if (goodsStore.includes(`${id}`)) {
          this.activeBasketClass = "added";
        }

        let htmlTemp = `
          <div class="products-slider-item">
          <div class="upper">
            <div class="sale-title">${sale}</div>
            <img
              src="${imgPath}"
              alt="goodImg"
              class="product-pic"
            />
          </div>
          <div class="lower">
            <div class="item-menu">
              <button class="menu-element basket ${
                this.activeBasketClass
              }" data-id="${id}"></button>
              <button class="menu-element"></button>
              <button class="menu-element"></button>
              <button class="menu-element"></button>
            </div>
            <h2 class="product-name">${name}</h2>
            <div class="price-container">
              <p class="price">$ ${price}</p>
              <p class="old-price">$ ${oldPrice}</p>
            </div>
          ${this.createStars(raiting)}
          </div>
          <div class="color-picker">
            <button class="color color1 picked"></button>
            <button class="color color2"></button>
            <button class="color color3"></button>
          </div>
        </div>
          `;
        if (category.includes("recent")) {
          htmlRecent += htmlTemp;
        }
        if (category.includes("best")) {
          htmlBest += htmlTemp;
        }
        if (category.includes("special")) {
          htmlSpecial += htmlTemp;
        }
        if (category.includes("featured-in")) {
          htmlFeatured += htmlTemp;
        }
      }
    );
    this.recentTab.innerHTML = htmlRecent;
    this.bestTab.innerHTML = htmlBest;
    this.specialTab.innerHTML = htmlSpecial;
    this.featuredTab.innerHTML = htmlFeatured;

    const basketsBtns = document.querySelectorAll(".basket");

    basketsBtns.forEach((e) => {
      e.addEventListener("click", (it) => {
        this.handleSetLocationStorage(it.target.dataset.id, it.target);
      });
    });
    localStorageUtil.setGoodsCount();
  }
}
