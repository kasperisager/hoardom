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
  switch (pseudo) {
    case Pseudo.DEFAULT:
    default:
      blur(element);
      break;
    case Pseudo.FOCUS:
      focus(element);
      break;
  }

  if (action !== undefined) {
    return action();
  }
}
