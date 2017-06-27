import {matches as $matches} from 'doem';
import Cache from '../cache';

const MATCHES = Symbol('matches');

/**
 * Check if this element matches a selector.
 *
 * @param {String} selector
 * @return {Boolean}
 */
export default function matches(element, selector) {
  element.lazy(MATCHES,
    () => new Cache(new Map()),
    cache => cache.get(selector, () =>
      $matches(element.node, selector)
    )
  );
}
