export class Subscription<T = any> {
  constructor(
    private readonly observedProperties: keyof T,
    private readonly callback: () => void
  ) { }

  getObservedProperty(): keyof T {
    return this.observedProperties;
  }
  onChange() {
    this.callback();
  }
}