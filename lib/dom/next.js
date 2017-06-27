import {next as $next} from 'doem';

const NEXT = Symbol('next');

/**
 * Get the next sibling of an element.
 *
 * @return {Element}
 */
export default function next(element) {
  return element.lazy(NEXT,
    () => element.get($next(element.node))
  );
}
