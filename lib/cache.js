export default class Cache {
  constructor(store = new Map()) {
    this._store = store;
  }

  get(key, init) {
    let value;

    if (this._store.has(key)) {
      value = this._store.get(key);
    } else if (init && init.constructor === Function) {
      value = init();
      this._store.set(key, value);
    }

    return value;
  }

  set(key, value) {
    let old;

    if (this._store.has(key)) {
      old = this._store.get(key);
    }

    this._store.set(key, value);

    return old;
  }

  has(key) {
    return this._store.has(key);
  }
}
