import { useMemo, useState } from "react";
import SEO from "../../../components/SEO";
import CrmShell from "../components/CrmShell";
import SearchFilterBar from "../components/SearchFilterBar";
import LeadsTable from "../components/LeadsTable";
import LeadCard from "../components/LeadCard";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import { useCrmState } from "../state/useCrmState";
import { filterSortLeads } from "../logic/filterSortLeads";

const DEFAULT_FILTERS = { search: "", status: "all", stage: "all", source: "all", sortBy: "score_desc" };

export default function CrmLeadsPage() {
  const { leads, teamMembers, isLoading } = useCrmState();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const teamMemberName = (id) => teamMembers.find((member) => member.id === id)?.name || "Unassigned";
  const filteredLeads = useMemo(() => filterSortLeads(leads, filters), [leads, filters]);

  return (
    <CrmShell>
      <SEO title="CRM Leads" path="/developer/crm/leads" />
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Internal CRM</p>
      <h1 className="mt-4 text-4xl font-light tracking-[-0.03em] sm:text-5xl">Leads</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-600">
        Every relocation lead, searchable and filterable in one place.
      </p>

      <div className="mt-8">
        <SearchFilterBar filters={filters} onChange={setFilters} resultCount={isLoading ? undefined : filteredLeads.length} />
      </div>

      <div className="mt-6">
        {isLoading ? (
          <LoadingState rows={6} />
        ) : filteredLeads.length === 0 ? (
          <EmptyState
            title="No leads match these filters."
            description="Try clearing the search term or resetting filters to see the full list again."
            actionLabel="Reset Filters"
            onAction={() => setFilters(DEFAULT_FILTERS)}
          />
        ) : (
          <>
            <LeadsTable leads={filteredLeads} teamMemberName={teamMemberName} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
              {filteredLeads.map((lead) => (
                <LeadCard key={lead.id} lead={lead} teamMemberName={teamMemberName(lead.assignedTeamMemberId)} />
              ))}
            </div>
          </>
        )}
      </div>
    </CrmShell>
  );
}
