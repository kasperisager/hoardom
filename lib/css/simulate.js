import {Pseudo} from '../element';
import blur from '../dom/blur';
import focus from '../dom/focus';

/**
 * Simulate a pseudo-class and optionally perform an action.
 *
 * @param {Symbol} pseudo
 * @param {Function} [action]
 * @return {*}
 * @private
 */
export default function simulate(element, pseudo, action) {
  // Store any inline transition that might be set on the element.
  const {transition} = element.node.style;

  // Ensure that no transition is applied to the element when simulating the
  // pseudo-class.
  element.node.style.transition = 'none';

  switch (pseudo) {
    case Pseudo.DEFAULT:
    default:
      blur(element);
      break;
    case Pseudo.FOCUS:
      focus(element);
      break;
  }

  const value = action && action();

  element.node.style.transition = transition;

  return value;
}
