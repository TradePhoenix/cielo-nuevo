// Parses the NDJSON protocol api/ask-path.js writes (one JSON object per
// line: {type:"delta",text}, a trailing {type:"done",...}, or
// {type:"error",...}). A pure async generator over a fetch Response so it's
// testable without a real network call — see parseNdjsonStream.test.js,
// which feeds it a fake ReadableStream.
export async function* parseNdjsonStream(response) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let newlineIndex;
    while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
      const line = buffer.slice(0, newlineIndex).trim();
      buffer = buffer.slice(newlineIndex + 1);
      if (line) yield JSON.parse(line);
    }
  }

  const trailing = buffer.trim();
  if (trailing) yield JSON.parse(trailing);
}
