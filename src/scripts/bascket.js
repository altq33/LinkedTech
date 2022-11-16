class Basket {
  constructor() {}

  render() {
    const goodsStore = localStorageUtil.getGoods();

    let htmlCatalog = "";

    goods.allGoods.forEach(({ id, imgPath, name, price, oldPrice}) => {
        if(goodsStore.includes(id)) {

        }
    });
  }
}
