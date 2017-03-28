import * as _ from 'bundstreg';
import * as $ from 'doem';
import Cache from './cache';

export default class Element {
  /**
   * Initialize a new element.
   *
   * @param {Element} element
   * @param {Cache} [cache]
   */
  constructor(element, cache = new Cache(new WeakMap())) {
    if (!cache.has(element)) {
      cache.set(element, this);
    }

    this._element = element;
    this._cache = cache;
  }

  /**
   * The tag name of this element.
   *
   * @type {String}
   */
  get tag() {
    if (this._tag === undefined) {
      this._tag = $.tag(this._element);
    }

    return this._tag;
  }

  /**
   * The text content of this element.
   *
   * @type {String}
   */
  get text() {
    if (this._text === undefined) {
      this._text = $.text(this._element);
    }

    return this._text;
  }

  /**
   * The height of this element.
   *
   * @type {Number}
   */
  get height() {
    if (this._height === undefined) {
      this._height = $.height(this._element);
    }

    return this._height;
  }

  /**
   * The width of this element.
   *
   * @type {Number}
   */
  get width() {
    if (this._width === undefined) {
      this._width = $.width(this._element);
    }

    return this._width;
  }

  /**
   * The coordinates of this element relative to its document.
   *
   * @type {Object<String, Number>}
   */
  get offset() {
    if (this._offset === undefined) {
      this._offset = $.offset(this._element);
    }

    return this._offset;
  }

  /**
   * The coordinates of this element relative to its offset parent.
   *
   * @type {Object<String, Number>}
   */
  get position() {
    if (this._position === undefined) {
      this._position = $.position(this._element);
    }

    return this._position;
  }

  /**
   * The parent of this element.
   *
   * @type {Element}
   */
  get parent() {
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
   * The children of this element.
   *
   * @type {Array<Element>}
   */
  get children() {
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
   * The siblings of this element.
   *
   * @type {Array<Element>}
   */
  get siblings() {
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
   * The next sibling of this element.
   *
   * @type {Element}
   */
  get next() {
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
   * The previous sibling of this element.
   *
   * @type {Element}
   */
  get prev() {
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
   * Get the value of a CSS property of this element.
   *
   * @param {String} property
   * @return {String}
   */
  css(property) {
    if (this._css === undefined) {
      this._css = new Map(_.entries($.style(this._element)));
    }

    return this._css.get(property);
  }

  /**
   * Find the first descendant of this element matching a selector.
   *
   * @param {String} selector
   * @return {Element}
   */
  find(selector) {
    const element = $.find(this._element, selector);

    return element ?
      this._cache.get(element, () =>
        new Element(element, this._cache)
      ) :
      null;
  }

  /**
   * Find all descendants of this element matching a selector.
   *
   * @param {String} selector
   * @return {Array<Element>}
   */
  findAll(selector) {
    return _.map($.findAll(this._element, selector),
      element => this._cache.get(element, () =>
        new Element(element, this._cache)
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
    const element = $.closest(this._element, selector);

    return element ?
      this._cache.get(element, () =>
        new Element(element, this._cache)
      ) :
      null;
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
