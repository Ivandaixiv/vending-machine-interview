const VendingMachine = require("../lib/VendingMachine");

const inventory = require("../mockData.json");
let sodaVendingMachine;

describe("Vending Machine", () => {
  beforeEach(() => {
    sodaVendingMachine = new VendingMachine(inventory);
  });
  describe("print inventory", () => {
    it("should return the inventory", () => {
      expect(sodaVendingMachine.getInventory).toBe(inventory);
    });
  });
  describe("dispenses a product and caculate change if user pays exact amount", () => {
    it("should return chips and 30 change", () => {
      expect(sodaVendingMachine.payForProduct("A1", 180)).toEqual([
        "Chips",
        30
      ]);
    });
  });
  describe("does not dispense anything if user hasn't inserted the required amount", () => {
    it("should return an error", () => {
      expect(() => {
        sodaVendingMachine.payForProduct("A2", 150);
      }).toThrow();
    });
  });
});
