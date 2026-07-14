// Conversations + their messages. Kept together in one file since the
// Messages page always needs both — a conversation without its thread
// isn't useful mock data on its own.
export const MOCK_CONVERSATIONS = [
  {
    id: "conversation-001",
    partnerId: "partner-001",
    withName: "Path To Mexico Team",
    withRole: "Partner Success",
    lastMessagePreview: "Great — we'll route the next Playa del Carmen referral your way.",
    lastMessageAt: "2026-07-14T15:32:00-05:00",
    unreadCount: 2,
    isTyping: false,
  },
  {
    id: "conversation-002",
    partnerId: "partner-001",
    withName: "Daniel Whitfield",
    withRole: "Client",
    lastMessagePreview: "I just uploaded my proof of income, let me know if anything else is needed.",
    lastMessageAt: "2026-07-14T11:05:00-05:00",
    unreadCount: 1,
    isTyping: true,
  },
  {
    id: "conversation-003",
    partnerId: "partner-001",
    withName: "Sophie Reinholt",
    withRole: "Client",
    lastMessagePreview: "Thank you for prepping me for the interview, feeling much more confident.",
    lastMessageAt: "2026-07-13T18:47:00-05:00",
    unreadCount: 0,
    isTyping: false,
  },
  {
    id: "conversation-004",
    partnerId: "partner-001",
    withName: "Path To Mexico Team",
    withRole: "Referral Desk",
    lastMessagePreview: "Reminder: Julien Moreau's file is waiting on translated documents.",
    lastMessageAt: "2026-07-12T09:14:00-05:00",
    unreadCount: 0,
    isTyping: false,
  },
];

export const MOCK_MESSAGES = {
  "conversation-001": [
    {
      id: "message-001",
      conversationId: "conversation-001",
      sender: "team",
      body: "Hi Mariana — thanks for the fast turnaround on Martin Suarez's approval.",
      sentAt: "2026-07-14T15:20:00-05:00",
      read: true,
    },
    {
      id: "message-002",
      conversationId: "conversation-001",
      sender: "partner",
      body: "Happy to help, that one moved quickly once the documents were in.",
      sentAt: "2026-07-14T15:26:00-05:00",
      read: true,
    },
    {
      id: "message-003",
      conversationId: "conversation-001",
      sender: "team",
      body: "Great — we'll route the next Playa del Carmen referral your way.",
      sentAt: "2026-07-14T15:32:00-05:00",
      read: false,
    },
  ],
  "conversation-002": [
    {
      id: "message-004",
      conversationId: "conversation-002",
      sender: "partner",
      body: "Hi Daniel, checking in — were you able to gather the proof of income for your visa filing?",
      sentAt: "2026-07-14T10:50:00-05:00",
      read: true,
    },
    {
      id: "message-005",
      conversationId: "conversation-002",
      sender: "team",
      body: "I just uploaded my proof of income, let me know if anything else is needed.",
      sentAt: "2026-07-14T11:05:00-05:00",
      read: false,
    },
  ],
  "conversation-003": [
    {
      id: "message-006",
      conversationId: "conversation-003",
      sender: "partner",
      body: "Here's the mock interview outline we discussed — review it before Thursday.",
      sentAt: "2026-07-13T18:30:00-05:00",
      read: true,
    },
    {
      id: "message-007",
      conversationId: "conversation-003",
      sender: "team",
      body: "Thank you for prepping me for the interview, feeling much more confident.",
      sentAt: "2026-07-13T18:47:00-05:00",
      read: true,
    },
  ],
  "conversation-004": [
    {
      id: "message-008",
      conversationId: "conversation-004",
      sender: "team",
      body: "Reminder: Julien Moreau's file is waiting on translated documents.",
      sentAt: "2026-07-12T09:14:00-05:00",
      read: true,
    },
  ],
};
