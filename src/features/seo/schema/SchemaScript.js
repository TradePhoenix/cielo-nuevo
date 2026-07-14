// JSON-LD is valid anywhere in the DOM (not just <head>), so this renders
// inline rather than relying on React 19's head-hoisting (which only
// covers <title>/<meta>/<link>, not <script>).
export default function SchemaScript({ schema }) {
  if (!schema) return null;

  // Guards against a "</script>" substring in any field (e.g. a guide
  // description) prematurely closing the tag and injecting markup.
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
