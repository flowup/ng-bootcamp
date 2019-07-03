export class Stream<T> {
  private values: T[] = [];
  private callbacks: ((value: T) => void)[] = [];

  subscribe(callback: (value: T) => void): () => void {
    this.callbacks = [...this.callbacks, callback];

    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }

  push(value: T): void {
    this.values = [...this.values, value];

    for (const callback of this.callbacks) {
      callback(value);
    }
  }

  allValues(): T[] {
    return [...this.values];
  }
}
