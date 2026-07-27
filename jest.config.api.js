// Standalone Jest config for api/_lib's Node/ESM modules — deliberately
// separate from react-scripts' own Jest config (which only roots at
// src/ and is not meant to be touched here), so `npm test` (existing site
// tests) is completely unaffected. Run via `npm run test:api`.
module.exports = {
  rootDir: __dirname,
  roots: ["<rootDir>/api"],
  testEnvironment: "node",
  testMatch: ["<rootDir>/api/**/*.test.js"],
  transform: {
    "^.+\\.js$": ["babel-jest", { presets: ["babel-preset-react-app"] }],
  },
};
