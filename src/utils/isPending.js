export type PendingValue = any

// Isolated in case we want to modify this behavior in the future.
export const isPending: (PendingValue) => boolean = (pendingValue) => !pendingValue
