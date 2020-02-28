class VendingMachine {
  constructor(inventory) {
    this.inventory = inventory;
    this.products = inventory.products;
    this.coins = inventory.coins;
  }
  get getInventory() {
    return this.inventory;
  }

  payForProduct(productId, inputDollars) {
    let value = [];
    this.products.map(product => {
      if (product.id === productId) {
        if (inputDollars < product.price)
          throw new Error("You didn't insert enough money!");
        let returnChange = this.calculateChange(inputDollars, product.price);
        value = [product.name, returnChange];
      }
    });
    return value;
  }

  calculateChange(dollars, price) {
    if (dollars > price) {
      return dollars - price;
    } else {
      return 0;
    }
  }
}
module.exports = VendingMachine;
