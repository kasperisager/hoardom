import {has as $has} from 'doem';
import Cache from '../cache';

const HAS = Symbol('has');

/**
 * Check if this element has a descendant matching a selector.
 *
 * @param {String} selector
 * @return {Boolean}
 */
export default function has(element, selector) {
  return element.lazy(HAS,
    () => new Cache(new Map()),
    cache => cache.get(selector, () =>
      $has(element.node, selector)
    )
  );
}
