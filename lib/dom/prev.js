import {prev as $prev} from 'doem';

const PREV = Symbol('prev');

/**
 * Get the previous sibling of an element.
 *
 * @return {Element}
 */
export default function (element) {
  return element.lazy(PREV,
    () => element.get($prev(element.node))
  );
}
