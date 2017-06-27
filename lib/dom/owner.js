const OWNER = Symbol('owner');

/**
 * Get the document that owns an element.
 *
 * @return {Document}
 */
export default function owner(element) {
  return element.lazy(OWNER,
    () => element.node.ownerDocument
  );
}
