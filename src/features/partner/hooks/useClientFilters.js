import { useMemo, useState } from "react";
import { filterClients, sortClients } from "../utils/clientUtils";

export function useClientFilters(clients) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [sortBy, setSortBy] = useState("name_asc");

  const filteredClients = useMemo(
    () => sortClients(filterClients(clients, { query, status, priority }), sortBy),
    [clients, query, status, priority, sortBy]
  );

  return {
    query,
    setQuery,
    status,
    setStatus,
    priority,
    setPriority,
    sortBy,
    setSortBy,
    filteredClients,
  };
}
