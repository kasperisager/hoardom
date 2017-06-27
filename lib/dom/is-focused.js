import owner from './owner';

/**
 * Check whether or not this element is currently focused.
 *
 * @return {Boolean}
 */
export default function isFocused(element) {
  return owner(element).activeElement === element.node;
}
