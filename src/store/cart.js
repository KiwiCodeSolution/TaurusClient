import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class Cart {
  order = {
    products: [], // { product, quantity }
    order_number: null,
  };

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, { name: "order", properties: ["order"] });
  }

  addItem(item) {
    const existingItem = this.order.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.order.push({ ...item, quantity: 1 });
    }
  }

  removeItem(itemId) {
    this.order.replace(this.order.filter((item) => item.id !== itemId));
  }

  updateQuantity(itemId, newQuantity) {
    const itemToUpdate = this.items.find((item) => item.id === itemId);
    if (itemToUpdate) {
      itemToUpdate.quantity = newQuantity;
    }
  }

  get totalPrice() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  clearCart() {
    this.items.clear();
  }

  checkout() {
    // Логіка оформлення замовлення
    console.log("Замовлення оформлено!");
    this.clearCart();
  }
}

const cart = new Cart();
export default cart;
