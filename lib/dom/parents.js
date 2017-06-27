import {map, slice} from 'bundstreg';
import {parents as $parents} from 'doem';

const PARENTS = Symbol('parents');

/**
 * Get the parents of an element.
 *
 * @return {Element}
 */
export default function parents(element) {
  return element.lazy(PARENTS,
    () => map($parents(element.node),
      parent => element.get(parent)
    ),
    slice
  );
}
