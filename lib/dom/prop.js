import Cache from '../cache';

const PROP = Symbol('prop');

/**
 * Get the value of a property of an element.
 *
 * @param {String} name
 * @return {*}
 */
export default function prop(element, name) {
  return element.lazy(PROP,
    () => new Cache(new Map()),
    cache => cache.get(name, () => element.node[name])
  );
}
