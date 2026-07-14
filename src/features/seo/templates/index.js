import { GUIDE_TYPES } from "../types/guide";
import GuideTemplate from "./GuideTemplate";
import LocationGuideTemplate from "./LocationGuideTemplate";
import NeighborhoodGuideTemplate from "./NeighborhoodGuideTemplate";
import ComparisonGuideTemplate from "./ComparisonGuideTemplate";
import CostOfLivingGuideTemplate from "./CostOfLivingGuideTemplate";
import ResidencyGuideTemplate from "./ResidencyGuideTemplate";
import HealthcareGuideTemplate from "./HealthcareGuideTemplate";
import RetirementGuideTemplate from "./RetirementGuideTemplate";
import RemoteWorkerGuideTemplate from "./RemoteWorkerGuideTemplate";
import InvestmentGuideTemplate from "./InvestmentGuideTemplate";
import SchoolGuideTemplate from "./SchoolGuideTemplate";
import PetGuideTemplate from "./PetGuideTemplate";
import SafetyGuideTemplate from "./SafetyGuideTemplate";
import TransportationGuideTemplate from "./TransportationGuideTemplate";

export {
  GuideTemplate,
  LocationGuideTemplate,
  NeighborhoodGuideTemplate,
  ComparisonGuideTemplate,
  CostOfLivingGuideTemplate,
  ResidencyGuideTemplate,
  HealthcareGuideTemplate,
  RetirementGuideTemplate,
  RemoteWorkerGuideTemplate,
  InvestmentGuideTemplate,
  SchoolGuideTemplate,
  PetGuideTemplate,
  SafetyGuideTemplate,
  TransportationGuideTemplate,
};

/**
 * guide.guideType -> template component. This is the seam that lets a new
 * guide page be as small as:
 *
 *   const Template = GUIDE_TEMPLATES[guide.guideType];
 *   export default () => <Template guide={guide} catalogs={catalogs} />;
 *
 * with no per-page layout code at all.
 */
export const GUIDE_TEMPLATES = {
  [GUIDE_TYPES.LOCATION]: LocationGuideTemplate,
  [GUIDE_TYPES.NEIGHBORHOOD]: NeighborhoodGuideTemplate,
  [GUIDE_TYPES.COMPARISON]: ComparisonGuideTemplate,
  [GUIDE_TYPES.COST_OF_LIVING]: CostOfLivingGuideTemplate,
  [GUIDE_TYPES.RESIDENCY]: ResidencyGuideTemplate,
  [GUIDE_TYPES.HEALTHCARE]: HealthcareGuideTemplate,
  [GUIDE_TYPES.RETIREMENT]: RetirementGuideTemplate,
  [GUIDE_TYPES.REMOTE_WORKER]: RemoteWorkerGuideTemplate,
  [GUIDE_TYPES.INVESTMENT]: InvestmentGuideTemplate,
  [GUIDE_TYPES.SCHOOL]: SchoolGuideTemplate,
  [GUIDE_TYPES.PET]: PetGuideTemplate,
  [GUIDE_TYPES.SAFETY]: SafetyGuideTemplate,
  [GUIDE_TYPES.TRANSPORTATION]: TransportationGuideTemplate,
};
