// Local development server for the api/ Vercel functions.
//
// `npm start` (CRA) serves only the React app; this script serves the
// serverless functions the same way Vercel routes them, on port 3001, and
// CRA's "proxy" setting forwards /api/* here during development.
//
//   Terminal 1:  npm run dev:api
//   Terminal 2:  npm start
//
// Loads .env.local / .env (in that order of precedence) without adding a
// dotenv dependency. Mimics just enough of the Vercel Node request/response
// contract for our handlers: req.query (including [bracket] dynamic
// segments), lazy JSON req.body, res.status().setHeader().end()/write().

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const apiDir = path.join(root, "api");
const PORT = Number(process.env.PORT_API || 3001);

process.env.NODE_ENV = process.env.NODE_ENV || "development";

// --- minimal .env loader ----------------------------------------------------
for (const file of [".env", ".env.local"]) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) continue;
  for (const line of fs.readFileSync(full, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match || line.trim().startsWith("#")) continue;
    const value = match[2].replace(/^["']|["']$/g, "");
    if (file === ".env.local" || process.env[match[1]] === undefined) {
      process.env[match[1]] = value;
    }
  }
}

// --- route table ------------------------------------------------------------
// api/foo.js            -> /api/foo
// api/admin/auth.js     -> /api/admin/auth
// api/admin/[x].js      -> /api/admin/:x   (param name from the brackets)
function collectRoutes(dir, urlBase) {
  const routes = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith("_")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      routes.push(...collectRoutes(full, `${urlBase}/${entry.name}`));
    } else if (entry.name.endsWith(".js") && !entry.name.endsWith(".test.js")) {
      const base = entry.name.slice(0, -3);
      const dynamic = base.match(/^\[(.+)\]$/);
      routes.push({
        file: full,
        pattern: `${urlBase}/${dynamic ? "*" : base}`,
        param: dynamic ? dynamic[1] : null,
        prefix: `${urlBase}/`,
        exact: dynamic ? null : `${urlBase}/${base}`,
      });
    }
  }
  return routes;
}

const routes = collectRoutes(apiDir, "/api");

function matchRoute(pathname) {
  for (const route of routes) {
    if (route.exact && pathname === route.exact) return { route, params: {} };
  }
  for (const route of routes) {
    if (!route.param) continue;
    if (pathname.startsWith(route.prefix)) {
      const rest = pathname.slice(route.prefix.length);
      if (rest && !rest.includes("/")) return { route, params: { [route.param]: rest } };
    }
  }
  return null;
}

// --- Vercel-ish req/res shims ----------------------------------------------
function enhance(req, res, params, rawBody) {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  req.query = { ...Object.fromEntries(url.searchParams.entries()), ...params };
  let parsedBody;
  let bodyParsed = false;
  Object.defineProperty(req, "body", {
    get() {
      if (!bodyParsed) {
        bodyParsed = true;
        parsedBody = rawBody.length === 0 ? undefined : JSON.parse(rawBody.toString("utf8"));
      }
      return parsedBody;
    },
  });
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  const origSetHeader = res.setHeader.bind(res);
  res.setHeader = (name, value) => {
    origSetHeader(name, value);
    return res;
  };
  res.flushHeaders = res.flushHeaders?.bind(res);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const matched = matchRoute(url.pathname);
  if (!matched) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "not_found", message: `No API route for ${url.pathname}` }));
    return;
  }
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  enhance(req, res, matched.params, Buffer.concat(chunks));
  try {
    const mod = await import(`${pathToFileURL(matched.route.file).href}?t=${Date.now()}`);
    await mod.default(req, res);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`[dev-api] handler error for ${url.pathname}:`, error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
    }
    res.end(JSON.stringify({ error: "server_error", message: "Dev API handler crashed — see terminal." }));
  }
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[dev-api] serving api/ on http://localhost:${PORT}`);
  for (const route of routes) {
    // eslint-disable-next-line no-console
    console.log(`[dev-api]   ${route.exact || route.prefix + `[${route.param}]`}`);
  }
});
