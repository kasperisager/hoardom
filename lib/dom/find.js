import {find as $find} from 'doem';
import Cache from '../cache';

const FIND = Symbol('find');

/**
 * Find the first descendant of this element matching a selector.
 *
 * @param {String} selector
 * @return {Element}
 */
export default function find(element, selector) {
  return element.lazy(FIND,
    () => new Cache(new Map()),
    cache => cache.get(selector, () =>
      element.get($find(element.node, selector))
    )
  );
}
