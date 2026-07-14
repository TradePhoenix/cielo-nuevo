// Central mock state for the Partner Portal. Everything that's read-only
// reference data (partner profile, clients, appointments, performance,
// analytics, referral history) is imported straight from ../mock and
// never touches localStorage. Everything a partner can actually change
// through the mock UI — referral progress status, messages sent,
// notification read state — is versioned into localStorage the same way
// useBlueprintState.js does it, so interactions survive a reload without
// needing a backend. This is the seam a future Supabase/Postgres swap
// would replace: same shape in, same actions out, different persistence.
import { useCallback, useEffect, useState } from "react";
import { MOCK_PARTNER } from "../mock/mockPartner";
import { MOCK_CLIENTS } from "../mock/mockClients";
import { MOCK_REFERRALS } from "../mock/mockReferrals";
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from "../mock/mockConversations";
import { MOCK_NOTIFICATIONS } from "../mock/mockNotifications";
import { MOCK_APPOINTMENTS } from "../mock/mockAppointments";
import { MOCK_PERFORMANCE, MOCK_REFERRAL_HISTORY } from "../mock/mockPerformance";
import { MOCK_ANALYTICS } from "../mock/mockAnalytics";

export const STORAGE_KEY = "pathToMexico.partnerPortal.v1";
const STORAGE_VERSION = 1;

function loadPersisted() {
  const defaults = { referrals: MOCK_REFERRALS, conversations: MOCK_CONVERSATIONS, messages: MOCK_MESSAGES, notifications: MOCK_NOTIFICATIONS };

  if (typeof window === "undefined") return defaults;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;

    const parsed = JSON.parse(raw);
    if (parsed.version !== STORAGE_VERSION) return defaults;

    return {
      referrals: parsed.referrals || defaults.referrals,
      conversations: parsed.conversations || defaults.conversations,
      messages: parsed.messages || defaults.messages,
      notifications: parsed.notifications || defaults.notifications,
    };
  } catch (error) {
    return defaults;
  }
}

let messageIdCounter = 0;
function nextMessageId() {
  messageIdCounter += 1;
  return `message-mock-${Date.now()}-${messageIdCounter}`;
}

export function usePartnerPortalStore() {
  const [{ referrals, conversations, messages, notifications }, setState] = useState(loadPersisted);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: STORAGE_VERSION, referrals, conversations, messages, notifications })
    );
  }, [referrals, conversations, messages, notifications]);

  const updateReferralProgressStatus = useCallback((referralId, progressStatus) => {
    setState((prev) => ({
      ...prev,
      referrals: prev.referrals.map((referral) =>
        referral.id === referralId ? { ...referral, progressStatus } : referral
      ),
    }));
  }, []);

  const sendMessage = useCallback((conversationId, body) => {
    const trimmed = body.trim();
    if (!trimmed) return;

    const message = {
      id: nextMessageId(),
      conversationId,
      sender: "partner",
      body: trimmed,
      sentAt: new Date().toISOString(),
      read: true,
    };

    setState((prev) => ({
      ...prev,
      messages: {
        ...prev.messages,
        [conversationId]: [...(prev.messages[conversationId] || []), message],
      },
      conversations: prev.conversations.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, lastMessagePreview: trimmed, lastMessageAt: message.sentAt }
          : conversation
      ),
    }));
  }, []);

  const markConversationRead = useCallback((conversationId) => {
    setState((prev) => ({
      ...prev,
      conversations: prev.conversations.map((conversation) =>
        conversation.id === conversationId ? { ...conversation, unreadCount: 0 } : conversation
      ),
      messages: {
        ...prev.messages,
        [conversationId]: (prev.messages[conversationId] || []).map((message) => ({ ...message, read: true })),
      },
    }));
  }, []);

  const markNotificationRead = useCallback((notificationId) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      ),
    }));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((notification) => ({ ...notification, read: true })),
    }));
  }, []);

  const unreadMessageCount = conversations.reduce((sum, conversation) => sum + conversation.unreadCount, 0);
  const unreadNotificationCount = notifications.filter((notification) => !notification.read).length;
  const newReferrals = referrals.filter((referral) => referral.stage === "incoming");
  const pendingReferrals = referrals.filter((referral) =>
    ["accepted", "pending", "waiting_documents"].includes(referral.stage)
  );
  const completedReferrals = referrals.filter((referral) => referral.stage === "completed");

  return {
    partner: MOCK_PARTNER,
    clients: MOCK_CLIENTS,
    appointments: MOCK_APPOINTMENTS,
    performance: MOCK_PERFORMANCE,
    referralHistory: MOCK_REFERRAL_HISTORY,
    analytics: MOCK_ANALYTICS,

    referrals,
    newReferrals,
    pendingReferrals,
    completedReferrals,
    updateReferralProgressStatus,

    conversations,
    messages,
    sendMessage,
    markConversationRead,
    unreadMessageCount,

    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    unreadNotificationCount,
  };
}
