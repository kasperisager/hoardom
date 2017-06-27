import {parent as $parent} from 'doem';

const PARENT = Symbol('parent');

/**
 * Get the parent of an element.
 *
 * @return {Element}
 */
export default function parent(element) {
  return element.lazy(PARENT,
    () => element.get($parent(element.node))
  );
}
