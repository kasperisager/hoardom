import {Pseudo} from '../element';
import bounds from './bounds';

/**
 * Get the height of this element.
 *
 * @param {Symbol} pseudo
 * @return {Number}
 */
export default function height(element, pseudo = Pseudo.DEFAULT) {
  return bounds(element, pseudo).height;
}
