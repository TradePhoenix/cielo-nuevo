// Public entry point for consumers building a new guide page. A new page
// only needs createGuide() to build its data and GUIDE_TEMPLATES to look
// up the right layout for its guideType — everything else in this feature
// folder is an implementation detail reachable via deeper imports when a
// template needs to be customized further.
export { createGuide, GUIDE_TYPES } from "./types/guide";
export { GUIDE_TEMPLATES, GuideTemplate } from "./templates";
