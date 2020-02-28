class VendingMachine {
  constructor(inventory) {
    this.inventory = inventory;
    this.products = inventory.products;
    this.coins = inventory.coins;
  }
  get getInventory() {
    return this.inventory;
  }
}
module.exports = VendingMachine;
