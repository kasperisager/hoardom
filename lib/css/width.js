import {Pseudo} from '../element';
import bounds from './bounds';

/**
 * Get the width of this element.
 *
 * @param {Symbol} pseudo
 * @return {Number}
 */
export default function width(element, pseudo = Pseudo.DEFAULT) {
  return bounds(element, pseudo).width;
}
