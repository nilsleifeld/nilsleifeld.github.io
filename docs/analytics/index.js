import { initClickTracking } from './clicks.js';
import { initSectionTracking } from './sections.js';

let initialized = false;

/**
 * Bootstraps the analytics module once per page.
 * Add new events in `config.js`, then wire behavior in a dedicated module if needed.
 */
export function initAnalytics() {
  if (initialized) {
    return;
  }

  initialized = true;
  initSectionTracking();
  initClickTracking();
}

export { ANALYTICS_EVENTS, CLICK_TRACKERS, SECTION_TRACKING } from './config.js';
export { trackEvent } from './plausible.js';
