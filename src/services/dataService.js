import { BehaviorSubject } from "rxjs";

const subscriber = new BehaviorSubject({});

const countryData = {
  send: (data) => {
    subscriber.next(data);
  },
};

export { countryData, subscriber };
