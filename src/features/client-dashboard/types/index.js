// Shape documentation for the Client Dashboard V2's mock data. This is a
// plain CRA/JS project (no TypeScript), so these are JSDoc typedefs used
// for editor hints only — nothing here is enforced at runtime. Every shape
// here is designed to be a drop-in replacement target once a real backend
// exists: field names intentionally mirror what a REST/GraphQL API would
// plausibly return.

/**
 * @typedef {Object} ClientProfile
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} fullName
 * @property {string} email
 * @property {string} phone
 * @property {string} destinationCity
 * @property {string} destinationState
 * @property {number} progressPercent
 * @property {string} currentStageId
 * @property {string} currentStageLabel
 * @property {{ title: string, date: string, description: string }} upcomingMilestone
 * @property {string} conciergeName
 * @property {string} memberSince
 */

/**
 * @typedef {"completed"|"current"|"upcoming"} StageStatus
 *
 * @typedef {Object} TimelineStage
 * @property {string} id
 * @property {string} title
 * @property {StageStatus} status
 * @property {string} [date]
 * @property {string} description
 */

/**
 * @typedef {"complete"|"incomplete"|"due-soon"|"priority"} TaskStatus
 *
 * @typedef {Object} ChecklistTask
 * @property {string} id
 * @property {string} title
 * @property {TaskStatus} status
 * @property {string} [dueDate]
 *
 * @typedef {Object} ChecklistCategory
 * @property {string} id
 * @property {string} name
 * @property {ChecklistTask[]} tasks
 */

/**
 * @typedef {"uploaded"|"pending"|"expiring"|"missing"} DocumentStatus
 *
 * @typedef {Object} DocumentRecord
 * @property {string} id
 * @property {string} categoryId
 * @property {string} name
 * @property {DocumentStatus} status
 * @property {string} [uploadedDate]
 * @property {string} [expiryDate]
 * @property {string} [fileType]
 * @property {string} [fileSizeLabel]
 */

/**
 * @typedef {Object} Appointment
 * @property {string} id
 * @property {string} title
 * @property {string} withName
 * @property {string} withRole
 * @property {string} date ISO date
 * @property {string} time e.g. "10:30 AM"
 * @property {string} timezone e.g. "EST"
 * @property {"Video Call"|"Phone Call"} method
 * @property {"upcoming"|"completed"} status
 * @property {string} [notes]
 */

/**
 * @typedef {Object} Partner
 * @property {string} id
 * @property {string} role
 * @property {string} name
 * @property {string} company
 * @property {string} initials
 * @property {string} accentColor
 * @property {string} phone
 * @property {string} whatsapp
 * @property {string} email
 * @property {string} bio
 */

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {"client"|"team"} sender
 * @property {string} text
 * @property {string} timestamp ISO datetime
 *
 * @typedef {Object} Conversation
 * @property {string} id
 * @property {string} withName
 * @property {string} withRole
 * @property {string} initials
 * @property {string} lastMessagePreview
 * @property {string} updatedAt
 * @property {number} unreadCount
 */

/**
 * @typedef {"paid"|"outstanding"|"upcoming"} InvoiceStatus
 *
 * @typedef {Object} Invoice
 * @property {string} id
 * @property {string} description
 * @property {number} amount
 * @property {string} currency
 * @property {InvoiceStatus} status
 * @property {string} issuedDate
 * @property {string} dueDate
 * @property {string} [paidDate]
 * @property {string} [method]
 */

/**
 * @typedef {Object} EmergencyContact
 * @property {string} id
 * @property {string} label
 * @property {string} name
 * @property {string} phone
 * @property {string} [address]
 * @property {string} [notes]
 */

/**
 * @typedef {Object} ActivityItem
 * @property {string} id
 * @property {string} text
 * @property {string} timestamp
 */

export {};
