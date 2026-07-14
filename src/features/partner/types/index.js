// Partner Portal data shapes, documented as JSDoc typedefs rather than
// TypeScript (the whole repo is plain JS/CRA). Field names and shapes are
// written the way they'd land as Supabase/Postgres tables — explicit
// id/foreign-key-style fields (e.g. clientId, partnerId) — so a future
// backend swap can map columns to these shapes directly without
// redesigning the UI layer. Nothing here does I/O; it's purely
// documentation for the mock data in ../mock and the store in ../hooks.

/**
 * @typedef {"immigration_lawyer"|"realtor"|"insurance_advisor"|"mortgage_broker"|
 *   "accountant"|"doctor"|"dentist"|"property_manager"|"contractor"|"mover"|
 *   "car_dealer"|"banking_partner"|"internet_provider"|"concierge_service"} PartnerServiceType
 */

/**
 * @typedef {"waiting_on_client"|"waiting_on_documents"|"in_progress"|
 *   "completed"|"needs_attention"|"completed_successfully"} ReferralProgressStatus
 */

/**
 * @typedef {"incoming"|"accepted"|"pending"|"waiting_documents"|"completed"|"declined"} ReferralStage
 */

/** @typedef {"low"|"medium"|"high"|"urgent"} PriorityLevel */

/**
 * @typedef {Object} Partner
 * @property {string} id
 * @property {string} name
 * @property {string} photoUrl
 * @property {string} company
 * @property {PartnerServiceType[]} services
 * @property {string[]} languages
 * @property {string} coverageArea
 * @property {string} businessHours
 * @property {{ email: string, phone: string }} contact
 * @property {string} website
 * @property {boolean} emergencyAvailability
 */

/**
 * @typedef {Object} Client
 * @property {string} id
 * @property {string} partnerId
 * @property {string} name
 * @property {string} country
 * @property {string} destination
 * @property {string} currentStage
 * @property {PartnerServiceType[]} assignedServices
 * @property {string} moveDate ISO date string
 * @property {PriorityLevel} priority
 * @property {"active"|"on_hold"|"completed"} status
 */

/**
 * @typedef {Object} Referral
 * @property {string} id
 * @property {string} partnerId
 * @property {string} clientId
 * @property {string} clientName
 * @property {string} serviceRequested
 * @property {string} assignedDate ISO date string
 * @property {PriorityLevel} priority
 * @property {string} expectedCompletion ISO date string
 * @property {ReferralStage} stage
 * @property {ReferralProgressStatus} progressStatus
 */

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} conversationId
 * @property {"partner"|"team"} sender
 * @property {string} body
 * @property {string} sentAt ISO datetime string
 * @property {boolean} read
 */

/**
 * @typedef {Object} Conversation
 * @property {string} id
 * @property {string} partnerId
 * @property {string} withName
 * @property {string} withRole
 * @property {string} lastMessagePreview
 * @property {string} lastMessageAt ISO datetime string
 * @property {number} unreadCount
 * @property {boolean} isTyping mock-only presence flag
 */

/**
 * @typedef {"new_referral"|"upcoming_appointment"|"missing_documents"|
 *   "unread_message"|"reminder"} NotificationType
 */

/**
 * @typedef {Object} PortalNotification
 * @property {string} id
 * @property {string} partnerId
 * @property {NotificationType} type
 * @property {string} title
 * @property {string} body
 * @property {string} createdAt ISO datetime string
 * @property {boolean} read
 */

/**
 * @typedef {Object} Appointment
 * @property {string} id
 * @property {string} clientName
 * @property {string} purpose
 * @property {string} startsAt ISO datetime string
 * @property {"video"|"phone"|"in_person"} format
 */

/**
 * @typedef {Object} PerformanceMetrics
 * @property {number} clientsServed
 * @property {number} completionRate 0-1
 * @property {string} averageResponseTime e.g. "2.4 hrs"
 * @property {string} averageCompletionTime e.g. "18 days"
 * @property {number} customerRating 0-5
 */

/**
 * @typedef {Object} ReferralHistoryEntry
 * @property {string} id
 * @property {string} clientName
 * @property {string} serviceRequested
 * @property {string} completedAt ISO date string
 * @property {ReferralProgressStatus} outcome
 */

/**
 * @typedef {Object} AnalyticsSnapshot
 * @property {{ month: string, count: number }[]} monthlyReferrals
 * @property {number} completedServices
 * @property {number} pendingWork
 * @property {string} averageTurnaround e.g. "12 days"
 * @property {{ service: PartnerServiceType, count: number }[]} serviceMix
 */

export {};
