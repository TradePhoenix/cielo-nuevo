// CRM state: owns the (mock) leads and tasks collections plus every mutation
// the UI can perform on them (notes, tags, stage/status changes, tasks).
// Modeled on the Blueprint's own useBlueprintState.js — local state,
// persisted to localStorage under a versioned key, no backend. A real
// backend swap would replace the localStorage read/write below with network
// calls and keep every action's signature identical.
import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchLeads, fetchTasks, fetchTeamMembers, fetchPartners } from "../data/crmRepository";

export const STORAGE_KEY = "pathToMexico.crm.v1";
const STORAGE_VERSION = 1;

// No auth yet, so manually-added notes/activity are attributed to a single
// generic operator identity rather than any one team member.
export const CURRENT_USER = { id: "current_user", name: "You" };

function todayISO() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function loadInitialState() {
  const seeded = { leads: fetchLeads(), tasks: fetchTasks() };

  if (typeof window === "undefined") {
    return seeded;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seeded;

    const parsed = JSON.parse(raw);
    if (parsed.version !== STORAGE_VERSION) return seeded;
    if (!Array.isArray(parsed.leads) || !Array.isArray(parsed.tasks)) return seeded;

    return { leads: parsed.leads, tasks: parsed.tasks };
  } catch (error) {
    return seeded;
  }
}

let noteCounter = 0;
let taskCounter = 0;
let activityCounter = 0;

export function useCrmState() {
  const [{ leads, tasks }, setState] = useState(loadInitialState);
  const teamMembers = useMemo(() => fetchTeamMembers(), []);
  const partners = useMemo(() => fetchPartners(), []);

  // Brief simulated fetch delay so the CRM's loading states are genuinely
  // exercised on first mount rather than only existing in markup no one
  // sees — matches the shape a real network fetch would have without
  // needing one yet.
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 450);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, leads, tasks }));
  }, [leads, tasks]);

  const addNote = useCallback((leadId, text) => {
    if (!text || !text.trim()) return;
    noteCounter += 1;
    const note = { id: `nt_manual_${noteCounter}`, authorId: CURRENT_USER.id, date: todayISO(), text: text.trim() };
    setState((prev) => ({
      ...prev,
      leads: prev.leads.map((lead) => (lead.id === leadId ? { ...lead, notes: [...lead.notes, note] } : lead)),
    }));
  }, []);

  const addActivity = useCallback((leadId, description, type = "note") => {
    activityCounter += 1;
    const entry = { id: `ac_manual_${activityCounter}`, date: todayISO(), type, description };
    setState((prev) => ({
      ...prev,
      leads: prev.leads.map((lead) => (lead.id === leadId ? { ...lead, activity: [...lead.activity, entry] } : lead)),
    }));
  }, []);

  const changeStage = useCallback((leadId, newStageId, newStageLabel) => {
    setState((prev) => ({
      ...prev,
      leads: prev.leads.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              pipelineStage: newStageId,
              activity: [
                ...lead.activity,
                { id: `ac_manual_stage_${Date.now()}`, date: todayISO(), type: "stage_change", description: `Pipeline stage changed to "${newStageLabel}".` },
              ],
            }
          : lead
      ),
    }));
  }, []);

  const changeStatus = useCallback((leadId, newStatus) => {
    setState((prev) => ({
      ...prev,
      leads: prev.leads.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              status: newStatus,
              activity: [
                ...lead.activity,
                { id: `ac_manual_status_${Date.now()}`, date: todayISO(), type: "status_change", description: `Lead status changed to "${newStatus}".` },
              ],
            }
          : lead
      ),
    }));
  }, []);

  const updateTags = useCallback((leadId, newTags) => {
    setState((prev) => ({
      ...prev,
      leads: prev.leads.map((lead) => (lead.id === leadId ? { ...lead, tags: newTags } : lead)),
    }));
  }, []);

  const addTask = useCallback((leadId, { title, dueDate, priority, ownerId }) => {
    if (!title || !title.trim() || !dueDate) return;
    taskCounter += 1;
    const task = {
      id: `tk_manual_${taskCounter}`,
      leadId,
      title: title.trim(),
      dueDate,
      priority: priority || "Medium",
      ownerId: ownerId || CURRENT_USER.id,
      status: "open",
    };
    setState((prev) => ({ ...prev, tasks: [...prev.tasks, task] }));
  }, []);

  const completeTask = useCallback((taskId) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) =>
        task.id === taskId ? { ...task, status: "done", completedDate: todayISO() } : task
      ),
    }));
  }, []);

  const reopenTask = useCallback((taskId) => {
    setState((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) => {
        if (task.id !== taskId) return task;
        const { completedDate, ...rest } = task;
        return { ...rest, status: "open" };
      }),
    }));
  }, []);

  return {
    leads,
    tasks,
    teamMembers,
    partners,
    isLoading,
    addNote,
    addActivity,
    changeStage,
    changeStatus,
    updateTags,
    addTask,
    completeTask,
    reopenTask,
  };
}
