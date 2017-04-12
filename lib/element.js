import * as _ from 'bundstreg';
import * as $ from 'doem';
import Deque from 'double-ended-queue';
import Cache from './cache';

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
    const {children} = element;

    for (let i = children.length - 1; i >= 0; i--) {
      this.queue.push(children[i]);
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

    this._element = element;
    this._cache = cache;
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

  /**
   * Get the document that owns this element.
   *
   * @return {Document}
   */
  owner() {
    if (this._owner === undefined) {
      this._owner = this._element.ownerDocument;
    }

    return this._owner;
  }

  /**
   * Get the tag name of this element.
   *
   * @return {String}
   */
  tag() {
    if (this._tag === undefined) {
      this._tag = $.tag(this._element);
    }

    return this._tag;
  }

  /**
   * Get the text content of this element.
   *
   * @return {String}
   */
  text() {
    if (this._text === undefined) {
      this._text = $.text(this._element);
    }

    return this._text;
  }

  /**
   * Get the parent of this element.
   *
   * @return {Element}
   */
  parent() {
    if (this._parent === undefined) {
      const element = $.parent(this._element);

      this._parent = element ?
        this._cache.get(element, () =>
          new Element(element, this._cache)
        ) :
        null;
    }

    return this._parent;
  }

  /**
   * Get the parents of this element.
   *
   * @return {Element}
   */
  parents() {
    if (this._parents === undefined) {
      this._parents = _.map($.parents(this._element),
        element => this._cache.get(element, () =>
          new Element(element, this._cache)
        )
      );
    }

    return this._parents;
  }

  /**
   * Get the children of this element.
   *
   * @return {Array<Element>}
   */
  children() {
    if (this._children === undefined) {
      this._children = _.map($.children(this._element),
        element => this._cache.get(element, () =>
          new Element(element, this._cache)
        )
      );
    }

    return this._children;
  }

  /**
   * Get the siblings of this element.
   *
   * @return {Array<Element>}
   */
  siblings() {
    if (this._siblings === undefined) {
      this._siblings = _.map($.siblings(this._element),
        element => this._cache.get(element, () =>
          new Element(element, this._cache)
        )
      );
    }

    return this._siblings;
  }

  /**
   * Get the next sibling of this element.
   *
   * @return {Element}
   */
  next() {
    if (this._next === undefined) {
      const element = $.next(this._element);

      this._next = element ?
        this._cache.get(element, () =>
          new Element(element, this._cache)
        ) :
        null;
    }

    return this._next;
  }

  /**
   * Get the previous sibling of this element.
   *
   * @return {Element}
   */
  prev() {
    if (this._prev === undefined) {
      const element = $.prev(this._element);

      this._prev = element ?
        this._cache.get(element, () =>
          new Element(element, this._cache)
        ) :
        null;
    }

    return this._prev;
  }

  /**
   * Get the computed style of this element.
   *
   * @return {Object}
   */
  style() {
    if (this._style === undefined) {
      this._style = $.style(this._element);
    }

    return this._style;
  }

  /**
   * Check whether or not this element is currently focused.
   *
   * @return {Boolean}
   */
  isFocused() {
    return this.owner().activeElement === this._element;
  }

  /**
   * Check whether or not this element is currently blurred.
   *
   * @return {Boolean}
   */
  isBlurred() {
    return this.owner().activeElement !== this._element;
  }

  /**
   * Move focus to this element.
   */
  focus() {
    if (this.isBlurred()) {
      this._element.focus();
    }
  }

  /**
   * Move focus away from this element.
   */
  blur() {
    if (this.isFocused()) {
      this._element.blur();
    }
  }

  /**
   * Simulate a pseudo-class.
   *
   * @param {Symbol} pseudo
   * @private
   */
  simulate(pseudo) {
    switch (pseudo) {
      case Pseudo.DEFAULT:
      default:
        this.blur();
        break;
      case Pseudo.FOCUS:
        this.focus();
        break;
    }
  }

  /**
   * Get the value of a property of this element.
   *
   * @param {String} name
   * @return {*}
   */
  prop(name) {
    if (this._prop === undefined) {
      this._prop = new Cache(new Map());
    }

    return this._prop.get(name, () =>
      this._element[name]
    );
  }

  /**
   * Get the value of an attribute of this element.
   *
   * @param {String} name
   * @return {*}
   */
  attr(name) {
    if (this._attr === undefined) {
      this._attr = new Cache(new Map());
    }

    return this._attr.get(name, () =>
      $.attr(this._element, name)
    );
  }

  /**
   * Get the value of a data attribute of this element.
   *
   * @param {String} attribute
   * @return {*}
   */
  data(attribute) {
    return this.attr(`data-${attribute}`);
  }

  /**
   * Get the bounds of this element.
   *
   * @param {Symbol} pseudo
   * @return {Object}
   */
  bounds(pseudo = Pseudo.DEFAULT) {
    if (this._bounds === undefined) {
      this._bounds = {};
    }

    this.simulate(pseudo);

    if (this._bounds[pseudo] === undefined) {
      this._bounds[pseudo] = this._element.getBoundingClientRect();
    }

    return this._bounds[pseudo];
  }

  /**
   * Get the height of this element.
   *
   * @param {Symbol} pseudo
   * @return {Number}
   */
  height(pseudo = Pseudo.DEFAULT) {
    if (this._height === undefined) {
      this._height = {};
    }

    if (this._height[pseudo] === undefined) {
      this._height[pseudo] = this.bounds(pseudo).height;
    }

    return this._height;
  }

  /**
   * Get the width of this element.
   *
   * @param {Symbol} pseudo
   * @return {Number}
   */
  width(pseudo = Pseudo.DEFAULT) {
    if (this._width === undefined) {
      this._width = {};
    }

    if (this._width[pseudo] === undefined) {
      this._width[pseudo] = this.bounds(pseudo).width;
    }

    return this._width;
  }

  /**
   * Get the coordinates of this element relative to its document.
   *
   * @param {Symbol} pseudo
   * @return {Object<String, Number>}
   */
  offset(pseudo = Pseudo.DEFAULT) {
    if (this._offset === undefined) {
      this._offset = {};
    }

    this.simulate(pseudo);

    if (this._offset[pseudo] === undefined) {
      this._offset[pseudo] = $.offset(this._element);
    }

    return this._offset[pseudo];
  }

  /**
   * Get the coordinates of this element relative to its offset parent.
   *
   * @param {Symbol} pseudo
   * @return {Object<String, Number>}
   */
  position(pseudo = Pseudo.DEFAULT) {
    if (this._position === undefined) {
      this._position = {};
    }

    this.simulate(pseudo);

    if (this._position[pseudo] === undefined) {
      this._position[pseudo] = $.position(this._element);
    }

    return this._position[pseudo];
  }

  /**
   * Get the value of a CSS property of this element.
   *
   * @param {String} property
   * @param {Symbol} pseudo
   * @return {String}
   */
  css(property, pseudo = Pseudo.DEFAULT) {
    if (this._css === undefined) {
      this._css = {
        [Pseudo.DEFAULT]: new Cache(new Map()),
        [Pseudo.FOCUS]: new Cache(new Map())
      };
    }

    this.simulate(pseudo);

    return this._css[pseudo].get(property, () =>
      this.style()[property]
    );
  }

  /**
   * Find the first descendant of this element matching a selector.
   *
   * @param {String} selector
   * @return {Element}
   */
  find(selector) {
    if (this._find === undefined) {
      this._find = new Cache(new Map());
    }

    return this._find.get(selector, () => {
      const element = $.find(this._element, selector);

      return element ?
        this._cache.get(element, () =>
          new Element(element, this._cache)
        ) :
        null;
    });
  }

  /**
   * Find all descendants of this element matching a selector.
   *
   * @param {String} selector
   * @return {Array<Element>}
   */
  findAll(selector) {
    if (this._findAll === undefined) {
      this._findAll = new Cache(new Map());
    }

    return this._findAll.get(selector, () =>
      _.map($.findAll(this._element, selector),
        element => this._cache.get(element, () =>
          new Element(element, this._cache)
        )
      )
    );
  }

  /**
   * Find the closest matching descendant of this element.
   *
   * @param {String} selector
   * @return {Element}
   */
  closest(selector) {
    if (this._closest === undefined) {
      this._closest = new Cache(new Map());
    }

    return this._closest.get(selector, () => {
      const element = $.closest(this._element, selector);

      return element ?
        this._cache.get(element, () =>
          new Element(element, this._cache)
        ) :
        null;
    });
  }

  /**
   * Check if an element is a descendant of this element.
   *
   * @param {Element} element
   * @return {Boolean}
   */
  contains(element) {
    if (this._contains === undefined) {
      this._contains = new Cache(new WeakMap());
    }

    return this._contains.get(element, () =>
      $.contains(this._element, element._element)
    );
  }

  /**
   * Check if this element has a descendant matching a selector.
   *
   * @param {String} selector
   * @return {Boolean}
   */
  has(selector) {
    if (this._has === undefined) {
      this._has = new Cache(new Map());
    }

    return this._has.get(selector, () =>
      $.has(this._element, selector)
    );
  }

  /**
   * Check if this element matches a selector.
   *
   * @param {String} selector
   * @return {Boolean}
   */
  matches(selector) {
    if (this._matches === undefined) {
      this._matches = new Cache(new Map());
    }

    return this._matches.get(selector, () =>
      $.matches(this._element, selector)
    );
  }
}
