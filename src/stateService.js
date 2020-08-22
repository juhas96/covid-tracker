import { BehaviorSubject } from "rxjs";

const subscriber = new BehaviorSubject("map");

const dataService = {
  send: (data) => {
    subscriber.next(data);
  },
};

export { dataService, subscriber };
