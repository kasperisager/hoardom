import {map, slice} from 'bundstreg';
import {children as $children} from 'doem';

const CHILDREN = Symbol('children');

/**
 * Get the children of an element.
 *
 * @return {Element}
 */
export default function children(element) {
  return element.lazy(CHILDREN,
    () => map($children(element.node),
      child => element.get(child)
    ),
    slice
  );
}
