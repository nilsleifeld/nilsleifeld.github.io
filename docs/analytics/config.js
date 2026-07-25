/**
 * Central analytics configuration.
 *
 * To add a new click event:
 * 1. Add the event name to ANALYTICS_EVENTS
 * 2. Append a tracker entry to CLICK_TRACKERS (selector + property keys)
 * 3. Put matching `data-*` attributes on the HTML elements
 *
 * To track a new section, give the <section> an `id` — no JS changes needed.
 */
export const ANALYTICS_EVENTS = Object.freeze({
  SECTION_VIEWED: 'Section Viewed',
  PROJECT_CLICKED: 'Project Clicked',
  TECHNOLOGY_CLICKED: 'Technology Clicked'
});

export const SECTION_TRACKING = Object.freeze({
  selector: 'section[id]',
  visibleRatio: 0.5,
  property: 'section'
});

/**
 * Click tracking is configured centrally. Dataset keys map 1:1 to
 * Plausible custom properties (e.g. data-project → props.project).
 */
export const CLICK_TRACKERS = Object.freeze([
  Object.freeze({
    selector: '[data-project]',
    event: ANALYTICS_EVENTS.PROJECT_CLICKED,
    properties: Object.freeze(['project', 'language', 'framework', 'category'])
  }),
  Object.freeze({
    selector: '[data-technology]',
    event: ANALYTICS_EVENTS.TECHNOLOGY_CLICKED,
    properties: Object.freeze(['technology', 'type'])
  })
]);
