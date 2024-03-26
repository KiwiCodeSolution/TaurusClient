import { makeObservable, observable, action, computed } from "mobx";
import { makePersistable } from "mobx-persist-store";

class Order {
  order = {
    items: [], // { item, quantity }
    order_number: null,
    total: 0,
  };

  constructor() {
    makeObservable(this, {
      order: observable,
      addToCart: action,
      totalPrice: action,
      decreaseQuantity: action,
      items: computed,
      totalQuantity: computed,
      clearOrderedProductList: action,
    });

    makePersistable(this, { name: "order", properties: ["order"] });
  }

  addToCart = (dish) => {
    const foundDish = this.order.items.find(({ item }) => item._id === dish._id);

    if (foundDish) {
      foundDish.quantity += 1;
      this.totalPrice();

      return;
    }

    this.order.items.push({ item: dish, quantity: 1 });
    this.totalPrice();
  };

  currentDish(dishtId) {
    const foundDish = this.order.items.find(({ item }) => item._id === dishtId);

    return foundDish;
  }

  removeDish(dishtId) {
    const dishIndex = this.order.items.findIndex(({ item }) => item._id === dishtId);

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
    const productIndex = this.order.items.findIndex(({ item }) => {
      return item._id === dish._id;
    });

    if (productIndex === -1) {
      return;
    }

    this.items[productIndex].quantity -= 1;

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
    return this.order.items.reduce((total, { item, quantity }) => total + item.price * quantity, 0);
  }

  totalPrice() {
    if (!this.order.items) {
      return 0;
    }
    const total = this.order.items.reduce((total, { item, quantity }) => total + item.price * quantity, 0);
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
    };
  }

  // placeOrderAction = async (customerData) => {
  //   this.setisProcessing(true);
  //   const order = {
  //     ...customerData,
  //     total_amount: this.totalPrice,
  //     ...toJS(this.order),
  //   };

  //   try {
  //     const result = await placeOrder(order);
  //     this.setOrderNumber(result.data.order_number);
  //     this.clearOrderedProductList();
  //   } catch (err) {
  //     this.setError(err.message);
  //   } finally {
  //     this.setisProcessing(true);
  //   }
  // };

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

  // placeOrderAction = async (customerData) => {
  //   clientStore.setIsLoading(true);
  //   // временное .. начало
  //   const order = {
  //     ...customerData,
  //     total_amount: this.totalPrice,
  //     ...toJS(this.order),
  //   };
  //   console.log("placingOrder:", order);
  //   const result = await placeOrder(order);
  //   //  временное .. стоп

  //   // const result = await placeOrder(toJS(this.order));

  //   runInAction(() => {
  //     clientStore.setIsLoading(false);
  //     if (result.error) {
  //       clientStore.setError(result.error);
  //       return;
  //     }
  //     this.order = { products: [] };
  //     clientStore.setMessage(result.data.order_number);
  //   });
  // };
}

export default new Order();
