import { Subscription } from "./Subscription";

export interface IObserver<T = any> {
  onChange(property: keyof T): void;
  subscribe(subscription: Subscription): void;
}
