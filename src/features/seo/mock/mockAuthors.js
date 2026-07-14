import { createAuthor } from "../types/author";

export const MOCK_AUTHORS = {
  pathToMexicoTeam: createAuthor({
    id: "path-to-mexico-team",
    name: "Path To Mexico Team",
    title: "Local Relocation Guidance",
    bio: "On-the-ground research and lived experience from people who have actually made the move.",
  }),
};
