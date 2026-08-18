// In-memory stand-in for the Supabase client, implementing exactly the
// query-builder surface api/_lib/partnerNetwork/services.js uses. Lets the
// endpoint tests exercise real handlers + validation + services with no
// network and no credentials. Not a test file itself — imported by *.test.js.

let idCounter = 0;
function fakeUuid() {
  idCounter += 1;
  return `00000000-0000-4000-8000-${String(idCounter).padStart(12, "0")}`;
}

function withDefaults(table, row) {
  const now = new Date().toISOString();
  const out = { ...row };
  if (out.id === undefined) out.id = fakeUuid();
  if (out.created_at === undefined) out.created_at = now;
  if (out.updated_at === undefined) out.updated_at = now;
  if (table === "partner_applications") {
    if (out.submitted_at === undefined) out.submitted_at = now;
    if (out.status === undefined) out.status = "New";
    if (out.internal_notes === undefined) out.internal_notes = "";
    if (out.converted_partner_id === undefined) out.converted_partner_id = null;
    if (out.reviewed_at === undefined) out.reviewed_at = null;
  }
  return out;
}

class Builder {
  constructor(tables, ops, table) {
    this.tables = tables;
    this.ops = ops;
    this.table = table;
    this.op = "select";
    this.payload = null;
    this.eqs = [];
    this.mode = "many";
    this.upsertKey = "id";
  }

  select() {
    return this;
  }
  order() {
    return this;
  }
  eq(column, value) {
    this.eqs.push([column, value]);
    return this;
  }
  single() {
    this.mode = "single";
    return this;
  }
  maybeSingle() {
    this.mode = "maybe";
    return this;
  }
  insert(row) {
    this.op = "insert";
    this.payload = row;
    return this;
  }
  update(row) {
    this.op = "update";
    this.payload = row;
    return this;
  }
  upsert(row, opts) {
    this.op = "upsert";
    this.payload = row;
    if (opts?.onConflict) this.upsertKey = opts.onConflict;
    return this;
  }
  delete() {
    this.op = "delete";
    return this;
  }

  _rows() {
    if (!this.tables[this.table]) this.tables[this.table] = [];
    return this.tables[this.table];
  }

  _exec() {
    const rows = this._rows();
    const matches = (r) => this.eqs.every(([c, v]) => r[c] === v);
    let data = null;
    let error = null;

    if (this.op === "insert") {
      const row = withDefaults(this.table, this.payload);
      rows.push(row);
      this.ops.push({ op: "insert", table: this.table, row });
      data = this.mode === "many" ? [row] : row;
    } else if (this.op === "upsert") {
      const existing = rows.find((r) => r[this.upsertKey] === this.payload[this.upsertKey]);
      let row;
      if (existing) {
        Object.assign(existing, this.payload, { updated_at: new Date().toISOString() });
        row = existing;
      } else {
        row = withDefaults(this.table, this.payload);
        rows.push(row);
      }
      this.ops.push({ op: "upsert", table: this.table, row });
      data = this.mode === "many" ? [row] : row;
    } else if (this.op === "update") {
      const targets = rows.filter(matches);
      targets.forEach((r) => Object.assign(r, this.payload, { updated_at: new Date().toISOString() }));
      this.ops.push({ op: "update", table: this.table, count: targets.length });
      if (this.mode === "single") {
        data = targets[0] || null;
        if (!data) error = { message: "JSON object requested, multiple (or no) rows returned" };
      } else {
        data = targets;
      }
    } else if (this.op === "delete") {
      const keep = rows.filter((r) => !matches(r));
      const removed = rows.length - keep.length;
      this.tables[this.table] = keep;
      this.ops.push({ op: "delete", table: this.table, count: removed });
      data = [];
    } else {
      const found = rows.filter(matches);
      if (this.mode === "maybe") data = found[0] ?? null;
      else if (this.mode === "single") {
        data = found[0] || null;
        if (!data) error = { message: "JSON object requested, multiple (or no) rows returned" };
      } else data = found;
    }
    return { data, error };
  }

  then(resolve, reject) {
    try {
      resolve(this._exec());
    } catch (err) {
      reject(err);
    }
  }
}

export function createFakeSupabase(initialTables = {}) {
  const tables = {};
  for (const [name, rows] of Object.entries(initialTables)) tables[name] = rows.map((r) => ({ ...r }));
  const ops = [];
  return {
    tables,
    ops,
    from(table) {
      return new Builder(tables, ops, table);
    },
  };
}
