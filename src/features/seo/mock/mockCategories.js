import { createCategory } from "../types/category";

export const MOCK_CATEGORIES = {
  costOfLiving: createCategory({ id: "cost-of-living", label: "Cost Of Living" }),
  location: createCategory({ id: "location", label: "Where To Live" }),
  residency: createCategory({ id: "residency", label: "Residency" }),
};
