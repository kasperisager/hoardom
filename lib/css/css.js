import {Pseudo} from '../element';
import Cache from '../cache';
import simulate from './simulate';
import style from './style';

const CSS = Symbol('css');

/**
 * Get the value of a CSS property of this element.
 *
 * @param {String} property
 * @param {Symbol} pseudo
 * @return {String}
 */
export default function css(element, property, pseudo = Pseudo.DEFAULT) {
  return element.lazy(CSS,
    () => ({
      [Pseudo.DEFAULT]: new Cache(new Map()),
      [Pseudo.FOCUS]: new Cache(new Map())
    }),
    cache => cache[pseudo].get(property, () =>
      simulate(element, pseudo, () => style(element)[property])
    )
  );
}
