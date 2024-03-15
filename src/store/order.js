import { makeAutoObservable, toJS } from "mobx";
import { makePersistable } from "mobx-persist-store";

class Order {
  order = {
    products: [], // { product, quantity }
    order_number: null,
    isProcessing: false,
    error: null,
  };

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, { name: "order", properties: ["order"] });
  }

  checkProductInCart(productToAdd) {
    const foundProduct = this.order.products.find(({ product }) => product.name === productToAdd.name);

    return foundProduct ? true : false;
  }

  addToCart = (productToAdd, quantity) => {
    if (this.checkProductInCart(productToAdd)) {
      return;
    }

    this.order.products.push({ product: productToAdd, quantity });
  };

  deleteProduct(productName) {
    const productIndex = this.order.products.findIndex(({ product }) => product.name === productName);

    if (productIndex === -1) {
      return;
    }

    this.order.products.splice(productIndex, 1);
  }

  changeProductQuantity(productName, newQuantity) {
    const productIndex = this.order.products.findIndex(({ product }) => {
      return product.name === productName;
    });

    if (productIndex === -1) {
      return;
    }

    this.products[productIndex].quantity = newQuantity;
  }

  get products() {
    return this.order.products;
  }

  get totalQuantity() {
    return this.order.products.reduce((acc, product) => acc + product.quantity, 0);
  }

  get totalPrice() {
    return this.order.products.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0);
  }

  clearOrderedProductList() {
    this.order["products"] = [];
  }

  placeOrderAction = async (customerData) => {
    this.setisProcessing(true);
    const order = {
      ...customerData,
      total_amount: this.totalPrice,
      ...toJS(this.order),
    };

    try {
      const result = await placeOrder(order);
      this.setOrderNumber(result.data.order_number);
      this.clearOrderedProductList();
    } catch (err) {
      this.setError(err.message);
    } finally {
      this.setisProcessing(true);
    }
  };

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
