import owner from './owner';

/**
 * Check whether or not this element is currently blurred.
 *
 * @return {Boolean}
 */
export default function isBlurred(element) {
  return owner(element).activeElement !== element.node;
}
