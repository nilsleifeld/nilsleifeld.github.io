import { CLICK_TRACKERS } from './config.js';
import { trackEvent } from './plausible.js';

let initialized = false;

/**
 * Reads configured `data-*` attributes from an element into a props object.
 *
 * @param {HTMLElement} element
 * @param {readonly string[]} properties
 * @returns {Record<string, string>}
 */
function propsFromDataset(element, properties) {
  /** @type {Record<string, string>} */
  const props = {};

  for (const key of properties) {
    const value = element.dataset[key];
    if (typeof value === 'string' && value.length > 0) {
      props[key] = value;
    }
  }

  return props;
}

/**
 * Registers a single delegated click listener for all configured trackers.
 * Tracking values come from `data-*` attributes on the matched element.
 */
export function initClickTracking() {
  if (initialized) {
    return;
  }

  initialized = true;

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    for (const tracker of CLICK_TRACKERS) {
      const element = target.closest(tracker.selector);
      if (!(element instanceof HTMLElement)) {
        continue;
      }

      const props = propsFromDataset(element, tracker.properties);
      if (Object.keys(props).length === 0) {
        continue;
      }

      trackEvent(tracker.event, props);
      break;
    }
  });
}
