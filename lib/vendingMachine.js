class VendingMachine {
  constructor(inventory) {
    this.inventory = inventory;
    this.products = inventory.products;
    this.coins = inventory.coins;
  }
  get getInventory() {
    return this.inventory;
  }

  refillProducts() {
    this.products.forEach(product => {
      let missingAmount = product.maxStock - product.stock;
      if (!missingAmount == 0) {
        product.stock = product.stock + missingAmount;
      }
    });
    return this.products;
  }

  refillChange() {
    this.coins.forEach(coin => {
      let missingAmount = coin.minstock - coin.stock;
      if (!missingAmount == 0) {
        console.log(coin);
        coin.stock = coin.stock + missingAmount;
      }
    });
    console.log(this.coins);
    return "Your coins are now fully stocked!";
  }

  payForProduct(productId, inputDollars) {
    if (inputDollars <= 0) {
      throw new Error("Insert Coins!");
    }
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
