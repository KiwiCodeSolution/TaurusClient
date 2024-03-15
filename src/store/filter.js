import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

class Filter {
  topCategory = "dishes";
  category = "";
  subCategory = "";

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, { name: "filter", properties: ["topCategory", "category", "subCategory"] });
  }

  setTopCategory = (text) => {
    this.topCategory = text;
  };

  setCategory = (text) => {
    this.category = text;
  };

  setSubCategory = (text) => {
    this.subCategory = text;
  };
}

export default new Filter();
