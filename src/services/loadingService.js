import { BehaviorSubject } from "rxjs";

const subscriber = new BehaviorSubject("normal");

const loadingState = {
  send: (data) => {
    subscriber.next(data);
  },
};

export { loadingState, subscriber };
