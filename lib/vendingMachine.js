class vendingMachine {
  constructor(products, coins) {
    this.products = products;
    this.coins = coins;
  }
  get productsInventory() {
    return this.products;
  }
  get coinsStash() {
    return this.coins;
  }
}
module.exports = vendingMachine;
