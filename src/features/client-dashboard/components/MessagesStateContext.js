import { createContext, useContext } from "react";
import { useMessagesState } from "../hooks/useMessagesState";

// One shared instance of useMessagesState per dashboard session, provided
// by ClientDashboardLayout. Without this, the sidebar's unread badge and
// the Messages page would each mount their own independent hook instance
// with its own local state — marking a conversation read on the page would
// never be reflected in the sidebar badge until a full remount.
const MessagesStateContext = createContext(null);

export function MessagesStateProvider({ children }) {
  const value = useMessagesState();
  return <MessagesStateContext.Provider value={value}>{children}</MessagesStateContext.Provider>;
}

export function useMessagesStateContext() {
  const context = useContext(MessagesStateContext);
  if (!context) {
    throw new Error("useMessagesStateContext must be used within a MessagesStateProvider");
  }
  return context;
}
