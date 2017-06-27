import {offset as $offset} from 'doem';
import {Pseudo} from '../element';
import simulate from './simulate';

const OFFSET = Symbol('offset');

/**
 * Get the coordinates of this element relative to its document.
 *
 * @param {Symbol} pseudo
 * @return {Object<String, Number>}
 */
export default function offset(element, pseudo = Pseudo.DEFAULT) {
  return element.lazy(OFFSET,
    () => new Cache(new Map()),
    cache => cache.get(pseudo, () =>
      simulate(pseudo, () => $offset(element.node))
    )
  );
}
