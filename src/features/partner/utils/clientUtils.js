const PRIORITY_RANK = { urgent: 0, high: 1, medium: 2, low: 3 };

export function filterClients(clients, { query, status, priority }) {
  const normalizedQuery = query.trim().toLowerCase();

  return clients.filter((client) => {
    const matchesQuery =
      !normalizedQuery ||
      client.name.toLowerCase().includes(normalizedQuery) ||
      client.destination.toLowerCase().includes(normalizedQuery) ||
      client.country.toLowerCase().includes(normalizedQuery) ||
      client.currentStage.toLowerCase().includes(normalizedQuery);

    const matchesStatus = status === "all" || client.status === status;
    const matchesPriority = priority === "all" || client.priority === priority;

    return matchesQuery && matchesStatus && matchesPriority;
  });
}

export function sortClients(clients, sortBy) {
  const sorted = [...clients];

  switch (sortBy) {
    case "name_asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "move_date_asc":
      return sorted.sort((a, b) => a.moveDate.localeCompare(b.moveDate));
    case "priority":
      return sorted.sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority]);
    default:
      return sorted;
  }
}
