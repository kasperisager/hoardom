import isBlurred from './is-blurred';

/**
 * Move focus to an element.
 */
export default function focus(element) {
  if (isBlurred(element)) {
    element.node.focus();
  }
}
