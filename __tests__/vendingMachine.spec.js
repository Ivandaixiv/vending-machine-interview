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
  describe("refills the inventory if theres anything thats missing", () => {
    beforeEach(() => {
      sodaVendingMachine.inventory.products[3].stock = 3;
    });

    it("should return full inventory ", () => {
      expect(sodaVendingMachine.refillProducts()).toEqual([
        {
          id: "A1",
          name: "Chips",
          price: 150,
          stock: 10,
          maxStock: 10
        },
        {
          id: "A2",
          name: "Chocolate",
          price: 300,
          stock: 20,
          maxStock: 20
        },
        {
          id: "A3",
          name: "Gum",
          price: 100,
          stock: 30,
          maxStock: 30
        },
        {
          id: "A4",
          name: "Soda",
          price: 150,
          stock: 10,
          maxStock: 10
        },
        {
          id: "A5",
          name: "Bento",
          price: 150,
          stock: 5,
          maxStock: 5
        }
      ]);
      //   true means that it is full
    });
  });
  describe("refills the change if theres coins thats missing", () => {
    beforeEach(() => {
      sodaVendingMachine.inventory.coins[3].stock = 3;
      sodaVendingMachine.inventory.coins[4].stock = 6;
      sodaVendingMachine.inventory.coins[1].stock = 1;
    });
    it("should return 'Your coins are now fully stocked!' ", () => {
      expect(sodaVendingMachine.refillChange()).toEqual(
        "Your coins are now fully stocked!"
      );
    });
  });
  describe("returns the amount of money that the user inserted", () => {
    it("should return 2 toonie 1 loonie and 4 quarters", () => {
      expect(
        sodaVendingMachine.cancelTransaction([
          { denomination: "toonie", quantity: 2 },
          { denomination: "loonie", quantity: 1 },
          { denomination: "quarter", quantity: 4 }
        ])
      ).toEqual([
        { denomination: "toonie", quantity: 2 },
        { denomination: "loonie", quantity: 1 },
        { denomination: "quarter", quantity: 4 }
      ]);
    });
  });
  describe("dispenses a product and caculate change if user pays over the required amount", () => {
    it("should return chips and 2 quarters", () => {
      expect(
        sodaVendingMachine.payForProduct("A1", [
          { denomination: "loonie", quantity: 2 }
        ])
      ).toEqual(["Chips", [{ denomination: "quarter", quantity: 2 }]]);
    });
  });
  describe("dispenses a product and caculate change if user pays exact amount", () => {
    it("should return chips and 0 change", () => {
      expect(
        sodaVendingMachine.payForProduct("A1", [
          { denomination: "loonie", quantity: 1 },
          { denomination: "quarter", quantity: 2 }
        ])
      ).toEqual(["Chips", []]);
    });
  });
  describe("does not dispense anything if user hasn't inserted the required amount", () => {
    it("should return an error", () => {
      expect(() => {
        sodaVendingMachine.payForProduct("A2", [
          { denomination: "loonie", quantity: 1 },
          { denomination: "quarter", quantity: 2 }
        ]);
        // "You didn't insert enough money"
      }).toThrow();
    });
  });
  describe("does not do anything because the machine doesnt have enough change to provide the user", () => {
    it("should return the inserted coins", () => {
      beforeEach(() => {
        sodaVendingMachine.inventory.coins[2].stock = 0;
      });
      expect(
        sodaVendingMachine.payForProduct("A1", [
          { denomination: "loonie", quantity: 2 }
        ])
      ).toEqual([{ denomination: "loonie", quantity: 2 }]);
      //   "Sorry we do not have enough change"
    });
  });
  describe("does not do anything because the machine doesnt have enough of the selected product", () => {
    it("should return the inserted coins", () => {
      beforeEach(() => {
        sodaVendingMachine.inventory.products[3].stock = 3;
      });
      expect(
        sodaVendingMachine.payForProduct("A1", [
          { denomination: "loonie", quantity: 2 }
        ])
      ).toEqual([{ denomination: "quarter", quantity: 2 }]);
      //   "Sorry the selected item is out of stock"
    });
  });
  describe("does not do anything because the machine doesnt have the selected product id", () => {
    it("should return the inserted coins", () => {
      expect(
        sodaVendingMachine.payForProduct("B1", [
          { denomination: "loonie", quantity: 2 }
        ])
      ).toEqual([{ denomination: "quarter", quantity: 2 }]);
      //   "Sorry the selected item is out of stock"
    });
  });
  describe("does not dispense anything if user hasn't insert any value", () => {
    it("should return an error", () => {
      expect(() => {
        sodaVendingMachine.payForProduct("A2", []);
        // "Insert Coins!"
      }).toThrow();
    });
  });
  describe("does not dispense anything if user hasn't select anything", () => {
    it("should return an error", () => {
      expect(() => {
        sodaVendingMachine.payForProduct();
        // "Select a product!"
      }).toThrow();
    });
  });
});
