import SEO from "../../../components/SEO";
import PartnerPortalShell from "../components/PartnerPortalShell";
import SearchInput from "../components/SearchInput";
import FilterSelect from "../components/FilterSelect";
import EmptyState from "../components/EmptyState";
import ClientCard from "../components/clients/ClientCard";
import { usePartnerPortalStore } from "../hooks/usePartnerPortalStore";
import { useClientFilters } from "../hooks/useClientFilters";
import { CLIENT_STATUSES, PRIORITY_LEVELS } from "../utils/statusConfig";

const STATUS_OPTIONS = [{ value: "all", label: "All Statuses" }, ...CLIENT_STATUSES.map((s) => ({ value: s.id, label: s.label }))];
const PRIORITY_OPTIONS = [{ value: "all", label: "All Priorities" }, ...PRIORITY_LEVELS.map((p) => ({ value: p.id, label: p.label }))];
const SORT_OPTIONS = [
  { value: "name_asc", label: "Name (A–Z)" },
  { value: "move_date_asc", label: "Move Date (Soonest)" },
  { value: "priority", label: "Priority (Highest First)" },
];

export default function PartnerClientsPage() {
  const { partner, clients, unreadNotificationCount } = usePartnerPortalStore();
  const { query, setQuery, status, setStatus, priority, setPriority, sortBy, setSortBy, filteredClients } =
    useClientFilters(clients);

  return (
    <PartnerPortalShell partner={partner} unreadNotificationCount={unreadNotificationCount}>
      <SEO
        title="Clients"
        description="Track every assigned client's move, from country of origin to move date."
        path="/partner/clients"
      />

      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Clients</p>
      <h1 className="mt-4 max-w-2xl text-4xl font-light leading-tight tracking-[-0.03em] sm:text-5xl">
        Your assigned clients.
      </h1>

      <div className="mt-8 flex flex-col gap-4 border-y border-zinc-200 py-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
        <SearchInput value={query} onChange={setQuery} placeholder="Search by name, destination, or stage" />
        <div className="flex flex-wrap gap-4">
          <FilterSelect label="Status" value={status} onChange={setStatus} options={STATUS_OPTIONS} />
          <FilterSelect label="Priority" value={priority} onChange={setPriority} options={PRIORITY_OPTIONS} />
          <FilterSelect label="Sort By" value={sortBy} onChange={setSortBy} options={SORT_OPTIONS} />
        </div>
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-zinc-500">
        {filteredClients.length} of {clients.length} clients
      </p>

      {filteredClients.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No clients match your filters" description="Try a different search term or reset your filters." />
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      )}
    </PartnerPortalShell>
  );
}
