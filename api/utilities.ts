export class Stream<T> {
  private values: T[] = [];
  private callbacks: ((value: T) => void)[] = [];

  subscribe(callback: (value: T) => void): () => void {
    this.callbacks = [...this.callbacks, callback];

    for (const value of this.values) {
      callback(value);
    }

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

export const generateId = () =>
  Math.random()
    .toString(26)
    .substr(2, 8);
