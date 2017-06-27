import attr from './attr';

/**
 * Get the value of a data attribute of this element.
 *
 * @param {String} attribute
 * @return {*}
 */
export default function data(element, attribute) {
  return attr(element, `data-${attribute}`);
}
