export const CONVERSATIONS = [
  {
    id: "conv-concierge",
    withName: "Marisol Duarte",
    withRole: "Your Concierge",
    initials: "MD",
    updatedAt: "2026-07-13T15:42:00",
    unreadCount: 2,
  },
  {
    id: "conv-lawyer",
    withName: "Duarte & Asociados",
    withRole: "Immigration Lawyer",
    initials: "DA",
    updatedAt: "2026-07-11T10:05:00",
    unreadCount: 0,
  },
  {
    id: "conv-realtor",
    withName: "Diego Fernandez",
    withRole: "Realtor",
    initials: "DF",
    updatedAt: "2026-07-08T18:20:00",
    unreadCount: 0,
  },
];

export const MESSAGE_THREADS = {
  "conv-concierge": [
    {
      id: "m1",
      sender: "team",
      text: "Hi Avery! Just confirming your residency consultation is booked for July 22nd at 10:30 AM EST.",
      timestamp: "2026-07-13T15:38:00",
    },
    {
      id: "m2",
      sender: "team",
      text: "Also — your birth certificate apostille is expiring soon, worth renewing before the appointment.",
      timestamp: "2026-07-13T15:42:00",
    },
  ],
  "conv-lawyer": [
    {
      id: "m1",
      sender: "team",
      text: "Received your bank statements, thank you. Everything looks complete on our end.",
      timestamp: "2026-07-11T10:05:00",
    },
    {
      id: "m2",
      sender: "client",
      text: "Great, let me know if you need anything else before the 22nd.",
      timestamp: "2026-07-11T10:12:00",
    },
  ],
  "conv-realtor": [
    {
      id: "m1",
      sender: "team",
      text: "Sending over 4 listings in Playacar and Centro ahead of our call.",
      timestamp: "2026-07-08T18:20:00",
    },
  ],
};
