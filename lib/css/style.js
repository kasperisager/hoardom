import {style as $style} from 'doem';

const STYLE = Symbol('style');

/**
 * Get the computed style of this element.
 *
 * @return {Object}
 */
export default function style(element) {
  return element.lazy(STYLE, () => $style(element.node));
}
