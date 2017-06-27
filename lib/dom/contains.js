import {contains as $contains} from 'doem';
import Cache from '../cache';

const CONTAINS = Symbol('contains');

/**
 * Check if an element is a descendant of this element.
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function contains(element, descendant) {
  return element.lazy(CONTAINS,
    () => new Cache(new WeakMap()),
    cache => cache.get(descendant, () =>
      $contains(element.node, descendant.node)
    )
  );
}
