import { makeObservable, } from "mobx";
import { makePersistable } from "mobx-persist-store";

class Notification {
  isOpen = false

  constructor() {
    makeObservable(this);
    makePersistable(this, { name: "notification", properties: ["isOpen"] });
  }


  setIsOpen=(value) =>{
    this.isOpen = value;
  }

  

}

export default new Notification();
