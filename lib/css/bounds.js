import {Pseudo} from '../element';
import Cache from '../cache';
import simulate from './simulate';

const BOUNDS = Symbol('bounds');

/**
 * Get the bounds of this element.
 *
 * @param {Symbol} pseudo
 * @return {Object}
 */
export default function bounds(element, pseudo = Pseudo.DEFAULT) {
  return element.lazy(BOUNDS,
    () => new Cache(new Map()),
    cache => cache.get(pseudo, () =>
      simulate(pseudo, () =>
        element.node.getBoundingClientRect()
      )
    )
  );
}
