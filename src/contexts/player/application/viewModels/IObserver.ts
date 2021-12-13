import { Subscription } from "./Subscription";

export interface IObserver<T = any> {
  onChange(property: T): void;
  subscribe(subscription: Subscription): void;
}
