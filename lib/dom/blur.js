import isFocused from './is-focused';

/**
 * Move focus away from an element.
 */
export default function blur(element) {
  if (isFocused(element)) {
    element.node.blur();
  }
}
