import {tag as $tag} from 'doem';

const TAG = Symbol('tag');

/**
 * Get the tag name of an element.
 *
 * @return {String}
 */
export default function tag(element) {
  return element.lazy(TAG,
    () => $tag(element.node)
  );
}
