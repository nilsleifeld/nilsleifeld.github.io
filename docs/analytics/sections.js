import { ANALYTICS_EVENTS, SECTION_TRACKING } from './config.js';
import { trackEvent } from './plausible.js';

/** @type {IntersectionObserver | null} */
let observer = null;

/** Section IDs already reported for the current page view. */
const trackedSections = new Set();

/**
 * Tracks when sections become at least 50 % visible.
 * Each section is reported once per page view, then unobserved.
 */
export function initSectionTracking() {
  if (observer || typeof IntersectionObserver === 'undefined') {
    return;
  }

  const sections = document.querySelectorAll(SECTION_TRACKING.selector);
  if (!sections.length) {
    return;
  }

  observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || entry.intersectionRatio < SECTION_TRACKING.visibleRatio) {
          continue;
        }

        const sectionId = entry.target.id;
        if (!sectionId || trackedSections.has(sectionId)) {
          obs.unobserve(entry.target);
          continue;
        }

        const sent = trackEvent(ANALYTICS_EVENTS.SECTION_VIEWED, {
          [SECTION_TRACKING.property]: sectionId
        });

        if (sent) {
          trackedSections.add(sectionId);
          obs.unobserve(entry.target);
        }
      }
    },
    { threshold: SECTION_TRACKING.visibleRatio }
  );

  for (const section of sections) {
    if (section.id) {
      observer.observe(section);
    }
  }
}
