import {attr as $attr} from 'doem';
import Cache from '../cache';

const ATTR = Symbol('attr');

/**
 * Get the value of an attribute of an element.
 *
 * @param {String} name
 * @return {*}
 */
export default function attr(element, name) {
  return element.lazy(ATTR,
    () => new Cache(new Map()),
    cache => cache.get(name, () => $attr(element.node, name))
  );
}
