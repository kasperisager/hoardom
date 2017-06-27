import {map, slice} from 'bundstreg';
import {siblings as $siblings} from 'doem';

const SIBLINGS = Symbol('siblings');

/**
 * Get the siblings of an element.
 *
 * @return {Element}
 */
export default function (element) {
  return element.lazy(SIBLINGS,
    () => map($siblings(element.node),
      sibling => element.get(sibling)
    ),
    slice
  );
}
