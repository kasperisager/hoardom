import {closest as $closest} from 'doem';
import Cache from '../cache';

const CLOSEST = Symbol('closest');

/**
 * Find the closest matching descendant of this element.
 *
 * @param {String} selector
 * @return {Element}
 */
export default function (element, selector) {
  return element.lazy(CLOSEST,
    () => new Cache(new Map()),
    cache => cache.get(selector, () =>
      element.get($closest(element.node, selector))
    )
  );
}
