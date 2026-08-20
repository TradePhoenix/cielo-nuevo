// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// LAUNCH-W1: React Router 7 needs TextEncoder/TextDecoder at import time;
// CRA's Jest 27 jsdom environment doesn't provide them. (Pairs with the
// "jest.moduleNameMapper" entries in package.json — react-router-dom@7
// declares a "main" file it doesn't ship and Jest 27 ignores "exports".)
if (typeof global.TextEncoder === "undefined") {
  // eslint-disable-next-line global-require
  const { TextEncoder, TextDecoder } = require("util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

// framer-motion's whileInView needs IntersectionObserver, which jsdom lacks.
// Inert stub: nothing ever "enters view" in tests, which is fine — the
// reduced-motion paths render the same markup.
if (typeof global.IntersectionObserver === "undefined") {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };
}

// window.matchMedia (pointer/hover/reduced-motion queries) is also absent in jsdom.
if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() {
      return false;
    },
  });
}
