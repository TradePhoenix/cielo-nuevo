import { createNeighborhood } from "../types/neighborhood";

export const MOCK_NEIGHBORHOODS = [
  createNeighborhood({
    id: "playacar",
    name: "Playacar",
    cityId: "playa-del-carmen",
    summary: "A gated, resort-adjacent community south of Fifth Avenue with golf-course and beachfront living.",
    vibe: "Quiet, manicured, car-friendly",
    bestFor: ["Families", "Retirees who want security and calm"],
  }),
  createNeighborhood({
    id: "centro",
    name: "Centro",
    cityId: "playa-del-carmen",
    summary: "The walkable historic core around Fifth Avenue — restaurants, nightlife, and daily errands on foot.",
    vibe: "Energetic, dense, tourist-facing",
    bestFor: ["Remote workers", "Singles and couples who want walkability"],
  }),
];
