import { makeObservable, observable, action, computed } from "mobx";
import { makePersistable } from "mobx-persist-store";

class Order {
  order = {
    items: [], // { item }
    order_number: null,
    total: 0,
    delivery_type: "У ресторані",
  };

  constructor() {
    makeObservable(this, {
      order: observable,
      addToCart: action,
      totalPrice: action,
      deliveryOption: action,
      decreaseQuantity: action,
      items: computed,
      totalQuantity: computed,
      clearOrderedProductList: action,
    });

    makePersistable(this, {
      name: "order",
      properties: ["order"],
      storage: window.localStorage,
    });
  }

  addToCart = dish => {
    const foundDish = this.order.items.find(item => item._id === dish._id);

    if (foundDish) {
      foundDish.quantity += 1;
      this.totalPrice();
      return;
    }

    this.order.items.push(dish);
    this.totalPrice();
  };

  currentDish(dishId) {
    const foundDish = this.order.items.find(item => item._id === dishId);

    return foundDish;
  }

  removeDish(dishId) {
    const dishIndex = this.order.items.findIndex(item => item._id === dishId);

    if (dishIndex === -1) {
      return;
    }

    this.order.items.splice(dishIndex, 1);
  }

  updateQuantity(productId, newQuantity) {
    const productIndex = this.order.items.findIndex(({ product }) => {
      return product.id === productId;
    });

    if (productIndex === -1) {
      return;
    }

    this.items[productIndex].quantity = newQuantity;
  }

  decreaseQuantity(dish) {
    const productIndex = this.order.items.findIndex(item => {
      return item._id === dish._id;
    });

    if (productIndex === -1) {
      return;
    }

    this.items[productIndex].quantity -= 1;

    if (this.items[productIndex].quantity === 0) {
      this.removeDish(dish._id);
      this.totalPrice();
      return;
    }

    this.totalPrice();
  }

  quantityDish(productId) {
    const foundProduct = this.order.items.find(({ product }) => product.id === productId);
    return foundProduct.quantity;
  }

  get items() {
    return this.order.items;
  }

  get totalQuantity() {
    return this.order.items.reduce((total, { item }) => total + item.price * item.quantity, 0);
  }

  totalPrice() {
    if (!this.order.items) {
      return 0;
    }
    const total = this.order.items.reduce((total, item) => total + item.price * item.quantity, 0);
    this.order.total = total; // оновлення значення total безпосередньо в order
    return total;
  }

  clearOrderedProductList() {
    window.localStorage.clear();

    // Очистити дані змінної order
    this.order = {
      items: [],
      order_number: null,
      total: 0,
      delivery_type: "",
    };
  }

  deliveryOption(option) {
    console.log(option);
    const delivery = (this.order.delivery_type = option);
    console.log(this.order.delivery_type);

    return delivery;
  }

  setisProcessing(value) {
    this.order.isProcessing = value;
  }

  setOrderNumber(num) {
    this.order.order_number = num;
  }

  setError(err) {
    this.order.error = err;
  }

  get isProcessing() {
    return this.order.setisProcessing;
  }

  get order_number() {
    return this.order.order_number;
  }

  get error() {
    return this.order.error;
  }
}

export default new Order();
