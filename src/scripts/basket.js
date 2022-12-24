class Basket {
  constructor() {
    this.copons = null;
    const checkCouponBtn = document.querySelector(".check-coupon");
    checkCouponBtn.addEventListener("click", () => {
      this.applyCoupon();
    });
  }

  async getCopons(get) {
    const response = await fetch(get);
    this.copons = await response.json();
  }

  applyCoupon() {
    this.getCopons("http://localhost:3000/promo").then(() => {
      const inputCoupon = document.querySelector(".input-container input");
      let value = inputCoupon.value;
      let status = false;
      this.copons.forEach(({ code, intSale }) => {
        if (code == value.toUpperCase()) {
          status = true;
          this.setGoodsTotalPrice(intSale);
          return;
        }
      });
      if (status) {
        inputCoupon.style.border = "1px solid rgb(0, 255,0)";
      } else {
        inputCoupon.style.border = "1px solid rgb(255, 0,0)";
      }
    });
  }

  setGoodsTotalPrice(sale = 0) {
    const basketGoodPriceOne = document.querySelectorAll(".left-price .price");
    const basketGoodPriceAll = document.querySelectorAll(".right-price .price");
    const basketGoodPriceOldOne = document.querySelectorAll(
      ".left-price .old-price"
    );
    const basketGoodPriceOldAll = document.querySelectorAll(
      ".right-price .old-price"
    );
    const goodsCount = document.querySelectorAll(".count");
    const plusBtn = document.querySelectorAll(".plus");
    const mnsBtn = document.querySelectorAll(".minus");
    const save = document.querySelectorAll(".right-price .save");
    const totalPrice = document.querySelector(".all-prices .price");
    const totalOldPrice = document.querySelector(".all-prices .old-price");
    const totalSave = document.querySelector(".all-prices .save");

    //TODO Было бы классно сделать эту функцию на 3 параметра, чтоб пересчитывать не все элементы, а только передаваемые
    function updateValue() {
      basketGoodPriceOne.forEach((elem, ind) => {
        let value = parseFloat(elem.textContent.slice(1));
        let count = +goodsCount[ind].value;
        basketGoodPriceAll[ind].innerHTML = `$ ${(value * count).toFixed(2)}`;
      });
      basketGoodPriceOldOne.forEach((elem, ind) => {
        let value = parseFloat(elem.textContent.slice(1));
        let count = +goodsCount[ind].value;
        basketGoodPriceOldAll[ind].innerHTML = `$ ${(value * count).toFixed(
          2
        )}`;
        save[ind].innerHTML = `Saving $ ${(
          basketGoodPriceOldAll[ind].textContent.slice(2) -
          basketGoodPriceAll[ind].textContent.slice(2)
        ).toFixed(2)}`;
      });
      setTotal();
    }

    function setTotal(s = sale) {
      let sum = 0;
      basketGoodPriceAll.forEach((e) => {
        sum += +e.textContent.slice(2);
      });
      totalPrice.innerHTML = `$ ${(sum - (sum * sale) / 100).toFixed(2)}`;
      sum = 0;
      basketGoodPriceOldAll.forEach((e) => {
        sum += +e.textContent.slice(2);
      });
      totalOldPrice.innerHTML = `$ ${sum.toFixed(2)}`;

      totalSave.innerHTML = `Saving $ ${(
        totalOldPrice.textContent.slice(2) - totalPrice.textContent.slice(2)
      ).toFixed(2)}`;
    }

    plusBtn.forEach((el, i) => {
      el.addEventListener("click", () => {
        goodsCount[i].value++;
        updateValue();
      });
    });
    mnsBtn.forEach((el, i) => {
      el.addEventListener("click", () => {
        if (goodsCount[i].value !== "0") {
          goodsCount[i].value--;
        }
        updateValue();
      });
    });
    updateValue();

    goodsCount.forEach((elem) => {
      let prevValue = 1;
      elem.addEventListener("input", (e) => {
        if (e.target.value.match(/^\+?(0|[1-9]\d*)$/) || !e.target.value) {
          prevValue = e.target.value;
          updateValue();
        } else {
          e.target.value = prevValue;
        }
      });
    });
  }

  deleteGood() {
    const deleteButton = document.querySelectorAll(".close-good-modal");
    const goodCards = document.querySelectorAll(".basket-good");

    deleteButton.forEach((e, i) => {
      e.addEventListener("click", () => {
        let id = goodCards[i].getAttribute("data-good-card-id");
        localStorageUtil.putGoods(`${id}`);
        this.render();
        localStorageUtil.setGoodsCount();
        goods.render();
      });
    });
  }

  render() {
    const goodsStore = localStorageUtil.getGoods();
    let htmlCatalog = "";

    goods.allGoods.forEach(
      ({ id, imgPath, name, price, oldPrice, intSale, rating }) => {
        if (goodsStore.includes(`${id}`)) {
          htmlCatalog += `
        <div class="basket-good" data-good-card-id="${id}">
        <div class="close-good-modal">
          <span></span>
          <span></span>
        </div>
        <div class="img-container">
          <div class="sale">-${intSale}%</div>
          <img src="${imgPath}" alt="busket-good-img" />
        </div>
        <div class="description-container">
          <h3 class="name">${name}</h3>
          <div class="propetries">
            <div class="property-name">
              <h4>Sale</h4>
              <h4>Price</h4>
              <h4>Rate</h4>
            </div>
            <div class="property-value">
              <h4>-${intSale}%</h4>
              <h4>${price}$</h4>
              <h4>${rating}</h4>
            </div>
          </div>
        </div>
        <div class="price-container">
          <div class="left-price">
            <p class="price">$ ${price}</p>
            <p class="old-price">$ ${oldPrice}</p>
            <p class="price-per-one">Price for one item</p>
          </div>
          <div class="counter">
            <button class="minus">-</button>
            <input type="text" class="count" value="1" />
            <button class="plus">+</button>
          </div>
          <div class="right-price">
            <p class="price"></p>
            <p class="old-price"></p>
            <p class="save"></p>
          </div>
        </div>
      </div>   
        `;
        }
      }
    );

    const goodContainer = document.querySelector(".basket-good-container");
    goodContainer.innerHTML = htmlCatalog;
    this.setGoodsTotalPrice();
    this.deleteGood();
  }
}

const basket = new Basket();
const goods = new Goods();

goods.getProducts("http://localhost:3000/goods").then(() => {
  goods.render();
  basket.render();
  search.startLiveSearch();
});
