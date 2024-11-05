import { makeAutoObservable, runInAction } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { deleteFeedback, getAllFeedbacks, sendFeedback, updateFeedback } from "../API/feedback";
import authStore from "./auth";

class Messages {
  messages = [];

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "messages",
      properties: ["messages"],
      storage: window.localStorage,
    });
  }

  getMessages = async () => {
    const result = await getAllFeedbacks(authStore.token);

    runInAction(() => {
      if (result.error) {
        return;
      }
      this.messages = result.data;
    });
  };

  createFeedbackAction = async data => {
    const result = await sendFeedback(data);

    runInAction(() => {
      if (result.error) {
        return;
      }
    });
    this.getMessages();

    return true;
  };

  updateFeedbackAction = async data => {
    const result = await updateFeedback(data, authStore.token);

    runInAction(() => {
      if (result.error) {
        return;
      }
    });
    this.getMessages();

    return true;
  };

  deleteMessageAction = async data => {
    const result = await deleteFeedback(data, authStore.token);

    runInAction(() => {
      if (result.error) {
        return;
      }
    });
    this.getMessages();

    return true;
  };
}
export default new Messages();
