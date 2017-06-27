import {text as $text} from 'doem';

const TEXT = Symbol('text');

/**
 * Get the text content of an element.
 *
 * @return {String}
 */
export default function (element) {
  return element.lazy(TEXT,
    () => $text(element.node)
  );
}
