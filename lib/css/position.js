import {position as $position} from 'doem';
import {Pseudo} from '../element';
import simulate from './simulate';

const POSITION = Symbol('position');

/**
 * Get the coordinates of this element relative to its offset parent.
 *
 * @param {Symbol} pseudo
 * @return {Object<String, Number>}
 */
export default function position(element, pseudo = Pseudo.DEFAULT) {
  return element.lazy(POSITION,
    () => new Cache(new Map()),
    cache => cache.get(pseudo, () =>
      simulate(pseudo, () => $position(element.node))
    )
  );
}
