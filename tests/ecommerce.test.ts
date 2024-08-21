import { describe, it, expect, beforeEach } from "vitest";
import {
  addProduct,
  addToCart,
  applyShippingDiscount,
  calculateTotal,
  clearCart,
  removeFromCart,
} from "../src/ecommerce";

let cart = {};
describe("E-commerce System", () => {
  beforeEach(() => {
    addProduct("Soap", 100, 10);
    addProduct("Shampoo", 200, 5);
    clearCart();
  });

  it("should calculate price of all products", () => {
    // Arrange Act Assert
    // Arrange
    addToCart("Soap", 2);
    addToCart("Shampoo", 2);
    // Act
    const sum = calculateTotal();
    // Assert
    expect(sum).toBe(600);
  });

  it("Calculating multiples of 1 product", () => {
    addToCart("Soap", 5);
    addToCart("Soap", 2);

    const sum = calculateTotal();
    expect(sum).toBe(700);
  });

  it("Should add items to cart", () => {
    let cart = {};
    // Arrange Act Assert
    // Act
    cart = addToCart("Soap", 2);
    // Assert
    expect(cart["Soap"]).toBe(2);
  });

  it("Should be able to remove items from cart", () => {
    let cart = {};
    cart = addToCart("Soap", 2);
    cart = removeFromCart("Soap", 2);
    expect(cart["Soap"]).toBe(undefined);
  })

  it("Should run out of stock", () => {
    addToCart("Soap", 5);
    addToCart("Soap", 5);
    // expect(addToCart("Soap", 1)).toThrowError('Cannot remove');
    
  });

  it ("Apply shipping discount", () => {
    let cart = {};
    cart = addToCart("Soap", 5);
    const sum = applyShippingDiscount(calculateTotal());
    expect(sum).toBe(490);
  })

  it ("Does not apply discount if total is less than 500", () => {
    addToCart("Soap", 4);
    const sum = applyShippingDiscount(calculateTotal());
    expect(sum).toBe(400);
  })
});