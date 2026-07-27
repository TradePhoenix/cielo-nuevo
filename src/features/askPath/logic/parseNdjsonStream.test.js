// jsdom (react-scripts 5's test environment) doesn't provide
// TextEncoder/TextDecoder as globals the way real browsers do — polyfill
// from Node's own `util` module for this test file only, rather than
// touching the shared src/setupTests.js.
import { TextEncoder, TextDecoder } from "util";
if (typeof global.TextEncoder === "undefined") global.TextEncoder = TextEncoder;
if (typeof global.TextDecoder === "undefined") global.TextDecoder = TextDecoder;

import { parseNdjsonStream } from "./parseNdjsonStream";

function fakeResponse(chunks) {
  const encoder = new TextEncoder();
  let i = 0;
  return {
    body: {
      getReader() {
        return {
          async read() {
            if (i >= chunks.length) return { done: true, value: undefined };
            const value = encoder.encode(chunks[i]);
            i += 1;
            return { done: false, value };
          },
        };
      },
    },
  };
}

async function collect(iterable) {
  const out = [];
  for await (const item of iterable) out.push(item);
  return out;
}

describe("parseNdjsonStream", () => {
  test("parses one JSON object per line", async () => {
    const response = fakeResponse(['{"type":"delta","text":"Hi"}\n{"type":"done","sources":[]}\n']);
    const events = await collect(parseNdjsonStream(response));
    expect(events).toEqual([
      { type: "delta", text: "Hi" },
      { type: "done", sources: [] },
    ]);
  });

  test("reassembles a line split across multiple chunks", async () => {
    const response = fakeResponse(['{"type":"delta","te', 'xt":"Hola"}\n']);
    const events = await collect(parseNdjsonStream(response));
    expect(events).toEqual([{ type: "delta", text: "Hola" }]);
  });

  test("parses a final line with no trailing newline", async () => {
    const response = fakeResponse(['{"type":"done","sources":[]}']);
    const events = await collect(parseNdjsonStream(response));
    expect(events).toEqual([{ type: "done", sources: [] }]);
  });

  test("skips blank lines", async () => {
    const response = fakeResponse(['{"type":"delta","text":"A"}\n\n{"type":"delta","text":"B"}\n']);
    const events = await collect(parseNdjsonStream(response));
    expect(events).toEqual([
      { type: "delta", text: "A" },
      { type: "delta", text: "B" },
    ]);
  });
});
