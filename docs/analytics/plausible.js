/**
 * Sends an event through the globally loaded Plausible client.
 * Analytics failures must never interrupt the website's functionality.
 *
 * @param {string} event
 * @param {Record<string, string>} props
 * @returns {boolean} Whether Plausible accepted the event call.
 */
export function trackEvent(event, props = {}) {
  try {
    window.plausible?.(event, { props });
    return typeof window.plausible === 'function';
  } catch {
    return false;
  }
}
