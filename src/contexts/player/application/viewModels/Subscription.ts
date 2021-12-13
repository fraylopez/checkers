export class Subscription<T = any> {
  constructor(
    private readonly observedProperty: T,
    private readonly callback: () => void
  ) { }

  getObservedProperty(): T {
    return this.observedProperty;
  }
  onChange() {
    this.callback();
  }
}