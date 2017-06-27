import Deque from 'double-ended-queue';
import Cache from './cache';
import children from './dom/children';

export const Pseudo = {
  /**
   * @type {Symbol}
   */
  DEFAULT: Symbol('default'),

  /**
   * @type {Symbol}
   */
  FOCUS: Symbol('focus')
};

export class ElementIterator {
  /**
   * Initialize a new element iterator.
   *
   * @param {Element} element
   */
  constructor(element) {
    this.queue = new Deque([element]);
  }

  /**
   * Get the next element in this iterator.
   *
   * @return {Element}
   */
  next() {
    if (this.queue.isEmpty()) {
      return {done: true};
    }

    const element = this.queue.pop();
    const next = children(element);

    for (let i = next.length - 1; i >= 0; i--) {
      this.queue.push(next[i]);
    }

    return {done: false, value: element};
  }
}

export default class Element {
  /**
   * Initialize a new element.
   *
   * @param {Element} element
   * @param {Cache} [cache]
   */
  constructor(element, cache = new Cache(new WeakMap())) {
    if (!element) {
      throw new Error('Expected an element');
    }

    if (!cache.has(element)) {
      cache.set(element, this);
    }

    this.node = element;
    this.cache = cache;
    this.memoized = new Cache(new Map());
  }

  get(element) {
    if (!element) {
      return null;
    }

    return this.cache.get(element, () =>
      new Element(element, this.cache)
    );
  }

  /**
   * Get a depth-first iterator over this element and its descendants.
   *
   * @return {ElementIterator}
   */
  [Symbol.iterator]() {
    return new ElementIterator(this);
  }

  /**
   * Get a depth-first iterator over this element and its descendants.
   *
   * @return {ElementIterator}
   */
  iterator() {
    return new ElementIterator(this);
  }

  lazy(key, cache, callback = c => c) {
    return callback(this.memoized.get(key, cache));
  }
}
