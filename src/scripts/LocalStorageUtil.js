class LocalStorageUtil {
  constructor() {
    this.key = "backetGoods";
    this.countElem = document.querySelector(".count-products");
  }

  getGoods() {
    const goodsLocalStorage = localStorage.getItem(this.key);
    if (goodsLocalStorage) {
      return JSON.parse(goodsLocalStorage);
    }
    return [];
  }

  putGoods(id) {
    let goods = this.getGoods();
    let index = goods.indexOf(id);
    let isPushed = false;
    if (!~index) {
      goods.push(id);
      isPushed = true;
    } else {
      goods.splice(index, 1);
    }
    localStorage.setItem(this.key, JSON.stringify(goods));

    return { goods, isPushed };
  }

  getGoodsLen() {
    return this.getGoods().length;
  }

  setGoodsCount() {
    this.countElem.innerText = this.getGoodsLen();
  }
}

const localStorageUtil = new LocalStorageUtil();
