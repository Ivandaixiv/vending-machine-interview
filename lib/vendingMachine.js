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
      let missingAmount = coin.minStock - coin.stock;
      if (!missingAmount <= 0) {
        coin.stock = coin.stock + missingAmount;
      }
    });
    return this.coins;
  }

  payForProduct(productId, inputDollars) {
    if (!productId) throw new Error("Select a product");
    if (!inputDollars[0]) {
      throw new Error("Insert Coins!");
    }
    let dispense = [];
    let hasItem = false;
    this.products.map(product => {
      if (product.id === productId) {
        hasItem = true;
        // if (inputDollars < product.price)
        //   throw new Error("You didn't insert enough money!");
        if (this.checkProductStock(product)) {
          hasItem = false;
        } else {
          // console.log(this.products);
          let returnChange = this.calculateChange(inputDollars, product.price);
          dispense = [product.name, returnChange];
        }
      }
    });
    if (hasItem === true) return dispense;
    else return this.cancelTransaction(inputDollars);
  }

  checkProductStock(product) {
    if (product.stock <= 0) {
      return true;
    } else {
      return false;
    }
  }

  calculateChange(insertedCoins, price) {
    let insertedTotal = 0;
    let returningChange = [];
    // O(n^2)
    insertedCoins.forEach(coin => {
      let usedCoins = this.coins.filter(denomimation => {
        return denomimation.denomination === coin.denomination;
      });
      insertedTotal += usedCoins[0].value * coin.quantity;
    });
    let returningTotal = insertedTotal - price;
    if (returningTotal < 0) {
      throw new Error("You didn't insert enough money");
    }
    for (let i = 0; i < this.coins.length; i++) {
      // check if the number is divisible by the coins value
      if (returningTotal % this.coins[i].value === 0) {
        let quantity = returningTotal / this.coins[i].value;
        if (quantity > 0) {
          returningChange.push({
            denomination: this.coins[i].denomination,
            quantity
          });
        }
        returningTotal = returningTotal - this.coins[i].value * quantity;
      }
    }
    return returningChange;
  }

  cancelTransaction(coins) {
    return coins;
  }
}

module.exports = VendingMachine;
