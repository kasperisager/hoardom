import {map, slice} from 'bundstreg';
import {findAll as $findAll} from 'doem';
import Cache from '../cache';

const FIND_ALL = Symbol('findAll');

/**
 * Find all descendants of this element matching a selector.
 *
 * @param {String} selector
 * @return {Array<Element>}
 */
export default function findAll(element, selector) {
  return element.lazy(FIND_ALL,
    () => new Cache(new Map()),
    cache => slice(cache.get(selector, () =>
      map($findAll(element.node, selector),
        found => element.get(found)
      )
    ))
  );
}
